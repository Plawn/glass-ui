import { createSignal, createMemo, createEffect, onCleanup } from 'solid-js';
import type { ListItem, ListRange, ScrollAlignment, ScrollBehavior } from './types';

// =============================================================================
// SIZE STATE MANAGEMENT - Simple and predictable
// =============================================================================

interface SizeState {
  /** Map of index -> measured size */
  sizes: Map<number, number>;
  /** Default size for unmeasured items (never changes after init) */
  defaultSize: number;
  /** Total count of items */
  totalCount: number;
}

function createSizeState(defaultSize: number, totalCount: number): SizeState {
  return {
    sizes: new Map(),
    defaultSize,
    totalCount,
  };
}

/**
 * Get size for an index - uses measured size if available, otherwise default
 */
function getSizeForIndex(state: SizeState, index: number): number {
  return state.sizes.get(index) ?? state.defaultSize;
}

/**
 * Calculate offset for an index by summing all sizes before it
 */
function getOffsetForIndex(state: SizeState, index: number): number {
  if (index <= 0) return 0;
  
  const clampedIndex = Math.min(index, state.totalCount);
  let offset = 0;
  
  for (let i = 0; i < clampedIndex; i++) {
    offset += getSizeForIndex(state, i);
  }
  
  return offset;
}

/**
 * Calculate total scroll height by summing all sizes
 */
function getTotalSize(state: SizeState): number {
  if (state.totalCount === 0) return 0;
  
  let total = 0;
  for (let i = 0; i < state.totalCount; i++) {
    total += getSizeForIndex(state, i);
  }
  return total;
}

/**
 * Find the index at a given scroll offset
 */
function getIndexAtOffset(state: SizeState, targetOffset: number): number {
  if (targetOffset <= 0) return 0;
  if (state.totalCount === 0) return 0;
  
  let offset = 0;
  
  for (let i = 0; i < state.totalCount; i++) {
    const size = getSizeForIndex(state, i);
    if (offset + size > targetOffset) {
      return i;
    }
    offset += size;
  }
  
  return state.totalCount - 1;
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
  const [sizeState, setSizeState] = createSignal<SizeState>(
    createSizeState(options.getEstimatedSize(), options.totalCount())
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
    
    setSizeState((prev) => {
      if (prev.totalCount !== count || prev.defaultSize !== estimatedSize) {
        const newSizes = new Map(prev.sizes);
        
        // Remove measurements for items beyond new count
        if (count < prev.totalCount) {
          for (const index of prev.sizes.keys()) {
            if (index >= count) {
              newSizes.delete(index);
            }
          }
        }
        
        return {
          sizes: newSizes,
          defaultSize: estimatedSize,
          totalCount: count,
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
  
  // Total size - recalculated when sizes change
  const totalSize = createMemo(() => {
    const state = sizeState();
    const fixedSize = options.getFixedSize?.();
    
    if (fixedSize !== undefined) {
      return state.totalCount * fixedSize;
    }
    
    return getTotalSize(state);
  });
  
  // Calculate visible items
  const visibleItems = createMemo((): ListItem[] => {
    const state = sizeState();
    const count = state.totalCount;
    
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
    
    let startIndex: number;
    let endIndex: number;
    
    if (fixedSize !== undefined) {
      startIndex = Math.floor(startOffset / fixedSize);
      endIndex = Math.ceil(endOffset / fixedSize);
    } else {
      startIndex = getIndexAtOffset(state, startOffset);
      endIndex = getIndexAtOffset(state, endOffset);
    }
    
    // Apply overscan
    startIndex = Math.max(0, startIndex - os);
    endIndex = Math.min(count, endIndex + os + 1);
    
    const items: ListItem[] = [];
    
    if (fixedSize !== undefined) {
      for (let i = startIndex; i < endIndex; i++) {
        items.push({
          index: i,
          offset: i * fixedSize,
          size: fixedSize,
        });
      }
    } else {
      // Calculate offset for first visible item
      let offset = getOffsetForIndex(state, startIndex);
      
      for (let i = startIndex; i < endIndex; i++) {
        const size = getSizeForIndex(state, i);
        items.push({ index: i, offset, size });
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
      // clientHeight can return 0 for elements not yet in visible viewport
      const rect = container.getBoundingClientRect();
      const size = options.horizontal ? rect.width : rect.height;
      if (size > 0) {
        setViewportSize(size);
        // Clear retry timer once we have a valid size
        if (retryTimer) {
          clearTimeout(retryTimer);
          retryTimer = null;
        }
      } else if (retryCount < MAX_RETRIES) {
        // If size is 0, retry after a short delay (CSS might not be loaded yet)
        retryCount++;
        retryTimer = setTimeout(() => {
          requestAnimationFrame(measureViewport);
        }, 50 * retryCount); // Exponential backoff: 50ms, 100ms, 150ms, etc.
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

    // Initial measurement - use requestAnimationFrame to ensure DOM is ready
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
  
  // Measure item - updates the size map
  const measureItem = (index: number, size: number) => {
    setSizeState((prev) => {
      const currentSize = prev.sizes.get(index);
      
      // Only update if size actually changed
      if (currentSize === size) {
        return prev;
      }
      
      const newSizes = new Map(prev.sizes);
      newSizes.set(index, size);
      
      return {
        ...prev,
        sizes: newSizes,
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
      
      const state = sizeState();
      const viewport = viewportSize();
      const fixedSize = options.getFixedSize?.();
      
      let itemOffset: number;
      let itemSize: number;
      
      if (fixedSize !== undefined) {
        itemOffset = index * fixedSize;
        itemSize = fixedSize;
      } else {
        itemOffset = getOffsetForIndex(state, index);
        itemSize = getSizeForIndex(state, index);
      }
      
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
