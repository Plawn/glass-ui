import { createMemo, createEffect, createSignal, For, Show, onMount, type JSX, type Component } from 'solid-js';
import { useVirtualizer } from './useVirtualizer';
import type { VirtualTableProps, VirtualHandle, ListItem, TableComponents } from './types';

// =============================================================================
// DEFAULT TABLE COMPONENTS
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
    tabIndex={0}
  >
    {props.children}
  </div>
);

const DefaultTable: Component<{
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <table style={props.style}>
    {props.children}
  </table>
);

const DefaultTableHead: Component<{
  ref: (el: HTMLTableSectionElement) => void;
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <thead ref={props.ref} style={props.style} class="bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm">
    {props.children}
  </thead>
);

const DefaultTableBody: Component<{
  ref: (el: HTMLTableSectionElement) => void;
  children: JSX.Element;
}> = (props) => (
  <tbody ref={props.ref} data-virtual-item-list>
    {props.children}
  </tbody>
);

const DefaultTableFoot: Component<{
  ref: (el: HTMLTableSectionElement) => void;
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <tfoot ref={props.ref} style={props.style}>
    {props.children}
  </tfoot>
);

const DefaultTableRow: Component<{
  children: JSX.Element;
  'data-index': number;
  'data-known-size': number;
  style?: JSX.CSSProperties;
}> = (props) => (
  <tr
    data-index={props['data-index']}
    data-known-size={props['data-known-size']}
    style={{ 'overflow-anchor': 'none', ...props.style }}
  >
    {props.children}
  </tr>
);

const DefaultFillerRow: Component<{
  height: number;
}> = (props) => (
  <tr style={{ height: `${props.height}px` }}>
    <td style={{ border: 'none', padding: 0 }} />
  </tr>
);

// =============================================================================
// ROW WRAPPER WITH SIZE MEASUREMENT
// =============================================================================

interface RowWrapperProps<D, C> {
  item: ListItem<D>;
  data?: readonly D[];
  context?: C;
  itemContent: VirtualTableProps<D, C>['itemContent'];
  measureItem: (index: number, size: number) => void;
  TableRowComponent: typeof DefaultTableRow;
  firstItemIndex: number;
  fixedItemHeight?: number;
}

function RowWrapper<D, C>(props: RowWrapperProps<D, C>) {
  let rowRef: HTMLTableRowElement | undefined;
  
  const itemData = createMemo(() => {
    const index = props.item.index;
    return props.data?.[index] as D;
  });
  
  // Measure row size on mount and when content changes
  onMount(() => {
    if (props.fixedItemHeight !== undefined) return;
    
    const measureSize = () => {
      if (rowRef) {
        const height = rowRef.offsetHeight;
        if (height > 0) {
          props.measureItem(props.item.index, height);
        }
      }
    };
    
    // Initial measurement after render
    requestAnimationFrame(measureSize);
    
    // Set up resize observer for dynamic content
    if (typeof ResizeObserver !== 'undefined' && rowRef) {
      const observer = new ResizeObserver(measureSize);
      observer.observe(rowRef);
    }
  });
  
  return (
    <tr
      ref={rowRef}
      data-index={props.item.index}
      data-known-size={props.item.size}
      style={{ 'overflow-anchor': 'none' }}
    >
      {props.itemContent(
        props.item.index + props.firstItemIndex,
        itemData(),
        props.context as C
      )}
    </tr>
  );
}

// =============================================================================
// VIRTUAL TABLE COMPONENT
// =============================================================================

