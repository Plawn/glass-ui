import { createTypedNotificationStore } from '../shared/createNotificationStore';
import type { Toast, ToastStore, ToastType } from './types';

// Create the toast notification store using the factory
const {
  store: internalStore,
  success,
  error,
  warning,
  info,
  add,
  dismiss,
  clear,
} = createTypedNotificationStore<Toast>({
  defaultDuration: 4000,
  idPrefix: 'toast',
});

// Adapt the internal store shape to match the expected ToastStore interface
// The factory uses { items: T[] } but Toast expects { toasts: Toast[] }
const toastStore: ToastStore = {
  get toasts() {
    return internalStore.items;
  },
};

/** Toast API with helper methods */
export const toast = Object.assign(
  (message: string, type: ToastType = 'info', duration = 4000) =>
    add({ message, type, duration }),
  {
    success,
    error,
    warning,
    info,
  },
);

/** Dismiss a toast by ID */
export function dismissToast(id: string) {
  dismiss(id);
}

/** Clear all toasts */
export function clearToasts() {
  clear();
}

/** Get the toast store (read-only) */
export function getToastStore(): ToastStore {
  return toastStore;
}
