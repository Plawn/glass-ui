import type { JSX } from 'solid-js';

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export type MenuItem =
  | {
      /** Display label for the menu item */
      label: string;
      /** Click handler */
      onClick?: () => void;
      /** Optional icon element */
      icon?: JSX.Element;
      /** Whether the item is disabled */
      disabled?: boolean;
      /** Must be false or omitted for regular items */
      divider?: false;
    }
  | {
      /** Divider item - renders a horizontal line */
      divider: true;
      label?: never;
      onClick?: never;
      icon?: never;
      disabled?: never;
    };

export interface MenuProps {
  /** Trigger element that opens the menu */
  trigger: JSX.Element;
  /** Menu items to display */
  items: MenuItem[];
  /** Menu placement relative to trigger */
  placement?: MenuPlacement;
  /** Additional CSS classes for the menu container */
  class?: string;
}
