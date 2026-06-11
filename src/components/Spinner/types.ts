import type { JSX } from 'solid-js';
import type { SpinnerSize } from '../../types';

// Re-export from central types
export type { SpinnerSize } from '../../types';

/**
 * Spinner color variants
 */
export type SpinnerColor = 'default' | 'white';

export interface SpinnerProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Spinner size */
  size?: SpinnerSize;
  /** Color variant - use 'white' for dark backgrounds */
  color?: SpinnerColor;
  /** Optional label text displayed next to the spinner */
  label?: string;
  /** Whether to center the spinner in its parent container */
  centered?: boolean;
}
