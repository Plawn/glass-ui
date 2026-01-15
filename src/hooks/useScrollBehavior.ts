import { type Accessor, createEffect, onCleanup } from 'solid-js';
import { useBodyScrollLock } from './useBodyScrollLock';

/**
 * Scroll behavior for floating/overlay components
 * - 'close': Close when user scrolls (default for Popover, ContextMenu)
 * - 'lock': Prevent body scroll while open (like Modal)
 * - 'none': Stay open and allow scroll
 */
export type OverlayScrollBehavior = 'close' | 'lock' | 'none';

export interface UseScrollBehaviorOptions {
  /** Signal indicating whether the floating element is open */
  enabled: Accessor<boolean>;
  /** Scroll behavior mode */
  behavior: Accessor<OverlayScrollBehavior>;
  /** Callback when close is triggered by scroll */
  onClose: () => void;
  /** Optional ref to ignore scroll events from (e.g., popover content) */
  ignoreRef?: Accessor<HTMLElement | undefined>;
}

/**
 * Hook to handle scroll behavior for floating/overlay components.
 * Supports three modes: 'close' (close on scroll), 'lock' (prevent scroll), 'none' (do nothing).
 *
 * @example
 * ```tsx
 * // Close on scroll (default behavior)
 * useScrollBehavior({
 *   enabled: isOpen,
 *   behavior: () => 'close',
 *   onClose: handleClose,
 *   ignoreRef: () => contentRef,
 * });
 *
 * // Lock body scroll
 * useScrollBehavior({
 *   enabled: isOpen,
 *   behavior: () => 'lock',
 *   onClose: handleClose,
 * });
 * ```
 */
export function useScrollBehavior(options: UseScrollBehaviorOptions): void {
  const { enabled, behavior, onClose, ignoreRef } = options;

  // Handle 'lock' behavior - prevent body scroll
  useBodyScrollLock({
    enabled: () => enabled() && behavior() === 'lock',
  });

  // Handle 'close' behavior - close on external scroll
  createEffect(() => {
    if (!enabled() || behavior() !== 'close') {
      return;
    }

    const handleScroll = (e: Event) => {
      // Ignore scroll events from inside the floating element
      const ref = ignoreRef?.();
      if (ref?.contains(e.target as Node)) {
        return;
      }
      onClose();
    };

    // Use capture to catch scroll events on any scrollable ancestor
    window.addEventListener('scroll', handleScroll, true);
    onCleanup(() => window.removeEventListener('scroll', handleScroll, true));
  });

  // 'none' behavior requires no additional handling
}
