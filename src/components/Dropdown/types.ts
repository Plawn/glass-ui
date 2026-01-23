import type { JSX } from 'solid-js';
import type { OverlayScrollBehavior } from '../../hooks';
import type { BaseComponentProps, DropdownPlacement } from '../../types';

// Re-export from central types for backwards compatibility
export type { DropdownPlacement } from '../../types';

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
  /**
   * How to handle scroll when dropdown is open
   * - 'close': Close on scroll (default)
   * - 'lock': Prevent body scroll while open
   * - 'none': Stay open and allow scroll
   */
  scrollBehavior?: OverlayScrollBehavior;
}
