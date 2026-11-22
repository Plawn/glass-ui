import { type Component, Show, omit } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import { useControlled } from '../../hooks';
import { Spinner } from '../Spinner';
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
  const rest = omit(
    props,
    'size',
    'label',
    'error',
    'required',
    'id',
    'name',
    'type',
    'placeholder',
    'value',
    'defaultValue',
    'onInput',
    'disabled',
    'readonly',
    'autocomplete',
    'class',
    'onKeyDown',
    'loading',
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
      <div class="relative">
        <input
          {...rest}
          type={props.type ?? 'text'}
          id={props.id}
          name={props.name}
          class={`w-full glass-input text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${props.loading ? 'pr-10' : ''} ${props.error ? 'border-error-500 dark:border-error-400' : ''} ${props.class ?? ''}`}
          placeholder={props.placeholder}
          value={value()}
          disabled={props.disabled}
          readonly={props.readonly}
          required={props.required}
          autocomplete={props.autocomplete}
          aria-invalid={props.error ? 'true' : 'false'}
          aria-busy={props.loading ? 'true' : undefined}
          aria-describedby={
            props.error && props.id ? `${props.id}-error` : undefined
          }
          onInput={(e) => setValue(e.currentTarget.value)}
          onKeyDown={props.onKeyDown}
        />
        <Show when={props.loading}>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Spinner size="sm" />
          </div>
        </Show>
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
