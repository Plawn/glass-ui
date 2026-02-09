import { type Accessor, createEffect, onCleanup } from 'solid-js';

export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  enabled: Accessor<boolean>;
  /** The container element to trap focus within */
  containerRef: Accessor<HTMLElement | undefined>;
  /** Whether to restore focus to the previously focused element on cleanup */
  restoreFocus?: boolean;
  /** Whether to auto-focus the first focusable element when enabled */
  autoFocus?: boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
}

/**
 * Traps keyboard focus within a container element.
 * Used for modal dialogs, drawers, and other overlay components.
 */
export function useFocusTrap(options: UseFocusTrapOptions): void {
  const restoreFocus = options.restoreFocus ?? true;
  const autoFocus = options.autoFocus ?? true;

  createEffect(() => {
    if (!options.enabled()) {
      return;
    }

    const container = options.containerRef();
    if (!container) {
      return;
    }

    // Save the previously focused element
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Auto-focus the first focusable element
    if (autoFocus) {
      requestAnimationFrame(() => {
        const focusable = getFocusableElements(container);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          // If no focusable element, make the container itself focusable
          container.setAttribute('tabindex', '-1');
          container.focus();
        }
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      const focusable = getFocusableElements(container);
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if focus is on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if focus is on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown, true);

      // Restore focus to previously focused element
      if (restoreFocus && previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    });
  });
}
