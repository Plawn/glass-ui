import type { JSX } from '@solidjs/web';

export interface ErrorDisplayProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The error message to display */
  message: string;
  /** The error title (default: 'Request Failed') */
  title?: string;
}
