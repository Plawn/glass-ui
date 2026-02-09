import type { JSX } from 'solid-js';
import { For } from 'solid-js';

export interface FeatureListProps {
  items: (string | JSX.Element)[];
  checkmarks?: boolean;
}

/**
 * Displays a list of features/behaviors/accessibility items.
 * @example <FeatureList items={['Feature 1', 'Feature 2']} />
 * @example <FeatureList items={['Accessible', 'Keyboard nav']} checkmarks />
 */
export function FeatureList(props: FeatureListProps) {
  const useCheckmarks = () => props.checkmarks ?? false;

  return (
    <ul
      class={
        useCheckmarks()
          ? 'space-y-2 text-surface-600 dark:text-surface-400'
          : 'list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400'
      }
    >
      <For each={props.items}>
        {(item) =>
          useCheckmarks() ? (
            <li class="flex items-start gap-2">
              <svg
                class="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{item}</span>
            </li>
          ) : (
            <li>{item}</li>
          )
        }
      </For>
    </ul>
  );
}
