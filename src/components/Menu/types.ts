import type { JSX } from 'solid-js';
import type {
  BaseComponentProps,
  DisableableProps,
  IconProps,
  Placement,
} from '../../types';

/**
 * Menu placement - subset of Placement for vertical menus
 */
export type MenuPlacement = Extract<
  Placement,
  'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
>;

export type MenuItem =
  | ({
      /** Display label for the menu item */
      label: string;
      /** Click handler */
      onClick?: () => void;
      /** Must be false or omitted for regular items */
      divider?: false;
    } & DisableableProps &
      IconProps)
  | {
      /** Divider item - renders a horizontal line */
      divider: true;
      label?: never;
      onClick?: never;
      icon?: never;
      disabled?: never;
    };

export interface MenuProps extends BaseComponentProps {
  /** Trigger element that opens the menu */
  trigger: JSX.Element;
  /** Menu items to display */
  items: MenuItem[];
  /** Menu placement relative to trigger */
  placement?: MenuPlacement;
}
