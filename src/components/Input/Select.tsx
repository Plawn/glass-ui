import { For, Show } from 'solid-js';
import { ChevronDownIcon } from '../shared/icons';
import type { SelectProps } from './types';

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
  // Find the index of the currently selected value
  const getSelectedIndex = () => {
    if (!props.options || props.value === null || props.value === undefined)
      return '';
    const index = props.options.findIndex((opt) => opt.value === props.value);
    return index >= 0 ? String(index) : '';
  };

  // Handle change for options array
  const handleOptionsChange = (indexStr: string) => {
    if (!props.options) return;
    if (indexStr === '') {
      (props.onChange as (value: T | null) => void)(null);
    } else {
      const index = Number.parseInt(indexStr, 10);
      const option = props.options[index];
      if (option) {
        (props.onChange as (value: T | null) => void)(option.value);
      }
    }
  };

  // Handle change for children (string values)
  const handleChildrenChange = (value: string) => {
    (props.onChange as (value: string) => void)(value);
  };

  return (
    <div class="w-full">
      <Show when={props.label}>
        <label
          for={props.id}
          class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          {props.label}
          <Show when={props.required}>
            <span class="text-red-500 ml-0.5">*</span>
          </Show>
        </label>
      </Show>
      <div class="relative overflow-hidden">
        <select
          ref={props.ref}
          id={props.id}
          name={props.name}
          class={`w-full px-3 py-2 sm:py-2.5 glass-input text-sm text-surface-800 dark:text-surface-200 font-medium focus:outline-none cursor-pointer appearance-none pr-9 disabled:opacity-50 disabled:cursor-not-allowed truncate ${props.error ? 'border-red-500 dark:border-red-400' : ''} ${props.class ?? ''}`}
          value={props.options ? getSelectedIndex() : (props.value as string)}
          disabled={props.disabled}
          required={props.required}
          onChange={(e) => {
            if (props.options) {
              handleOptionsChange(e.currentTarget.value);
            } else {
              handleChildrenChange(e.currentTarget.value);
            }
          }}
          style={{ 'text-overflow': 'ellipsis' }}
        >
          <Show when={props.options} fallback={props.children}>
            <Show when={props.emptyOption}>
              <option value="">{props.emptyOption}</option>
            </Show>
            <For each={props.options}>
              {(option, index) => (
                <option value={index()} disabled={option.disabled}>
                  {option.label}
                </option>
              )}
            </For>
          </Show>
        </select>
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon class="w-4 h-4 text-surface-400 dark:text-surface-500" />
        </div>
      </div>
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">
          {props.error}
        </p>
      </Show>
    </div>
  );
}
