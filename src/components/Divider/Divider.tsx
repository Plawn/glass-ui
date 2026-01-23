import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import type {
  DividerLabelPosition,
  DividerProps,
  DividerVariant,
} from './types';

const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const labelFlexGrow: Record<
  DividerLabelPosition,
  { before: string; after: string }
> = {
  start: { before: 'grow-0 w-4', after: 'grow' },
  center: { before: 'grow', after: 'grow' },
  end: { before: 'grow', after: 'grow-0 w-4' },
};

export const Divider: Component<DividerProps> = (props) => {
  const orientation = () => props.orientation ?? 'horizontal';
  const variant = () => props.variant ?? 'solid';
  const labelPosition = () => props.labelPosition ?? 'center';

  const isHorizontal = () => orientation() === 'horizontal';
  const hasLabel = () => props.label !== undefined;

  const lineClasses = () =>
    `border-surface-200 dark:border-surface-600 ${variantStyles[variant()]}`;

  return (
    <Show
      when={isHorizontal()}
      fallback={
        // Vertical divider
        <div
          class={`inline-block self-stretch border-l ${lineClasses()} ${props.class ?? ''}`}
          style={props.style}
          role="separator"
          aria-orientation="vertical"
        />
      }
    >
      {/* Horizontal divider */}
      <Show
        when={hasLabel()}
        fallback={
          <hr
            class={`border-t ${lineClasses()} ${props.class ?? ''}`}
            style={props.style}
            aria-orientation="horizontal"
          />
        }
      >
        <div
          class={`flex items-center w-full ${props.class ?? ''}`}
          style={props.style}
          role="separator"
          aria-orientation="horizontal"
        >
          <div
            class={`${labelFlexGrow[labelPosition()].before} border-t ${lineClasses()}`}
          />
          <span class="px-3 text-sm text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-900 shrink-0">
            {props.label}
          </span>
          <div
            class={`${labelFlexGrow[labelPosition()].after} border-t ${lineClasses()}`}
          />
        </div>
      </Show>
    </Show>
  );
};
