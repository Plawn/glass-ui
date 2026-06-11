import { type Component, For, Show, createMemo, splitProps } from 'solid-js';
import { ChevronLeftIcon, ChevronRightIcon } from '../shared/icons';
import type { PaginationProps } from './types';

export const Pagination: Component<PaginationProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'pageSizeOptions',
    'total',
    'pageSize',
    'page',
    'onChange',
    'onPageSizeChange',
    'showPageSize',
    'class',
  ]);

  const defaultPageSizeOptions = [10, 20, 50, 100];
  const pageSizeOptions = () => local.pageSizeOptions ?? defaultPageSizeOptions;

  const totalPages = createMemo(() => Math.ceil(local.total / local.pageSize));

  const canGoPrev = () => local.page > 1;
  const canGoNext = () => local.page < totalPages();

  const handlePrev = () => {
    if (canGoPrev()) {
      local.onChange(local.page - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext()) {
      local.onChange(local.page + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== local.page) {
      local.onChange(page);
    }
  };

  const handlePageSizeChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const newPageSize = Number.parseInt(target.value, 10);
    local.onPageSizeChange?.(newPageSize);
    // Reset to page 1 when page size changes
    local.onChange(1);
  };

  // Generate page numbers to display
  const pageNumbers = createMemo(() => {
    const total = totalPages();
    const current = local.page;
    const pages: (number | 'ellipsis')[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (total > 1) {
        pages.push(total);
      }
    }

    return pages;
  });

  const buttonBaseClass =
    'inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors';
  const buttonInactiveClass =
    'text-surface-600 dark:text-surface-400 hover:bg-black/5 dark:hover:bg-white/5';
  const buttonActiveClass =
    'glass-active text-surface-900 dark:text-surface-100';
  const buttonDisabledClass =
    'text-surface-300 dark:text-surface-600 cursor-not-allowed';

  return (
    <nav
      {...rest}
      aria-label="Pagination"
      class={`flex items-center gap-4 ${local.class ?? ''}`}
    >
      {/* Page size selector */}
      <Show when={local.showPageSize}>
        <div class="flex items-center gap-2">
          <span class="text-sm text-surface-600 dark:text-surface-400">
            Show
          </span>
          <select
            value={local.pageSize}
            onChange={handlePageSizeChange}
            class="glass-input px-2 py-1 text-sm rounded-lg"
            aria-label="Items per page"
          >
            <For each={pageSizeOptions()}>
              {(size) => <option value={size}>{size}</option>}
            </For>
          </select>
          <span class="text-sm text-surface-600 dark:text-surface-400">
            per page
          </span>
        </div>
      </Show>

      {/* Pagination controls */}
      <div class="flex items-center gap-1">
        {/* Previous button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev()}
          class={`${buttonBaseClass} ${canGoPrev() ? buttonInactiveClass : buttonDisabledClass}`}
          aria-label="Previous page"
        >
          <ChevronLeftIcon class="w-4 h-4" />
        </button>

        {/* Page numbers */}
        <For each={pageNumbers()}>
          {(page) => (
            <Show
              when={page !== 'ellipsis'}
              fallback={
                <span
                  class="w-8 h-8 flex items-center justify-center text-surface-400 dark:text-surface-600"
                  aria-hidden="true"
                >
                  ...
                </span>
              }
            >
              <button
                type="button"
                onClick={() => handlePageClick(page as number)}
                class={`${buttonBaseClass} ${
                  local.page === page ? buttonActiveClass : buttonInactiveClass
                }`}
                aria-label={`Page ${page}`}
                aria-current={local.page === page ? 'page' : undefined}
              >
                {page}
              </button>
            </Show>
          )}
        </For>

        {/* Next button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoNext()}
          class={`${buttonBaseClass} ${canGoNext() ? buttonInactiveClass : buttonDisabledClass}`}
          aria-label="Next page"
        >
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>

      {/* Page info */}
      <Show when={local.total > 0}>
        <span class="text-sm text-surface-600 dark:text-surface-400">
          {(local.page - 1) * local.pageSize + 1}-
          {Math.min(local.page * local.pageSize, local.total)} of {local.total}
        </span>
      </Show>
    </nav>
  );
};
