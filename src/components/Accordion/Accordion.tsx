import { type Component, For, Show, createSignal } from 'solid-js';
import { ACCORDION_CONTENT_ENTER } from '../../constants';
import { ChevronDownIcon, ChevronRightIcon } from '../shared/icons';
import type { AccordionProps } from './types';

export const Accordion: Component<AccordionProps> = (props) => {
  const getDefaultOpen = () => {
    const defaults: string[] = [];
    for (const item of props.items) {
      if (item.defaultOpen) {
        defaults.push(item.id);
      }
    }
    return defaults;
  };

  const [openItems, setOpenItems] = createSignal<string[]>(getDefaultOpen());

  const isOpen = (id: string) => openItems().includes(id);

  const toggle = (id: string) => {
    if (props.multiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div class={`space-y-1.5 ${props.class ?? ''}`}>
      <For each={props.items}>
        {(item) => (
          <div class="glass-card rounded-lg overflow-hidden">
            <button
              type="button"
              id={`accordion-trigger-${item.id}`}
              onClick={() => toggle(item.id)}
              class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-black/2 dark:hover:bg-white/2 transition-colors"
              aria-expanded={isOpen(item.id)}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div class="flex items-center gap-2 text-left">
                <ChevronRightIcon
                  class={`w-3.5 h-3.5 text-surface-500 dark:text-surface-400 transition-transform duration-200 ${isOpen(item.id) ? 'rotate-90' : ''}`}
                />
                <span class="text-xs font-medium text-surface-700 dark:text-surface-200">
                  {item.title}
                </span>
              </div>
              <ChevronDownIcon
                class={`w-3.5 h-3.5 text-surface-400 dark:text-surface-500 transition-transform duration-200 ${isOpen(item.id) ? 'rotate-180' : ''}`}
              />
            </button>

            <Show when={isOpen(item.id)}>
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${item.id}`}
                class={`px-3 pb-3 border-t border-surface-200 dark:border-white/5 ${ACCORDION_CONTENT_ENTER}`}
              >
                <div class="pt-3">{item.content}</div>
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};
