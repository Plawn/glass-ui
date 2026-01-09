import type { JSX } from 'solid-js';
import type { DrawerPosition, OverlayProps } from '../../types';

/**
 * Drawer size - excludes 'full' since drawers slide from edges
 */
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';

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
