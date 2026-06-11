import { type Component, Show, splitProps } from 'solid-js';
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
  const [local, rest] = splitProps(props, [
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
      <textarea
        {...rest}
        id={local.id}
        name={local.name}
        class={`w-full glass-input text-surface-800 dark:text-surface-200 resize-y focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses()} ${local.error ? 'border-error-500 dark:border-error-400' : ''} ${local.class ?? ''}`}
        placeholder={local.placeholder}
        value={value()}
        rows={local.rows}
        disabled={local.disabled}
        readonly={local.readonly}
        required={local.required}
        aria-invalid={!!local.error}
        aria-describedby={
          local.error && local.id ? `${local.id}-error` : undefined
        }
        onInput={(e) => setValue(e.currentTarget.value)}
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
