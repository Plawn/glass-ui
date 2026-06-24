import type { JSX, ValidComponent } from 'solid-js';
import type { IconProps } from '../../types';

export interface BreadcrumbItem extends IconProps {
  /** Display label for the breadcrumb item */
  label: string;
  /**
   * Element or component to render this item as (e.g. `'a'`, or `@solidjs/router`'s
   * `A`). Defaults to `'button'` when `onClick` is provided, otherwise `'span'`.
   * The current (last) item is always a non-interactive `<span>`.
   */
  as?: ValidComponent;
  /** Optional href, forwarded to the rendered element (set `as` to make it a link) */
  href?: string;
  /** Anchor target, forwarded when rendering a link */
  target?: string;
  /** Anchor rel, forwarded when rendering a link */
  rel?: string;
  /** Optional click handler for programmatic navigation */
  onClick?: (e: MouseEvent) => void;
  /** Any additional props forwarded to the rendered element (e.g. router `activeClass`) */
  [key: string]: unknown;
}

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {
  /** Breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Custom separator element (default: /) */
  separator?: JSX.Element;
}
