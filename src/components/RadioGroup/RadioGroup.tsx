import { type Component, For, Show, createUniqueId } from 'solid-js';
import type { RadioGroupProps, RadioGroupSize } from './types';

/**
 * Size configuration for the radio indicator
 */
const sizeConfig: Record<RadioGroupSize, { outer: string; inner: string; gap: string; label: string }> = {
  sm: {
    outer: 'w-5 h-5',
    inner: 'w-2 h-2',
    gap: 'gap-2',
    label: 'text-xs',
  },
  md: {
    outer: 'w-6 h-6',
    inner: 'w-2.5 h-2.5',
    gap: 'gap-3',
    label: 'text-sm',
  },
  lg: {
    outer: 'w-7 h-7',
    inner: 'w-3 h-3',
    gap: 'gap-4',
    label: 'text-base',
  },
};

/**
 * A glassmorphic radio group component for selecting a single option from a list.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3', disabled: true },
 *   ]}
 *   value={selectedValue()}
 *   onChange={setSelectedValue}
 *   label="Select an option"
 *   orientation="vertical"
 * />
 * ```
 */
export const RadioGroup: Component<RadioGroupProps> = (props) => {
  const fallbackName = createUniqueId();
  const groupName = () => props.name ?? fallbackName;
  const size = () => props.size ?? 'md';
  const orientation = () => props.orientation ?? 'vertical';
  const config = () => sizeConfig[size()];

  const isOptionDisabled = (optionDisabled?: boolean) =>
    props.disabled || optionDisabled;

  return (
    <div class={`w-full ${props.class ?? ''}`}>
      <Show when={props.label}>
        <div class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
          {props.label}
        </div>
      </Show>
      <div
        role="radiogroup"
        aria-label={props.label}
        class={`flex ${config().gap} ${
          orientation() === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'
        }`}
      >
        <For each={props.options}>
          {(option) => {
            const optionId = createUniqueId();
            const disabled = () => isOptionDisabled(option.disabled);
            const isSelected = () => props.value === option.value;

            return (
              <label
                class={`inline-flex items-center ${config().gap} cursor-pointer select-none ${
                  disabled() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={groupName()}
                  value={option.value}
                  checked={isSelected()}
                  disabled={disabled()}
                  onChange={() => props.onChange(option.value)}
                  class="sr-only"
                />

                {/* Radio indicator - glassmorphic circle */}
                <div
                  class={`
                    ${config().outer}
                    relative flex items-center justify-center rounded-full
                    transition-all duration-300 ease-out
                    backdrop-blur-xl
                    border
                    ${isSelected()
                      ? 'bg-accent-500/40 dark:bg-accent-400/30 border-accent-300/40 dark:border-accent-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.1)]'
                      : 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_6px_rgba(0,0,0,0.05)]'
                    }
                    ${!disabled() && !isSelected()
                      ? 'hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20'
                      : ''
                    }
                    ${disabled() ? 'pointer-events-none' : ''}
                  `}
                >
                  {/* Inner dot - glassmorphic */}
                  <span
                    class={`
                      ${config().inner}
                      rounded-full
                      transition-all duration-300 ease-out
                      ${isSelected()
                        ? 'opacity-100 scale-100 bg-white/80 dark:bg-white/70 shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
                        : 'opacity-0 scale-0 bg-white/50'
                      }
                    `}
                  />
                </div>

                <span class={`${config().label} text-surface-700 dark:text-surface-300`}>
                  {option.label}
                </span>
              </label>
            );
          }}
        </For>
      </div>
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">{props.error}</p>
      </Show>
    </div>
  );
};