export function VirtualTable<D = unknown, C = unknown>(
  props: VirtualTableProps<D, C>
): JSX.Element {
  let theadRef: HTMLTableSectionElement | undefined;
  let tfootRef: HTMLTableSectionElement | undefined;

  // --- Use signal for scroller ref to ensure reactivity ---
  const [scrollerRef, setScrollerRef] = createSignal<HTMLDivElement | undefined>(undefined);

  // --- State for header/footer heights ---
  const [headerHeight, setHeaderHeight] = createSignal(0);
  const [footerHeight, setFooterHeight] = createSignal(0);
  
  // --- Computed props ---
  const totalCount = createMemo(() => props.totalCount ?? props.data?.length ?? 0);
  const defaultItemHeight = createMemo(() => props.defaultItemHeight ?? props.fixedItemHeight ?? 48);
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
  
  // --- Get components with defaults ---
  const components = createMemo((): Required<TableComponents<D, C>> => ({
    Table: props.components?.Table ?? DefaultTable,
    TableHead: props.components?.TableHead ?? DefaultTableHead,
    TableBody: props.components?.TableBody ?? DefaultTableBody,
    TableFoot: props.components?.TableFoot ?? DefaultTableFoot,
    TableRow: props.components?.TableRow ?? DefaultTableRow,
    Scroller: props.components?.Scroller ?? DefaultScroller,
    EmptyPlaceholder: props.components?.EmptyPlaceholder ?? (() => null),
    FillerRow: props.components?.FillerRow ?? DefaultFillerRow,
  }));
  
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
  
  // --- Measure header/footer ---
  const measureHeader = () => {
    if (theadRef) {
      const height = theadRef.offsetHeight;
      if (height !== headerHeight()) {
        setHeaderHeight(height);
      }
    }
  };
  
  const measureFooter = () => {
    if (tfootRef) {
      const height = tfootRef.offsetHeight;
      if (height !== footerHeight()) {
        setFooterHeight(height);
      }
    }
  };
  
  // Observe header/footer size changes
  createEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    
    const observer = new ResizeObserver(() => {
      measureHeader();
      measureFooter();
    });
    
    if (theadRef) observer.observe(theadRef);
    if (tfootRef) observer.observe(tfootRef);
    
    return () => observer.disconnect();
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
    const scroller = scrollerRef();
    if (props.initialScrollTop !== undefined && scroller) {
      scroller.scrollTop = props.initialScrollTop;
    } else if (props.initialTopMostItemIndex !== undefined) {
      virtualizer.scrollToIndex(props.initialTopMostItemIndex);
    }

    // Initial header/footer measurement
    requestAnimationFrame(() => {
      measureHeader();
      measureFooter();
    });
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
  
  // --- Styles ---
  const scrollerStyle = createMemo((): JSX.CSSProperties => ({
    height: '100%',
    'overflow-y': 'auto',
    position: 'relative',
    outline: 'none',
    '-webkit-overflow-scrolling': 'touch',
    ...props.style,
  }));
  
  const tableStyle = createMemo((): JSX.CSSProperties => ({
    'border-spacing': '0',
    'table-layout': 'fixed',
    width: '100%',
  }));
  
  const theadStyle = createMemo((): JSX.CSSProperties => ({
    position: 'sticky',
    top: 0,
    'z-index': 20,
  }));
  
  const tfootStyle = createMemo((): JSX.CSSProperties => ({
    position: 'sticky',
    bottom: 0,
    'z-index': 1,
  }));
  
  // --- Render ---
  const Scroller = components().Scroller;
  const Table = components().Table;
  const TableHead = components().TableHead;
  const TableBody = components().TableBody;
  const TableFoot = components().TableFoot;
  const FillerRow = components().FillerRow;
  const EmptyPlaceholder = components().EmptyPlaceholder;
  
  return (
    <Scroller
      ref={setScrollerRef}
      style={scrollerStyle()}
      context={props.context}
    >
      <Table style={tableStyle()} context={props.context}>
        {/* Fixed Header */}
        <Show when={props.fixedHeaderContent}>
          <TableHead
            ref={(el: HTMLTableSectionElement) => { theadRef = el; }}
            style={theadStyle()}
            context={props.context}
          >
            {props.fixedHeaderContent!()}
          </TableHead>
        </Show>
        
        {/* Table Body with virtualization using filler rows */}
        <TableBody
          ref={() => {}}
          context={props.context}
        >
          {/* Top filler row for scroll positioning */}
          <Show when={virtualizer.offsetTop() > 0}>
            <FillerRow height={virtualizer.offsetTop()} context={props.context} />
          </Show>
          
          {/* Empty state */}
          <Show when={totalCount() === 0}>
            <tr>
              <td colspan={100}>
                <EmptyPlaceholder context={props.context} />
              </td>
            </tr>
          </Show>
          
          {/* Virtualized rows */}
          <For each={virtualizer.items()}>
            {(item) => (
              <RowWrapper
                item={item as ListItem<D>}
                data={props.data}
                context={props.context}
                itemContent={props.itemContent}
                measureItem={virtualizer.measureItem}
                TableRowComponent={DefaultTableRow}
                firstItemIndex={firstItemIndex()}
                fixedItemHeight={fixedItemHeight()}
              />
            )}
          </For>
          
          {/* Bottom filler row for scroll positioning */}
          <Show when={virtualizer.offsetBottom() > 0}>
            <FillerRow height={virtualizer.offsetBottom()} context={props.context} />
          </Show>
        </TableBody>
        
        {/* Fixed Footer */}
        <Show when={props.fixedFooterContent}>
          <TableFoot
            ref={(el: HTMLTableSectionElement) => { tfootRef = el; }}
            style={tfootStyle()}
            context={props.context}
          >
            {props.fixedFooterContent!()}
          </TableFoot>
        </Show>
      </Table>
    </Scroller>
  );
}
