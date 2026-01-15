import type { JSX } from 'solid-js';
import type { DrawerPosition, DrawerSize, OverlayProps } from '../../types';

// Re-export from central types for backwards compatibility
export type { DrawerSize } from '../../types';

export interface DrawerProps extends OverlayProps {
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
