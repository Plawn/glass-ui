import { type Component, Show, createEffect } from 'solid-js';
import { CheckIcon } from '../shared/icons';
import type { CheckboxProps } from './types';

/**
 * A glassmorphic checkbox component with an optional label.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked()}
 *   onChange={setIsChecked}
 *   label="Accept terms and conditions"
 * />
 * ```
 */
const SIZE_STYLES = {
  sm: { box: 'w-4 h-4', icon: 'w-2.5 h-2.5', bar: 'w-2 h-0.5' },
  md: { box: 'w-5 h-5', icon: 'w-3 h-3', bar: 'w-2.5 h-0.5' },
  lg: { box: 'w-6 h-6', icon: 'w-3.5 h-3.5', bar: 'w-3 h-0.5' },
} as const;

export const Checkbox: Component<CheckboxProps> = (props) => {
  let inputRef: HTMLInputElement | undefined;
  const size = () => props.size ?? 'md';
  const sizeStyle = () => SIZE_STYLES[size()];

  createEffect(() => {
    if (inputRef) {
      inputRef.indeterminate = props.indeterminate ?? false;
    }
  });

  const setRef = (el: HTMLInputElement) => {
    inputRef = el;
    if (typeof props.ref === 'function') {
      props.ref(el);
    }
  };

  return (
    <label
      class={`inline-flex items-center gap-3 cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${props.class ?? ''}`}
    >
      <div
        class={`${sizeStyle().box} flex items-center justify-center ${
          props.checked || props.indeterminate ? 'glass-checkbox-checked' : 'glass-checkbox'
        }`}
      >
        <input
          ref={setRef}
          type="checkbox"
          id={props.id}
          name={props.name}
          checked={props.checked}
          disabled={props.disabled}
          required={props.required}
          onChange={(e) => props.onChange?.(e.currentTarget.checked)}
          class="sr-only"
        />
        <Show when={props.indeterminate}>
          <div class={`${sizeStyle().bar} bg-white rounded-full`} />
        </Show>
        <Show when={!props.indeterminate}>
          <CheckIcon
            class={`${sizeStyle().icon} text-white transition-all duration-200 ${props.checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          />
        </Show>
      </div>
      <Show when={props.label}>
        <span class="text-sm text-surface-700 dark:text-surface-300">{props.label}</span>
      </Show>
    </label>
  );
};
