import { type Component, For, Show, createMemo } from 'solid-js';
import { ChevronRightIcon } from '../shared/icons';
import type { SidebarItem, SidebarItemComponentProps } from './types';

/**
 * Individual sidebar navigation item component.
 * Supports nested items, icons, badges, and active states.
 */
export const SidebarItemComponent: Component<SidebarItemComponentProps> = (
  props,
) => {
  const depth = () => props.depth ?? 0;
  const collapsed = () => props.collapsed ?? false;
  const hasChildren = () =>
    Boolean(props.item.children && props.item.children.length > 0);
  const isActive = () => props.activeId === props.item.id;
  const isExpanded = () => props.expandedIds?.includes(props.item.id) ?? false;

  // Check if any child is active (for highlighting parent groups)
  const hasActiveChild = createMemo(() => {
    if (!props.item.children || !props.activeId) return false;
    const checkActive = (items: SidebarItem[]): boolean => {
      for (const child of items) {
        if (child.id === props.activeId) return true;
        if (child.children && checkActive(child.children)) return true;
      }
      return false;
    };
    return checkActive(props.item.children);
  });

  const handleClick = () => {
    if (props.item.disabled) return;

    if (hasChildren()) {
      props.onToggleExpand?.(props.item.id);
    } else {
      props.onItemClick?.(props.item);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine the element type and props
  const isLink = () => !hasChildren() && props.item.href;

  const baseClasses = () => {
    const base = `
      w-full flex items-center gap-3 rounded-xl
      transition-all duration-300 ease-out
      text-sm font-medium cursor-pointer select-none
      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50
    `;

    const paddingLeft = collapsed() ? 'px-3' : `pl-${3 + depth() * 3}`;
    const padding = collapsed()
      ? 'p-3 justify-center'
      : `${paddingLeft} pr-3 py-2.5`;

    const stateClasses = props.item.disabled
      ? 'opacity-50 cursor-not-allowed text-surface-400 dark:text-surface-600'
      : isActive() || hasActiveChild()
        ? `
          backdrop-blur-md
          bg-accent-500/20 dark:bg-accent-400/15
          border border-accent-300/30 dark:border-accent-400/20
          text-accent-700 dark:text-accent-300
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.05)]
        `
        : `
          text-surface-700 dark:text-surface-300
          hover:backdrop-blur-md
          hover:bg-white/10 dark:hover:bg-white/5
          hover:border hover:border-white/15 dark:hover:border-white/10
          hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
          border border-transparent
        `;

    return `${base} ${padding} ${stateClasses}`;
  };

  const ItemContent = () => (
    <>
      {/* Icon */}
      <Show when={props.item.icon}>
        <span
          class={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-colors duration-300 ${
            isActive() || hasActiveChild()
              ? 'text-accent-600 dark:text-accent-400'
              : 'text-surface-500 dark:text-surface-400'
          }`}
        >
          {props.item.icon}
        </span>
      </Show>

      {/* Label */}
      <Show when={!collapsed()}>
        <span class="flex-1 truncate text-left">{props.item.label}</span>
      </Show>

      {/* Badge */}
      <Show when={props.item.badge !== undefined && !collapsed()}>
        <span
          class="
          flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full
          backdrop-blur-sm
          bg-accent-500/20 dark:bg-accent-400/20
          border border-accent-300/30 dark:border-accent-400/20
          text-accent-700 dark:text-accent-300
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]
        "
        >
          {props.item.badge}
        </span>
      </Show>

      {/* Expand/Collapse chevron for groups */}
      <Show when={hasChildren() && !collapsed()}>
        <ChevronRightIcon
          class={`w-4 h-4 flex-shrink-0 text-surface-400 dark:text-surface-500 transition-transform duration-200 ${
            isExpanded() ? 'rotate-90' : ''
          }`}
        />
      </Show>
    </>
  );

  return (
    <div class="w-full">
      <Show
        when={isLink()}
        fallback={
          <button
            type="button"
            class={baseClasses()}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={props.item.disabled}
            aria-expanded={hasChildren() ? isExpanded() : undefined}
            aria-current={isActive() ? 'page' : undefined}
            title={collapsed() ? props.item.label : undefined}
          >
            <ItemContent />
          </button>
        }
      >
        <a
          href={props.item.href}
          class={baseClasses()}
          onClick={(e) => {
            if (props.item.disabled) {
              e.preventDefault();
              return;
            }
            props.onItemClick?.(props.item);
          }}
          aria-current={isActive() ? 'page' : undefined}
          title={collapsed() ? props.item.label : undefined}
        >
          <ItemContent />
        </a>
      </Show>

      {/* Nested children */}
      <Show when={hasChildren() && isExpanded() && !collapsed()}>
        <div class="mt-1 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          <For each={props.item.children}>
            {(child) => (
              <SidebarItemComponent
                item={child}
                activeId={props.activeId}
                collapsed={props.collapsed}
                depth={depth() + 1}
                onItemClick={props.onItemClick}
                expandedIds={props.expandedIds}
                onToggleExpand={props.onToggleExpand}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
