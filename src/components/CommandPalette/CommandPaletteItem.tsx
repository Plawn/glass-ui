import { type Component, For, Show } from 'solid-js';
import type { CommandPaletteItemProps } from './types';

/**
 * Renders text with highlighted match ranges
 */
const HighlightedText: Component<{
  text: string;
  matches?: [number, number][];
  class?: string;
}> = (props) => {
  const segments = () => {
    const text = props.text;
    const matches = props.matches;

    if (!matches || matches.length === 0) {
      return [{ text, highlight: false }];
    }

    const result: { text: string; highlight: boolean }[] = [];
    let lastIndex = 0;

    // Sort matches by start position
    const sortedMatches = [...matches].sort((a, b) => a[0] - b[0]);

    for (const [start, end] of sortedMatches) {
      // Add non-highlighted segment before this match
      if (start > lastIndex) {
        result.push({ text: text.slice(lastIndex, start), highlight: false });
      }
      // Add highlighted segment
      result.push({ text: text.slice(start, end), highlight: true });
      lastIndex = end;
    }

    // Add remaining non-highlighted text
    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex), highlight: false });
    }

    return result;
  };

  return (
    <span class={props.class}>
      <For each={segments()}>
        {(segment) =>
          segment.highlight ? (
            <span class="text-accent-600 dark:text-accent-400 font-semibold">
              {segment.text}
            </span>
          ) : (
            <span>{segment.text}</span>
          )
        }
      </For>
    </span>
  );
};

/**
 * Clock icon for recent items
 */
const ClockIcon: Component = () => (
  <svg
    class="w-3.5 h-3.5 text-surface-400 dark:text-surface-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

/**
 * A single item in the command palette list
 */
export const CommandPaletteItem: Component<CommandPaletteItemProps> = (
  props,
) => {
  return (
    <button
      type="button"
      class={`
        w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
        ${props.selected ? 'bg-accent-500/15 dark:bg-accent-500/20' : 'hover:bg-black/5 dark:hover:bg-white/5'}
        ${props.item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      disabled={props.item.disabled}
    >
      {/* Recent indicator */}
      <Show when={props.isRecent}>
        <ClockIcon />
      </Show>

      {/* Custom icon */}
      <Show when={props.item.icon}>{props.item.icon}</Show>

      {/* Content */}
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <HighlightedText
            text={props.item.label}
            matches={props.labelMatches}
            class="text-sm font-medium text-surface-900 dark:text-surface-100 truncate"
          />
        </div>
        <Show when={props.item.description}>
          <HighlightedText
            text={props.item.description!}
            matches={props.descriptionMatches}
            class="text-xs text-surface-500 dark:text-surface-400 truncate block mt-0.5"
          />
        </Show>
      </div>

      {/* Selection indicator */}
      <Show when={props.selected}>
        <div class="flex-shrink-0">
          <svg
            class="w-4 h-4 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Show>
    </button>
  );
};
