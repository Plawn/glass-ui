import { type Component, Show } from 'solid-js';
import { ChevronDownIcon } from '../shared/icons';
import type { SelectProps } from './types';

/**
 * A glassmorphic select component with a custom dropdown indicator.
 *
 * @example
 * ```tsx
 * <Select
 *   value={selected()}
 *   onChange={setSelected}
 * >
 *   <option value="a">Option A</option>
 *   <option value="b">Option B</option>
 * </Select>
 * ```
 */
export const Select: Component<SelectProps> = (props) => {
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
          class={`w-full px-3 py-2 sm:py-2.5 glass-input text-sm text-surface-800 dark:text-surface-200 font-medium focus:outline-none cursor-pointer appearance-none pr-9 disabled:opacity-50 disabled:cursor-not-allowed truncate ${props.error ? 'glass-input-error' : ''} ${props.class ?? ''}`}
          value={props.value}
          disabled={props.disabled}
          required={props.required}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          style={{ 'text-overflow': 'ellipsis' }}
        >
          {props.children}
        </select>
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon class="w-4 h-4 text-surface-400 dark:text-surface-500" />
        </div>
      </div>
      <Show when={props.error}>
        <p class="mt-1.5 text-sm text-red-500 dark:text-red-400">{props.error}</p>
      </Show>
    </div>
  );
};
