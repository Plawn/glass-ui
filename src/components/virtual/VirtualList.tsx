import {
  type Component,
  For,
  type JSX,
  Show,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import type { ListItem, VirtualHandle, VirtualListProps } from './types';
import { useVirtualizer } from './useVirtualizer';

// =============================================================================
// DEFAULT COMPONENTS
// =============================================================================

const DefaultScroller: Component<{
  ref: (el: HTMLDivElement) => void;
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <div
    ref={props.ref}
    style={props.style}
    class="glass-card rounded-xl overflow-hidden scrollbar-thin"
    data-virtual-scroller
  >
    {props.children}
  </div>
);

// =============================================================================
// ITEM WRAPPER WITH SIZE MEASUREMENT
// =============================================================================

interface ItemWrapperProps<D, C> {
  index: number;
  getOffset: () => number;
  getSize: () => number;
  isVisible: () => boolean;
  data?: readonly D[];
  context?: C;
  itemContent: VirtualListProps<D, C>['itemContent'];
  measureItem: (index: number, size: number) => void;
  /** Shared observer owned by the list — one instance for all items */
  observer?: ResizeObserver;
  firstItemIndex: number;
  fixedItemHeight?: number;
}

function ItemWrapper<D, C>(props: Readonly<ItemWrapperProps<D, C>>) {
  let itemRef: HTMLDivElement | undefined;

  const itemData = createMemo(() => {
    return props.data?.[props.index] as D;
  });

  // Measure item size on mount and when content changes.
  // The shared ResizeObserver fires once on observe(), which covers the
  // initial measurement; the rAF path is only a fallback for environments
  // without ResizeObserver.
  onMount(() => {
    if (props.fixedItemHeight !== undefined || !itemRef) {
      return;
    }

    if (props.observer) {
      const el = itemRef;
      props.observer.observe(el);
      onCleanup(() => props.observer?.unobserve(el));
    } else {
      requestAnimationFrame(() => {
        if (itemRef) {
          const height = itemRef.offsetHeight;
          if (height > 0) {
            props.measureItem(props.index, height);
          }
        }
      });
    }
  });

  // Style computed reactively
  const itemStyle = createMemo(
    (): JSX.CSSProperties => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: `translateY(${props.getOffset()}px)`,
      visibility: props.isVisible() ? 'visible' : 'hidden',
      'pointer-events': props.isVisible() ? 'auto' : 'none',
      'overflow-anchor': 'none',
    }),
  );

  return (
    <div
      ref={itemRef}
      data-index={props.index}
      data-known-size={props.getSize()}
      style={itemStyle()}
    >
      {props.itemContent(
        props.index + props.firstItemIndex,
        itemData(),
        props.context as C,
      )}
    </div>
  );
}

// =============================================================================
// VIRTUAL LIST COMPONENT
// =============================================================================

