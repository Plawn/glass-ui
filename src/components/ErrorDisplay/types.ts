import type { JSX } from 'solid-js';

export interface ErrorDisplayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The error message to display */
  message: string;
  /** The error title (default: 'Request Failed') */
  title?: string;
}
