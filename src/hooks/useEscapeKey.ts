import { type Accessor, createEffect, onCleanup } from 'solid-js';

export interface UseEscapeKeyOptions {
  /** Callback function to execute when Escape key is pressed */
  onEscape: () => void;
  /** Optional signal to enable/disable the listener. Defaults to always enabled. */
  enabled?: Accessor<boolean>;
}

/**
 * Hook to handle Escape key press events.
 * Automatically manages adding/removing the event listener based on the enabled signal.
 *
 * @example
 * ```tsx
 * // Basic usage
 * useEscapeKey({
 *   onEscape: () => handleClose(),
 *   enabled: isOpen,
 * });
 *
 * // Always enabled
 * useEscapeKey({
 *   onEscape: () => setOpen(false),
 * });
 * ```
 */
export function useEscapeKey(options: UseEscapeKeyOptions): void {
  const { onEscape, enabled } = options;

  createEffect(() => {
    // If enabled signal is provided and returns false, don't add listener
    if (enabled !== undefined && !enabled()) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });
}
