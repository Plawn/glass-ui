import {
  batch,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  untrack,
} from 'solid-js';
import type {
  ListItem,
  ListRange,
  ScrollAlignment,
  ScrollBehavior,
} from './types';

// =============================================================================
// CORE MATH: OPTIMIZED FENWICK TREE
// =============================================================================

class FenwickTree {
  private tree: Float64Array;
  private _size: number;

  constructor(
    size: number,
    defaultValue: number,
    initialSizes?: Map<number, number>,
  ) {
    this._size = size;
    this.tree = new Float64Array(size + 1);

    // 1. Initialize raw values (O(N))
    // If we have specific sizes, use them. Otherwise use default.
    if (initialSizes && initialSizes.size > 0) {
      for (let i = 0; i < size; i++) {
        this.tree[i + 1] = initialSizes.get(i) ?? defaultValue;
      }
    } else {
      for (let i = 1; i <= size; i++) {
        this.tree[i] = defaultValue;
      }
    }

    // 2. Propagate prefix sums in-place (O(N))
    for (let i = 1; i <= size; i++) {
      const parent = i + (i & -i);
      if (parent <= size) {
        this.tree[parent] += this.tree[i];
      }
    }
  }

  update(index: number, delta: number): void {
    let i = index + 1;
    while (i <= this._size) {
      this.tree[i] += delta;
      i += i & -i;
    }
  }

  prefixSum(index: number): number {
    let sum = 0;
    let i = index + 1;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & -i;
    }
    return sum;
  }

  totalSum(): number {
    return this.prefixSum(this._size - 1);
  }

  // Binary Lifting: O(log N) search
  findIndex(targetOffset: number): number {
    if (targetOffset <= 0) {
      return 0;
    }
    let idx = 0;
    let bitMask = 1;
    // Find largest power of 2 <= size
    while (bitMask <= this._size) {
      bitMask <<= 1;
    }
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
}

// =============================================================================
// TYPES
// =============================================================================

interface SizeCache {
  tree: FenwickTree;
  sizes: Map<number, number>;
  defaultSize: number;
  totalCount: number;
  version: number;
}

export interface VirtualizerOptions {
  totalCount: () => number;
  getEstimatedSize: () => number;
  getFixedSize?: () => number | undefined;
  overscan?: () => number;
  increaseViewportBy?: () => number | { top: number; bottom: number };
  getScrollContainer: () => HTMLElement | null | undefined;
  horizontal?: boolean;
  /** Threshold for considering "at bottom" (pixels from bottom) */
  atBottomThreshold?: () => number;
  /** Threshold for considering "at top" (pixels from top) */
  atTopThreshold?: () => number;
  onRangeChanged?: (range: ListRange) => void;
  onScrollingChanged?: (isScrolling: boolean) => void;
  onTotalSizeChanged?: (size: number) => void;
  onAtBottomChange?: (atBottom: boolean) => void;
  onAtTopChange?: (atTop: boolean) => void;
  onEndReached?: (index: number) => void;
  onStartReached?: (index: number) => void;
}

/** Return type of useVirtualizer hook */
export interface VirtualizerResult {
  items: () => ListItem[];
  totalSize: () => number;
  offsetTop: () => number;
  offsetBottom: () => number;
  isScrolling: () => boolean;
  measureItem: (index: number, size: number) => void;
  range: () => { startIndex: number; endIndex: number };
  getScrollTop: () => number;
  scrollToIndex: (
    index: number,
    opts?: { align?: ScrollAlignment; behavior?: ScrollBehavior },
  ) => void;
  scrollTo: (offset: number) => void;
  scrollBy: (delta: number) => void;
}

// =============================================================================
// HOOK
// =============================================================================

