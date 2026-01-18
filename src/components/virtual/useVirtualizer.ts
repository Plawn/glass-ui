import { createSignal, createMemo, createEffect, onCleanup } from 'solid-js';
import type { ListItem, ListRange, ScrollAlignment, ScrollBehavior } from './types';

// =============================================================================
// FENWICK TREE (Binary Indexed Tree) - O(log n) operations
// =============================================================================

/**
 * Fenwick Tree for efficient prefix sum queries and point updates.
 * - Point update: O(log n)
 * - Prefix sum query: O(log n)
 * - Find index at offset (binary search): O(log² n)
 */
class FenwickTree {
  private tree: number[];
  private values: number[];
  private _size: number;

  constructor(size: number, defaultValue: number) {
    this._size = size;
    this.values = new Array(size).fill(defaultValue);
    this.tree = new Array(size + 1).fill(0);
    // Initialize tree with default values
    for (let i = 0; i < size; i++) {
      this.addToTree(i, defaultValue);
    }
  }

  private addToTree(index: number, delta: number): void {
    let i = index + 1;
    while (i <= this._size) {
      this.tree[i] += delta;
      i += i & (-i); // Add least significant bit
    }
  }

  /** Update value at index - O(log n) */
  update(index: number, newValue: number): void {
    if (index < 0 || index >= this._size) return;
    const delta = newValue - this.values[index];
    if (delta === 0) return;
    this.values[index] = newValue;
    this.addToTree(index, delta);
  }

  /** Get value at index - O(1) */
  get(index: number): number {
    if (index < 0 || index >= this._size) return 0;
    return this.values[index];
  }

  /** Get prefix sum [0, index] - O(log n) */
  prefixSum(index: number): number {
    if (index < 0) return 0;
    let sum = 0;
    let i = Math.min(index, this._size - 1) + 1;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i); // Remove least significant bit
    }
    return sum;
  }

  /** Get total sum - O(log n) */
  totalSum(): number {
    return this.prefixSum(this._size - 1);
  }

  /** Find index where prefix sum >= target using binary search - O(log² n) */
  findIndex(targetOffset: number): number {
    if (targetOffset <= 0) return 0;

    let low = 0;
    let high = this._size - 1;

    while (low < high) {
      const mid = (low + high) >>> 1;
      const sumAtMid = this.prefixSum(mid);
      if (sumAtMid <= targetOffset) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    // Verify and adjust
    const sumBefore = low > 0 ? this.prefixSum(low - 1) : 0;
    if (sumBefore > targetOffset && low > 0) {
      return low - 1;
    }

    return Math.min(low, this._size - 1);
  }

  /** Resize the tree - O(n) */
  resize(newSize: number, defaultValue: number): void {
    if (newSize === this._size) return;

    const oldValues = this.values;
    const oldSize = this._size;

    this._size = newSize;
    this.values = new Array(newSize).fill(defaultValue);
    this.tree = new Array(newSize + 1).fill(0);

    // Copy existing values
    const copyCount = Math.min(oldSize, newSize);
    for (let i = 0; i < copyCount; i++) {
      this.values[i] = oldValues[i];
    }

    // Rebuild tree
    for (let i = 0; i < newSize; i++) {
      this.addToTree(i, this.values[i]);
    }
  }

  get size(): number {
    return this._size;
  }
}

// =============================================================================
// SIZE CACHE with Fenwick Tree
// =============================================================================

interface SizeCache {
  /** Fenwick tree for O(log n) operations */
  tree: FenwickTree;
  /** Map of index -> measured size (for tracking which items are measured) */
  measured: Set<number>;
  /** Default size for unmeasured items */
  defaultSize: number;
  /** Total count of items */
  totalCount: number;
  /** Version number for cache invalidation */
  version: number;
}

function createSizeCache(defaultSize: number, totalCount: number): SizeCache {
  return {
    tree: new FenwickTree(Math.max(1, totalCount), defaultSize),
    measured: new Set(),
    defaultSize,
    totalCount,
    version: 0,
  };
}

/** Get size for an index - O(1) */
function getSizeForIndex(cache: SizeCache, index: number): number {
  return cache.tree.get(index) || cache.defaultSize;
}

/** Calculate offset for an index - O(log n) using Fenwick tree */
function getOffsetForIndex(cache: SizeCache, index: number, fixedSize?: number): number {
  if (index <= 0) return 0;

  // Fast path for fixed size - O(1)
  if (fixedSize !== undefined) {
    return index * fixedSize;
  }

  // Use Fenwick tree prefix sum - O(log n)
  return cache.tree.prefixSum(index - 1);
}

