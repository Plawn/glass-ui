import type { JSX } from 'solid-js';
import type { BaseComponentProps, ComponentSize } from '../../types';

export type EmptyStateSize = ComponentSize;

export interface EmptyStateProps extends BaseComponentProps {
  /** Optional icon element displayed at the top */
  icon?: JSX.Element;
  /** Title text (required) */
  title: string;
  /** Optional description text displayed below the title */
  description?: string;
  /** Optional action element (e.g., a Button) */
  action?: JSX.Element;
  /** Size variant affecting icon and text sizes */
  size?: EmptyStateSize;
}
