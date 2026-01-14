import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import type { SpinnerProps, SpinnerSize, SpinnerColor } from './types';

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const labelSizeClasses: Record<SpinnerSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

const colorClasses: Record<SpinnerColor, { track: string; fill: string; label: string }> = {
  default: {
    track: 'text-surface-200 dark:text-surface-700',
    fill: 'text-accent-500',
    label: 'text-surface-600 dark:text-surface-300',
  },
  white: {
    track: 'text-white/25',
    fill: 'text-white',
    label: 'text-white',
  },
};

export const Spinner: Component<SpinnerProps> = (props) => {
  const size = () => props.size ?? 'md';
  const color = () => props.color ?? 'default';
  const centered = () => props.centered ?? false;

  const wrapperClasses = () => {
    const base = 'inline-flex items-center gap-2';
    const centerClasses = centered() ? 'justify-center w-full h-full' : '';
    return `${base} ${centerClasses} ${props.class ?? ''}`.trim();
  };

  return (
    <div class={wrapperClasses()} style={props.style} role="status" aria-label={props.label ?? 'Loading'}>
      <svg
        class={`animate-spin ${sizeClasses[size()]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          class={`opacity-100 ${colorClasses[color()].track}`}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class={colorClasses[color()].fill}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <Show when={props.label}>
        <span class={`${labelSizeClasses[size()]} ${colorClasses[color()].label}`}>{props.label}</span>
      </Show>
    </div>
  );
};
