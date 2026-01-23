import type { Component } from 'solid-js';
import { For, Show, createMemo, createSignal } from 'solid-js';
import { Markdown } from '../Markdown';
import { ChevronDownIcon, ThinkingIcon } from './icons';
import type { ChatThinkingProps } from './types';

/**
 * Collapsible thinking section for assistant reasoning
 */
export const ChatThinking: Component<ChatThinkingProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? false);

  const totalSteps = createMemo(() => props.steps.length);

  const handleToggle = () => {
    setIsOpen(!isOpen());
  };

  const contentStyle = createMemo(() => ({
    'grid-template-rows': isOpen() ? '1fr' : '0fr',
  }));

  return (
    <div class="mt-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        class="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300 transition-colors cursor-pointer"
        aria-expanded={isOpen()}
      >
        <ThinkingIcon
          size={14}
          class="text-surface-400 dark:text-surface-500"
        />
        <span>
          {totalSteps()} thinking {totalSteps() === 1 ? 'step' : 'steps'}
        </span>
        <ChevronDownIcon
          size={14}
          class={`transition-transform duration-200 ${isOpen() ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content with CSS grid animation */}
      <div class="grid transition-grid-rows" style={contentStyle()}>
        <div class="overflow-hidden">
          <div class="mt-2 space-y-2">
            <For each={props.steps}>
              {(step) => (
                <div class="pl-4 border-l-2 border-surface-200 dark:border-surface-700">
                  <Show when={step.title}>
                    <p class="text-xs font-medium text-surface-500 dark:text-surface-400 mb-1">
                      {step.title}
                    </p>
                  </Show>
                  <div class="text-sm text-surface-600 dark:text-surface-400">
                    <Markdown content={step.content} />
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};
