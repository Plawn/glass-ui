import type { Component, JSX } from 'solid-js';
import { For, Show, createMemo, createSignal } from 'solid-js';
import type { ComponentSize } from '../../types';
import { ChevronDownIcon, ChevronUpIcon, SortIcon as SortIconBase } from '../shared/icons';
import type {
  RowKey,
  SelectionMode,
  SortDirection,
  SortState,
  TableColumn,
  TableProps,
  TableVariant,
} from './types';

// =============================================================================
// STYLE CONSTANTS
// =============================================================================

const sizeStyles: Record<ComponentSize, { cell: string; header: string; checkbox: string }> = {
  sm: {
    cell: 'px-2 py-1.5 text-xs',
    header: 'px-2 py-2 text-[10px]',
    checkbox: 'w-3.5 h-3.5',
  },
  md: {
    cell: 'px-4 py-3 text-sm',
    header: 'px-4 py-3 text-xs',
    checkbox: 'w-4 h-4',
  },
  lg: {
    cell: 'px-6 py-4 text-base',
    header: 'px-6 py-4 text-sm',
    checkbox: 'w-5 h-5',
  },
};

const variantStyles: Record<
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
    headerCell:
      'border-x border-surface-200 dark:border-surface-700 first:border-l-0 last:border-r-0',
  },
  striped: {
    row: 'border-b border-surface-100/30 dark:border-surface-800/30 last:border-b-0 even:bg-surface-50/50 dark:even:bg-surface-800/20',
    headerRow: 'border-b border-surface-200/50 dark:border-surface-700/50',
    cell: '',
    headerCell: '',
  },
};

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

const Checkbox: Component<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  size: ComponentSize;
  disabled?: boolean;
}> = (props) => {
  return (
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={props.checked}
        ref={(el) => {
          // Set indeterminate via ref since it's not a standard HTML attribute
          if (el) el.indeterminate = props.indeterminate ?? false;
        }}
        onChange={(e) => props.onChange(e.currentTarget.checked)}
        disabled={props.disabled}
        class={`${sizeStyles[props.size].checkbox} rounded border-2 border-surface-300 dark:border-surface-600 
          bg-white/50 dark:bg-surface-800/50 
          checked:bg-primary-500 checked:border-primary-500 
          focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-0
          transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
          accent-primary-500`}
      />
    </label>
  );
};

