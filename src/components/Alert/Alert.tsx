import { type Component, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { ALERT_COLORS } from '../../constants';
import {
  CheckCircleIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../shared/icons';
import type { AlertProps, AlertType } from './types';

/** Icon component mapping by alert type */
const ALERT_ICONS: Record<AlertType, Component<{ class?: string }>> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

const DefaultIcon: Component<{ type: AlertType }> = (props) => (
  <Dynamic component={ALERT_ICONS[props.type]} class="w-5 h-5" />
);

export const Alert: Component<AlertProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'type',
    'title',
    'children',
    'onClose',
    'icon',
    'class',
  ]);
  const styles = () => ALERT_COLORS[local.type];

  return (
    <div
      {...rest}
      class={`glass-card border-l-4 ${styles().border} ${styles().bg} p-4 rounded-xl ${local.class ?? ''}`}
      role="alert"
    >
      <div class="flex items-start gap-3">
        {/* Icon */}
        <div
          class={`flex-shrink-0 w-8 h-8 rounded-lg ${styles().iconBg} ${styles().icon} flex items-center justify-center`}
          aria-hidden="true"
        >
          <Show when={local.icon} fallback={<DefaultIcon type={local.type} />}>
            {local.icon}
          </Show>
        </div>

        {/* Content */}
        <div class="flex-1 min-w-0">
          <Show when={local.title}>
            <h3 class="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-1">
              {local.title}
            </h3>
          </Show>
          <div class="text-sm text-surface-700 dark:text-surface-300">
            {local.children}
          </div>
        </div>

        {/* Close button */}
        <Show when={local.onClose}>
          <button
            type="button"
            onClick={local.onClose}
            class="flex-shrink-0 p-1.5 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <CloseIcon class="w-4 h-4" />
          </button>
        </Show>
      </div>
    </div>
  );
};
