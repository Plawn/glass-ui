import { createSignal, createMemo, createEffect, onCleanup } from 'solid-js';
import type { ListItem, ListRange, ScrollAlignment, ScrollBehavior } from './types';

// =============================================================================
// OPTIMIZED SIZE CACHE - O(1) offset lookup, O(log n) index search
// =============================================================================

interface SizeCache {
  /** Map of index -> measured size */
  sizes: Map<number, number>;
  /** Default size for unmeasured items */
  defaultSize: number;
  /** Total count of items */
  totalCount: number;
  /** Cached total size (sum of all items) */
  cachedTotalSize: number;
  /** Version number for cache invalidation */
  version: number;
}

function createSizeCache(defaultSize: number, totalCount: number): SizeCache {
  return {
    sizes: new Map(),
    defaultSize,
    totalCount,
    cachedTotalSize: defaultSize * totalCount,
    version: 0,
  };
}

/** Get size for an index - O(1) */
function getSizeForIndex(cache: SizeCache, index: number): number {
  return cache.sizes.get(index) ?? cache.defaultSize;
}

/**
 * Calculate offset for an index - O(n) but only for measured items
 * For lists with fixedItemHeight, this is O(1)
 */
function getOffsetForIndex(cache: SizeCache, index: number, fixedSize?: number): number {
  if (index <= 0) return 0;

  // Fast path for fixed size
  if (fixedSize !== undefined) {
    return index * fixedSize;
  }

  const clampedIndex = Math.min(index, cache.totalCount);

  // If no items have been measured, use simple calculation
  if (cache.sizes.size === 0) {
    return clampedIndex * cache.defaultSize;
  }

  // Calculate offset by summing sizes
  let offset = 0;
  for (let i = 0; i < clampedIndex; i++) {
    offset += cache.sizes.get(i) ?? cache.defaultSize;
  }

  return offset;
}

/**
 * Find the index at a given scroll offset using binary search for fixed size,
 * or linear scan for variable sizes
 */
function getIndexAtOffset(cache: SizeCache, targetOffset: number, fixedSize?: number): number {
  if (targetOffset <= 0) return 0;
  if (cache.totalCount === 0) return 0;

  // Fast path for fixed size - O(1)
  if (fixedSize !== undefined) {
    return Math.min(Math.floor(targetOffset / fixedSize), cache.totalCount - 1);
  }

  // If no items have been measured, use simple calculation - O(1)
  if (cache.sizes.size === 0) {
    return Math.min(Math.floor(targetOffset / cache.defaultSize), cache.totalCount - 1);
  }

  // Linear scan for variable sizes - O(n) but typically only scans visible items
  let offset = 0;
  for (let i = 0; i < cache.totalCount; i++) {
    const size = cache.sizes.get(i) ?? cache.defaultSize;
    if (offset + size > targetOffset) {
      return i;
    }
    offset += size;
  }

  return cache.totalCount - 1;
}

/** Get total size - O(1) using cached value */
function getTotalSize(cache: SizeCache, fixedSize?: number): number {
  if (fixedSize !== undefined) {
    return cache.totalCount * fixedSize;
  }
  return cache.cachedTotalSize;
}

/** Update cached total size after a size change */
function updateCachedTotalSize(cache: SizeCache): number {
  if (cache.sizes.size === 0) {
    return cache.totalCount * cache.defaultSize;
  }

  let total = 0;
  for (let i = 0; i < cache.totalCount; i++) {
    total += cache.sizes.get(i) ?? cache.defaultSize;
  }
  return total;
}

// =============================================================================
// VIRTUALIZER HOOK
// =============================================================================

export interface VirtualizerOptions {
  totalCount: () => number;
  getEstimatedSize: () => number;
  getFixedSize?: () => number | undefined;
  overscan?: () => number;
  increaseViewportBy?: () => number | { top: number; bottom: number };
  getScrollContainer: () => HTMLElement | undefined;
  onRangeChanged?: (range: ListRange) => void;
  onItemsChanged?: (items: ListItem[]) => void;
  onTotalSizeChanged?: (size: number) => void;
  onScrollingChanged?: (scrolling: boolean) => void;
  atBottomThreshold?: () => number;
  atTopThreshold?: () => number;
  onAtBottomChange?: (atBottom: boolean) => void;
  onAtTopChange?: (atTop: boolean) => void;
  onEndReached?: (index: number) => void;
  onStartReached?: (index: number) => void;
  horizontal?: boolean;
}

export interface VirtualizerResult {
  items: () => ListItem[];
  totalSize: () => number;
  range: () => ListRange;
  offsetTop: () => number;
  offsetBottom: () => number;
  measureItem: (index: number, size: number) => void;
  scrollToIndex: (index: number, options?: { align?: ScrollAlignment; behavior?: ScrollBehavior }) => void;
  scrollTo: (options: { top: number; behavior?: ScrollBehavior }) => void;
  scrollBy: (options: { top: number; behavior?: ScrollBehavior }) => void;
  getScrollTop: () => number;
  isScrolling: () => boolean;
}

