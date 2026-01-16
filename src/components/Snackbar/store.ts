import { createNotificationStore } from '../shared/createNotificationStore';

export interface SnackbarItem {
  id: string;
  message: string;
  action?: string;
  onAction?: () => void;
  duration?: number;
}

export interface SnackbarStore {
  snackbars: SnackbarItem[];
}

// Create the snackbar notification store using the factory
const { store: internalStore, add, dismiss, clear } =
  createNotificationStore<SnackbarItem>({
    defaultDuration: 4000,
    idPrefix: 'snackbar',
  });

// Adapt the internal store shape to match the expected SnackbarStore interface
// The factory uses { items: T[] } but Snackbar expects { snackbars: SnackbarItem[] }
const snackbarStore: SnackbarStore = {
  get snackbars() {
    return internalStore.items;
  },
};

export function showSnackbar(
  message: string,
  options?: { action?: string; onAction?: () => void; duration?: number },
): string {
  return add({
    message,
    action: options?.action,
    onAction: options?.onAction,
    duration: options?.duration,
  });
}

export function dismissSnackbar(id: string): void {
  dismiss(id);
}

export function clearSnackbars(): void {
  clear();
}

export function getSnackbarStore(): SnackbarStore {
  return snackbarStore;
}

// Convenience API
export const snackbar = {
  show: showSnackbar,
  dismiss: dismissSnackbar,
  clear: clearSnackbars,
};
