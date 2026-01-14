import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

/**
 * Navigation item for the Navbar
 */
export interface NavbarItem {
  /** Display label for the navigation item */
  label: string;
  /** Optional href for link-based navigation */
  href?: string;
  /** Optional click handler for programmatic navigation */
  onClick?: () => void;
  /** Whether this item is currently active */
  active?: boolean;
}

export interface NavbarProps extends BaseComponentProps {
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
