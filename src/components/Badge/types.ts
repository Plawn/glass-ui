import type { JSX } from 'solid-js';
import type {
  ComponentSize,
  StatusColor,
  HttpMethodColor,
  BaseComponentProps,
} from '../../types';

/**
 * Badge variant - status colors plus 'default' and 'method'
 */
export type BadgeVariant = 'default' | StatusColor | 'method';

export interface BadgeProps extends BaseComponentProps {
  /** Badge content */
  children: JSX.Element;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: ComponentSize;
  /** HTTP method for method variant - determines color scheme */
  method?: HttpMethodColor;
}

// Re-export shared types for convenience
export type { ComponentSize as BadgeSize, HttpMethodColor as HttpMethod } from '../../types';
