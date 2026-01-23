import type { JSX } from 'solid-js';

// =============================================================================
// CORE TYPES
// =============================================================================

/**
 * Scroll behavior configuration
 */
export type ScrollBehavior = 'auto' | 'smooth';

/**
 * Alignment options for scroll to index
 */
export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

/**
 * Location with alignment for scrolling
 */
export interface ScrollToIndexLocation {
  index: number;
  align?: ScrollAlignment;
  behavior?: ScrollBehavior;
}

/**
 * Range of visible items
 */
export interface ListRange {
  startIndex: number;
  endIndex: number;
}

/**
 * Size range for batch size updates
 */
export interface SizeRange {
  startIndex: number;
  endIndex: number;
  size: number;
}

/**
 * Internal list item representation
 */
export interface ListItem<D = unknown> {
  index: number;
  offset: number;
  size: number;
  data?: D;
}

/**
 * Function to compute unique key for items
 */
export type ComputeItemKey<D = unknown, C = unknown> = (
  index: number,
  data: D,
  context: C,
) => string | number;

/**
 * Render function for list items
 */
export type ItemContent<D = unknown, C = unknown> = (
  index: number,
  data: D,
  context: C,
) => JSX.Element;

/**
 * Imperative handle for VirtualList/VirtualTable
 */
export interface VirtualHandle {
  /** Scroll to a specific index */
  scrollToIndex: (location: number | ScrollToIndexLocation) => void;
  /** Scroll to a specific offset */
  scrollTo: (offset: number) => void;
  /** Scroll by a delta */
  scrollBy: (delta: number) => void;
  /** Get the current scroll position */
  getScrollTop: () => number;
}

// =============================================================================
// VIRTUAL LIST PROPS
// =============================================================================

export interface VirtualListProps<D = unknown, C = unknown> {
  // --- Data ---
  /** Total number of items (alternative to data) */
  totalCount?: number;
  /** Array of data items */
  data?: readonly D[];

  // --- Rendering ---
  /** Render function for each item */
  itemContent: ItemContent<D, C>;
  /** Custom context passed to render functions */
  context?: C;
  /** Compute unique key for each item */
  computeItemKey?: ComputeItemKey<D, C>;

  // --- Sizing ---
  /** Fixed height for all items (optimization) */
  fixedItemHeight?: number;
  /** Default/estimated item height for initial render */
  defaultItemHeight?: number;
  /** Number of items to render outside visible area */
  overscan?: number;
  /** Increase viewport by this amount (pixels or {top, bottom}) */
  increaseViewportBy?: number | { top: number; bottom: number };

  // --- Scroll ---
  /** Initial scroll top position */
  initialScrollTop?: number;
  /** Initial item index to scroll to */
  initialTopMostItemIndex?: number;
  /** First item index (for reverse infinite scroll) */
  firstItemIndex?: number;
  /** Use window as the scroll container */
  useWindowScroll?: boolean;
  /** Custom scroll parent element */
  customScrollParent?: HTMLElement;

  // --- Components ---
  /** Header component */
  Header?: () => JSX.Element;
  /** Footer component */
  Footer?: () => JSX.Element;
  /** Empty placeholder when no items */
  EmptyPlaceholder?: () => JSX.Element;
  /** Custom scroller component */
  Scroller?: (props: {
    ref: (el: HTMLDivElement) => void;
    style: JSX.CSSProperties;
    children: JSX.Element;
  }) => JSX.Element;
  /** Custom item wrapper component */
  Item?: (props: {
    children: JSX.Element;
    'data-index': number;
    'data-known-size': number;
    style?: JSX.CSSProperties;
  }) => JSX.Element;
  /** Custom list container */
  List?: (props: {
    ref: (el: HTMLElement) => void;
    style: JSX.CSSProperties;
    children: JSX.Element;
  }) => JSX.Element;

  // --- Events ---
  /** Called when visible range changes */
  rangeChanged?: (range: ListRange) => void;
  /** Called when scrolling state changes */
  isScrolling?: (scrolling: boolean) => void;
  /** Called when end is reached (for infinite loading) */
  endReached?: (index: number) => void;
  /** Called when start is reached (for reverse infinite loading) */
  startReached?: (index: number) => void;
  /** Called when at bottom state changes */
  atBottomStateChange?: (atBottom: boolean) => void;
  /** Called when at top state changes */
  atTopStateChange?: (atTop: boolean) => void;
  /** Called when total height changes */
  totalListHeightChanged?: (height: number) => void;
  /** Called when items are rendered */
  itemsRendered?: (items: ListItem<D>[]) => void;

  // --- Thresholds ---
  /** Threshold for atBottom detection (pixels from bottom) */
  atBottomThreshold?: number;
  /** Threshold for atTop detection (pixels from top) */
  atTopThreshold?: number;

  // --- Styling ---
  class?: string;
  style?: JSX.CSSProperties;

  // --- Ref ---
  ref?: (handle: VirtualHandle) => void;
}

// =============================================================================
// VIRTUAL TABLE PROPS
// =============================================================================

/**
 * Table-specific components
 */
