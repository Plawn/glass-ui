import { createStore } from 'solid-js/store';

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

const [store, setStore] = createStore<SnackbarStore>({
  snackbars: [],
});

let idCounter = 0;

export function showSnackbar(
  message: string,
  options?: { action?: string; onAction?: () => void; duration?: number }
): string {
  const id = `snackbar-${++idCounter}`;
  const snackbar: SnackbarItem = {
    id,
    message,
    action: options?.action,
    onAction: options?.onAction,
    duration: options?.duration ?? 4000,
  };

  setStore('snackbars', (prev) => [...prev, snackbar]);
  return id;
}

export function dismissSnackbar(id: string): void {
  setStore('snackbars', (prev) => prev.filter((s) => s.id !== id));
}

export function clearSnackbars(): void {
  setStore('snackbars', []);
}

export function getSnackbarStore() {
  return store;
}

// Convenience API
export const snackbar = {
  show: showSnackbar,
  dismiss: dismissSnackbar,
  clear: clearSnackbars,
};