const SkeletonCell: Component<{ size: ComponentSize }> = (props) => (
  <div
    class={`animate-pulse bg-surface-200/50 dark:bg-surface-700/50 rounded ${
      props.size === 'sm' ? 'h-3' : props.size === 'lg' ? 'h-5' : 'h-4'
    }`}
    style={{ width: `${Math.random() * 40 + 40}%` }}
  />
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Table<T extends Record<string, unknown>>(
  props: Readonly<TableProps<T>>,
): ReturnType<Component> {
  // --- Default values ---
  const size = () => props.size ?? 'md';
  const variant = () => props.variant ?? 'default';
  const hoverable = () => props.hoverable ?? true;
  const loadingRows = () => props.loadingRows ?? 5;

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

  const getRowKey = (row: T, index: number): RowKey => {
    if (props.getRowKey) {
      return props.getRowKey(row, index);
    }
    // Fallback: try common id fields or use index
    if ('id' in row) return row.id as RowKey;
    if ('_id' in row) return row._id as RowKey;
    if ('key' in row) return row.key as RowKey;
    return index;
  };

  // --- Handlers ---
  const handleSort = (columnKey: string) => {
    const column = props.columns.find((c) => c.key === columnKey);
    if (!column?.sortable && !props.sortable) {
      return;
    }

    const current = currentSort();
    let newDirection: SortDirection = 'asc';

    if (current.column === columnKey) {
      if (current.direction === 'asc') {
        newDirection = 'desc';
      } else if (current.direction === 'desc') {
        newDirection = null;
      }
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
      if (checked) {
        newKeys.add(key);
      } else {
        newKeys.delete(key);
      }
    }

    if (props.onSelectionChange) {
      const selectedRows = sortedData().filter((r, i) => newKeys.has(getRowKey(r, i)));
      props.onSelectionChange(newKeys, selectedRows);
    } else {
      setInternalSelectedKeys(newKeys);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const mode = selectionMode();
    if (mode !== 'multiple') return;

    let newKeys: Set<RowKey>;

    if (checked) {
      newKeys = new Set(sortedData().map((row, index) => getRowKey(row, index)));
    } else {
      newKeys = new Set();
    }

    if (props.onSelectionChange) {
      const selectedRows = checked ? [...sortedData()] : [];
      props.onSelectionChange(newKeys, selectedRows);
    } else {
      setInternalSelectedKeys(newKeys);
    }
  };

  const handleRowClick = (row: T, index: number, event: MouseEvent) => {
    if (props.onRowClick) {
      props.onRowClick(row, index, event);
    }

    // If single selection mode and clickableRows, toggle selection on click
    if (selectionMode() === 'single' && props.clickableRows) {
      const key = getRowKey(row, index);
      const isSelected = currentSelectedKeys().has(key);
      handleRowSelect(row, index, !isSelected);
    }
  };

  // --- Utilities ---
  const getCellValue = (row: T, key: string): unknown => {
    const keys = key.split('.');
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

  const alignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const getRowClassName = (row: T, index: number): string => {
    if (!props.rowClass) return '';
    if (typeof props.rowClass === 'function') {
      return props.rowClass(row, index);
    }
    return props.rowClass;
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

  // --- Sticky column styles ---
  const getStickyStyle = (column: TableColumn<T>, columnIndex: number): JSX.CSSProperties => {
    if (!column.sticky) return {};

    // Calculate left/right offset based on previous sticky columns
    let offset = 0;
    if (selectionMode()) {
      offset = size() === 'sm' ? 32 : size() === 'lg' ? 48 : 40; // Checkbox column width
    }

    if (column.sticky === 'left') {
      for (let i = 0; i < columnIndex; i++) {
        const col = props.columns[i];
        if (col?.sticky === 'left') {
          offset += parseInt(col.width ?? '100', 10) || 100;
        }
      }
      return { position: 'sticky', left: `${offset}px`, 'z-index': 10 };
    }

    if (column.sticky === 'right') {
      for (let i = props.columns.length - 1; i > columnIndex; i--) {
        const col = props.columns[i];
        if (col?.sticky === 'right') {
          offset += parseInt(col.width ?? '100', 10) || 100;
        }
      }
      return { position: 'sticky', right: `${offset}px`, 'z-index': 10 };
    }

    return {};
  };

  // --- Compute container styles ---
  const containerStyle = createMemo((): JSX.CSSProperties => {
    if (props.maxHeight) {
      return { 'max-height': props.maxHeight };
    }
    return {};
  });

  const shouldStickyHeader = () => props.stickyHeader || !!props.maxHeight;

  // --- Render ---
  return (
    <div class={`glass-card rounded-xl overflow-hidden ${props.class ?? ''}`} style={props.style}>
      <div class="overflow-x-auto overflow-y-auto" style={containerStyle()}>
        <table class="w-full">
          <thead class={shouldStickyHeader() ? 'sticky top-0 z-20 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm' : ''}>
            <tr class={variantStyles[variant()].headerRow}>
              {/* Selection checkbox column */}
              <Show when={selectionMode() === 'multiple'}>
                <th
                  class={`${sizeStyles[size()].header} font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 text-center ${variantStyles[variant()].headerCell}`}
                  style={{ width: size() === 'sm' ? '32px' : size() === 'lg' ? '48px' : '40px' }}
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
                  class={`${sizeStyles[size()].header} font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 ${variantStyles[variant()].headerCell}`}
                  style={{ width: size() === 'sm' ? '32px' : size() === 'lg' ? '48px' : '40px' }}
                />
              </Show>

              {/* Data columns */}
              <For each={props.columns}>
                {(column, columnIndex) => {
                  const isSortable = column.sortable ?? props.sortable;
                  const isActive = () => currentSort().column === column.key;
                  const sortDirection = () => (isActive() ? currentSort().direction : null);
                  const stickyStyle = () => getStickyStyle(column, columnIndex());
                  const stickyClass = column.sticky
                    ? 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm'
                    : '';

                  return (
                    <th
                      class={`${sizeStyles[size()].header} font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 ${alignClass(column.align)} ${variantStyles[variant()].headerCell} ${stickyClass} ${column.headerClass ?? ''} ${isSortable ? 'cursor-pointer select-none group hover:text-surface-900 dark:hover:text-surface-200 transition-colors' : ''}`}
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
                      tabindex={isSortable ? 0 : undefined}
                    >
                      <Show
                        when={!column.headerRender}
                        fallback={column.headerRender?.(column)}
                      >
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
          </thead>
          <tbody>
            {/* Loading state */}
            <Show when={props.loading}>
              <For each={Array.from({ length: loadingRows() })}>
                {() => (
                  <tr class={variantStyles[variant()].row}>
                    <Show when={selectionMode()}>
                      <td class={`${sizeStyles[size()].cell} text-center`}>
                        <div
                          class={`animate-pulse bg-surface-200/50 dark:bg-surface-700/50 rounded ${sizeStyles[size()].checkbox}`}
                        />
                      </td>
                    </Show>
                    <For each={props.columns}>
                      {(column, columnIndex) => (
                        <td
                          class={`${sizeStyles[size()].cell} ${alignClass(column.align)} ${variantStyles[variant()].cell} ${column.cellClass ?? ''}`}
                          style={{
                            width: column.width,
                            'min-width': column.minWidth,
                            ...getStickyStyle(column, columnIndex()),
                          }}
                        >
                          <SkeletonCell size={size()} />
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
                  class={`${sizeStyles[size()].cell} py-8 text-center text-surface-500 dark:text-surface-400`}
                >
                  <Show
                    when={!props.emptyRender}
                    fallback={props.emptyRender?.()}
                  >
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

                  return (
                    <tr
                      class={`
                        ${variantStyles[variant()].row}
                        ${hoverable() && !props.loading ? 'hover:bg-surface-50/50 dark:hover:bg-surface-800/30' : ''}
                        ${isSelected() ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''}
                        ${clickable() ? 'cursor-pointer' : ''}
                        ${getRowClassName(row, index())}
                        transition-colors
                      `}
                      onClick={(e) => handleRowClick(row, index(), e)}
                      onDblClick={(e) => props.onRowDoubleClick?.(row, index(), e)}
                    >
                      {/* Selection checkbox */}
                      <Show when={selectionMode()}>
                        <td
                          class={`${sizeStyles[size()].cell} text-center ${variantStyles[variant()].cell}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={isSelected()}
                            onChange={(checked) => handleRowSelect(row, index(), checked)}
                            size={size()}
                          />
                        </td>
                      </Show>

                      {/* Data cells */}
                      <For each={props.columns}>
                        {(column, columnIndex) => {
                          const value = getCellValue(row, column.key);
                          const stickyStyle = () => getStickyStyle(column, columnIndex());
                          const stickyClass = column.sticky
                            ? `bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm ${isSelected() ? '!bg-primary-50/90 dark:!bg-primary-900/40' : ''}`
                            : '';

                          return (
                            <td
                              class={`${sizeStyles[size()].cell} text-surface-800 dark:text-surface-200 ${alignClass(column.align)} ${variantStyles[variant()].cell} ${stickyClass} ${column.cellClass ?? ''}`}
                              style={{
                                width: column.width,
                                'min-width': column.minWidth,
                                ...stickyStyle(),
                              }}
                            >
                              <Show when={column.render} fallback={String(value ?? '')}>
                                {column.render?.(value, row, index())}
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
