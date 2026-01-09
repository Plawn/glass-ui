import type {
  ComponentSize,
  ProgressVariant,
  BaseComponentProps,
} from '../../types';

/**
 * Progress color - primary plus status colors (no info/default)
 */
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error';

export interface ProgressProps extends BaseComponentProps {
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
}

// Re-export shared types for convenience
export type { ProgressVariant, ComponentSize as ProgressSize } from '../../types';