export function useVirtualizer(options: VirtualizerOptions): VirtualizerResult {
  const [scrollTop, setScrollTop] = createSignal(0);
  const [viewportSize, setViewportSize] = createSignal(0);
  const [sizeCache, setSizeCache] = createSignal<SizeCache>(
    createSizeCache(options.getEstimatedSize(), options.totalCount())
  );
  const [isScrolling, setIsScrolling] = createSignal(false);
  const [prevRange, setPrevRange] = createSignal<ListRange>({ startIndex: 0, endIndex: 0 });
  const [prevAtBottom, setPrevAtBottom] = createSignal(false);
  const [prevAtTop, setPrevAtTop] = createSignal(true);

  let scrollingTimer: ReturnType<typeof setTimeout> | null = null;

  // Update when totalCount changes
  createEffect(() => {
    const count = options.totalCount();
    const estimatedSize = options.getEstimatedSize();

    setSizeCache((prev) => {
      if (prev.totalCount !== count || prev.defaultSize !== estimatedSize) {
        // Remove measurements for items beyond new count
        if (count < prev.totalCount) {
          for (const index of prev.sizes.keys()) {
            if (index >= count) {
              prev.sizes.delete(index);
            }
          }
        }

        const newCache: SizeCache = {
          sizes: prev.sizes,
          defaultSize: estimatedSize,
          totalCount: count,
          cachedTotalSize: 0,
          version: prev.version + 1,
        };
        newCache.cachedTotalSize = updateCachedTotalSize(newCache);
        return newCache;
      }
      return prev;
    });
  });

  const overscan = createMemo(() => options.overscan?.() ?? 5);

  const viewportIncrease = createMemo(() => {
    const increase = options.increaseViewportBy?.();
    if (!increase) return { top: 0, bottom: 0 };
    if (typeof increase === 'number') return { top: increase, bottom: increase };
    return increase;
  });

  // Total size - O(1) using cached value
  const totalSize = createMemo(() => {
    const cache = sizeCache();
    const fixedSize = options.getFixedSize?.();
    return getTotalSize(cache, fixedSize);
  });

  // Calculate visible items - optimized for fixed size
  const visibleItems = createMemo((): ListItem[] => {
    const cache = sizeCache();
    const count = cache.totalCount;

    if (count === 0 || viewportSize() === 0) {
      return [];
    }

    const fixedSize = options.getFixedSize?.();
    const scroll = scrollTop();
    const viewport = viewportSize();
    const increase = viewportIncrease();
    const os = overscan();

    const startOffset = Math.max(0, scroll - increase.top);
    const endOffset = scroll + viewport + increase.bottom;

    // Use optimized index lookup
    let startIndex = getIndexAtOffset(cache, startOffset, fixedSize);
    let endIndex = getIndexAtOffset(cache, endOffset, fixedSize);

    // Apply overscan
    startIndex = Math.max(0, startIndex - os);
    endIndex = Math.min(count, endIndex + os + 1);

    const items: ListItem[] = new Array(endIndex - startIndex);

    if (fixedSize !== undefined) {
      // Fast path for fixed size - no offset calculation needed
      for (let i = startIndex; i < endIndex; i++) {
        items[i - startIndex] = {
          index: i,
          offset: i * fixedSize,
          size: fixedSize,
        };
      }
    } else {
      // Calculate offset for first visible item
      let offset = getOffsetForIndex(cache, startIndex, fixedSize);

      for (let i = startIndex; i < endIndex; i++) {
        const size = getSizeForIndex(cache, i);
        items[i - startIndex] = { index: i, offset, size };
        offset += size;
      }
    }

    return items;
  });

  const offsetTop = createMemo(() => {
    const items = visibleItems();
    if (items.length === 0) return 0;
    return items[0].offset;
  });

  const offsetBottom = createMemo(() => {
    const items = visibleItems();
    const total = totalSize();
    if (items.length === 0) return total;
    const lastItem = items[items.length - 1];
    return Math.max(0, total - lastItem.offset - lastItem.size);
  });

  const range = createMemo((): ListRange => {
    const items = visibleItems();
    if (items.length === 0) {
      return { startIndex: 0, endIndex: 0 };
    }
    return {
      startIndex: items[0].index,
      endIndex: items[items.length - 1].index,
    };
  });

  // Range change callback
  createEffect(() => {
    const r = range();
    const prev = prevRange();

    if (r.startIndex !== prev.startIndex || r.endIndex !== prev.endIndex) {
      setPrevRange(r);
      options.onRangeChanged?.(r);
    }
  });

  // Items change callback
  createEffect(() => {
    const items = visibleItems();
    options.onItemsChanged?.(items);
  });

  // Total size change callback
  createEffect(() => {
    const size = totalSize();
    options.onTotalSizeChanged?.(size);
  });

  // At bottom/top detection
  createEffect(() => {
    const scroll = scrollTop();
    const viewport = viewportSize();
    const total = totalSize();

    const bottomThreshold = options.atBottomThreshold?.() ?? 4;
    const topThreshold = options.atTopThreshold?.() ?? 0;

    const atBottom = total > 0 && scroll + viewport >= total - bottomThreshold;
    const atTop = scroll <= topThreshold;

    if (atBottom !== prevAtBottom()) {
      setPrevAtBottom(atBottom);
      options.onAtBottomChange?.(atBottom);
    }

    if (atTop !== prevAtTop()) {
      setPrevAtTop(atTop);
      options.onAtTopChange?.(atTop);
    }

    // End/start reached callbacks
    const items = visibleItems();
    if (items.length > 0 && atBottom) {
      const lastItem = items[items.length - 1];
      if (lastItem.index === options.totalCount() - 1) {
        options.onEndReached?.(lastItem.index);
      }
    }

    if (items.length > 0 && atTop) {
      const firstItem = items[0];
      if (firstItem.index === 0) {
        options.onStartReached?.(firstItem.index);
      }
    }
  });

  // Scroll handling
  createEffect(() => {
    const container = options.getScrollContainer();
    if (!container) return;

    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const measureViewport = () => {
      // Use getBoundingClientRect for more reliable measurement
      const rect = container.getBoundingClientRect();
      const size = options.horizontal ? rect.width : rect.height;
      if (size > 0) {
        setViewportSize(size);
        if (retryTimer) {
          clearTimeout(retryTimer);
          retryTimer = null;
        }
      } else if (retryCount < MAX_RETRIES) {
        retryCount++;
        retryTimer = setTimeout(() => {
          requestAnimationFrame(measureViewport);
        }, 50 * retryCount);
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const newScrollTop = options.horizontal ? container.scrollLeft : container.scrollTop;
          setScrollTop(newScrollTop);
          ticking = false;

          if (!isScrolling()) {
            setIsScrolling(true);
            options.onScrollingChanged?.(true);
          }

          if (scrollingTimer) {
            clearTimeout(scrollingTimer);
          }

          scrollingTimer = setTimeout(() => {
            setIsScrolling(false);
            options.onScrollingChanged?.(false);
            scrollingTimer = null;
          }, 150);
        });
      }
    };

    requestAnimationFrame(measureViewport);
    setScrollTop(options.horizontal ? container.scrollLeft : container.scrollTop);

    container.addEventListener('scroll', handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(measureViewport);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', measureViewport, { passive: true });
    }

    onCleanup(() => {
      container.removeEventListener('scroll', handleScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', measureViewport);
      }
      if (scrollingTimer) {
        clearTimeout(scrollingTimer);
      }
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    });
  });

  // Measure item - mutates in place for performance, then triggers update
  const measureItem = (index: number, size: number) => {
    setSizeCache((prev) => {
      const currentSize = prev.sizes.get(index);

      // Only update if size actually changed
      if (currentSize === size) {
        return prev;
      }

      // Calculate the size difference for incremental total update
      const oldSize = currentSize ?? prev.defaultSize;
      const sizeDiff = size - oldSize;

      // Mutate the existing map for performance
      prev.sizes.set(index, size);

      // Return new object to trigger reactivity, but reuse the map
      return {
        ...prev,
        cachedTotalSize: prev.cachedTotalSize + sizeDiff,
        version: prev.version + 1,
      };
    });
  };

  return {
    items: visibleItems,
    totalSize,
    range,
    offsetTop,
    offsetBottom,
    measureItem,
    scrollToIndex: (index, opts) => {
      const container = options.getScrollContainer?.();
      if (!container) return;

      const cache = sizeCache();
      const viewport = viewportSize();
      const fixedSize = options.getFixedSize?.();

      const itemOffset = getOffsetForIndex(cache, index, fixedSize);
      const itemSize = fixedSize ?? getSizeForIndex(cache, index);

      const align = opts?.align ?? 'start';
      const behavior = opts?.behavior ?? 'auto';

      let targetOffset: number;

      switch (align) {
        case 'center':
          targetOffset = itemOffset - viewport / 2 + itemSize / 2;
          break;
        case 'end':
          targetOffset = itemOffset - viewport + itemSize;
          break;
        case 'auto': {
          const currentScroll = scrollTop();
          if (itemOffset < currentScroll) {
            targetOffset = itemOffset;
          } else if (itemOffset + itemSize > currentScroll + viewport) {
            targetOffset = itemOffset - viewport + itemSize;
          } else {
            return;
          }
          break;
        }
        case 'start':
        default:
          targetOffset = itemOffset;
      }

      container.scrollTo({
        top: Math.max(0, targetOffset),
        behavior,
      });
    },
    scrollTo: (opts) => {
      const container = options.getScrollContainer?.();
      container?.scrollTo({
        top: opts.top,
        behavior: opts.behavior ?? 'auto',
      });
    },
    scrollBy: (opts) => {
      const container = options.getScrollContainer?.();
      container?.scrollBy({
        top: opts.top,
        behavior: opts.behavior ?? 'auto',
      });
    },
    getScrollTop: () => scrollTop(),
    isScrolling,
  };
}
