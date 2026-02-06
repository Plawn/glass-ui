import { type Accessor, createEffect, on, onCleanup } from 'solid-js';

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

  // Capture the original overflow once, before any locking happens
  let originalOverflow: string | undefined;

  createEffect(
    on(enabled, (isEnabled) => {
      if (isEnabled) {
        originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      } else if (originalOverflow !== undefined) {
        document.body.style.overflow = originalOverflow;
        originalOverflow = undefined;
      }
    }),
  );

  // Always restore on component disposal, regardless of current enabled state
  onCleanup(() => {
    if (originalOverflow !== undefined) {
      document.body.style.overflow = originalOverflow;
    }
  });
}
