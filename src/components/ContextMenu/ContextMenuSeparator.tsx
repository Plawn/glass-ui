import type { Component } from 'solid-js';
import type { ContextMenuSeparatorProps } from './types';

/**
 * Visual separator between menu item groups.
 *
 * @example
 * ```tsx
 * <ContextMenuContent>
 *   <ContextMenuItem>Cut</ContextMenuItem>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 *   <ContextMenuSeparator />
 *   <ContextMenuItem>Delete</ContextMenuItem>
 * </ContextMenuContent>
 * ```
 */
export const ContextMenuSeparator: Component<ContextMenuSeparatorProps> = (
  props,
) => {
  return (
    <div
      role="separator"
      class={`h-px bg-black/10 dark:bg-white/10 my-1.5 mx-2 ${props.class ?? ''}`}
      style={props.style}
    />
  );
};
