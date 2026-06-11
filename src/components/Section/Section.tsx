import type { Component } from 'solid-js';
import { splitProps } from 'solid-js';
import type { SectionProps } from './types';

export const Section: Component<SectionProps> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'title', 'children']);

  return (
    <div
      {...rest}
      class={`mt-4 md:mt-6 first:mt-1 first:md:mt-2 ${local.class ?? ''}`}
    >
      <h3 class="text-xs font-bold text-surface-700 dark:text-surface-400 uppercase tracking-wider mb-2 md:mb-3 px-1">
        {local.title}
      </h3>
      <div class="space-y-2 md:space-y-3">{local.children}</div>
    </div>
  );
};
