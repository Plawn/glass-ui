import { createSignal } from 'solid-js';
import type { Accessor } from 'solid-js';
import type { CreateContextMenuReturn, ContextMenuProps, ContextMenuInternalState } from './types';

/**
 * Creates a typed context menu with data support.
 * Use this hook when you need to pass contextual data from triggers to menu items.
 *
 * @example
 * ```tsx
 * interface FileItem { id: string; name: string; }
 *
 * function FileList() {
 *   const menu = createContextMenu<FileItem>();
 *
 *   return (
 *     <ContextMenu {...menu.props}>
 *       <For each={files()}>
 *         {(file) => (
 *           <ContextMenuTrigger data={file}>
 *             <div>{file.name}</div>
 *           </ContextMenuTrigger>
 *         )}
 *       </For>
 *       <ContextMenuContent>
 *         <ContextMenuItem onSelect={() => deleteFile(menu.data()!.id)}>
 *           Delete {menu.data()?.name}
 *         </ContextMenuItem>
 *       </ContextMenuContent>
 *     </ContextMenu>
 *   );
 * }
 * ```
 */
export function createContextMenu<T = unknown>(): CreateContextMenuReturn<T> {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [data, setData] = createSignal<T | null>(null) as [
    Accessor<T | null>,
    (v: T | null) => void,
  ];

  const close = () => {
    setOpen(false);
  };

  const internalState: ContextMenuInternalState<T> = {
    open,
    setOpen,
    position,
    setPosition,
    data,
    setData,
  };

  const props: ContextMenuProps<T> = {
    __internal: internalState,
    children: undefined as unknown as never, // Will be provided by user
  };

  return {
    props,
    data,
    position,
    isOpen: open,
    close,
  };
}
