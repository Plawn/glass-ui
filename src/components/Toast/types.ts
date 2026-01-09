import type { StatusColor } from '../../types';

export interface Toast {
  id: string;
  type: StatusColor;
  message: string;
  duration?: number;
}

export interface ToastStore {
  toasts: Toast[];
}

// Re-export shared types for convenience
export type { StatusColor as ToastType } from '../../types';
