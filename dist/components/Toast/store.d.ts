import { ToastStore, ToastType } from './types';
/** Add a toast notification */
export declare function toast(message: string, type?: ToastType, duration?: number): string;
/** Dismiss a toast by ID */
export declare function dismissToast(id: string): void;
/** Clear all toasts */
export declare function clearToasts(): void;
/** Get the toast store (read-only) */
export declare function getToastStore(): ToastStore;
//# sourceMappingURL=store.d.ts.map