/** Find the index at a given scroll offset - O(log² n) using Fenwick tree binary search */
function getIndexAtOffset(cache: SizeCache, targetOffset: number, fixedSize?: number): number {
  if (targetOffset <= 0) return 0;
  if (cache.totalCount === 0) return 0;

  // Fast path for fixed size - O(1)
  if (fixedSize !== undefined) {
    return Math.min(Math.floor(targetOffset / fixedSize), cache.totalCount - 1);
  }

  // Use Fenwick tree binary search - O(log² n)
  return cache.tree.findIndex(targetOffset);
}

/** Get total size - O(log n) for variable, O(1) for fixed */
function getTotalSize(cache: SizeCache, fixedSize?: number): number {
  if (fixedSize !== undefined) {
    return cache.totalCount * fixedSize;
  }
  return cache.tree.totalSum();
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
  const [endReachedFired, setEndReachedFired] = createSignal(false);
  const [startReachedFired, setStartReachedFired] = createSignal(false);

  let scrollingTimer: ReturnType<typeof setTimeout> | null = null;

  // Update when totalCount changes
  createEffect(() => {
    const count = options.totalCount();
    const estimatedSize = options.getEstimatedSize();

    setSizeCache((prev) => {
      if (prev.totalCount !== count || prev.defaultSize !== estimatedSize) {
        // Reset edge-reached flags when data changes to allow new fetches
        if (count !== prev.totalCount) {
          setEndReachedFired(false);
          setStartReachedFired(false);
        }

        // Resize the Fenwick tree
        prev.tree.resize(Math.max(1, count), estimatedSize);

        // Remove measurements for items beyond new count
        if (count < prev.totalCount) {
          for (const index of prev.measured) {
            if (index >= count) {
              prev.measured.delete(index);
            }
          }
        }

        return {
          tree: prev.tree,
          measured: prev.measured,
          defaultSize: estimatedSize,
          totalCount: count,
          version: prev.version + 1,
        };
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

  // Compare two ListItem arrays - only compare indices to avoid cascading updates
  // when items are measured. Offsets/sizes are recalculated but don't trigger
  // component recreation since only the visible item indices matter for rendering.
  const itemsEqual = (prev: ListItem[], next: ListItem[]): boolean => {
    if (prev.length !== next.length) return false;
    for (let i = 0; i < prev.length; i++) {
      if (prev[i].index !== next[i].index) {
        return false;
      }
    }
    return true;
  };

  // Calculate visible items - optimized for fixed size
  // Uses custom equality check to avoid unnecessary updates when items haven't changed
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
  }, undefined, { equals: itemsEqual });

  // Calculate offsetTop directly from cache to ensure correct positioning
  // even when visibleItems memo doesn't update (due to index-only comparison)
  const offsetTop = createMemo(() => {
    const items = visibleItems();
    if (items.length === 0) return 0;
    const cache = sizeCache();
    const fixedSize = options.getFixedSize?.();
    return getOffsetForIndex(cache, items[0].index, fixedSize);
  });

  // Calculate offsetBottom directly from cache
  const offsetBottom = createMemo(() => {
    const items = visibleItems();
    const total = totalSize();
    if (items.length === 0) return total;
    const lastItem = items[items.length - 1];
    const cache = sizeCache();
    const fixedSize = options.getFixedSize?.();
    const lastOffset = getOffsetForIndex(cache, lastItem.index, fixedSize);
    const lastSize = fixedSize ?? getSizeForIndex(cache, lastItem.index);
    return Math.max(0, total - lastOffset - lastSize);
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

      // Reset end reached flag when leaving bottom
      if (!atBottom) {
        setEndReachedFired(false);
      }
    }

    if (atTop !== prevAtTop()) {
      setPrevAtTop(atTop);
      options.onAtTopChange?.(atTop);

      // Reset start reached flag when leaving top
      if (!atTop) {
        setStartReachedFired(false);
      }
    }

    // End/start reached callbacks - fire only once until user scrolls away
    const items = visibleItems();
    if (items.length > 0 && atBottom && !endReachedFired()) {
      const lastItem = items[items.length - 1];
      if (lastItem.index === options.totalCount() - 1) {
        setEndReachedFired(true);
        options.onEndReached?.(lastItem.index);
      }
    }

    if (items.length > 0 && atTop && !startReachedFired()) {
      const firstItem = items[0];
      if (firstItem.index === 0) {
        setStartReachedFired(true);
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

  // Measure item - O(log n) update using Fenwick tree
  const measureItem = (index: number, size: number) => {
    setSizeCache((prev) => {
      const currentSize = prev.tree.get(index);

      // Only update if size actually changed
      if (currentSize === size) {
        return prev;
      }

      // Update the Fenwick tree - O(log n)
      prev.tree.update(index, size);
      prev.measured.add(index);

      // Return new object to trigger reactivity
      return {
        tree: prev.tree,
        measured: prev.measured,
        defaultSize: prev.defaultSize,
        totalCount: prev.totalCount,
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
