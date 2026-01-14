import { type Component, For, Show, createUniqueId } from 'solid-js';
import type { RadioGroupProps, RadioGroupSize } from './types';

/**
 * Get size-specific classes for the radio indicator
 */
const getIndicatorSizeClasses = (size: RadioGroupSize): { outer: string; inner: string } => {
  switch (size) {
    case 'sm':
      return { outer: 'w-4 h-4', inner: 'w-1.5 h-1.5' };
    case 'lg':
      return { outer: 'w-6 h-6', inner: 'w-2.5 h-2.5' };
    default:
      return { outer: 'w-5 h-5', inner: 'w-2 h-2' };
  }
};

/**
 * Get size-specific classes for the label text
 */
const getLabelSizeClasses = (size: RadioGroupSize): string => {
  switch (size) {
    case 'sm':
      return 'text-xs';
    case 'lg':
      return 'text-base';
    default:
      return 'text-sm';
  }
};

/**
 * Get gap classes based on size
 */
const getGapClasses = (size: RadioGroupSize): string => {
  switch (size) {
    case 'sm':
      return 'gap-2';
    case 'lg':
      return 'gap-4';
    default:
      return 'gap-3';
  }
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

  const indicatorClasses = () => getIndicatorSizeClasses(size());
  const labelClasses = () => getLabelSizeClasses(size());
  const gapClasses = () => getGapClasses(size());

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
        class={`flex ${gapClasses()} ${
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
                class={`inline-flex items-center ${gapClasses()} cursor-pointer ${
                  disabled() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div
                  class={`${indicatorClasses().outer} flex items-center justify-center rounded-full transition-all duration-200 ${
                    isSelected()
                      ? 'bg-primary-500 dark:bg-primary-400 border-2 border-primary-500 dark:border-primary-400'
                      : 'bg-surface-100/80 dark:bg-surface-800/80 border-2 border-surface-300 dark:border-surface-600 backdrop-blur-sm'
                  } ${
                    !disabled() && !isSelected()
                      ? 'hover:border-primary-400 dark:hover:border-primary-500'
                      : ''
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
                  <div
                    class={`${indicatorClasses().inner} rounded-full bg-white transition-all duration-200 ${
                      isSelected() ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  />
                </div>
                <span class={`${labelClasses()} text-surface-700 dark:text-surface-300`}>
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
