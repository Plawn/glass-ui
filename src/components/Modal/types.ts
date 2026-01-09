import type { JSX } from 'solid-js';
import type { OverlaySize, OverlayProps } from '../../types';

export interface ModalProps extends OverlayProps {
  /** Modal content */
  children: JSX.Element;
  /** Size variant */
  size?: OverlaySize;
  /** Footer content */
  footer?: JSX.Element;
}

// Re-export shared types for convenience
export type { OverlaySize as ModalSize } from '../../types';
