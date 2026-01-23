import { type Accessor, createEffect, onCleanup } from 'solid-js';

/**
 * Options for the useClickOutside hook
 */
export interface UseClickOutsideOptions {
  /**
   * Accessor that returns an array of refs (HTMLElements or undefined) to exclude from click detection.
   * Clicks inside any of these elements will NOT trigger the callback.
   */
  refs: Accessor<(HTMLElement | undefined)[]>;

  /**
   * Callback function invoked when a click occurs outside all provided refs.
   */
  onClickOutside: () => void;

  /**
   * Accessor that controls whether click-outside detection is active.
   * When false, no event listeners are attached.
   */
  enabled: Accessor<boolean>;

  /**
   * Optional delay in ms before attaching the event listener.
   * Useful for context menus to avoid closing on the same click that opened them.
   * @default 0
   */
  delay?: number;
}

/**
 * Hook that detects clicks outside of specified elements and invokes a callback.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = createSignal(false);
 * let contentRef: HTMLDivElement | undefined;
 * let triggerRef: HTMLButtonElement | undefined;
 *
 * useClickOutside({
 *   refs: () => [contentRef, triggerRef],
 *   onClickOutside: () => setIsOpen(false),
 *   enabled: isOpen,
 * });
 * ```
 */
export function useClickOutside(options: UseClickOutsideOptions): void {
  createEffect(() => {
    if (!options.enabled()) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const refs = options.refs();

      // Check if click is inside any of the provided refs
      const isInsideAnyRef = refs.some((ref) => ref?.contains(target));

      if (!isInsideAnyRef) {
        options.onClickOutside();
      }
    };

    const delay = options.delay ?? 0;

    if (delay > 0) {
      // Use setTimeout to delay attaching the listener
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, delay);

      onCleanup(() => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      });
    } else {
      document.addEventListener('mousedown', handleClickOutside);
      onCleanup(() =>
        document.removeEventListener('mousedown', handleClickOutside),
      );
    }
  });
}
