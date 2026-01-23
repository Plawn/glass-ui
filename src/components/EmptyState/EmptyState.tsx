import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import type { EmptyStateProps, EmptyStateSize } from './types';

const sizeStyles: Record<
  EmptyStateSize,
  { container: string; icon: string; title: string; description: string }
> = {
  sm: {
    container: 'py-6 px-4',
    icon: 'w-10 h-10 text-3xl',
    title: 'text-sm',
    description: 'text-xs',
  },
  md: {
    container: 'py-10 px-6',
    icon: 'w-14 h-14 text-4xl',
    title: 'text-base',
    description: 'text-sm',
  },
  lg: {
    container: 'py-14 px-8',
    icon: 'w-20 h-20 text-5xl',
    title: 'text-lg',
    description: 'text-base',
  },
};

export const EmptyState: Component<EmptyStateProps> = (props) => {
  const size = () => props.size ?? 'md';
  const styles = () => sizeStyles[size()];

  return (
    <div
      class={`flex flex-col items-center justify-center text-center ${styles().container} ${props.class ?? ''}`}
      style={props.style}
    >
      <Show when={props.icon}>
        <div
          class={`flex items-center justify-center text-surface-400 dark:text-surface-500 mb-4 ${styles().icon}`}
        >
          {props.icon}
        </div>
      </Show>

      <h3
        class={`font-medium text-surface-700 dark:text-surface-200 ${styles().title}`}
      >
        {props.title}
      </h3>

      <Show when={props.description}>
        <p
          class={`mt-2 text-surface-500 dark:text-surface-400 max-w-md ${styles().description}`}
        >
          {props.description}
        </p>
      </Show>

      <Show when={props.action}>
        <div class="mt-6">{props.action}</div>
      </Show>
    </div>
  );
};
