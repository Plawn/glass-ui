import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { PortalWithDarkMode } from '../shared';
import { useClickOutside, useEscapeKey, useContextMenuPositioning, useScrollBehavior } from '../../hooks';
import { useContextMenuContext } from './ContextMenuContext';
import { POPOVER_ENTER } from '../../constants/animations';
import type { ContextMenuContentProps } from './types';

/**
 * Content panel of the context menu.
 * Renders via Portal and positions itself at the cursor location.
 *
 * @example
 * ```tsx
 * <ContextMenuContent>
 *   <ContextMenuItem onSelect={() => {}}>Copy</ContextMenuItem>
 *   <ContextMenuSeparator />
 *   <ContextMenuItem onSelect={() => {}}>Paste</ContextMenuItem>
 * </ContextMenuContent>
 * ```
 */
export const ContextMenuContent: Component<ContextMenuContentProps> = (props) => {
  const context = useContextMenuContext();
  let contentRef: HTMLDivElement | undefined;

  // Use the shared context menu positioning hook
  const { getPositionStyles } = useContextMenuPositioning({
    contentRef: () => contentRef,
    position: context.position,
  });

  // Close on click outside (delay to avoid closing on the triggering right-click)
  useClickOutside({
    refs: () => [contentRef],
    onClickOutside: () => context.close(),
    enabled: context.open,
    delay: 0,
  });

  // Close on Escape key
  useEscapeKey({
    onEscape: () => context.close(),
    enabled: context.open,
  });

  const scrollBehavior = () => props.scrollBehavior ?? 'close';

  // Handle scroll behavior (close, lock, or none)
  useScrollBehavior({
    enabled: context.open,
    behavior: scrollBehavior,
    onClose: () => context.close(),
    ignoreRef: () => contentRef,
  });

  return (
    <Show when={context.open()}>
      <PortalWithDarkMode>
        <div
          ref={contentRef}
          role="menu"
          class={`fixed z-50 min-w-[160px] py-1.5 glass-card rounded-xl shadow-lg ${POPOVER_ENTER} ${props.class ?? ''}`}
          style={{ ...getPositionStyles(), ...props.style }}
        >
          {props.children}
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
