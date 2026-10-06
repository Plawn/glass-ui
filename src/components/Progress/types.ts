import type { JSX } from 'solid-js';
import type { ComponentSize, ProgressVariant } from '../../types';

/**
 * Progress color - primary plus status colors (no info/default)
 */
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error';

export interface ProgressProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Progress value (0-100) */
  value: number;
  /** Progress indicator variant */
  variant?: ProgressVariant;
  /** Size of the progress indicator */
  size?: ComponentSize;
  /** Color theme */
  color?: ProgressColor;
  /** Whether to show the percentage value */
  showValue?: boolean;
  /**
   * Accessible name of the progressbar (default: "Progress", unless
   * `aria-labelledby` is set). Applied to the `progressbar` element.
   */
  'aria-label'?: string;
  /** ID(s) of the element(s) naming the progressbar */
  'aria-labelledby'?: string;
  /** Human-readable value (default: the rounded percentage, e.g. "42%") */
  'aria-valuetext'?: string;
}

// Re-export shared types for convenience
export type {
  ProgressVariant,
  ComponentSize as ProgressSize,
} from '../../types';
