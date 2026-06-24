import type { JSX, ValidComponent } from 'solid-js';

export interface PaginationProps
  extends Omit<JSX.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total number of items */
  total: number;
  /** Current page (1-indexed) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Callback when page changes */
  onChange: (page: number) => void;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Element or component to render numbered page items as (e.g. `'a'`, or
   * `@solidjs/router`'s `A`). Defaults to `'button'`. Use with `getPageProps`
   * to build a real per-page link (e.g. `href`).
   */
  as?: ValidComponent;
  /**
   * Returns extra props (e.g. `href`) for a numbered page element. Called per
   * page number; combine with `as` to render real links.
   */
  getPageProps?: (page: number) => Record<string, unknown>;
}
