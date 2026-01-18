import { 
  createSignal, 
  createMemo, 
  createEffect, 
  onCleanup, 
  batch, 
  untrack,
  on
} from 'solid-js';
import type { ListItem, ListRange, ScrollAlignment, ScrollBehavior } from './types';

// =============================================================================
// MATH CORE: FENWICK TREE + BINARY LIFTING (Unchanged - It's optimal)
// =============================================================================

class FenwickTree {
  private tree: Float64Array;
  private _size: number;

  constructor(size: number, defaultValue: number) {
    this._size = size;
    this.tree = new Float64Array(size + 1);
    for (let i = 1; i <= size; i++) this.tree[i] = defaultValue;
    for (let i = 1; i <= size; i++) {
      const parent = i + (i & -i);
      if (parent <= size) this.tree[parent] += this.tree[i];
    }
  }

  update(index: number, delta: number): void {
    let i = index + 1;
    while (i <= this._size) {
      this.tree[i] += delta;
      i += i & (-i);
    }
  }

  prefixSum(index: number): number {
    let sum = 0;
    let i = index + 1;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i);
    }
    return sum;
  }

  totalSum(): number {
    return this.prefixSum(this._size - 1);
  }

  findIndex(targetOffset: number): number {
    if (targetOffset <= 0) return 0;
    let idx = 0;
    let bitMask = 1;
    while (bitMask <= this._size) bitMask <<= 1;
    bitMask >>= 1;

    while (bitMask > 0) {
      const tIdx = idx + bitMask;
      if (tIdx <= this._size && targetOffset >= this.tree[tIdx]) {
        idx = tIdx;
        targetOffset -= this.tree[idx];
      }
      bitMask >>= 1;
    }
    return Math.min(idx, this._size - 1);
  }

  resize(newSize: number, defaultValue: number): void {
    if (newSize === this._size) return;
    const newTree = new FenwickTree(newSize, defaultValue);
    const copyLimit = Math.min(this._size, newSize);
    
    // Efficiently reconstruct logic would go here
    // For simplicity in resize, we accept a small rebuild cost
    // as resizes (total count changes) are rare compared to scrolls.
    // In a perfect world, we copy the raw array but resizing a BIT 
    // technically requires re-propagating sums if dimensions change drastically.
    // Re-instantiating is O(N) which is fine.
    
    this.tree = newTree.tree;
    this._size = newSize;
  }
}

// =============================================================================
// TYPES
// =============================================================================

interface SizeCache {
  tree: FenwickTree;
  sizes: Map<number, number>; 
  defaultSize: number;
  totalCount: number;
  version: number; // Used to trigger fine-grained updates
}

export interface VirtualizerOptions {
  totalCount: () => number;
  getEstimatedSize: () => number;
  getFixedSize?: () => number | undefined;
  overscan?: () => number;
  getScrollContainer: () => HTMLElement | null | undefined;
  horizontal?: boolean;
  
  // Callbacks
  onRangeChanged?: (range: ListRange) => void;
  onScrollingChanged?: (isScrolling: boolean) => void;
  onEndReached?: (index: number) => void;
}

// =============================================================================
// VIRTUALIZER HOOK
// =============================================================================

