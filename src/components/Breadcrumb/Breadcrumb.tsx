import { type Component, For, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { BreadcrumbItem, BreadcrumbProps } from './types';

const DefaultSeparator: Component = () => (
  <span class="mx-2 text-surface-400 dark:text-surface-600" aria-hidden="true">
    /
  </span>
);

const interactiveClass =
  'flex items-center text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors';
const staticClass =
  'flex items-center text-sm text-surface-500 dark:text-surface-400';

export const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  const [local, rest] = splitProps(props, ['items', 'separator', 'class']);
  const isLast = (index: number) => index === local.items.length - 1;

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const content = (
      <>
        <Show when={item.icon}>
          <span class="w-4 h-4 mr-1.5 flex items-center justify-center">
            {item.icon}
          </span>
        </Show>
        <span>{item.label}</span>
      </>
    );

    if (isLast(index)) {
      // Current page (last item) - not clickable
      return (
        <span
          class="flex items-center text-sm font-medium text-surface-900 dark:text-surface-100"
          aria-current="page"
        >
          {content}
        </span>
      );
    }

    // Polymorphic, explicit element selection (no href inference).
    const tag = item.as ?? (item.onClick ? 'button' : 'span');
    const interactive = Boolean(item.as || item.onClick);
    const [, forwarded] = splitProps(item, ['label', 'icon', 'as']);

    return (
      <Dynamic
        component={tag}
        {...forwarded}
        type={tag === 'button' ? 'button' : undefined}
        class={interactive ? interactiveClass : staticClass}
      >
        {content}
      </Dynamic>
    );
  };

  return (
    <nav
      {...rest}
      class={`flex items-center ${local.class ?? ''}`}
      aria-label="Breadcrumb"
    >
      <ol class="flex items-center">
        <For each={local.items}>
          {(item, index) => (
            <li class="flex items-center">
              {renderItem(item, index())}
              <Show when={!isLast(index())}>
                {local.separator ?? <DefaultSeparator />}
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  );
};
