import { type Component, Show, createSignal } from 'solid-js';
import { ACCORDION_CONTENT_ENTER, TRANSITION_TRANSFORM } from '../../constants';
import { ChevronDownIcon, ChevronRightIcon } from '../shared/icons';
import type { AccordionPanelProps } from './types';

/** Single accordion panel for simple use cases */
export const AccordionPanel: Component<AccordionPanelProps> = (props) => {
  const [open, setOpen] = createSignal(props.defaultOpen ?? false);

  return (
    <div class={`glass-card rounded-lg overflow-hidden ${props.class ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen(!open())}
        class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
        aria-expanded={open()}
      >
        <div class="flex items-center gap-2 text-left">
          <ChevronRightIcon
            class={`w-3.5 h-3.5 text-surface-500 dark:text-surface-400 ${TRANSITION_TRANSFORM} ${open() ? 'rotate-90' : ''}`}
          />
          <span class="text-xs font-medium text-surface-700 dark:text-surface-200">
            {props.title}
          </span>
        </div>
        <ChevronDownIcon
          class={`w-3.5 h-3.5 text-surface-400 dark:text-surface-500 ${TRANSITION_TRANSFORM} ${open() ? 'rotate-180' : ''}`}
        />
      </button>

      <Show when={open()}>
        <div
          class={`px-3 pb-3 border-t border-surface-200 dark:border-white/5 ${ACCORDION_CONTENT_ENTER}`}
        >
          <div class="pt-3">{props.children}</div>
        </div>
      </Show>
    </div>
  );
};
