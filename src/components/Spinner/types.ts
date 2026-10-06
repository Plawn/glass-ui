import type { JSX } from 'solid-js';
import type { SpinnerSize } from '../../types';

// Re-export from central types
export type { SpinnerSize } from '../../types';

/**
 * Spinner color variants
 */
export type SpinnerColor = 'default' | 'white';

export interface SpinnerProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'color' | 'role'> {
  /** Spinner size */
  size?: SpinnerSize;
  /** Color variant - use 'white' for dark backgrounds */
  color?: SpinnerColor;
  /** Optional label text displayed next to the spinner */
  label?: string;
  /** Whether to center the spinner in its parent container */
  centered?: boolean;
  /**
   * ARIA role (default: 'status'). When `aria-hidden` is set the spinner is
   * decorative and gets neither a role nor an aria-label unless `role` is
   * passed explicitly.
   */
  role?: JSX.HTMLAttributes<HTMLDivElement>['role'];
}
