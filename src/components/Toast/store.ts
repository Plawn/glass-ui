import { createTypedNotificationStore } from '../shared/createNotificationStore';
import type { Toast, ToastStore, ToastType } from './types';

/** Default auto-dismiss delay for success/info/warning toasts (ms) */
export const TOAST_DEFAULT_DURATION = 4000;
/** Default auto-dismiss delay for error toasts (ms) */
export const TOAST_ERROR_DURATION = 10000;

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
  pause,
  resume,
  durationFor,
} = createTypedNotificationStore<Toast>({
  defaultDuration: TOAST_DEFAULT_DURATION,
  // Errors stay longer so they can be read (and are paused on hover/focus)
  durationByType: { error: TOAST_ERROR_DURATION },
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
  (message: string, type: ToastType = 'info', duration = durationFor(type)) =>
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

/** Pause a toast's auto-dismiss countdown (used on hover/focus) */
export function pauseToast(id: string) {
  pause(id);
}

/** Resume a paused toast's auto-dismiss countdown */
export function resumeToast(id: string) {
  resume(id);
}

/** Clear all toasts */
export function clearToasts() {
  clear();
}

/** Get the toast store (read-only) */
export function getToastStore(): ToastStore {
  return toastStore;
}
