import type { JSX } from 'solid-js';
import type { OverlayBehaviorProps, OverlaySize } from '../../types';

export interface ModalProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'>,
    OverlayBehaviorProps {
  /** Whether the overlay is open */
  open: boolean;
  /**
   * Called when the overlay requests to close.
   * @deprecated Use `onOpenChange` instead. Kept for backwards compatibility.
   */
  onClose?: () => void;
  /** Called when the open state should change (receives the new open state). */
  onOpenChange?: (open: boolean) => void;
  /** Title displayed in the header */
  title?: string;
  /** Modal content */
  children: JSX.Element;
  /** Size variant */
  size?: OverlaySize;
  /** Footer content */
  footer?: JSX.Element;
}

// Re-export shared types for convenience
export type { OverlaySize as ModalSize } from '../../types';
