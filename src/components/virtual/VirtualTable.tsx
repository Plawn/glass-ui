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
import type {
  ListItem,
  TableComponents,
  TableRowContent,
  VirtualHandle,
  VirtualTableColumn,
  VirtualTableProps,
} from './types';
import { useVirtualizer } from './useVirtualizer';

// =============================================================================
// CELL VALUE HELPER
// =============================================================================

// Cache for path splits to avoid repeated string operations
const pathCache = new Map<string, string[]>();

/**
 * Get a cell value from a row using dot notation (e.g., "user.name")
 */
function getCellValue<T>(row: T, key: string): unknown {
  if (!row || typeof row !== 'object') {
    return undefined;
  }

  // Check cache for path
  let path = pathCache.get(key);
  if (!path) {
    path = key.split('.');
    pathCache.set(key, path);
  }

  // Navigate the path
  let value: unknown = row;
  for (const part of path) {
    if (value == null || typeof value !== 'object') {
      return undefined;
    }
    value = (value as Record<string, unknown>)[part];
  }
  return value;
}

// =============================================================================
// COLUMN-BASED CELL RENDERER
// =============================================================================

/**
 * Creates an itemContent function from column definitions
 */
function createColumnRenderer<D>(
  columns: VirtualTableColumn<D>[],
): TableRowContent<D, unknown> {
  return (index: number, row: D) => (
    <For each={columns}>
      {(column) => {
        const value = getCellValue(row, column.key);
        const alignClass =
          column.align === 'center'
            ? 'text-center'
            : column.align === 'right'
              ? 'text-right'
              : 'text-left';

        return (
          <td
            class={`p-3 ${alignClass} ${column.cellClass ?? ''}`}
            style={{
              width: column.width,
              'min-width': column.minWidth,
            }}
          >
            {column.render
              ? column.render(value, row, index)
              : String(value ?? '')}
          </td>
        );
      }}
    </For>
  );
}

/**
 * Creates a header renderer from column definitions
 */
function createColumnHeader<D>(
  columns: VirtualTableColumn<D>[],
): () => JSX.Element {
  return () => (
    <tr>
      <For each={columns}>
        {(column) => {
          const alignClass =
            column.align === 'center'
              ? 'text-center'
              : column.align === 'right'
                ? 'text-right'
                : 'text-left';

          if (column.headerRender) {
            return column.headerRender(column);
          }

          return (
            <th
              class={`p-3 font-medium text-surface-600 dark:text-surface-400 ${alignClass} ${column.headerClass ?? ''}`}
              style={{
                width: column.width,
                'min-width': column.minWidth,
              }}
            >
              {column.header}
            </th>
          );
        }}
      </For>
    </tr>
  );
}

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
  >
    {props.children}
  </div>
);

