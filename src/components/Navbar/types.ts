import type { JSX, ValidComponent } from 'solid-js';

/**
 * Navigation item for the Navbar
 */
export interface NavbarItem {
  /** Display label for the navigation item */
  label: string;
  /**
   * Element or component to render this item as (e.g. `'a'`, or `@solidjs/router`'s
   * `A`). Defaults to `'button'`. Set `as` (with `href`) to render a real link.
   */
  as?: ValidComponent;
  /** Optional href, forwarded to the rendered element (set `as` to make it a link) */
  href?: string;
  /** Anchor target, forwarded when rendering a link */
  target?: string;
  /** Anchor rel, forwarded when rendering a link */
  rel?: string;
  /** Optional click handler for programmatic navigation */
  onClick?: () => void;
  /** Whether this item is currently active */
  active?: boolean;
  /** Any additional props forwarded to the rendered element (e.g. router `activeClass`) */
  [key: string]: unknown;
}

export interface NavbarProps extends JSX.HTMLAttributes<HTMLElement> {
  /** Brand/logo element displayed on the left */
  brand?: JSX.Element;
  /** Navigation items */
  items?: NavbarItem[];
  /** Actions slot (buttons, icons) displayed on the right */
  actions?: JSX.Element;
  /** Whether the navbar should be sticky at the top */
  sticky?: boolean;
  /** Whether the navbar is transparent until scroll (no background until scroll) */
  transparent?: boolean;
}
