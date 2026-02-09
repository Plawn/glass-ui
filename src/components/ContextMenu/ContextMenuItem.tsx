import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuItemProps } from './types';

const baseClasses = `
  flex items-center gap-3 px-3 py-2 mx-1.5
  text-sm cursor-pointer select-none
  rounded-lg transition-colors duration-150
  hover:bg-black/5 dark:hover:bg-white/10
  focus:bg-black/5 dark:focus:bg-white/10
  focus:outline-none
  text-surface-700 dark:text-surface-200
`;

const disabledClasses = `
  opacity-50 cursor-not-allowed
  pointer-events-none
`;

const destructiveClasses = `
  text-error-600 dark:text-error-400
  hover:bg-error-500/10 dark:hover:bg-error-500/20
`;

/**
 * Individual menu item component.
 * Supports icons, keyboard shortcuts, disabled and destructive states.
 *
 * @example
 * ```tsx
 * <ContextMenuItem
 *   icon={<CopyIcon />}
 *   shortcut="Cmd+C"
 *   onSelect={() => copyToClipboard()}
 * >
 *   Copy
 * </ContextMenuItem>
 *
 * <ContextMenuItem destructive onSelect={() => deleteItem()}>
 *   Delete
 * </ContextMenuItem>
 * ```
 */
export const ContextMenuItem: Component<ContextMenuItemProps> = (props) => {
  const context = useContextMenuContext();

  const handleClick = () => {
    if (props.disabled) {
      return;
    }

    props.onSelect?.();
    context.close();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.disabled) {
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      class={`
        ${baseClasses}
        ${props.disabled ? disabledClasses : ''}
        ${props.destructive && !props.disabled ? destructiveClasses : ''}
        ${props.class ?? ''}
      `}
      style={props.style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Show when={props.icon}>
        <span class="flex-shrink-0 w-4 h-4" aria-hidden="true">
          {props.icon}
        </span>
      </Show>

      <span class="flex-1">{props.children}</span>

      <Show when={props.shortcut}>
        <span class="flex-shrink-0 text-xs text-surface-400 dark:text-surface-500">
          {props.shortcut}
        </span>
      </Show>
    </div>
  );
};
