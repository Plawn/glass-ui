import { type Component, Show, omit } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import { useControlled } from '../../hooks';
import type { NumberInputProps, NumberInputSize } from './types';
import { clampValue as clamp } from './utils';

/**
 * Get size-specific classes for the buttons
 */
const getButtonSizeClasses = (size: NumberInputSize): string => {
  switch (size) {
    case 'sm':
      return 'w-6 h-6 text-xs';
    case 'lg':
      return 'w-10 h-10 text-lg';
    default:
      return 'w-8 h-8 text-sm';
  }
};

/**
 * A glassmorphic number input component with increment/decrement buttons.
 *
 * @example
 * ```tsx
 * <NumberInput
 *   value={count()}
 *   onChange={setCount}
 *   min={0}
 *   max={100}
 *   step={1}
 *   size="md"
 * />
 * ```
 */
export const NumberInput: Component<NumberInputProps> = (props) => {
  const rest = omit(
    props,
    'value',
    'defaultValue',
    'onChange',
    'min',
    'max',
    'step',
    'placeholder',
    'size',
    'label',
    'error',
    'required',
    'disabled',
    'id',
    'name',
    'class',
    'style',
  );
  const size = () => props.size ?? 'md';
  const step = () => props.step ?? 1;
  const min = () => props.min;
  const max = () => props.max;

  const [value, setValue] = useControlled({
    value: () => props.value,
    getDefaultValue: () => props.defaultValue ?? props.min ?? 0,
    onChange: (v) => props.onChange?.(v),
  });

  const sizeClasses = () => INPUT_SIZE_CLASSES[size()];
  const buttonSizeClasses = () => getButtonSizeClasses(size());

  const clampValue = (value: number): number => clamp(value, min(), max());

  const increment = () => {
    if (props.disabled) {
      return;
    }
    setValue(clampValue(value() + step()));
  };

  const decrement = () => {
    if (props.disabled) {
      return;
    }
    setValue(clampValue(value() - step()));
  };

  const handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const parsed = Number.parseFloat(target.value);
    if (!Number.isNaN(parsed)) {
      setValue(clampValue(parsed));
    } else if (target.value === '' || target.value === '-') {
      // Allow empty or negative sign while typing
    }
  };

  const handleBlur = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const parsed = Number.parseFloat(target.value);
    if (Number.isNaN(parsed)) {
      // Reset to min value or 0 if invalid
      const minVal = min();
      setValue(minVal ?? 0);
    } else {
      setValue(clampValue(parsed));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.disabled) {
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    }
  };

  const canDecrement = () => {
    const minVal = min();
    return minVal === undefined || value() > minVal;
  };

  const canIncrement = () => {
    const maxVal = max();
    return maxVal === undefined || value() < maxVal;
  };

  return (
    <div class={`w-full ${props.class ?? ''}`} style={props.style}>
      <Show when={props.label}>
        <label
          for={props.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {props.label}
          <Show when={props.required}>
            <span class="text-error-500 ml-0.5">*</span>
          </Show>
        </label>
      </Show>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class={`shrink-0 flex items-center justify-center rounded-lg glass-input font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-200/50 dark:hover:bg-surface-700/50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${buttonSizeClasses()}`}
          onClick={decrement}
          disabled={props.disabled || !canDecrement()}
          aria-label="Decrement"
        >
          -
        </button>
        <input
          {...rest}
          type="text"
          inputmode="decimal"
          id={props.id}
          name={props.name}
          class={`flex-1 min-w-0 glass-input text-center text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${props.error ? 'border-error-500 dark:border-error-400' : ''}`}
          placeholder={props.placeholder}
          value={value()}
          disabled={props.disabled}
          required={props.required}
          aria-invalid={props.error ? 'true' : 'false'}
          aria-describedby={
            props.error && props.id ? `${props.id}-error` : undefined
          }
          onInput={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          class={`shrink-0 flex items-center justify-center rounded-lg glass-input font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-200/50 dark:hover:bg-surface-700/50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${buttonSizeClasses()}`}
          onClick={increment}
          disabled={props.disabled || !canIncrement()}
          aria-label="Increment"
        >
          +
        </button>
      </div>
      <Show when={props.error}>
        <p
          id={props.id ? `${props.id}-error` : undefined}
          class="mt-1.5 text-sm text-error-500 dark:text-error-400"
          role="alert"
        >
          {props.error}
        </p>
      </Show>
    </div>
  );
};
