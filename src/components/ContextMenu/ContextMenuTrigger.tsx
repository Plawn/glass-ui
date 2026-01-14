import type { Component } from 'solid-js';
import { useContextMenuContext } from './ContextMenuContext';
import type { ContextMenuTriggerProps } from './types';

/**
 * Trigger component that captures right-click events.
 * Wraps children in a div that listens for contextmenu events.
 *
 * @example
 * ```tsx
 * <ContextMenuTrigger data={item}>
 *   <div>Right-click this element</div>
 * </ContextMenuTrigger>
 * ```
 */
export const ContextMenuTrigger: Component<ContextMenuTriggerProps<unknown>> = (props) => {
  const context = useContextMenuContext();

  const handleContextMenu = (e: MouseEvent) => {
    if (props.disabled) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    context.openMenu({ x: e.clientX, y: e.clientY }, props.data ?? null);
  };

  return (
    <div
      class={props.class ?? ''}
      style={props.style}
      onContextMenu={handleContextMenu}
    >
      {props.children}
    </div>
  );
};
