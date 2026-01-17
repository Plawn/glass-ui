import { type Component, For, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { TOAST_COLORS, TOAST_ENTER } from '../../constants';
import { CheckIcon, CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from '../shared/icons';
import { dismissToast, getToastStore } from './store';
import type { Toast, ToastType } from './types';

/** Icon component mapping by toast type */
const TOAST_ICONS: Record<ToastType, Component<{ class?: string }>> = {
  success: CheckIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const ToastIcon: Component<{ type: ToastType }> = (props) => (
  <Dynamic component={TOAST_ICONS[props.type]} class="w-5 h-5" />
);

const ToastItem: Component<{ toast: Toast }> = (props) => {
  const [exiting, setExiting] = createSignal(false);
  const styles = () => TOAST_COLORS[props.toast.type];

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => dismissToast(props.toast.id), 200);
  };

  return (
    <div
      class={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-200 ${styles().bg} ${exiting() ? 'opacity-0 translate-x-4' : TOAST_ENTER}`}
      role="alert"
    >
      <div
        class={`flex-shrink-0 w-8 h-8 rounded-lg ${styles().iconBg} ${styles().icon} flex items-center justify-center`}
      >
        <ToastIcon type={props.toast.type} />
      </div>
      <p class="flex-1 text-sm font-medium text-surface-800 dark:text-surface-200 pt-1">
        {props.toast.message}
      </p>
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

/** Toast container - add once to your app root */
export const ToastContainer: Component = () => {
  const store = getToastStore();

  return (
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <For each={store.toasts}>
        {(t) => (
          <div class="pointer-events-auto">
            <ToastItem toast={t} />
          </div>
        )}
      </For>
    </div>
  );
};
