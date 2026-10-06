import type { StatusColor } from '../../types';

export interface Toast {
  /** Unique identifier for the toast */
  id: string;
  /** Visual style / severity of the toast */
  type: StatusColor;
  /** Text content displayed in the toast */
  message: string;
  /**
   * Auto-dismiss delay in milliseconds (0 = until dismissed). Defaults to
   * 4000 ms, or 10000 ms for `error`. The countdown pauses on hover/focus.
   */
  duration?: number;
}

export interface ToastStore {
  /** List of currently active toasts */
  toasts: Toast[];
}

// Re-export shared types for convenience
export type { StatusColor as ToastType } from '../../types';
