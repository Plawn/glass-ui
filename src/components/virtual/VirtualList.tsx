import { createMemo, createEffect, For, Show, onMount, type JSX, type Component } from 'solid-js';
import { useVirtualizer } from './useVirtualizer';
import type { VirtualListProps, VirtualHandle, ListItem } from './types';

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
    class="glass-card rounded-xl overflow-hidden"
    data-virtual-scroller
    tabIndex={0}
  >
    {props.children}
  </div>
);

const DefaultList: Component<{
  ref: (el: HTMLElement) => void;
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <div
    ref={props.ref}
    style={props.style}
    data-virtual-item-list
  >
    {props.children}
  </div>
);

// =============================================================================
// ITEM WRAPPER WITH SIZE MEASUREMENT
// =============================================================================

interface ItemWrapperProps<D, C> {
  item: ListItem<D>;
  data?: readonly D[];
  context?: C;
  itemContent: VirtualListProps<D, C>['itemContent'];
  measureItem: (index: number, size: number) => void;
  firstItemIndex: number;
  fixedItemHeight?: number;
}

function ItemWrapper<D, C>(props: ItemWrapperProps<D, C>) {
  let itemRef: HTMLDivElement | undefined;
  
  const itemData = createMemo(() => {
    const index = props.item.index;
    return props.data?.[index] as D;
  });
  
  // Measure item size on mount and when content changes
  onMount(() => {
    if (props.fixedItemHeight !== undefined) return;
    
    const measureSize = () => {
      if (itemRef) {
        const height = itemRef.offsetHeight;
        if (height > 0) {
          props.measureItem(props.item.index, height);
        }
      }
    };
    
    // Initial measurement after render
    requestAnimationFrame(measureSize);
    
    // Set up resize observer for dynamic content
    if (typeof ResizeObserver !== 'undefined' && itemRef) {
      const observer = new ResizeObserver(measureSize);
      observer.observe(itemRef);
    }
  });
  
  return (
    <div
      ref={itemRef}
      data-index={props.item.index}
      data-known-size={props.item.size}
      style={{ 'overflow-anchor': 'none' }}
    >
      {props.itemContent(
        props.item.index + props.firstItemIndex,
        itemData(),
        props.context as C
      )}
    </div>
  );
}

// =============================================================================
// VIRTUAL LIST COMPONENT
// =============================================================================

export function VirtualList<D = unknown, C = unknown>(
  props: VirtualListProps<D, C>
): JSX.Element {
  let scrollerRef: HTMLDivElement | undefined;
  
  // --- Computed props ---
  const totalCount = createMemo(() => props.totalCount ?? props.data?.length ?? 0);
  const defaultItemHeight = createMemo(() => props.defaultItemHeight ?? props.fixedItemHeight ?? 50);
  const fixedItemHeight = createMemo(() => props.fixedItemHeight);
  const overscan = createMemo(() => props.overscan ?? 5);
  const firstItemIndex = createMemo(() => props.firstItemIndex ?? 0);
  const atBottomThreshold = createMemo(() => props.atBottomThreshold ?? 4);
  const atTopThreshold = createMemo(() => props.atTopThreshold ?? 0);
  
  const increaseViewportBy = createMemo((): number | { top: number; bottom: number } => {
    const val = props.increaseViewportBy;
    if (!val) return 0;
    if (typeof val === 'number') return val;
    return val;
  });
  
  // --- Virtualizer ---
  const virtualizer = useVirtualizer({
    totalCount,
    getEstimatedSize: defaultItemHeight,
    getFixedSize: () => fixedItemHeight(),
    overscan: () => overscan(),
    increaseViewportBy: () => increaseViewportBy(),
    getScrollContainer: () => scrollerRef,
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
    if (props.initialScrollTop !== undefined && scrollerRef) {
      scrollerRef.scrollTop = props.initialScrollTop;
    } else if (props.initialTopMostItemIndex !== undefined) {
      virtualizer.scrollToIndex(props.initialTopMostItemIndex);
    }
  });
  
  // --- Items rendered callback ---
  createEffect(() => {
    const items = virtualizer.items();
    if (props.itemsRendered) {
      props.itemsRendered(items.map(item => ({
        index: item.index,
        offset: item.offset,
        size: item.size,
        data: props.data?.[item.index],
      })) as ListItem<D>[]);
    }
  });
  
  // --- Components ---
  const Scroller = props.Scroller ?? DefaultScroller;
  const List = props.List ?? DefaultList;
  
  // --- Styles ---
  const scrollerStyle = createMemo((): JSX.CSSProperties => ({
    height: '100%',
    'overflow-y': 'auto',
    position: 'relative',
    outline: 'none',
    '-webkit-overflow-scrolling': 'touch',
    ...props.style,
  }));
  
  // Use a fixed height container with transform for positioning
  // This prevents layout shifts when items are measured
  const containerStyle = createMemo((): JSX.CSSProperties => ({
    height: `${virtualizer.totalSize()}px`,
    position: 'relative',
    width: '100%',
  }));
  
  const listStyle = createMemo((): JSX.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transform: `translateY(${virtualizer.offsetTop()}px)`,
  }));
  
  // --- Render ---
  return (
    <Scroller
      ref={(el) => { scrollerRef = el; }}
      style={scrollerStyle()}
    >
      <Show when={props.Header}>
        <div data-virtual-header>{props.Header!()}</div>
      </Show>
      
      <Show
        when={totalCount() > 0}
        fallback={
          <Show when={props.EmptyPlaceholder}>
            {props.EmptyPlaceholder!()}
          </Show>
        }
      >
        {/* Container with total height for scroll */}
        <div style={containerStyle()}>
          {/* List positioned with transform */}
          <List
            ref={() => {}}
            style={listStyle()}
          >
            <For each={virtualizer.items()}>
              {(item) => (
                <ItemWrapper
                  item={item as ListItem<D>}
                  data={props.data}
                  context={props.context}
                  itemContent={props.itemContent}
                  measureItem={virtualizer.measureItem}
                  firstItemIndex={firstItemIndex()}
                  fixedItemHeight={fixedItemHeight()}
                />
              )}
            </For>
          </List>
        </div>
      </Show>
      
      <Show when={props.Footer}>
        <div data-virtual-footer>{props.Footer!()}</div>
      </Show>
    </Scroller>
  );
}
