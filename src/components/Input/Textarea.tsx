import { type Component, Show, omit } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import { useControlled } from '../../hooks';
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
  const rest = omit(
    props,
    'value',
    'defaultValue',
    'onInput',
    'rows',
    'readonly',
    'size',
    'label',
    'error',
    'id',
    'name',
    'class',
    'placeholder',
    'disabled',
    'required',
  );

  const size = () => props.size ?? 'md';
  const sizeClasses = () => INPUT_SIZE_CLASSES[size()];

  const [value, setValue] = useControlled({
    value: () => props.value,
    getDefaultValue: () => props.defaultValue ?? '',
    onChange: (v) => props.onInput?.(v),
  });

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
        {...rest}
        id={props.id}
        name={props.name}
        class={`w-full glass-input text-surface-800 dark:text-surface-200 resize-y focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${props.error ? 'border-error-500 dark:border-error-400' : ''} ${props.class ?? ''}`}
        placeholder={props.placeholder}
        value={value()}
        rows={props.rows}
        disabled={props.disabled}
        readonly={props.readonly}
        required={props.required}
        aria-invalid={props.error ? 'true' : 'false'}
        aria-describedby={
          props.error && props.id ? `${props.id}-error` : undefined
        }
        onInput={(e) => setValue(e.currentTarget.value)}
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
