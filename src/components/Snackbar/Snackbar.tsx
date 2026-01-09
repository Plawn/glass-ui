import { type Component, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import {
  ANIMATION_DURATION,
  DURATION_DEFAULT,
  SNACKBAR_ENTER,
  SNACKBAR_EXIT,
} from '../../constants';
import { useIsDark } from '../../hooks';
import { CloseIcon } from '../shared/icons';
import type { SnackbarPosition, SnackbarProps } from './types';

const positionStyles: Record<SnackbarPosition, string> = {
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

const DEFAULT_DURATION = 4000;

export const Snackbar: Component<SnackbarProps> = (props) => {
  const position = () => props.position ?? 'bottom-center';
  const duration = () => props.duration ?? DEFAULT_DURATION;

  // Track visibility separately from open state for exit animation
  const [visible, setVisible] = createSignal(false);
  const [isClosing, setIsClosing] = createSignal(false);

  // Check if dark mode is active (needed for Portal which renders outside the dark class container)
  const isDark = useIsDark();

  // Handle open/close transitions
  createEffect(() => {
    if (props.open) {
      setIsClosing(false);
      setVisible(true);
    } else if (visible()) {
      // Start closing animation
      setIsClosing(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setIsClosing(false);
      }, ANIMATION_DURATION);
      onCleanup(() => clearTimeout(timer));
    }
  });

  // Auto-dismiss timer
  createEffect(() => {
    if (props.open && duration() > 0) {
      const timer = setTimeout(() => {
        props.onClose();
      }, duration());
      onCleanup(() => clearTimeout(timer));
    }
  });

  const handleAction = () => {
    props.onAction?.();
    props.onClose();
  };

  const enterAnimation = () => SNACKBAR_ENTER[position()];
  const exitAnimation = () => SNACKBAR_EXIT[position()];

  const animationClasses = () =>
    isClosing()
      ? `${exitAnimation()} ${DURATION_DEFAULT}`
      : `${enterAnimation()} ${DURATION_DEFAULT}`;

  return (
    <Show when={visible()}>
      <Portal>
        <output
          class={`fixed ${positionStyles[position()]} z-50 ${isDark() ? 'dark' : ''}`}
          aria-live="polite"
        >
          <div
            class={`glass-card flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[200px] max-w-sm ${animationClasses()}`}
          >
            <p class="flex-1 text-sm font-medium text-surface-800 dark:text-surface-200">
              {props.message}
            </p>
            <Show when={props.action}>
              <button
                type="button"
                onClick={handleAction}
                class="flex-shrink-0 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
              >
                {props.action}
              </button>
            </Show>
            <button
              type="button"
              onClick={props.onClose}
              class="flex-shrink-0 p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Dismiss"
            >
              <CloseIcon class="w-4 h-4" />
            </button>
          </div>
        </output>
      </Portal>
    </Show>
  );
};
