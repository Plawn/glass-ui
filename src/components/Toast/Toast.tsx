import { type Component, For, Show, createSignal } from 'solid-js';
import { CheckIcon, CloseIcon, InfoIcon, WarningIcon } from '../shared/icons';
import { dismissToast, getToastStore } from './store';
import type { Toast, ToastType } from './types';

const typeStyles: Record<ToastType, { bg: string; icon: string; iconBg: string }> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  error: {
    bg: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/30',
    icon: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30',
    icon: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  info: {
    bg: 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800/30',
    icon: 'text-accent-600 dark:text-accent-400',
    iconBg: 'bg-accent-100 dark:bg-accent-900/30',
  },
};

const ToastIcon: Component<{ type: ToastType }> = (props) => {
  return (
    <Show
      when={props.type === 'success'}
      fallback={
        <Show
          when={props.type === 'error'}
          fallback={
            <Show
              when={props.type === 'warning'}
              fallback={<InfoIcon class="w-5 h-5" />}
            >
              <WarningIcon class="w-5 h-5" />
            </Show>
          }
        >
          <CloseIcon class="w-5 h-5" />
        </Show>
      }
    >
      <CheckIcon class="w-5 h-5" />
    </Show>
  );
};

const ToastItem: Component<{ toast: Toast }> = (props) => {
  const [exiting, setExiting] = createSignal(false);
  const styles = () => typeStyles[props.toast.type];

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => dismissToast(props.toast.id), 200);
  };

  return (
    <div
      class={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-200 ${styles().bg} ${exiting() ? 'opacity-0 translate-x-4' : 'animate-in slide-in-from-right-4 fade-in'}`}
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
