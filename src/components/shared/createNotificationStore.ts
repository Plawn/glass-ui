import { createStore, produce } from 'solid-js/store';
import type { StatusColor } from '../../types';

// =============================================================================
// Base Types
// =============================================================================

/**
 * Base notification item that all notification types must extend.
 */
export interface BaseNotification {
  id: string;
  message: string;
  duration?: number;
}

/**
 * Notification with status color support (used by Toast).
 */
export interface TypedNotification extends BaseNotification {
  type: StatusColor;
}

/**
 * Store shape for notification stores.
 */
export interface NotificationStore<T extends BaseNotification> {
  items: T[];
}

// =============================================================================
// Factory Options
// =============================================================================

/**
 * Configuration options for creating a notification store.
 */
export interface CreateNotificationStoreOptions {
  /** Default duration in ms before auto-dismiss (0 = no auto-dismiss) */
  defaultDuration?: number;
  /** Prefix for generated notification IDs */
  idPrefix?: string;
}

// =============================================================================
// Factory Return Types
// =============================================================================

/**
 * Core API returned by the notification store factory.
 */
export interface NotificationStoreAPI<T extends BaseNotification> {
  /** The reactive store containing all notifications */
  store: NotificationStore<T>;
  /** Add a notification to the store */
  add: (notification: Omit<T, 'id'>) => string;
  /** Dismiss a notification by ID */
  dismiss: (id: string) => void;
  /** Clear all notifications */
  clear: () => void;
}

/**
 * Extended API with type-safe helper methods for status colors.
 */
export interface TypedNotificationAPI<T extends TypedNotification>
  extends NotificationStoreAPI<T> {
  /** Show a success notification */
  success: (message: string, duration?: number) => string;
  /** Show an error notification */
  error: (message: string, duration?: number) => string;
  /** Show a warning notification */
  warning: (message: string, duration?: number) => string;
  /** Show an info notification */
  info: (message: string, duration?: number) => string;
}

// =============================================================================
// Factory Implementation
// =============================================================================

/**
 * Creates a notification store with standard add/dismiss/clear functionality.
 *
 * This is the base factory for creating notification systems. It handles:
 * - ID generation
 * - Auto-dismiss with configurable duration
 * - Adding/removing notifications from the reactive store
 *
 * @example
 * ```ts
 * const { store, add, dismiss, clear } = createNotificationStore<MyNotification>({
 *   defaultDuration: 4000,
 *   idPrefix: 'notification'
 * });
 * ```
 */
export function createNotificationStore<T extends BaseNotification>(
  options: CreateNotificationStoreOptions = {},
): NotificationStoreAPI<T> {
  const { defaultDuration = 4000, idPrefix = 'notification' } = options;

  const [store, setStore] = createStore<NotificationStore<T>>({ items: [] });

  let idCounter = 0;

  function add(notification: Omit<T, 'id'>): string {
    const id = `${idPrefix}-${++idCounter}`;
    const item = { ...notification, id } as T;

    setStore(
      produce((state) => {
        state.items.push(item);
      }),
    );

    const duration = notification.duration ?? defaultDuration;
    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  }

  function dismiss(id: string): void {
    setStore(
      produce((state) => {
        state.items = state.items.filter((item) => item.id !== id);
      }),
    );
  }

  function clear(): void {
    setStore('items', []);
  }

  return {
    store,
    add,
    dismiss,
    clear,
  };
}

/**
 * Creates a typed notification store with status color helper methods.
 *
 * This extends the base factory with success/error/warning/info helpers
 * for notifications that use the StatusColor type system.
 *
 * @example
 * ```ts
 * const { store, success, error, warning, info, dismiss, clear } =
 *   createTypedNotificationStore<Toast>({
 *     defaultDuration: 4000,
 *     idPrefix: 'toast'
 *   });
 *
 * success('Operation completed!');
 * error('Something went wrong', 6000);
 * ```
 */
export function createTypedNotificationStore<T extends TypedNotification>(
  options: CreateNotificationStoreOptions = {},
): TypedNotificationAPI<T> {
  const baseAPI = createNotificationStore<T>(options);
  const { defaultDuration = 4000 } = options;

  function createTypedHelper(type: StatusColor) {
    return (message: string, duration: number = defaultDuration): string => {
      return baseAPI.add({ message, type, duration } as Omit<T, 'id'>);
    };
  }

  return {
    ...baseAPI,
    success: createTypedHelper('success'),
    error: createTypedHelper('error'),
    warning: createTypedHelper('warning'),
    info: createTypedHelper('info'),
  };
}
