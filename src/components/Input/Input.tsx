import { type Component, Show, splitProps } from 'solid-js';
import { INPUT_SIZE_CLASSES } from '../../constants';
import { useControlled } from '../../hooks';
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
  const [local, rest] = splitProps(props, [
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
  ]);
  const size = () => local.size ?? 'md';
  const sizeClasses = () => INPUT_SIZE_CLASSES[size()];

  const [value, setValue] = useControlled({
    value: () => local.value,
    defaultValue: local.defaultValue ?? '',
    onChange: (v) => local.onInput?.(v),
  });

  return (
    <div class="w-full">
      <Show when={local.label}>
        <label
          for={local.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {local.label}
          <Show when={local.required}>
            <span class="text-error-500 ml-0.5">*</span>
          </Show>
        </label>
      </Show>
      <input
        {...rest}
        type={local.type ?? 'text'}
        id={local.id}
        name={local.name}
        class={`w-full glass-input text-surface-900 dark:text-surface-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${local.error ? 'border-error-500 dark:border-error-400' : ''} ${local.class ?? ''}`}
        placeholder={local.placeholder}
        value={value()}
        disabled={local.disabled}
        readonly={local.readonly}
        required={local.required}
        autocomplete={local.autocomplete}
        aria-invalid={!!local.error}
        aria-describedby={
          local.error && local.id ? `${local.id}-error` : undefined
        }
        onInput={(e) => setValue(e.currentTarget.value)}
        onKeyDown={local.onKeyDown}
      />
      <Show when={local.error}>
        <p
          id={local.id ? `${local.id}-error` : undefined}
          class="mt-1.5 text-sm text-error-500 dark:text-error-400"
          role="alert"
        >
          {local.error}
        </p>
      </Show>
    </div>
  );
};
