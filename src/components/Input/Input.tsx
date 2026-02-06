import { type Component, Show } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import type { InputProps } from './types';

/**
 * A glassmorphic text input component with size variants.
 *
 * @example
 * ```tsx
 * <Input
 *   value={value()}
 *   onInput={setValue}
 *   placeholder="Enter text..."
 *   size="md"
 * />
 * ```
 */
export const Input: Component<InputProps> = (props) => {
  const size = () => props.size ?? 'md';
  const sizeClasses = () => INPUT_SIZE_CLASSES[size()];

  return (
    <div class="w-full">
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
      <input
        ref={props.ref}
        type={props.type ?? 'text'}
        id={props.id}
        name={props.name}
        class={`w-full glass-input text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${props.error ? 'border-error-500 dark:border-error-400' : ''} ${props.class ?? ''}`}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        readonly={props.readonly}
        required={props.required}
        autocomplete={props.autocomplete}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        onKeyDown={props.onKeyDown}
      />
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-error-500 dark:text-error-400">
          {props.error}
        </p>
      </Show>
    </div>
  );
};