export function useVirtualizer(options: VirtualizerOptions) {
  // 1. STATE
  const [scrollTop, setScrollTop] = createSignal(0);
  const [viewportSize, setViewportSize] = createSignal(0);
  const [isScrolling, setIsScrolling] = createSignal(false);
  
  // Internal mutable state for handling scroll correction loop
  let ignoreNextScrollEvent = false;
  let scrollTimeout: number | undefined;

  const [sizeCache, setSizeCache] = createSignal<SizeCache>({
    tree: new FenwickTree(Math.max(1, options.totalCount()), options.getEstimatedSize()),
    sizes: new Map(),
    defaultSize: options.getEstimatedSize(),
    totalCount: options.totalCount(),
    version: 0
  });

  // 2. CACHE & SIZE MANAGEMENT
  createEffect(() => {
    const count = options.totalCount();
    const estSize = options.getEstimatedSize();

    setSizeCache(prev => {
      if (prev.totalCount === count && prev.defaultSize === estSize) return prev;
      
      // Re-initialize if count changes drastically, or resize logic
      // Ideally we preserve measurements that are still valid
      const newTree = new FenwickTree(Math.max(1, count), estSize);
      
      // Migrate old measurements if possible
      const newSizes = new Map<number, number>();
      prev.sizes.forEach((size, index) => {
        if (index < count) {
          newSizes.set(index, size);
          newTree.update(index, size - estSize);
        }
      });

      return {
        tree: newTree,
        sizes: newSizes,
        defaultSize: estSize,
        totalCount: count,
        version: prev.version + 1
      };
    });
  });

  // 3. RANGE CALCULATION (Separated from Item Generation for Performance)
  // This calculates *which* indices are visible. It runs on every scroll frame.
  const visibleRange = createMemo(() => {
    const cache = sizeCache();
    const scroll = scrollTop();
    const viewport = viewportSize();
    const count = cache.totalCount;
    const fixed = options.getFixedSize?.();
    const os = options.overscan?.() ?? 5;

    // Dependency on version ensures we recalculate if a size changes
    cache.version; 

    if (count === 0 || viewport === 0) return { start: 0, end: -1 };

    const startEdge = Math.max(0, scroll);
    const endEdge = scroll + viewport;

    let startIndex: number, endIndex: number;

    if (fixed) {
      startIndex = Math.floor(startEdge / fixed);
      endIndex = Math.ceil(endEdge / fixed);
    } else {
      startIndex = cache.tree.findIndex(startEdge);
      endIndex = cache.tree.findIndex(endEdge);
    }

    return {
      start: Math.max(0, startIndex - os),
      end: Math.min(count - 1, endIndex + os)
    };
  });

  // 4. ITEM GENERATION (Stable Array Identity)
  // Only regenerates the array if the *indices* change or the *cache version* changes.
  // This prevents recreating 20 objects when you scroll 1px.
  const visibleItems = createMemo(() => {
    const { start, end } = visibleRange();
    const cache = sizeCache();
    const fixed = options.getFixedSize?.();

    if (start > end) return [];

    const items: ListItem[] = new Array(end - start + 1);
    
    if (fixed) {
      for (let i = start; i <= end; i++) {
        items[i - start] = {
          index: i,
          offset: i * fixed,
          size: fixed
        };
      }
    } else {
      let currentOffset = cache.tree.prefixSum(start - 1);
      for (let i = start; i <= end; i++) {
        const size = cache.sizes.get(i) ?? cache.defaultSize;
        items[i - start] = {
          index: i,
          offset: currentOffset,
          size: size
        };
        currentOffset += size;
      }
    }
    return items;
  });

  // 5. SCROLL OBSERVER
  createEffect(() => {
    const container = options.getScrollContainer();
    if (!container) return;

    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      const size = options.horizontal ? entry.contentRect.width : entry.contentRect.height;
      setViewportSize(size);
    });
    ro.observe(container);

    const onScroll = () => {
      // If we adjusted scroll programmatically (anchoring), ignore this event
      if (ignoreNextScrollEvent) {
        ignoreNextScrollEvent = false;
        return;
      }

      const current = options.horizontal ? container.scrollLeft : container.scrollTop;
      setScrollTop(current);
      
      if (!isScrolling()) {
        setIsScrolling(true);
        options.onScrollingChanged?.(true);
      }
      
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);
        options.onScrollingChanged?.(false);
      }, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial sync
    onScroll();

    onCleanup(() => {
      ro.disconnect();
      container.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    });
  });

  // 6. MEASUREMENT & SCROLL ANCHORING (Critical UX Feature)
  const measureItem = (index: number, size: number) => {
    const container = options.getScrollContainer();
    // We need untracked access to state to determine if we need to anchor
    const { start } = untrack(visibleRange);
    
    batch(() => {
      setSizeCache(prev => {
        const currentSize = prev.sizes.get(index) ?? prev.defaultSize;
        if (Math.abs(currentSize - size) < 0.5) return prev; // Ignore sub-pixel noise

        const delta = size - currentSize;
        
        // UPDATE TREE
        prev.tree.update(index, delta);
        prev.sizes.set(index, size);

        // SCROLL ANCHORING LOGIC
        // If the resized item is *above* our current view, the view was pushed down.
        // We must subtract the delta from scrollTop to keep the visible content stationary.
        // Or, more commonly, add delta to scrollTop to maintain the visual position relative to the document.
        if (container && index < start) {
           const currentScroll = options.horizontal ? container.scrollLeft : container.scrollTop;
           const newScroll = currentScroll + delta;
           
           // Set flag so the scroll listener doesn't trigger a re-render cycle
           ignoreNextScrollEvent = true;
           
           if (options.horizontal) container.scrollLeft = newScroll;
           else container.scrollTop = newScroll;
           
           // Update signal synchronously so calculations are correct for this frame
           setScrollTop(newScroll);
        }

        return { ...prev, version: prev.version + 1 };
      });
    });
  };

  // 7. EXTERNAL EVENTS
  createEffect(on(visibleRange, (range) => {
    options.onRangeChanged?.({ startIndex: range.start, endIndex: range.end });
    if (range.end >= options.totalCount() - 1 && range.end > 0) {
      options.onEndReached?.(range.end);
    }
  }));

  const totalSize = createMemo(() => {
    sizeCache().version; // subscribe
    const fixed = options.getFixedSize?.();
    if (fixed) return options.totalCount() * fixed;
    return sizeCache().tree.totalSum();
  });

  return {
    items: visibleItems,
    totalSize,
    isScrolling,
    range: () => {
      const { start, end } = visibleRange();
      return { startIndex: start, endIndex: end };
    },
    measureItem,
    
    scrollToIndex: (index: number, opts?: { align?: ScrollAlignment, behavior?: ScrollBehavior }) => {
      const container = options.getScrollContainer();
      if (!container) return;

      const cache = untrack(sizeCache);
      const fixed = options.getFixedSize?.();
      
      const offset = fixed ? index * fixed : cache.tree.prefixSum(index - 1);
      const size = fixed ? fixed : (cache.sizes.get(index) ?? cache.defaultSize);
      
      const viewport = untrack(viewportSize);
      const currentScroll = untrack(scrollTop);

      let target = offset;
      const align = opts?.align ?? 'auto';

      if (align === 'center') {
        target = offset - viewport / 2 + size / 2;
      } else if (align === 'end') {
        target = offset - viewport + size;
      } else if (align === 'auto') {
        if (offset < currentScroll) {
          target = offset;
        } else if (offset + size > currentScroll + viewport) {
          target = offset - viewport + size;
        } else {
          return; 
        }
      }

      const behavior = opts?.behavior ?? 'auto';
      
      if (options.horizontal) {
        container.scrollTo({ left: target, behavior });
      } else {
        container.scrollTo({ top: target, behavior });
      }
    },

    scrollTo: (offset: number) => {
      const container = options.getScrollContainer();
      if (options.horizontal) container?.scrollTo({ left: offset });
      else container?.scrollTo({ top: offset });
    }
  };
}