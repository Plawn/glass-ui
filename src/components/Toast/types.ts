import type { StatusColor } from '../../types';

export interface Toast {
  /** Unique identifier for the toast */
  id: string;
  /** Visual style / severity of the toast */
  type: StatusColor;
  /** Text content displayed in the toast */
  message: string;
  /** Auto-dismiss delay in milliseconds (defaults to library default when omitted) */
  duration?: number;
}

export interface ToastStore {
  /** List of currently active toasts */
  toasts: Toast[];
}

// Re-export shared types for convenience
export type { StatusColor as ToastType } from '../../types';
