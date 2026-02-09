import { type Component, Show } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import type { TextareaProps } from './types';

/**
 * A glassmorphic textarea component with size variants.
 *
 * @example
 * ```tsx
 * <Textarea
 *   value={value()}
 *   onInput={setValue}
 *   placeholder="Enter text..."
 *   rows={4}
 *   size="md"
 * />
 * ```
 */
export const Textarea: Component<TextareaProps> = (props) => {
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
      <textarea
        ref={props.ref}
        id={props.id}
        name={props.name}
        class={`w-full glass-input text-surface-800 dark:text-surface-200 resize-y focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${props.error ? 'border-error-500 dark:border-error-400' : ''} ${props.class ?? ''}`}
        placeholder={props.placeholder}
        value={props.value}
        rows={props.rows}
        disabled={props.disabled}
        readonly={props.readonly}
        required={props.required}
        aria-invalid={!!props.error}
        aria-describedby={
          props.error && props.id ? `${props.id}-error` : undefined
        }
        onInput={(e) => props.onInput(e.currentTarget.value)}
      />
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
