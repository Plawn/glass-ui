import {
  type Component,
  For,
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { TOAST_COLORS, TOAST_ENTER, TRANSITION_ALL } from '../../constants';
import {
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../shared/icons';
import { dismissToast, getToastStore, pauseToast, resumeToast } from './store';
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
  let dismissTimer: ReturnType<typeof setTimeout> | undefined;
  onCleanup(() => clearTimeout(dismissTimer));

  const handleDismiss = () => {
    setExiting(true);
    dismissTimer = setTimeout(() => dismissToast(props.toast.id), 200);
  };

  // Pause auto-dismiss while the pointer is over the toast or focus is inside
  const [hovered, setHovered] = createSignal(false);
  const [focused, setFocused] = createSignal(false);
  createEffect(() => {
    if (hovered() || focused()) {
      pauseToast(props.toast.id);
    } else {
      resumeToast(props.toast.id);
    }
  });

  // Announcements go through the container's persistent live regions, so the
  // visible toast carries no live role (avoids double announcements).
  return (
    <div
      class={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm ${TRANSITION_ALL} ${styles().bg} ${exiting() ? 'opacity-0 translate-x-4' : TOAST_ENTER}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusIn={() => setFocused(true)}
      onFocusOut={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!next || !e.currentTarget.contains(next)) {
          setFocused(false);
        }
      }}
    >
      <div
        class={`flex-shrink-0 w-8 h-8 rounded-lg ${styles().iconBg} ${styles().icon} flex items-center justify-center`}
        aria-hidden="true"
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

/** Toasts announced assertively (role="alert"); others are polite. */
const isUrgent = (t: Toast) => t.type === 'error';

/** Toast container - add once to your app root */
export const ToastContainer: Component = () => {
  const store = getToastStore();

  return (
    <>
      {/*
        Persistent live regions: they exist before any toast is added so
        screen readers reliably announce inserted messages.
      */}
      <div class="sr-only" role="status" aria-live="polite">
        <For each={store.toasts.filter((t) => !isUrgent(t))}>
          {(t) => <p>{t.message}</p>}
        </For>
      </div>
      <div class="sr-only" role="alert" aria-live="assertive">
        <For each={store.toasts.filter(isUrgent)}>
          {(t) => <p>{t.message}</p>}
        </For>
      </div>
      <div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <For each={store.toasts}>
          {(t) => (
            <div class="pointer-events-auto">
              <ToastItem toast={t} />
            </div>
          )}
        </For>
      </div>
    </>
  );
};
