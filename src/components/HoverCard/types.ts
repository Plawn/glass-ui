import type { JSX } from 'solid-js';
import type { Direction, BaseComponentProps } from '../../types';

/**
 * HoverCard placement options
 */
export type HoverCardPlacement = Direction;

export interface HoverCardProps extends BaseComponentProps {
  /** Trigger element that shows the hover card on hover */
  trigger: JSX.Element;
  /** Rich content to display in the hover card */
  children: JSX.Element;
  /** Hover card placement relative to trigger */
  placement?: HoverCardPlacement;
  /** Delay before showing the hover card (ms) */
  openDelay?: number;
  /** Delay before hiding the hover card (ms) */
  closeDelay?: number;
  /** Whether to show an arrow pointing to the trigger */
  showArrow?: boolean;
  /** Whether the hover card is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the content container */
  contentClass?: string;
}
