import { createStore, produce } from 'solid-js/store';
import type { ToastStore, ToastType } from './types';

const [store, setStore] = createStore<ToastStore>({ toasts: [] });

let toastId = 0;

/** Add a toast notification */
function addToast(message: string, type: ToastType = 'info', duration = 4000) {
  const id = `toast-${++toastId}`;
  setStore(
    produce((s) => {
      s.toasts.push({ id, type, message, duration });
    }),
  );

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }

  return id;
}

/** Toast API with helper methods */
export const toast = Object.assign(
  (message: string, type: ToastType = 'info', duration = 4000) => addToast(message, type, duration),
  {
    success: (message: string, duration = 4000) => addToast(message, 'success', duration),
    error: (message: string, duration = 4000) => addToast(message, 'error', duration),
    warning: (message: string, duration = 4000) => addToast(message, 'warning', duration),
    info: (message: string, duration = 4000) => addToast(message, 'info', duration),
  }
);

/** Dismiss a toast by ID */
export function dismissToast(id: string) {
  setStore(
    produce((s) => {
      s.toasts = s.toasts.filter((t) => t.id !== id);
    }),
  );
}

/** Clear all toasts */
export function clearToasts() {
  setStore('toasts', []);
}

/** Get the toast store (read-only) */
export function getToastStore() {
  return store;
}