export function VirtualList<D = unknown, C = unknown>(
  props: VirtualListProps<D, C>,
): JSX.Element {
  // --- Use signal for scroller ref to ensure reactivity ---
  const [scrollerRef, setScrollerRef] = createSignal<
    HTMLDivElement | undefined
  >(undefined);

  // --- Stable list of cached indices (numbers are compared by value in For) ---
  const [cachedIndices, setCachedIndices] = createSignal<number[]>([]);

  // Maximum number of items to keep in cache (prevents memory issues)
  const MAX_CACHE_SIZE = 100;

  // --- Computed props ---
  const totalCount = createMemo(
    () => props.totalCount ?? props.data?.length ?? 0,
  );
  const defaultItemHeight = createMemo(
    () => props.defaultItemHeight ?? props.fixedItemHeight ?? 50,
  );
  const fixedItemHeight = createMemo(() => props.fixedItemHeight);
  const overscan = createMemo(() => props.overscan ?? 5);
  const firstItemIndex = createMemo(() => props.firstItemIndex ?? 0);
  const atBottomThreshold = createMemo(() => props.atBottomThreshold ?? 4);
  const atTopThreshold = createMemo(() => props.atTopThreshold ?? 0);

  const increaseViewportBy = createMemo(
    (): number | { top: number; bottom: number } => {
      const val = props.increaseViewportBy;
      if (!val) {
        return 0;
      }
      if (typeof val === 'number') {
        return val;
      }
      return val;
    },
  );

  // --- Virtualizer ---
  const virtualizer = useVirtualizer({
    totalCount,
    getEstimatedSize: defaultItemHeight,
    getFixedSize: () => fixedItemHeight(),
    overscan: () => overscan(),
    increaseViewportBy: () => increaseViewportBy(),
    getScrollContainer: scrollerRef,
    onRangeChanged: props.rangeChanged,
    onScrollingChanged: props.isScrolling,
    onTotalSizeChanged: props.totalListHeightChanged,
    atBottomThreshold,
    atTopThreshold,
    onAtBottomChange: props.atBottomStateChange,
    onAtTopChange: props.atTopStateChange,
    onEndReached: props.endReached,
    onStartReached: props.startReached,
  });

  // --- Clean cache when totalCount changes ---
  // This prevents stale indices pointing to non-existent data
  let prevTotalCount = totalCount();
  createEffect(() => {
    const count = totalCount();

    // If totalCount decreased, remove invalid indices from cache
    if (count < prevTotalCount) {
      setCachedIndices((prev) => {
        const filtered = prev.filter((index) => index < count);
        if (filtered.length === prev.length) {
          return prev;
        }
        return filtered;
      });
    }

    // If totalCount changed significantly (e.g., data replaced), reset cache
    // This handles cases like filtering or data reload
    if (Math.abs(count - prevTotalCount) > MAX_CACHE_SIZE) {
      setCachedIndices([]);
    }

    prevTotalCount = count;
  });

  // --- Update cached indices when visible items change ---
  createEffect(() => {
    const items = virtualizer.items();
    const range = virtualizer.range();

    setCachedIndices((prev) => {
      const indexSet = new Set(prev);

      // Add new visible indices
      for (const item of items) {
        indexSet.add(item.index);
      }

      // Convert to array
      let indices = Array.from(indexSet);

      // Prune if too large - keep items closest to current viewport
      if (indices.length > MAX_CACHE_SIZE) {
        const centerIndex = Math.floor((range.startIndex + range.endIndex) / 2);
        indices.sort(
          (a, b) => Math.abs(a - centerIndex) - Math.abs(b - centerIndex),
        );
        indices = indices.slice(0, MAX_CACHE_SIZE);
      }

      // Sort by index for stable rendering order
      indices.sort((a, b) => a - b);

      // Only update if the array actually changed
      if (
        indices.length === prev.length &&
        indices.every((v, i) => v === prev[i])
      ) {
        return prev;
      }

      return indices;
    });
  });

  // --- Shared ResizeObserver for all items ---
  // Reading entry.borderBoxSize avoids the forced layout that offsetHeight triggers.
  const itemObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver((entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const index = Number(el.dataset.index);
            if (!Number.isInteger(index)) {
              continue;
            }
            const size = entry.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight;
            if (size > 0) {
              virtualizer.measureItem(index, size);
            }
          }
        })
      : undefined;

  onCleanup(() => itemObserver?.disconnect());

  // --- Item lookup by index (O(1) instead of items().find per getter) ---
  const itemByIndex = createMemo(() => {
    const map = new Map<number, ListItem>();
    for (const item of virtualizer.items()) {
      map.set(item.index, item);
    }
    return map;
  });

  const getItemInfo = (index: number) => itemByIndex().get(index);

  // --- Check if an index is currently visible ---
  const isIndexVisible = (index: number): boolean => {
    const range = virtualizer.range();
    return index >= range.startIndex && index <= range.endIndex;
  };

  // --- Expose handle ---
  createEffect(() => {
    if (props.ref) {
      const handle: VirtualHandle = {
        scrollToIndex: (location) => {
          if (typeof location === 'number') {
            virtualizer.scrollToIndex(location);
          } else {
            virtualizer.scrollToIndex(location.index, {
              align: location.align,
              behavior: location.behavior,
            });
          }
        },
        scrollTo: virtualizer.scrollTo,
        scrollBy: virtualizer.scrollBy,
        getScrollTop: virtualizer.getScrollTop,
      };
      props.ref(handle);
    }
  });

  // --- Initial scroll ---
  onMount(() => {
    const scroller = scrollerRef();
    if (props.initialScrollTop !== undefined && scroller) {
      scroller.scrollTop = props.initialScrollTop;
    } else if (props.initialTopMostItemIndex !== undefined) {
      virtualizer.scrollToIndex(props.initialTopMostItemIndex);
    }
  });

  // --- Items rendered callback ---
  createEffect(() => {
    const items = virtualizer.items();
    if (props.itemsRendered) {
      props.itemsRendered(
        items.map((item) => ({
          index: item.index,
          offset: item.offset,
          size: item.size,
          data: props.data?.[item.index],
        })) as ListItem<D>[],
      );
    }
  });

  // --- Components ---
  const Scroller = props.Scroller ?? DefaultScroller;

  // --- Styles ---
  const scrollerStyle = createMemo(
    (): JSX.CSSProperties => ({
      height: '100%',
      'overflow-y': 'auto',
      position: 'relative',
      outline: 'none',
      '-webkit-overflow-scrolling': 'touch',
      ...props.style,
    }),
  );

  // Container with total height for scroll
  const containerStyle = createMemo(
    (): JSX.CSSProperties => ({
      height: `${virtualizer.totalSize()}px`,
      position: 'relative',
      width: '100%',
    }),
  );

  // --- Render ---
  return (
    <Scroller ref={setScrollerRef} style={scrollerStyle()}>
      <Show when={props.Header}>
        <div data-virtual-header>{props.Header?.()}</div>
      </Show>

      <Show
        when={totalCount() > 0}
        fallback={
          <Show when={props.EmptyPlaceholder}>
            {props.EmptyPlaceholder?.()}
          </Show>
        }
      >
        {/* Container with total height for scroll */}
        <div style={containerStyle()}>
          {/* For uses value comparison for primitives (numbers) */}
          {/* So the same index will keep the same component instance */}
          <For each={cachedIndices()}>
            {(index) => {
              // These are reactive getters that will update when virtualizer changes
              const getOffset = () => {
                const info = getItemInfo(index);
                if (info) {
                  return info.offset;
                }
                // Fallback: estimate offset based on default height
                return index * defaultItemHeight();
              };

              const getSize = () => {
                const info = getItemInfo(index);
                return info?.size ?? defaultItemHeight();
              };

              const isVisible = () => isIndexVisible(index);

              return (
                <ItemWrapper
                  index={index}
                  getOffset={getOffset}
                  getSize={getSize}
                  isVisible={isVisible}
                  data={props.data}
                  context={props.context}
                  itemContent={props.itemContent}
                  measureItem={virtualizer.measureItem}
                  observer={itemObserver}
                  firstItemIndex={firstItemIndex()}
                  fixedItemHeight={fixedItemHeight()}
                />
              );
            }}
          </For>
        </div>
      </Show>

      <Show when={props.Footer}>
        <div data-virtual-footer>{props.Footer?.()}</div>
      </Show>
    </Scroller>
  );
}
