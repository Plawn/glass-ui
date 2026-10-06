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

/**
 * Options for typed notification stores.
 */
export interface CreateTypedNotificationStoreOptions
  extends CreateNotificationStoreOptions {
  /**
   * Default duration per status type, overriding `defaultDuration`
   * (0 = no auto-dismiss for that type).
   */
  durationByType?: Partial<Record<StatusColor, number>>;
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
  /** Pause the auto-dismiss countdown of a notification (e.g. on hover/focus) */
  pause: (id: string) => void;
  /** Resume a paused auto-dismiss countdown with its remaining time */
  resume: (id: string) => void;
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
  /** Default duration applied to a type when no duration is given */
  durationFor: (type: StatusColor) => number;
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

  /** Auto-dismiss countdown; `timer` is undefined while paused. */
  interface Countdown {
    remaining: number;
    startedAt: number;
    timer?: ReturnType<typeof setTimeout>;
  }
  const countdowns = new Map<string, Countdown>();

  function startCountdown(id: string, countdown: Countdown): void {
    countdown.startedAt = Date.now();
    countdown.timer = setTimeout(() => {
      countdowns.delete(id);
      dismiss(id);
    }, countdown.remaining);
  }

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
      const countdown: Countdown = { remaining: duration, startedAt: 0 };
      countdowns.set(id, countdown);
      startCountdown(id, countdown);
    }

    return id;
  }

  function dismiss(id: string): void {
    const countdown = countdowns.get(id);
    if (countdown) {
      clearTimeout(countdown.timer);
      countdowns.delete(id);
    }
    setStore(
      produce((state) => {
        state.items = state.items.filter((item) => item.id !== id);
      }),
    );
  }

  function clear(): void {
    for (const countdown of countdowns.values()) {
      clearTimeout(countdown.timer);
    }
    countdowns.clear();
    setStore('items', []);
  }

  function pause(id: string): void {
    const countdown = countdowns.get(id);
    if (!countdown || countdown.timer === undefined) {
      return;
    }
    clearTimeout(countdown.timer);
    countdown.timer = undefined;
    countdown.remaining = Math.max(
      0,
      countdown.remaining - (Date.now() - countdown.startedAt),
    );
  }

  function resume(id: string): void {
    const countdown = countdowns.get(id);
    if (!countdown || countdown.timer !== undefined) {
      return;
    }
    startCountdown(id, countdown);
  }

  return {
    store,
    add,
    dismiss,
    clear,
    pause,
    resume,
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
  options: CreateTypedNotificationStoreOptions = {},
): TypedNotificationAPI<T> {
  const baseAPI = createNotificationStore<T>(options);
  const { defaultDuration = 4000, durationByType = {} } = options;

  const durationFor = (type: StatusColor): number =>
    durationByType[type] ?? defaultDuration;

  function createTypedHelper(type: StatusColor) {
    return (message: string, duration: number = durationFor(type)): string => {
      return baseAPI.add({ message, type, duration } as Omit<T, 'id'>);
    };
  }

  return {
    ...baseAPI,
    success: createTypedHelper('success'),
    error: createTypedHelper('error'),
    warning: createTypedHelper('warning'),
    info: createTypedHelper('info'),
    durationFor,
  };
}
