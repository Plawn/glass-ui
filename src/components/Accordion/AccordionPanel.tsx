import { type Component, Show, createSignal } from 'solid-js';
import { ACCORDION_CONTENT_ENTER, TRANSITION_TRANSFORM } from '../../constants';
import type { ComponentSize } from '../../types';
import { ChevronDownIcon, ChevronRightIcon } from '../shared/icons';
import type { AccordionPanelProps } from './types';

const PANEL_HEADER_PADDING: Record<ComponentSize, string> = {
  sm: 'px-2.5 py-2',
  md: 'px-3 py-2.5',
  lg: 'px-4 py-3',
};

const PANEL_TITLE_TEXT: Record<ComponentSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
};

const PANEL_CHEVRON_SIZE: Record<ComponentSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

const PANEL_CONTENT_PADDING: Record<ComponentSize, string> = {
  sm: 'px-2.5 pb-2.5',
  md: 'px-3 pb-3',
  lg: 'px-4 pb-4',
};

const PANEL_CONTENT_INNER_PT: Record<ComponentSize, string> = {
  sm: 'pt-2.5',
  md: 'pt-3',
  lg: 'pt-4',
};

/** Single accordion panel for simple use cases */
export const AccordionPanel: Component<AccordionPanelProps> = (props) => {
  const size = () => props.size ?? 'md';
  const [open, setOpen] = createSignal(props.defaultOpen ?? false);

  return (
    <div class={`glass-card rounded-lg overflow-hidden ${props.class ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen(!open())}
        class={`w-full flex items-center justify-between ${PANEL_HEADER_PADDING[size()]} hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors`}
        aria-expanded={open()}
      >
        <div class="flex items-center gap-2 text-left">
          <ChevronRightIcon
            class={`${PANEL_CHEVRON_SIZE[size()]} text-surface-500 dark:text-surface-400 ${TRANSITION_TRANSFORM} ${open() ? 'rotate-90' : ''}`}
          />
          <span
            class={`${PANEL_TITLE_TEXT[size()]} font-medium text-surface-700 dark:text-surface-200`}
          >
            {props.title}
          </span>
        </div>
        <ChevronDownIcon
          class={`${PANEL_CHEVRON_SIZE[size()]} text-surface-400 dark:text-surface-500 ${TRANSITION_TRANSFORM} ${open() ? 'rotate-180' : ''}`}
        />
      </button>

      <Show when={open()}>
        <div
          class={`${PANEL_CONTENT_PADDING[size()]} border-t border-surface-200 dark:border-white/5 ${ACCORDION_CONTENT_ENTER}`}
        >
          <div class={PANEL_CONTENT_INNER_PT[size()]}>{props.children}</div>
        </div>
      </Show>
    </div>
  );
};
