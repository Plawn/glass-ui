import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { CloseIcon } from '../icons';
import type { CloseButtonProps, CloseButtonSize } from './types';

/**
 * Size-specific styles for the CloseButton.
 * Defines icon size and button padding for each variant.
 */
const sizeStyles: Record<CloseButtonSize, { icon: string; button: string }> = {
  sm: {
    icon: 'w-4 h-4',
    button: 'p-1',
  },
  md: {
    icon: 'w-5 h-5',
    button: 'p-1.5',
  },
  lg: {
    icon: 'w-6 h-6',
    button: 'p-2',
  },
};

/**
 * A reusable close button component with glassmorphic styling.
 *
 * Features:
 * - Three size variants (sm, md, lg)
 * - Proper accessibility with aria-label and keyboard support
 * - Glassmorphic hover effects matching the design system
 * - Optional custom icon support
 * - Disabled state support
 *
 * @example
 * ```tsx
 * <CloseButton onClick={() => setOpen(false)} />
 * <CloseButton onClick={handleClose} size="lg" class="absolute top-4 right-4" />
 * ```
 */
export const CloseButton: Component<CloseButtonProps> = (props) => {
  const size = () => props.size ?? 'md';
  const ariaLabel = () => props['aria-label'] ?? 'Close';
  const styles = () => sizeStyles[size()];

  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Support Enter and Space keys for activation
    if ((e.key === 'Enter' || e.key === ' ') && !props.disabled) {
      e.preventDefault();
      props.onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={props.disabled}
      class={`rounded-xl text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-surface-400 ${styles().button} ${props.class ?? ''}`}
      aria-label={ariaLabel()}
    >
      <Show when={props.icon} fallback={<CloseIcon class={styles().icon} />}>
        <span class={styles().icon}>{props.icon}</span>
      </Show>
    </button>
  );
};
