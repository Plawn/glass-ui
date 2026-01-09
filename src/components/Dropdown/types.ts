import type { JSX } from 'solid-js';
import type { Placement, BaseComponentProps } from '../../types';

/**
 * Dropdown placement - vertical placements only
 */
export type DropdownPlacement = Extract<Placement, 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'bottom' | 'top'>;

export interface DropdownProps extends BaseComponentProps {
  /** Trigger element that opens the dropdown */
  trigger: JSX.Element;
  /** Content to display in the dropdown */
  children: JSX.Element;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Dropdown placement relative to trigger */
  placement?: DropdownPlacement;
  /** Additional CSS classes for the content container */
  contentClass?: string;
}
