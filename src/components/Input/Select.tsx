import { For, Show, splitProps } from 'solid-js';
import { useControlled } from '../../hooks';
import { Spinner } from '../Spinner';
import { ChevronDownIcon } from '../shared/icons';
import type { SelectProps, SelectPropsWithOptions } from './types';

/**
 * A glassmorphic select component with a custom dropdown indicator.
 * Supports both children (string values) and options array (any type).
 *
 * @example
 * ```tsx
 * // With children (string values)
 * <Select
 *   value={selected()}
 *   onChange={setSelected}
 * >
 *   <option value="a">Option A</option>
 *   <option value="b">Option B</option>
 * </Select>
 *
 * // With options array (any type)
 * <Select
 *   value={selectedUser()}
 *   onChange={setSelectedUser}
 *   emptyOption="Select a user..."
 *   options={[
 *     { value: { id: 1, name: 'John' }, label: 'John Doe' },
 *     { value: { id: 2, name: 'Jane' }, label: 'Jane Doe' },
 *   ]}
 * />
 * ```
 */
export function Select<T = string>(props: SelectProps<T>) {
  const [local, rest] = splitProps(props as SelectPropsWithOptions<T>, [
    'value',
    'defaultValue',
    'onChange',
    'children',
    'options',
    'emptyOption',
    'label',
    'error',
    'id',
    'name',
    'class',
    'disabled',
    'required',
    'loading',
  ]);

  const [value, setValue] = useControlled<T | string | null>({
    value: () => local.value,
    defaultValue: local.defaultValue ?? (local.options ? null : ''),
    onChange: (v) =>
      (local.onChange as ((value: T | string | null) => void) | undefined)?.(v),
  });

  // Find the index of the currently selected value
  const getSelectedIndex = () => {
    if (!local.options || value() === null || value() === undefined) {
      return '';
    }
    const index = local.options.findIndex((opt) => opt.value === value());
    return index >= 0 ? String(index) : '';
  };

  // Handle change for options array
  const handleOptionsChange = (indexStr: string) => {
    if (!local.options) {
      return;
    }
    if (indexStr === '') {
      setValue(null);
    } else {
      const index = Number.parseInt(indexStr, 10);
      const option = local.options[index];
      if (option) {
        setValue(option.value);
      }
    }
  };

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
      <div class="relative overflow-hidden">
        <select
          {...rest}
          id={local.id}
          name={local.name}
          class={`w-full px-3 py-2 sm:py-2.5 glass-input text-sm text-surface-800 dark:text-surface-200 font-medium focus:outline-none cursor-pointer appearance-none pr-9 disabled:opacity-50 disabled:cursor-not-allowed truncate ${local.error ? 'border-error-500 dark:border-error-400' : ''} ${local.class ?? ''}`}
          value={local.options ? getSelectedIndex() : (value() as string)}
          disabled={local.disabled}
          required={local.required}
          aria-invalid={!!local.error}
          aria-busy={local.loading || undefined}
          aria-describedby={
            local.error && local.id ? `${local.id}-error` : undefined
          }
          onChange={(e) => {
            if (local.options) {
              handleOptionsChange(e.currentTarget.value);
            } else {
              setValue(e.currentTarget.value);
            }
          }}
          style={{ 'text-overflow': 'ellipsis' }}
        >
          <Show when={local.options} fallback={local.children}>
            <Show when={local.emptyOption}>
              <option value="">{local.emptyOption}</option>
            </Show>
            <For each={local.options}>
              {(option, index) => (
                <option value={index()} disabled={option.disabled}>
                  {option.label}
                </option>
              )}
            </For>
          </Show>
        </select>
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Show
            when={local.loading}
            fallback={
              <ChevronDownIcon
                class="w-4 h-4 text-surface-400 dark:text-surface-500"
                aria-hidden="true"
              />
            }
          >
            <Spinner size="sm" />
          </Show>
        </div>
      </div>
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
}