const DefaultTable: Component<{
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => <table style={props.style}>{props.children}</table>;

const DefaultTableHead: Component<{
  ref: (el: HTMLTableSectionElement) => void;
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <thead
    ref={props.ref}
    style={props.style}
    class="bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm"
  >
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
  /** Stable row index — the row component is keyed on it */
  index: number;
  getSize: () => number;
  data?: readonly D[];
  context?: C;
  itemContent: TableRowContent<D, C>;
  measureItem: (index: number, size: number) => void;
  /** Shared observer owned by the table — one instance for all rows */
  observer?: ResizeObserver;
  firstItemIndex: number;
  fixedItemHeight?: number;
}

function RowWrapper<D, C>(props: RowWrapperProps<D, C>) {
  let rowRef: HTMLTableRowElement | undefined;

  const itemData = createMemo(() => {
    return props.data?.[props.index] as D;
  });

  // Measure row size on mount and when content changes.
  // The shared ResizeObserver fires once on observe(), which covers the
  // initial measurement; the rAF path is only a fallback for environments
  // without ResizeObserver.
  onMount(() => {
    if (props.fixedItemHeight !== undefined || !rowRef) {
      return;
    }

    if (props.observer) {
      const el = rowRef;
      props.observer.observe(el);
      onCleanup(() => props.observer?.unobserve(el));
    } else {
      requestAnimationFrame(() => {
        if (rowRef) {
          const height = rowRef.offsetHeight;
          if (height > 0) {
            props.measureItem(props.index, height);
          }
        }
      });
    }
  });

  return (
    <tr
      ref={rowRef}
      data-index={props.index}
      data-known-size={props.getSize()}
      style={{ 'overflow-anchor': 'none' }}
    >
      {props.itemContent(
        props.index + props.firstItemIndex,
        itemData(),
        props.context as C,
      )}
    </tr>
  );
}

// =============================================================================
// VIRTUAL TABLE COMPONENT
// =============================================================================

export function VirtualTable<D = unknown, C = unknown>(
  props: VirtualTableProps<D, C>,
): JSX.Element {
  let theadRef: HTMLTableSectionElement | undefined;
  let tfootRef: HTMLTableSectionElement | undefined;

  // --- Use signal for scroller ref to ensure reactivity ---
  const [scrollerRef, setScrollerRef] = createSignal<
    HTMLDivElement | undefined
  >(undefined);

  // --- State for header/footer heights ---
  const [headerHeight, setHeaderHeight] = createSignal(0);
  const [footerHeight, setFooterHeight] = createSignal(0);

  // --- Computed props ---
  const totalCount = createMemo(
    () => props.totalCount ?? props.data?.length ?? 0,
  );
  const defaultItemHeight = createMemo(
    () => props.defaultItemHeight ?? props.fixedItemHeight ?? 48,
  );
  const fixedItemHeight = createMemo(() => props.fixedItemHeight);
  const overscan = createMemo(() => props.overscan ?? 5);
  const firstItemIndex = createMemo(() => props.firstItemIndex ?? 0);
  const atBottomThreshold = createMemo(() => props.atBottomThreshold ?? 4);
  const atTopThreshold = createMemo(() => props.atTopThreshold ?? 0);

  // --- Column-based rendering support ---
  // Create itemContent from columns if provided
  const effectiveItemContent = createMemo(() => {
    if (props.itemContent) {
      return props.itemContent;
    }
    if (props.columns) {
      return createColumnRenderer(props.columns) as TableRowContent<D, C>;
    }
    // Fallback - should never happen in proper usage
    return (() => null) as TableRowContent<D, C>;
  });

  // Auto-generate header from columns if no fixedHeaderContent provided
  const effectiveHeaderContent = createMemo(() => {
    if (props.fixedHeaderContent) {
      return props.fixedHeaderContent;
    }
    if (props.columns) {
      return createColumnHeader(props.columns);
    }
    return undefined;
  });

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

  // --- Get components with defaults ---
  const components = createMemo(
    (): Required<TableComponents<D, C>> => ({
      Table: props.components?.Table ?? DefaultTable,
      TableHead: props.components?.TableHead ?? DefaultTableHead,
      TableBody: props.components?.TableBody ?? DefaultTableBody,
      TableFoot: props.components?.TableFoot ?? DefaultTableFoot,
      TableRow: props.components?.TableRow ?? DefaultTableRow,
      Scroller: props.components?.Scroller ?? DefaultScroller,
      EmptyPlaceholder: props.components?.EmptyPlaceholder ?? (() => null),
      FillerRow: props.components?.FillerRow ?? DefaultFillerRow,
    }),
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

  // --- Shared ResizeObserver for all rows ---
  // Reading entry.borderBoxSize avoids the forced layout that offsetHeight triggers.
  const rowObserver =
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

  onCleanup(() => rowObserver?.disconnect());

  // --- Visible rows keyed by index ---
  // For compares numbers by value: scrolling only mounts/unmounts edge rows
  // instead of re-rendering every visible cell (which Index over items did,
  // since each position received a new item on every range shift).
  const visibleIndices = createMemo(() =>
    virtualizer.items().map((item) => item.index),
  );

  const itemByIndex = createMemo(() => {
    const map = new Map<number, ListItem>();
    for (const item of virtualizer.items()) {
      map.set(item.index, item);
    }
    return map;
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
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      measureHeader();
      measureFooter();
    });

    if (theadRef) {
      observer.observe(theadRef);
    }
    if (tfootRef) {
      observer.observe(tfootRef);
    }

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

  const tableStyle = createMemo(
    (): JSX.CSSProperties => ({
      'border-spacing': '0',
      'table-layout': 'fixed',
      width: '100%',
    }),
  );

  const theadStyle = createMemo(
    (): JSX.CSSProperties => ({
      position: 'sticky',
      top: 0,
      'z-index': 20,
    }),
  );

  const tfootStyle = createMemo(
    (): JSX.CSSProperties => ({
      position: 'sticky',
      bottom: 0,
      'z-index': 1,
    }),
  );

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
        <Show when={effectiveHeaderContent()}>
          <TableHead
            ref={(el: HTMLTableSectionElement) => {
              theadRef = el;
            }}
            style={theadStyle()}
            context={props.context}
          >
            {effectiveHeaderContent()?.()}
          </TableHead>
        </Show>

        {/* Table Body with virtualization using filler rows */}
        <TableBody
          ref={() => {
            /* ref required by TableComponents interface */
          }}
          context={props.context}
        >
          {/* Top filler row for scroll positioning */}
          <Show when={virtualizer.offsetTop() > 0}>
            <FillerRow
              height={virtualizer.offsetTop()}
              context={props.context}
            />
          </Show>

          {/* Empty state */}
          <Show when={totalCount() === 0}>
            <tr>
              <td colSpan={Number.MAX_SAFE_INTEGER}>
                <EmptyPlaceholder context={props.context} />
              </td>
            </tr>
          </Show>

          {/* Virtualized rows */}
          <For each={visibleIndices()}>
            {(index) => (
              <RowWrapper
                index={index}
                getSize={() =>
                  itemByIndex().get(index)?.size ?? defaultItemHeight()
                }
                data={props.data}
                context={props.context}
                itemContent={effectiveItemContent()}
                measureItem={virtualizer.measureItem}
                observer={rowObserver}
                firstItemIndex={firstItemIndex()}
                fixedItemHeight={fixedItemHeight()}
              />
            )}
          </For>

          {/* Bottom filler row for scroll positioning */}
          <Show when={virtualizer.offsetBottom() > 0}>
            <FillerRow
              height={virtualizer.offsetBottom()}
              context={props.context}
            />
          </Show>
        </TableBody>

        {/* Fixed Footer */}
        <Show when={props.fixedFooterContent}>
          <TableFoot
            ref={(el: HTMLTableSectionElement) => {
              tfootRef = el;
            }}
            style={tfootStyle()}
            context={props.context}
          >
            {props.fixedFooterContent?.()}
          </TableFoot>
        </Show>
      </Table>
    </Scroller>
  );
}
