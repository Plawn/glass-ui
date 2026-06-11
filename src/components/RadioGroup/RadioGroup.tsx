import {
  type Component,
  For,
  Show,
  createUniqueId,
  splitProps,
} from 'solid-js';
import { useControlled } from '../../hooks';
import type { RadioGroupProps, RadioGroupSize } from './types';

/**
 * Size configuration for the radio indicator
 */
const sizeConfig: Record<
  RadioGroupSize,
  { outer: string; inner: string; gap: string; label: string }
> = {
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
  const [local, rest] = splitProps(props, [
    'options',
    'value',
    'defaultValue',
    'onChange',
    'orientation',
    'size',
    'name',
    'disabled',
    'label',
    'error',
    'class',
  ]);
  const fallbackName = createUniqueId();
  const groupName = () => local.name ?? fallbackName;
  const size = () => local.size ?? 'md';

  const [value, setValue] = useControlled({
    value: () => local.value,
    defaultValue: local.defaultValue ?? '',
    onChange: (v) => local.onChange?.(v),
  });
  const orientation = () => local.orientation ?? 'vertical';
  const config = () => sizeConfig[size()];

  const isOptionDisabled = (optionDisabled?: boolean) =>
    local.disabled || optionDisabled;

  // Refs for roving tabindex
  const radioRefs: Map<string, HTMLInputElement> = new Map();

  const handleKeyDown = (e: KeyboardEvent) => {
    const enabledOptions = local.options.filter(
      (opt) => !isOptionDisabled(opt.disabled),
    );
    if (enabledOptions.length === 0) {
      return;
    }

    const isVertical = orientation() === 'vertical';
    const nextKeys = isVertical
      ? ['ArrowDown', 'ArrowRight']
      : ['ArrowRight', 'ArrowDown'];
    const prevKeys = isVertical
      ? ['ArrowUp', 'ArrowLeft']
      : ['ArrowLeft', 'ArrowUp'];

    const currentIndex = enabledOptions.findIndex(
      (opt) => opt.value === value(),
    );

    let newIndex: number | null = null;
    if (nextKeys.includes(e.key)) {
      e.preventDefault();
      newIndex =
        currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
    } else if (prevKeys.includes(e.key)) {
      e.preventDefault();
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
    }

    if (newIndex !== null) {
      const opt = enabledOptions[newIndex];
      setValue(opt.value);
      radioRefs.get(opt.value)?.focus();
    }
  };

  return (
    <div {...rest} class={`w-full ${local.class ?? ''}`}>
      <Show when={local.label}>
        <div class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
          {local.label}
        </div>
      </Show>
      <div
        role="radiogroup"
        aria-label={local.label}
        aria-describedby={
          local.error
            ? local.name
              ? `${local.name}-error`
              : `${fallbackName}-error`
            : undefined
        }
        class={`flex ${config().gap} ${
          orientation() === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'
        }`}
        onKeyDown={handleKeyDown}
      >
        <For each={local.options}>
          {(option) => {
            const optionId = createUniqueId();
            const disabled = () => isOptionDisabled(option.disabled);
            const isSelected = () => value() === option.value;

            return (
              <label
                class={`inline-flex items-center ${config().gap} cursor-pointer select-none ${
                  disabled() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <input
                  ref={(el) => radioRefs.set(option.value, el)}
                  type="radio"
                  id={optionId}
                  name={groupName()}
                  value={option.value}
                  checked={isSelected()}
                  disabled={disabled()}
                  tabIndex={
                    isSelected() ||
                    (!value() && local.options.indexOf(option) === 0)
                      ? 0
                      : -1
                  }
                  onChange={() => setValue(option.value)}
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
                    ${
                      isSelected()
                        ? 'bg-accent-500/40 dark:bg-accent-400/30 border-accent-300/40 dark:border-accent-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.1)]'
                        : 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_6px_rgba(0,0,0,0.05)]'
                    }
                    ${
                      !disabled() && !isSelected()
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
                      ${
                        isSelected()
                          ? 'opacity-100 scale-100 bg-white/80 dark:bg-white/70 shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
                          : 'opacity-0 scale-0 bg-white/50'
                      }
                    `}
                  />
                </div>

                <span
                  class={`${config().label} text-surface-700 dark:text-surface-300`}
                >
                  {option.label}
                </span>
              </label>
            );
          }}
        </For>
      </div>
      <Show when={local.error}>
        <p
          id={local.name ? `${local.name}-error` : `${fallbackName}-error`}
          class="mt-1.5 text-sm text-error-500 dark:text-error-400"
          role="alert"
        >
          {local.error}
        </p>
      </Show>
    </div>
  );
};
