import type { Component } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import type { CardProps, CardVariant } from './types';

const variantStyles: Record<CardVariant, string> = {
  default: 'glass-card',
  elevated:
    'glass-thick shadow-xl dark:shadow-2xl dark:border-surface-600/50 dark:bg-surface-800/90',
  outlined: 'bg-transparent border border-surface-200 dark:border-surface-700',
};

export const Card: Component<CardProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'variant',
    'class',
    'header',
    'children',
    'footer',
  ]);
  const variant = () => local.variant ?? 'default';

  return (
    <div
      {...rest}
      class={`rounded-xl overflow-hidden ${variantStyles[variant()]} ${local.class ?? ''}`}
    >
      <Show when={local.header}>
        <div class="px-4 py-3 border-b border-surface-200/50 dark:border-surface-700/50">
          {local.header}
        </div>
      </Show>

      <div class="p-4">{local.children}</div>

      <Show when={local.footer}>
        <div class="px-4 py-3 border-t border-surface-200/50 dark:border-surface-700/50 bg-surface-50/30 dark:bg-surface-900/30">
          {local.footer}
        </div>
      </Show>
    </div>
  );
};
