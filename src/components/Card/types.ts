import type { JSX } from 'solid-js';
import type { BaseComponentProps, CardVariant } from '../../types';

export interface CardProps extends BaseComponentProps {
  /** Card header content */
  header?: JSX.Element;
  /** Card body content */
  children: JSX.Element;
  /** Card footer content */
  footer?: JSX.Element;
  /** Visual variant */
  variant?: CardVariant;
}

// Re-export shared types for convenience
export type { CardVariant } from '../../types';
