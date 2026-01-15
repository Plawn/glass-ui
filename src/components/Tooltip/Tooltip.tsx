import { type Component, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { POPOVER_ENTER } from '../../constants';
import type { TooltipPosition, TooltipProps } from './types';

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-surface-900 dark:border-t-surface-800 border-x-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-surface-900 dark:border-b-surface-800 border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-surface-900 dark:border-l-surface-800 border-y-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-surface-900 dark:border-r-surface-800 border-y-transparent border-l-transparent',
};

export const Tooltip: Component<TooltipProps> = (props) => {
  const [visible, setVisible] = createSignal(false);
  const [hovering, setHovering] = createSignal(false);

  const position = () => props.position ?? 'top';
  const delay = () => props.delay ?? 200;

  // Handle delayed show with proper cleanup (idiomatic SolidJS pattern)
  createEffect(() => {
    if (hovering()) {
      const timer = setTimeout(() => setVisible(true), delay());
      onCleanup(() => clearTimeout(timer));
    } else {
      setVisible(false);
    }
  });

  const showTooltip = () => setHovering(true);
  const hideTooltip = () => setHovering(false);

  return (
    <div
      class={`relative inline-flex ${props.class ?? ''}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocusIn={showTooltip}
      onFocusOut={hideTooltip}
    >
      {props.children}
      <Show when={visible()}>
        <div
          class={`absolute z-50 ${positionStyles[position()]} ${POPOVER_ENTER}`}
          role="tooltip"
        >
          <div class="px-3 py-1.5 text-xs font-medium glass-tooltip rounded-lg whitespace-nowrap">
            {props.content}
          </div>
          <div class={`absolute w-0 h-0 border-4 ${arrowStyles[position()]}`} aria-hidden="true" />
        </div>
      </Show>
    </div>
  );
};
