import type { JSX } from 'solid-js';
import type { OverlayScrollBehavior } from '../../hooks';
import type { BaseComponentProps, Placement } from '../../types';

/**
 * Popover placement options - all 12 positions (alias for Placement)
 */
export type PopoverPlacement = Placement;

export interface PopoverProps extends BaseComponentProps {
  /** Trigger element that opens the popover on click */
  trigger: JSX.Element;
  /** Content to display in the popover */
  children: JSX.Element;
  /** Popover placement relative to trigger */
  placement?: Placement;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether to show an arrow pointing to the trigger */
  showArrow?: boolean;
  /** Offset distance from the trigger (in pixels) */
  offset?: number;
  /** Additional CSS classes for the content container */
  contentClass?: string;
  /** Additional props to pass to the trigger button (e.g., keyboard handlers) */
  triggerProps?: Omit<
    JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'ref'
  >;
  /**
   * How to handle scroll when popover is open
   * - 'close': Close on scroll (default)
   * - 'lock': Prevent body scroll while open
   * - 'none': Stay open and allow scroll
   */
  scrollBehavior?: OverlayScrollBehavior;
}
