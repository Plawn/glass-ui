import { type Accessor, createEffect, onCleanup } from 'solid-js';
import { pushEscapeHandler } from './escapeStack';

export interface UseEscapeKeyOptions {
  /** Callback function to execute when Escape key is pressed */
  onEscape: () => void;
  /** Optional signal to enable/disable the listener. Defaults to always enabled. */
  enabled?: Accessor<boolean>;
}

/**
 * Hook to handle Escape key press events.
 *
 * Handlers share a global overlay stack: while several are enabled, only the
 * most recently enabled one runs (e.g. a Dialog opened from a Drawer closes
 * alone). Escape events already handled by a nested widget
 * (`event.defaultPrevented`) are ignored.
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
    // If enabled signal is provided and returns false, don't register
    if (enabled !== undefined && !enabled()) {
      return;
    }

    onCleanup(pushEscapeHandler(() => onEscape()));
  });
}
