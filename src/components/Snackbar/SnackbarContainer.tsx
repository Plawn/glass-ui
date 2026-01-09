import { type Component, For, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useIsDark } from '../../hooks';
import { CloseIcon } from '../shared/icons';
import { type SnackbarItem, dismissSnackbar, getSnackbarStore } from './store';
import type { SnackbarPosition } from './types';

const positionStyles: Record<SnackbarPosition, string> = {
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

interface SnackbarContainerProps {
  position?: SnackbarPosition;
}

const SnackbarItemComponent: Component<{
  snackbar: SnackbarItem;
  position: SnackbarPosition;
}> = (props) => {
  const [exiting, setExiting] = createSignal(false);

  // Auto-dismiss timer
  createEffect(() => {
    const duration = props.snackbar.duration ?? 4000;
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      onCleanup(() => clearTimeout(timer));
    }
  });

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => dismissSnackbar(props.snackbar.id), 200);
  };

  const handleAction = () => {
    props.snackbar.onAction?.();
    handleDismiss();
  };

  const enterAnimation = () => {
    switch (props.position) {
      case 'bottom-left':
        return 'animate-in slide-in-from-left fade-in';
      case 'bottom-right':
        return 'animate-in slide-in-from-right fade-in';
      default:
        return 'animate-in slide-in-from-bottom fade-in';
    }
  };

  const exitAnimation = () => {
    switch (props.position) {
      case 'bottom-left':
        return 'opacity-0 -translate-x-4';
      case 'bottom-right':
        return 'opacity-0 translate-x-4';
      default:
        return 'opacity-0 translate-y-4';
    }
  };

  return (
    <div
      class={`glass-card flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[200px] max-w-sm transition-all duration-200 ${
        exiting() ? exitAnimation() : enterAnimation()
      }`}
    >
      <p class="flex-1 text-sm font-medium text-surface-800 dark:text-surface-200">
        {props.snackbar.message}
      </p>
      <Show when={props.snackbar.action}>
        <button
          type="button"
          onClick={handleAction}
          class="flex-shrink-0 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
        >
          {props.snackbar.action}
        </button>
      </Show>
      <button
        type="button"
        onClick={handleDismiss}
        class="flex-shrink-0 p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label="Dismiss"
      >
        <CloseIcon class="w-4 h-4" />
      </button>
    </div>
  );
};

export const SnackbarContainer: Component<SnackbarContainerProps> = (props) => {
  const store = getSnackbarStore();
  const isDark = useIsDark();
  const position = () => props.position ?? 'bottom-center';

  return (
    <Portal>
      <div
        class={`fixed ${positionStyles[position()]} z-[100] flex flex-col gap-2 ${isDark() ? 'dark' : ''}`}
        aria-live="polite"
      >
        <For each={store.snackbars}>
          {(snackbar) => <SnackbarItemComponent snackbar={snackbar} position={position()} />}
        </For>
      </div>
    </Portal>
  );
};
