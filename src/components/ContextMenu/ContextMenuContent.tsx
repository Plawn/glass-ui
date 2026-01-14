import type { Component, JSX } from 'solid-js';
import { Show, createEffect, onCleanup } from 'solid-js';
import { PortalWithDarkMode } from '../shared';
import { useContextMenuContext } from './ContextMenuContext';
import { POPOVER_ENTER } from '../../constants/animations';
import type { ContextMenuContentProps } from './types';

/** Minimum space between menu and viewport edge */
const VIEWPORT_PADDING = 8;
/** Default estimated menu height for viewport calculations */
const ESTIMATED_HEIGHT = 200;
/** Default estimated menu width for viewport calculations */
const ESTIMATED_WIDTH = 200;

type PositionStyles = Pick<JSX.CSSProperties, 'top' | 'bottom' | 'left' | 'right'>;

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

  // Close on click outside
  createEffect(() => {
    if (!context.open()) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (contentRef && !contentRef.contains(target)) {
        context.close();
      }
    };

    // Use setTimeout to avoid closing immediately on the same click
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    onCleanup(() => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

  // Close on Escape key
  createEffect(() => {
    if (!context.open()) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        context.close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Calculate position with viewport boundary detection
  const getPositionStyles = (): PositionStyles => {
    const pos = context.position();
    const menuHeight = contentRef?.offsetHeight || ESTIMATED_HEIGHT;
    const menuWidth = contentRef?.offsetWidth || ESTIMATED_WIDTH;

    const styles: PositionStyles = {};

    // Vertical: prefer below cursor, flip if not enough space
    if (pos.y + menuHeight + VIEWPORT_PADDING > window.innerHeight) {
      styles.bottom = `${window.innerHeight - pos.y}px`;
    } else {
      styles.top = `${pos.y}px`;
    }

    // Horizontal: prefer right of cursor, flip if not enough space
    if (pos.x + menuWidth + VIEWPORT_PADDING > window.innerWidth) {
      styles.right = `${window.innerWidth - pos.x}px`;
    } else {
      styles.left = `${pos.x}px`;
    }

    return styles;
  };

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
