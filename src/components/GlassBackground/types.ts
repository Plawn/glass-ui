import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

export interface GlassBackgroundBlob {
  /** Position from top (CSS value) */
  top?: string;
  /** Position from left (CSS value) */
  left?: string;
  /** Position from right (CSS value) */
  right?: string;
  /** Position from bottom (CSS value) */
  bottom?: string;
  /** Size of the blob (CSS value) */
  size?: string;
  /** Gradient colors */
  colors: [string, string];
  /** Opacity in light mode (0-1) */
  opacity?: number;
  /** Opacity in dark mode (0-1) */
  darkOpacity?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
}

export interface GlassBackgroundGradient {
  from: string;
  via?: string;
  to: string;
}

export interface GlassBackgroundProps extends BaseComponentProps {
  /** Child content to render on top of the background */
  children?: JSX.Element;
  /** Custom blobs configuration. If not provided, uses default blobs */
  blobs?: GlassBackgroundBlob[];
  /** Whether to animate the blobs */
  animated?: boolean;
  /** Base gradient colors for the background (light mode) */
  gradient?: GlassBackgroundGradient;
  /** Base gradient colors for the background (dark mode) */
  darkGradient?: GlassBackgroundGradient;
}
