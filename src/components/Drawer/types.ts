import type { JSX } from 'solid-js';
import type {
  DrawerPosition,
  DrawerSize,
  OverlayBehaviorProps,
} from '../../types';

// Re-export from central types for backwards compatibility
export type { DrawerSize } from '../../types';

export interface DrawerProps
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
  /** Drawer content */
  children: JSX.Element;
  /** Position of the drawer */
  position?: DrawerPosition;
  /** Size variant */
  size?: DrawerSize;
  /** Footer content */
  footer?: JSX.Element;
  /** Remove padding from content area */
  noPadding?: boolean;
}

// Re-export shared types for convenience
export type { DrawerPosition } from '../../types';
