import type { Component } from 'solid-js';
import { Show, splitProps } from 'solid-js';
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
  const [local, rest] = splitProps(props, [
    'icon',
    'title',
    'description',
    'action',
    'size',
    'class',
    'style',
  ]);
  const size = () => local.size ?? 'md';
  const styles = () => sizeStyles[size()];

  return (
    <div
      {...rest}
      class={`flex flex-col items-center justify-center text-center ${styles().container} ${local.class ?? ''}`}
      style={local.style}
    >
      <Show when={local.icon}>
        <div
          class={`flex items-center justify-center text-surface-400 dark:text-surface-500 mb-4 ${styles().icon}`}
        >
          {local.icon}
        </div>
      </Show>

      <h3
        class={`font-medium text-surface-700 dark:text-surface-200 ${styles().title}`}
      >
        {local.title}
      </h3>

      <Show when={local.description}>
        <p
          class={`mt-2 text-surface-500 dark:text-surface-400 max-w-md ${styles().description}`}
        >
          {local.description}
        </p>
      </Show>

      <Show when={local.action}>
        <div class="mt-6">{local.action}</div>
      </Show>
    </div>
  );
};