export function useVirtualizer(options: VirtualizerOptions) {
  // STATE
  const [scrollTop, setScrollTop] = createSignal(0);
  const [viewportSize, setViewportSize] = createSignal(0);
  const [isScrolling, setIsScrolling] = createSignal(false);

  // INTERNAL REFS
  let ignoreNextScrollEvent = false;
  let scrollTimeout: number | undefined;
  let itemRefCache = new Map<number, ListItem>();

  const [sizeCache, setSizeCache] = createSignal<SizeCache>({
    tree: new FenwickTree(
      Math.max(1, options.totalCount()),
      options.getEstimatedSize(),
    ),
    sizes: new Map(),
    defaultSize: options.getEstimatedSize(),
    totalCount: options.totalCount(),
    version: 0,
  });

  // 1. DATA SYNC (Total Count / Estimated Size)
  createEffect(() => {
    const count = options.totalCount();
    const estSize = options.getEstimatedSize();

    setSizeCache((prev) => {
      // Optimization: No-op if nothing relevant changed
      if (prev.totalCount === count && prev.defaultSize === estSize) {
        return prev;
      }

      // Filter out sizes for indices that no longer exist
      const newSizes = new Map<number, number>();
      if (prev.sizes.size > 0) {
        for (const [idx, size] of prev.sizes) {
          if (idx < count) {
            newSizes.set(idx, size);
          }
        }
      }

      // Bulk Load Tree - O(N)
      const newTree = new FenwickTree(Math.max(1, count), estSize, newSizes);

      return {
        tree: newTree,
        sizes: newSizes,
        defaultSize: estSize,
        totalCount: count,
        version: prev.version + 1,
      };
    });
  });

  // 2. VISIBLE INDICES
  const visibleRange = createMemo(() => {
    const cache = sizeCache();
    const scroll = scrollTop();
    const viewport = viewportSize();
    const fixed = options.getFixedSize?.();

    cache.version; // dependency

    if (cache.totalCount === 0 || viewport === 0) {
      return { start: 0, end: -1 };
    }

    const startEdge = Math.max(0, scroll);
    const endEdge = scroll + viewport;
    const os = options.overscan?.() ?? 5;

    let startIndex: number;
    let endIndex: number;

    if (fixed) {
      startIndex = Math.floor(startEdge / fixed);
      endIndex = Math.ceil(endEdge / fixed);
    } else {
      startIndex = cache.tree.findIndex(startEdge);
      endIndex = cache.tree.findIndex(endEdge);
    }

    return {
      start: Math.max(0, startIndex - os),
      end: Math.min(cache.totalCount - 1, endIndex + os),
    };
  });

  // 3. ITEMS GENERATION (Stable Identity)
  const visibleItems = createMemo(() => {
    const { start, end } = visibleRange();
    const cache = sizeCache();
    const fixed = options.getFixedSize?.();

    if (start > end) {
      return [];
    }

    const items: ListItem[] = new Array(end - start + 1);
    const nextRefCache = new Map<number, ListItem>();

    let currentOffset = fixed ? start * fixed : cache.tree.prefixSum(start - 1);

    for (let i = start; i <= end; i++) {
      const size = fixed ?? cache.sizes.get(i) ?? cache.defaultSize;

      // Double Buffer: If exact same item exists in previous frame, reuse reference
      const cached = itemRefCache.get(i);
      if (cached && cached.offset === currentOffset && cached.size === size) {
        items[i - start] = cached;
        nextRefCache.set(i, cached);
      } else {
        const newItem = { index: i, offset: currentOffset, size };
        items[i - start] = newItem;
        nextRefCache.set(i, newItem);
      }

      currentOffset += size;
    }

    itemRefCache = nextRefCache;
    return items;
  });

  // 4. HELPERS
  const offsetTop = createMemo(() => {
    const items = visibleItems();
    return items.length > 0 ? items[0].offset : 0;
  });

  const offsetBottom = createMemo(() => {
    const items = visibleItems();
    if (items.length === 0) {
      return 0;
    }
    const last = items[items.length - 1];
    // Read total size from tree to ensure it's in sync with items
    const fixed = options.getFixedSize?.();
    const total = fixed
      ? options.totalCount() * fixed
      : sizeCache().tree.totalSum();
    return Math.max(0, total - (last.offset + last.size));
  });

  const totalSize = createMemo(() => {
    sizeCache().version;
    const fixed = options.getFixedSize?.();
    return fixed ? options.totalCount() * fixed : sizeCache().tree.totalSum();
  });

  // 5a. AT-BOTTOM / AT-TOP DETECTION
  let prevAtBottom: boolean | undefined;
  let prevAtTop: boolean | undefined;

  createEffect(() => {
    const scroll = scrollTop();
    const viewport = viewportSize();
    const total = totalSize();

    if (viewport === 0) {
      return;
    }

    const bottomThreshold = options.atBottomThreshold?.() ?? 4;
    const topThreshold = options.atTopThreshold?.() ?? 0;

    const distanceFromBottom = total - scroll - viewport;
    const atBottom = distanceFromBottom <= bottomThreshold;
    const atTop = scroll <= topThreshold;

    const bottomChanged = prevAtBottom !== atBottom;
    const topChanged = prevAtTop !== atTop;

    if (bottomChanged) {
      prevAtBottom = atBottom;
      options.onAtBottomChange?.(atBottom);
    }

    if (topChanged) {
      prevAtTop = atTop;
      options.onAtTopChange?.(atTop);

      // Start reached (only on transition to at-top)
      if (atTop && options.onStartReached) {
        const { start } = untrack(visibleRange);
        options.onStartReached(start);
      }
    }
  });

  // 5b. OBSERVERS
  createEffect(() => {
    const container = options.getScrollContainer();
    if (!container) {
      return;
    }

    // ResizeObserver
    const ro = new ResizeObserver((entries) => {
      // Wrap in animation frame to prevent "ResizeObserver loop limit exceeded"
      requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        const entry = entries[0];
        const size = options.horizontal
          ? entry.contentRect.width
          : entry.contentRect.height;
        setViewportSize(size);
      });
    });
    ro.observe(container);

    // Scroll Handler
    const onScroll = () => {
      if (ignoreNextScrollEvent) {
        ignoreNextScrollEvent = false;
        return;
      }

      const current = options.horizontal
        ? container.scrollLeft
        : container.scrollTop;
      setScrollTop(current);

      if (!isScrolling()) {
        setIsScrolling(true);
        options.onScrollingChanged?.(true);
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = window.setTimeout(() => {
        setIsScrolling(false);
        options.onScrollingChanged?.(false);
      }, 150);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    // Initial measure
    onScroll();

    onCleanup(() => {
      ro.disconnect();
      container.removeEventListener('scroll', onScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    });
  });

  // 6. DYNAMIC MEASUREMENT
  const measureItem = (index: number, size: number) => {
    const fixed = options.getFixedSize?.();
    if (fixed) {
      return;
    }

    const container = options.getScrollContainer();
    // Use untrack to avoid subscription loops
    const { start } = untrack(visibleRange);

    batch(() => {
      setSizeCache((prev) => {
        const currentSize = prev.sizes.get(index) ?? prev.defaultSize;
        if (Math.abs(currentSize - size) < 0.5) {
          return prev;
        }

        const delta = size - currentSize;

        prev.tree.update(index, delta);
        prev.sizes.set(index, size);

        // Scroll Anchoring
        if (container && index < start) {
          const currentScroll = options.horizontal
            ? container.scrollLeft
            : container.scrollTop;
          const newScroll = currentScroll + delta;

          ignoreNextScrollEvent = true;
          if (options.horizontal) {
            container.scrollLeft = newScroll;
          } else {
            container.scrollTop = newScroll;
          }
          setScrollTop(newScroll);
        }

        return { ...prev, version: prev.version + 1 };
      });
    });
  };

  createEffect(
    on(visibleRange, (range) => {
      options.onRangeChanged?.({
        startIndex: range.start,
        endIndex: range.end,
      });
      if (range.end >= options.totalCount() - 1 && range.end > 0) {
        options.onEndReached?.(range.end);
      }
    }),
  );

  // 7. PUBLIC API
  return {
    items: visibleItems,
    totalSize,
    offsetTop,
    offsetBottom,
    isScrolling,
    measureItem,
    range: () => {
      const { start, end } = visibleRange();
      return { startIndex: start, endIndex: end };
    },
    getScrollTop: () => scrollTop(),
    scrollToIndex: (
      index: number,
      opts?: { align?: ScrollAlignment; behavior?: ScrollBehavior },
    ) => {
      const container = options.getScrollContainer();
      if (!container) {
        return;
      }

      const cache = untrack(sizeCache);
      const fixed = options.getFixedSize?.();

      const offset = fixed ? index * fixed : cache.tree.prefixSum(index - 1);
      const size = fixed
        ? fixed
        : (cache.sizes.get(index) ?? cache.defaultSize);
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
      const scrollOpt = options.horizontal
        ? { left: target, behavior }
        : { top: target, behavior };
      container.scrollTo(scrollOpt);
    },
    scrollTo: (offset: number) => {
      const container = options.getScrollContainer();
      if (options.horizontal) {
        container?.scrollTo({ left: offset });
      } else {
        container?.scrollTo({ top: offset });
      }
    },
    scrollBy: (delta: number) => {
      const container = options.getScrollContainer();
      if (options.horizontal) {
        container?.scrollBy({ left: delta });
      } else {
        container?.scrollBy({ top: delta });
      }
    },
  };
}
