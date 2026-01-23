import type { JSX } from 'solid-js';
import type {
  Alignment,
  BaseComponentProps,
  ComponentSize,
  LoadableProps,
} from '../../types';

// =============================================================================
// SORT TYPES
// =============================================================================

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  /** Column key being sorted */
  column: string | null;
  /** Sort direction */
  direction: SortDirection;
}

// =============================================================================
// TABLE VARIANTS
// =============================================================================

/**
 * Table visual variants
 * - default: Clean look with subtle row separators
 * - bordered: All cells have visible borders
 * - striped: Alternating row background colors
 */
export type TableVariant = 'default' | 'bordered' | 'striped';

/**
 * Row selection mode
 * - single: Only one row can be selected at a time
 * - multiple: Multiple rows can be selected with checkboxes
 */
export type SelectionMode = 'single' | 'multiple';

// =============================================================================
// COLUMN DEFINITION
// =============================================================================

export interface TableColumn<T> {
  /** Unique key for the column, used to access data (supports dot notation for nested props) */
  key: string;
  /** Column header label */
  header: string;
  /** Whether this column is sortable (overrides table-level sortable) */
  sortable?: boolean;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T, index: number) => JSX.Element;
  /** Column width (CSS value) */
  width?: string;
  /** Minimum column width (CSS value) */
  minWidth?: string;
  /** Text alignment */
  align?: Alignment;
  /** Whether this column should be sticky (left or right) */
  sticky?: 'left' | 'right';
  /** Custom header render function */
  headerRender?: (column: TableColumn<T>) => JSX.Element;
  /** Custom class for this column's cells */
  cellClass?: string;
  /** Custom class for this column's header */
  headerClass?: string;
}

// =============================================================================
// SELECTION TYPES
// =============================================================================

export type RowKey = string | number;

export interface SelectionState {
  /** Set of selected row keys */
  selectedKeys: Set<RowKey>;
  /** Whether all rows are selected */
  allSelected: boolean;
  /** Whether some (but not all) rows are selected */
  indeterminate: boolean;
}

// =============================================================================
// TABLE PROPS
// =============================================================================

export interface TableProps<T> extends BaseComponentProps, LoadableProps {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  data: T[];

  // --- Sorting ---
  /** Enable sorting functionality globally */
  sortable?: boolean;
  /** Current sort state (controlled) */
  sort?: SortState;
  /** Callback when sort changes */
  onSort?: (sort: SortState) => void;

  // --- Visual customization ---
  /** Table size variant affecting padding and font size */
  size?: ComponentSize;
  /** Visual variant */
  variant?: TableVariant;
  /** Whether to show hover effect on rows */
  hoverable?: boolean;

  // --- Selection ---
  /** Enable row selection */
  selectable?: boolean | SelectionMode;
  /** Selected row keys (controlled) */
  selectedKeys?: Set<RowKey>;
  /** Callback when selection changes */
  onSelectionChange?: (selectedKeys: Set<RowKey>, selectedRows: T[]) => void;

  // --- Row interaction ---
  /** Callback when a row is clicked */
  onRowClick?: (row: T, index: number, event: MouseEvent) => void;
  /** Callback when a row is double-clicked */
  onRowDoubleClick?: (row: T, index: number, event: MouseEvent) => void;
  /** Custom class name for rows (can be static or dynamic based on row data) */
  rowClass?: string | ((row: T, index: number) => string);
  /** Whether rows should appear clickable (cursor pointer) */
  clickableRows?: boolean;

  // --- Layout ---
  /** Whether the header should be sticky */
  stickyHeader?: boolean;
  /** Maximum height for scrollable table body (enables stickyHeader automatically) */
  maxHeight?: string;

  // --- Empty & loading states ---
  /** Message to display when data is empty */
  emptyMessage?: string;
  /** Custom empty state render */
  emptyRender?: () => JSX.Element;
  /** Number of skeleton rows to show when loading */
  loadingRows?: number;

  // --- Row identification ---
  /** Row key accessor function (required for selection, recommended for all use cases) */
  getRowKey?: (row: T, index: number) => RowKey;
}

// =============================================================================
// RE-EXPORTS FOR CONVENIENCE
// =============================================================================

export type { ComponentSize as TableSize } from '../../types';
