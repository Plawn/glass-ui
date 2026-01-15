import { type Accessor, createEffect, onCleanup } from 'solid-js';

export interface UseBodyScrollLockOptions {
  /** Signal indicating whether body scroll should be locked */
  enabled: Accessor<boolean>;
}

/**
 * Hook to lock body scroll when a modal/dialog is open.
 * Sets document.body.style.overflow to 'hidden' when enabled and restores
 * the original value on cleanup.
 *
 * @example
 * ```tsx
 * // Lock scroll when modal is open
 * useBodyScrollLock({
 *   enabled: isOpen,
 * });
 * ```
 */
export function useBodyScrollLock(options: UseBodyScrollLockOptions): void {
  const { enabled } = options;

  createEffect(() => {
    if (enabled()) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      onCleanup(() => {
        document.body.style.overflow = originalOverflow;
      });
    }
  });
}
