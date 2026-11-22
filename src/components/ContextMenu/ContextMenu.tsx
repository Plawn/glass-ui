import type { JSX } from '@solidjs/web';
import { createEffect, createSignal, omit, untrack } from 'solid-js';
import type { Accessor } from 'solid-js';
import { ContextMenuContext } from './ContextMenuContext';
import type { ContextMenuContextValue, ContextMenuProps } from './types';

/**
 * Context menu wrapper component.
 * Provides context to child components (ContextMenuTrigger, ContextMenuContent, etc.)
 *
 * Can be used in two ways:
 * 1. With createContextMenu hook (for typed data support)
 * 2. Standalone (for simple use cases)
 *
 * @example Simple usage
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>
 *     <div>Right-click me</div>
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem onSelect={() => console.log('Copy')}>Copy</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 *
 * @example With typed data (for lists)
 * ```tsx
 * const menu = createContextMenu<FileItem>();
 *
 * <ContextMenu {...menu.props}>
 *   <For each={files()}>
 *     {(file) => (
 *       <ContextMenuTrigger data={file}>
 *         <FileRow file={file} />
 *       </ContextMenuTrigger>
 *     )}
 *   </For>
 *   <ContextMenuContent>
 *     <ContextMenuItem onSelect={() => deleteFile(menu.data()!.id)}>
 *       Delete
 *     </ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
export function ContextMenu<T = unknown>(
  props: ContextMenuProps<T>,
): JSX.Element {
  const rest = omit(
    props,
    'class',
    'style',
    'children',
    'onOpenChange',
    '__internal',
  );

  // Use internal state if provided (from createContextMenu), otherwise create our own
  // Read once: which state backs the menu cannot change after mount.
  const internal = untrack(() => props.__internal);

  const [ownOpen, setOwnOpen] = internal
    ? [internal.open, internal.setOpen]
    : createSignal(false);

  const [ownPosition, setOwnPosition] = internal
    ? [internal.position, internal.setPosition]
    : createSignal({ x: 0, y: 0 });

  const [ownData, setOwnData] = internal
    ? [internal.data, internal.setData]
    : (createSignal<T | null>(null) as [
        Accessor<T | null>,
        (v: T | null) => void,
      ]);

  const close = () => {
    setOwnOpen(false);
    props.onOpenChange?.(false, ownData());
  };

  const openMenu = (pos: { x: number; y: number }, data: T | null) => {
    setOwnPosition(pos);
    setOwnData(data);
    setOwnOpen(true);
    props.onOpenChange?.(true, data);
  };

  // Notify parent of state changes when using internal state
  if (internal) {
    createEffect(
      () => [ownOpen(), ownData()] as const,
      ([open, data]) => untrack(() => props.onOpenChange)?.(open, data),
    );
  }

  // Context value uses unknown since context is not generic at runtime
  const contextValue: ContextMenuContextValue = {
    open: ownOpen,
    position: ownPosition,
    data: ownData as Accessor<unknown>,
    close,
    openMenu: openMenu as (
      pos: { x: number; y: number },
      data: unknown,
    ) => void,
  };

  return (
    <ContextMenuContext value={contextValue}>
      <div {...rest} class={props.class ?? ''} style={props.style}>
        {props.children}
      </div>
    </ContextMenuContext>
  );
}
