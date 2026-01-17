import type { Component, JSX } from 'solid-js';
import { For, Show, createMemo, createSignal } from 'solid-js';
import type { ComponentSize } from '../../types';
import { Checkbox } from '../Input/Checkbox';
import { ChevronDownIcon, ChevronUpIcon, SortIcon as SortIconBase } from '../shared/icons';
import type {
  RowKey,
  SelectionMode,
  SortDirection,
  SortState,
  TableProps,
  TableVariant,
} from './types';

// =============================================================================
// STYLE CONSTANTS (hoisted outside component for zero recalculation)
// =============================================================================

const SIZE_STYLES: Record<ComponentSize, { cell: string; header: string }> = {
  sm: {
    cell: 'px-2 py-1.5 text-xs',
    header: 'px-2 py-2 text-[10px]',
  },
  md: {
    cell: 'px-4 py-3 text-sm',
    header: 'px-4 py-3 text-xs',
  },
  lg: {
    cell: 'px-6 py-4 text-base',
    header: 'px-6 py-4 text-sm',
  },
};

const VARIANT_STYLES: Record<
  TableVariant,
  { row: string; headerRow: string; cell: string; headerCell: string }
> = {
  default: {
    row: 'border-b border-surface-100/50 dark:border-surface-800/50 last:border-b-0',
    headerRow: 'border-b border-surface-200/50 dark:border-surface-700/50',
    cell: '',
    headerCell: '',
  },
  bordered: {
    row: 'border-b border-surface-200 dark:border-surface-700',
    headerRow: 'border-b-2 border-surface-300 dark:border-surface-600',
    cell: 'border-x border-surface-200 dark:border-surface-700 first:border-l-0 last:border-r-0',
    headerCell: 'border-x border-surface-200 dark:border-surface-700 first:border-l-0 last:border-r-0',
  },
  striped: {
    row: 'border-b border-surface-100/30 dark:border-surface-800/30 last:border-b-0',
    headerRow: 'border-b border-surface-200/50 dark:border-surface-700/50',
    cell: '',
    headerCell: '',
  },
};

// Deterministic skeleton widths (no Math.random())
const SKELETON_WIDTHS = ['45%', '65%', '55%', '75%', '50%', '60%', '70%', '40%', '80%', '58%'];

const ALIGN_CLASSES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

