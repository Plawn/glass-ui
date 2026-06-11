import { type Component, For, Show, splitProps } from 'solid-js';
import type { BreadcrumbItem, BreadcrumbProps } from './types';

const DefaultSeparator: Component = () => (
  <span class="mx-2 text-surface-400 dark:text-surface-600" aria-hidden="true">
    /
  </span>
);

export const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  const [local, rest] = splitProps(props, ['items', 'separator', 'class']);
  const isLast = (index: number) => index === local.items.length - 1;

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isCurrentPage = isLast(index);

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

    if (isCurrentPage) {
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

    if (item.href) {
      return (
        <a
          href={item.href}
          class="flex items-center text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors"
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          }}
        >
          {content}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button
          type="button"
          onClick={item.onClick}
          class="flex items-center text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors"
        >
          {content}
        </button>
      );
    }

    // Non-clickable item
    return (
      <span class="flex items-center text-sm text-surface-500 dark:text-surface-400">
        {content}
      </span>
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