export interface TableComponents<D = unknown, C = unknown> {
  /** Custom table element */
  Table?: (props: {
    style: JSX.CSSProperties;
    children: JSX.Element;
    context?: C;
  }) => JSX.Element;
  /** Custom table head */
  TableHead?: (props: {
    ref: (el: HTMLTableSectionElement) => void;
    style: JSX.CSSProperties;
    children: JSX.Element;
    context?: C;
  }) => JSX.Element;
  /** Custom table body */
  TableBody?: (props: {
    ref: (el: HTMLTableSectionElement) => void;
    children: JSX.Element;
    context?: C;
  }) => JSX.Element;
  /** Custom table foot */
  TableFoot?: (props: {
    ref: (el: HTMLTableSectionElement) => void;
    style: JSX.CSSProperties;
    children: JSX.Element;
    context?: C;
  }) => JSX.Element;
  /** Custom table row */
  TableRow?: (props: {
    children: JSX.Element;
    'data-index': number;
    'data-known-size': number;
    style?: JSX.CSSProperties;
    item?: D;
    context?: C;
  }) => JSX.Element;
  /** Custom scroller */
  Scroller?: (props: {
    ref: (el: HTMLDivElement) => void;
    style: JSX.CSSProperties;
    children: JSX.Element;
    context?: C;
  }) => JSX.Element;
  /** Empty placeholder */
  EmptyPlaceholder?: (props: { context?: C }) => JSX.Element;
  /** Filler row for spacing */
  FillerRow?: (props: { height: number; context?: C }) => JSX.Element;
}

/**
 * Render function for table rows (returns cell content)
 */
export type TableRowContent<D = unknown, C = unknown> = (
  index: number,
  data: D,
  context: C,
) => JSX.Element;

/**
 * Column definition for VirtualTable
 * Allows per-cell rendering instead of per-row
 */
export interface VirtualTableColumn<T> {
  /** Unique key for the column, used to access data (supports dot notation for nested props) */
  key: string;
  /** Column header label */
  header: string;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T, index: number) => JSX.Element;
  /** Column width (CSS value) */
  width?: string;
  /** Minimum column width (CSS value) */
  minWidth?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom class for this column's cells */
  cellClass?: string;
  /** Custom class for this column's header */
  headerClass?: string;
  /** Custom header render function */
  headerRender?: (column: VirtualTableColumn<T>) => JSX.Element;
}

/**
 * Fixed header content render function
 */
export type FixedHeaderContent = () => JSX.Element;

/**
 * Fixed footer content render function
 */
export type FixedFooterContent = () => JSX.Element;

export interface VirtualTableProps<D = unknown, C = unknown> {
  // --- Data ---
  /** Total number of rows (alternative to data) */
  totalCount?: number;
  /** Array of data items */
  data?: readonly D[];

  // --- Rendering ---
  /**
   * Render function for row cells (returns all <td> elements for a row)
   * Either itemContent OR columns must be provided
   */
  itemContent?: TableRowContent<D, C>;
  /**
   * Column definitions for declarative cell rendering
   * When provided, cells are rendered per-column with optional custom renderers
   * Either itemContent OR columns must be provided
   */
  columns?: VirtualTableColumn<D>[];
  /** Fixed header content (sticky). Auto-generated from columns if not provided */
  fixedHeaderContent?: FixedHeaderContent;
  /** Fixed footer content (sticky) */
  fixedFooterContent?: FixedFooterContent;
  /** Custom context passed to render functions */
  context?: C;
  /** Compute unique key for each row */
  computeItemKey?: ComputeItemKey<D, C>;
  /** Custom components */
  components?: TableComponents<D, C>;

  // --- Sizing ---
  /** Fixed height for all rows (optimization) */
  fixedItemHeight?: number;
  /** Default/estimated row height for initial render */
  defaultItemHeight?: number;
  /** Number of rows to render outside visible area */
  overscan?: number;
  /** Increase viewport by this amount */
  increaseViewportBy?: number | { top: number; bottom: number };

  // --- Scroll ---
  /** Initial scroll top position */
  initialScrollTop?: number;
  /** Initial row index to scroll to */
  initialTopMostItemIndex?: number;
  /** First item index (for reverse infinite scroll) */
  firstItemIndex?: number;
  /** Use window as the scroll container */
  useWindowScroll?: boolean;
  /** Custom scroll parent element */
  customScrollParent?: HTMLElement;

  // --- Events ---
  /** Called when visible range changes */
  rangeChanged?: (range: ListRange) => void;
  /** Called when scrolling state changes */
  isScrolling?: (scrolling: boolean) => void;
  /** Called when end is reached */
  endReached?: (index: number) => void;
  /** Called when start is reached */
  startReached?: (index: number) => void;
  /** Called when at bottom state changes */
  atBottomStateChange?: (atBottom: boolean) => void;
  /** Called when at top state changes */
  atTopStateChange?: (atTop: boolean) => void;
  /** Called when total height changes */
  totalListHeightChanged?: (height: number) => void;
  /** Called when rows are rendered */
  itemsRendered?: (items: ListItem<D>[]) => void;

  // --- Thresholds ---
  /** Threshold for atBottom detection */
  atBottomThreshold?: number;
  /** Threshold for atTop detection */
  atTopThreshold?: number;

  // --- Styling ---
  class?: string;
  style?: JSX.CSSProperties;

  // --- Ref ---
  ref?: (handle: VirtualHandle) => void;
}