const SortIcon: Component<{ direction: SortDirection; active: boolean }> = (props) => (
  <span
    class={`ml-1 inline-flex transition-opacity ${props.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
    aria-hidden="true"
  >
    <Show when={props.direction === 'asc'}>
      <ChevronUpIcon class="w-3.5 h-3.5" />
    </Show>
    <Show when={props.direction === 'desc'}>
      <ChevronDownIcon class="w-3.5 h-3.5" />
    </Show>
    <Show when={!props.direction}>
      <SortIconBase class="w-3.5 h-3.5" />
    </Show>
  </span>
);

// Optimized: deterministic width based on index
const SkeletonCell: Component<{ size: ComponentSize; index: number }> = (props) => (
  <div
    class={`animate-pulse bg-surface-200/50 dark:bg-surface-700/50 rounded ${
      props.size === 'sm' ? 'h-3' : props.size === 'lg' ? 'h-5' : 'h-4'
    }`}
    style={{ width: SKELETON_WIDTHS[props.index % SKELETON_WIDTHS.length] }}
  />
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Table<T extends Record<string, unknown>>(
  props: Readonly<TableProps<T>>,
): ReturnType<Component> {
  // --- Memoized defaults ---
  const size = createMemo(() => props.size ?? 'md');
  const variant = createMemo(() => props.variant ?? 'default');
  const hoverable = createMemo(() => props.hoverable ?? true);
  const loadingRows = createMemo(() => props.loadingRows ?? 5);


  // --- Memoized style lookups (avoid object creation in render) ---
  const sizeStyle = createMemo(() => SIZE_STYLES[size()]);
  const variantStyle = createMemo(() => VARIANT_STYLES[variant()]);

  // --- Internal sort state ---
  const [internalSort, setInternalSort] = createSignal<SortState>({
    column: null,
    direction: null,
  });

  // --- Internal selection state ---
  const [internalSelectedKeys, setInternalSelectedKeys] = createSignal<Set<RowKey>>(new Set());

  // --- Computed values ---
  const currentSort = createMemo(() => props.sort ?? internalSort());
  const currentSelectedKeys = createMemo(() => props.selectedKeys ?? internalSelectedKeys());

  const selectionMode = createMemo((): SelectionMode | null => {
    if (!props.selectable) return null;
    if (props.selectable === true) return 'multiple';
    return props.selectable;
  });

  // --- Memoized row key getter ---
  const getRowKey = (row: T, index: number): RowKey => {
    if (props.getRowKey) {
      return props.getRowKey(row, index);
    }
    if ('id' in row) return row.id as RowKey;
    if ('_id' in row) return row._id as RowKey;
    if ('key' in row) return row.key as RowKey;
    return index;
  };

  // --- Memoized cell value getter with path caching ---
  const cellValueCache = new Map<string, string[]>();
  const getCellValue = (row: T, key: string): unknown => {
    let keys = cellValueCache.get(key);
    if (!keys) {
      keys = key.split('.');
      cellValueCache.set(key, keys);
    }

    let value: unknown = row;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        return undefined;
      }
    }
    return value;
  };

  // --- Memoized sticky styles per column ---
  const stickyStyles = createMemo(() => {
    const styles: Map<number, JSX.CSSProperties> = new Map();
    const checkboxWidth = size() === 'sm' ? 32 : size() === 'lg' ? 48 : 40;
    const hasSelection = !!selectionMode();

    // Calculate left sticky offsets
    let leftOffset = hasSelection ? checkboxWidth : 0;
    for (let i = 0; i < props.columns.length; i++) {
      const col = props.columns[i];
      if (col?.sticky === 'left') {
        styles.set(i, { position: 'sticky', left: `${leftOffset}px`, 'z-index': 10 });
        leftOffset += Number.parseInt(col.width ?? '100', 10) || 100;
      }
    }

    // Calculate right sticky offsets
    let rightOffset = 0;
    for (let i = props.columns.length - 1; i >= 0; i--) {
      const col = props.columns[i];
      if (col?.sticky === 'right') {
        styles.set(i, { position: 'sticky', right: `${rightOffset}px`, 'z-index': 10 });
        rightOffset += Number.parseInt(col.width ?? '100', 10) || 100;
      }
    }

    return styles;
  });

  // --- Handlers ---
  const handleSort = (columnKey: string) => {
    const column = props.columns.find((c) => c.key === columnKey);
    if (!column?.sortable && !props.sortable) return;

    const current = currentSort();
    let newDirection: SortDirection = 'asc';

    if (current.column === columnKey) {
      if (current.direction === 'asc') newDirection = 'desc';
      else if (current.direction === 'desc') newDirection = null;
    }

    const newSort: SortState = {
      column: newDirection ? columnKey : null,
      direction: newDirection,
    };

    if (props.onSort) {
      props.onSort(newSort);
    } else {
      setInternalSort(newSort);
    }
  };

  const handleRowSelect = (row: T, index: number, checked: boolean) => {
    const key = getRowKey(row, index);
    const mode = selectionMode();
    if (!mode) return;

    let newKeys: Set<RowKey>;
    if (mode === 'single') {
      newKeys = checked ? new Set([key]) : new Set();
    } else {
      newKeys = new Set(currentSelectedKeys());
      if (checked) newKeys.add(key);
      else newKeys.delete(key);
    }

    if (props.onSelectionChange) {
      const selectedRows = sortedData().filter((r, i) => newKeys.has(getRowKey(r, i)));
      props.onSelectionChange(newKeys, selectedRows);
    } else {
      setInternalSelectedKeys(newKeys);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (selectionMode() !== 'multiple') return;

    const newKeys = checked
      ? new Set(sortedData().map((row, index) => getRowKey(row, index)))
      : new Set<RowKey>();

    if (props.onSelectionChange) {
      props.onSelectionChange(newKeys, checked ? [...sortedData()] : []);
    } else {
      setInternalSelectedKeys(newKeys);
    }
  };

  const handleRowClick = (row: T, index: number, event: MouseEvent) => {
    props.onRowClick?.(row, index, event);

    if (selectionMode() === 'single' && props.clickableRows) {
      const key = getRowKey(row, index);
      const isSelected = currentSelectedKeys().has(key);
      handleRowSelect(row, index, !isSelected);
    }
  };

  // --- Sorted data ---
  const sortedData = createMemo(() => {
    const sort = currentSort();
    if (props.onSort || !sort.column || !sort.direction) {
      return props.data;
    }

    const column = props.columns.find((c) => c.key === sort.column);
    if (!column) return props.data;

    return [...props.data].sort((a, b) => {
      const aVal = getCellValue(a, sort.column as string);
      const bVal = getCellValue(b, sort.column as string);

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sort.direction === 'asc' ? -1 : 1;
      if (bVal == null) return sort.direction === 'asc' ? 1 : -1;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sort.direction === 'asc' ? comparison : -comparison;
    });
  });

  // --- Selection state ---
  const selectionState = createMemo(() => {
    const selected = currentSelectedKeys();
    const total = sortedData().length;
    const selectedCount = selected.size;

    return {
      selectedKeys: selected,
      allSelected: total > 0 && selectedCount === total,
      indeterminate: selectedCount > 0 && selectedCount < total,
    };
  });

  // --- Computed container styles ---
  const containerStyle = createMemo((): JSX.CSSProperties => {
    if (!props.maxHeight) return {};
    return { 'max-height': props.maxHeight };
  });

  const shouldStickyHeader = createMemo(() => props.stickyHeader || !!props.maxHeight);
  const checkboxColumnStyle = createMemo(() => ({
    width: size() === 'sm' ? '32px' : size() === 'lg' ? '48px' : '40px',
  }));

  // --- Memoized row class names ---
  const getRowClassName = (row: T, index: number): string => {
    if (!props.rowClass) return '';
    return typeof props.rowClass === 'function' ? props.rowClass(row, index) : props.rowClass;
  };

  // --- Pre-computed base classes ---
  const headerBaseClass = createMemo(() =>
    `font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400`,
  );

  const cellBaseClass = createMemo(() => `text-surface-800 dark:text-surface-200`);

  // Render header row content
  const renderHeaderContent = () => (
    <tr class={variantStyle().headerRow}>
      {/* Selection checkbox column */}
      <Show when={selectionMode() === 'multiple'}>
        <th
          class={`${sizeStyle().header} ${headerBaseClass()} text-center ${variantStyle().headerCell}`}
          style={checkboxColumnStyle()}
        >
          <Checkbox
            checked={selectionState().allSelected}
            indeterminate={selectionState().indeterminate}
            onChange={handleSelectAll}
            size={size()}
          />
        </th>
      </Show>
      <Show when={selectionMode() === 'single'}>
        <th
          class={`${sizeStyle().header} ${headerBaseClass()} ${variantStyle().headerCell}`}
          style={checkboxColumnStyle()}
        />
      </Show>

      {/* Data columns */}
      <For each={props.columns}>
        {(column, columnIndex) => {
          const isSortable = column.sortable ?? props.sortable;
          const isActive = () => currentSort().column === column.key;
          const sortDirection = () => (isActive() ? currentSort().direction : null);
          const stickyStyle = () => stickyStyles().get(columnIndex()) ?? {};
          const stickyClass = column.sticky
            ? 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm'
            : '';

          return (
            <th
              class={`${sizeStyle().header} ${headerBaseClass()} ${ALIGN_CLASSES[column.align ?? 'left']} ${variantStyle().headerCell} ${stickyClass} ${column.headerClass ?? ''} ${isSortable ? 'cursor-pointer select-none group hover:text-surface-900 dark:hover:text-surface-200 transition-colors' : ''}`}
              style={{
                width: column.width,
                'min-width': column.minWidth,
                ...stickyStyle(),
              }}
              onClick={() => isSortable && handleSort(column.key)}
              onKeyDown={(e) => {
                if (isSortable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSort(column.key);
                }
              }}
              tabIndex={isSortable ? 0 : undefined}
            >
              <Show when={!column.headerRender} fallback={column.headerRender?.(column)}>
                <span class="inline-flex items-center">
                  {column.header}
                  <Show when={isSortable}>
                    <SortIcon direction={sortDirection()} active={isActive()} />
                  </Show>
                </span>
              </Show>
            </th>
          );
        }}
      </For>
    </tr>
  );

  // --- Render ---
  return (
    <div class={`glass-card rounded-xl overflow-hidden ${props.class ?? ''}`} style={props.style}>
      <div
        class="overflow-x-auto overflow-y-auto"
        style={containerStyle()}
      >
          <table class="w-full">
            <thead
              class={
                shouldStickyHeader()
                  ? 'sticky top-0 z-20 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm'
                  : ''
              }
            >
              {renderHeaderContent()}
            </thead>
            <tbody>
              {/* Loading state */}
              <Show when={props.loading}>
                <For each={Array.from({ length: loadingRows() }, (_, i) => i)}>
                  {(rowIdx) => (
                    <tr class={variantStyle().row}>
                      <Show when={selectionMode()}>
                        <td class={`${sizeStyle().cell} text-center`}>
                          <div
                            class={`animate-pulse bg-surface-200/50 dark:bg-surface-700/50 rounded ${
                              size() === 'sm' ? 'w-4 h-4' : size() === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
                            }`}
                          />
                        </td>
                      </Show>
                      <For each={props.columns}>
                        {(column, columnIndex) => (
                          <td
                            class={`${sizeStyle().cell} ${ALIGN_CLASSES[column.align ?? 'left']} ${variantStyle().cell} ${column.cellClass ?? ''}`}
                            style={{
                              width: column.width,
                              'min-width': column.minWidth,
                              ...stickyStyles().get(columnIndex()),
                            }}
                          >
                            <SkeletonCell size={size()} index={rowIdx * props.columns.length + columnIndex()} />
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </Show>

              {/* Empty state */}
              <Show when={!props.loading && sortedData().length === 0}>
                <tr>
                  <td
                    colspan={props.columns.length + (selectionMode() ? 1 : 0)}
                    class={`${sizeStyle().cell} py-8 text-center text-surface-500 dark:text-surface-400`}
                  >
                    <Show when={!props.emptyRender} fallback={props.emptyRender?.()}>
                      {props.emptyMessage ?? 'No data available'}
                    </Show>
                  </td>
                </tr>
              </Show>

              {/* Data rows */}
              <Show when={!props.loading && sortedData().length > 0}>
                <For each={sortedData()}>
                  {(row, index) => {
                    const rowKey = () => getRowKey(row, index());
                    const isSelected = () => currentSelectedKeys().has(rowKey());
                    const clickable = () =>
                      props.clickableRows || !!props.onRowClick || selectionMode() === 'single';

                    const isEven = () => index() % 2 === 1;
                    const stripedClass = () =>
                      variant() === 'striped' && isEven()
                        ? 'bg-surface-50/50 dark:bg-surface-800/20'
                        : '';

                    return (
                      <tr
                        class={`
                          ${variantStyle().row}
                          ${stripedClass()}
                          ${hoverable() ? 'hover:bg-surface-50/50 dark:hover:bg-surface-800/30' : ''}
                          ${isSelected() ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''}
                          ${clickable() ? 'cursor-pointer' : ''}
                          ${getRowClassName(row, index())}
                          transition-colors
                        `}
                        onClick={(e) => handleRowClick(row, index(), e)}
                        onDblClick={(e) => props.onRowDoubleClick?.(row, index(), e)}
                      >
                        <Show when={selectionMode()}>
                          <td
                            class={`${sizeStyle().cell} text-center ${variantStyle().cell}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={isSelected()}
                              onChange={(checked) => handleRowSelect(row, index(), checked)}
                              size={size()}
                            />
                          </td>
                        </Show>

                        <For each={props.columns}>
                          {(column, columnIndex) => {
                            const value = () => getCellValue(row, column.key);
                            const stickyStyle = () => stickyStyles().get(columnIndex()) ?? {};
                            const stickyClass = () => column.sticky
                              ? `bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm ${isSelected() ? '!bg-primary-50/90 dark:!bg-primary-900/40' : ''}`
                              : '';

                            return (
                              <td
                                class={`${sizeStyle().cell} ${cellBaseClass()} ${ALIGN_CLASSES[column.align ?? 'left']} ${variantStyle().cell} ${stickyClass()} ${column.cellClass ?? ''}`}
                                style={{
                                  width: column.width,
                                  'min-width': column.minWidth,
                                  ...stickyStyle(),
                                }}
                              >
                                <Show when={column.render} fallback={String(value() ?? '')}>
                                  {column.render?.(value(), row, index())}
                                </Show>
                              </td>
                            );
                          }}
                        </For>
                      </tr>
                    );
                  }}
                </For>
              </Show>
            </tbody>
          </table>
        </div>
    </div>
  );
}
