import type { JSX } from 'solid-js';
import type { SkeletonVariant } from '../../types';

export interface SkeletonProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (CSS value) */
  width?: string;
  /** Height of the skeleton (CSS value) */
  height?: string;
  /** Whether to apply rounded corners */
  rounded?: boolean;
  /** Skeleton shape variant */
  variant?: SkeletonVariant;
}

// Re-export shared types for convenience
export type { SkeletonVariant } from '../../types';
