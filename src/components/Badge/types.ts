import type { JSX } from 'solid-js';
import type {
  BaseComponentProps,
  ComponentSize,
  StatusColor,
} from '../../types';

/**
 * Badge variant - status colors plus 'default'
 */
export type BadgeVariant = 'default' | StatusColor;

export interface BadgeProps extends BaseComponentProps {
  /** Badge content */
  children: JSX.Element;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: ComponentSize;
}

// Re-export shared types for convenience
export type { ComponentSize as BadgeSize } from '../../types';
