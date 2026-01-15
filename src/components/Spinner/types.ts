import type { BaseComponentProps, SpinnerSize } from '../../types';

// Re-export from central types
export type { SpinnerSize } from '../../types';

/**
 * Spinner color variants
 */
export type SpinnerColor = 'default' | 'white';

export interface SpinnerProps extends BaseComponentProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Color variant - use 'white' for dark backgrounds */
  color?: SpinnerColor;
  /** Optional label text displayed next to the spinner */
  label?: string;
  /** Whether to center the spinner in its parent container */
  centered?: boolean;
}
