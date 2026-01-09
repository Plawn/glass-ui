import type { BaseComponentProps } from '../../types';

export interface ErrorDisplayProps extends BaseComponentProps {
  /** The error message to display */
  message: string;
  /** The error title (default: 'Request Failed') */
  title?: string;
}
