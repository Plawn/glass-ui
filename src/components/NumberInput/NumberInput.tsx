import { type Component, Show } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import type { NumberInputProps, NumberInputSize } from './types';

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
  const size = () => props.size ?? 'md';
  const step = () => props.step ?? 1;
  const min = () => props.min;
  const max = () => props.max;

  const sizeClasses = () => INPUT_SIZE_CLASSES[size()];
  const buttonSizeClasses = () => getButtonSizeClasses(size());

  const clampValue = (value: number): number => {
    let clamped = value;
    const minVal = min();
    const maxVal = max();
    if (minVal !== undefined && clamped < minVal) {
      clamped = minVal;
    }
    if (maxVal !== undefined && clamped > maxVal) {
      clamped = maxVal;
    }
    return clamped;
  };

  const increment = () => {
    if (props.disabled) return;
    const newValue = clampValue(props.value + step());
    props.onChange(newValue);
  };

  const decrement = () => {
    if (props.disabled) return;
    const newValue = clampValue(props.value - step());
    props.onChange(newValue);
  };

  const handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const parsed = Number.parseFloat(target.value);
    if (!Number.isNaN(parsed)) {
      props.onChange(clampValue(parsed));
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
      props.onChange(minVal ?? 0);
    } else {
      props.onChange(clampValue(parsed));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.disabled) return;
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
    return minVal === undefined || props.value > minVal;
  };

  const canIncrement = () => {
    const maxVal = max();
    return maxVal === undefined || props.value < maxVal;
  };

  return (
    <div class={`w-full ${props.class ?? ''}`}>
      <Show when={props.label}>
        <label
          for={props.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {props.label}
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
          type="text"
          inputMode="decimal"
          id={props.id}
          name={props.name}
          class={`flex-1 min-w-0 glass-input text-center text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${props.error ? 'border-red-500 dark:border-red-400' : ''}`}
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.disabled}
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
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">{props.error}</p>
      </Show>
    </div>
  );
};
