import { type Component, Show, createEffect, createSignal } from 'solid-js';
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

  // Internal visual state - this is what drives the UI
  const [visualChecked, setVisualChecked] = createSignal(
    props.checked ?? false,
  );
  const [visualIndeterminate, setVisualIndeterminate] = createSignal(
    props.indeterminate ?? false,
  );

  // Sync with props.checked - works if props are reactive OR if component remounts
  createEffect(() => {
    const propValue = props.checked;
    if (propValue !== undefined) {
      setVisualChecked(propValue);
    }
  });

  createEffect(() => {
    const propValue = props.indeterminate;
    setVisualIndeterminate(propValue ?? false);
    if (inputRef) {
      inputRef.indeterminate = propValue ?? false;
    }
  });

  const isActive = () => visualChecked() || visualIndeterminate();
  const iconClass = () =>
    `${sizeStyle().icon} text-white transition-all duration-200 ${visualChecked() ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`;

  const handleChange = (e: Event) => {
    const newChecked = (e.currentTarget as HTMLInputElement).checked;
    // Update visual state immediately for responsiveness
    setVisualChecked(newChecked);
    // Notify parent
    props.onChange?.(newChecked);
  };

  const setRef = (el: HTMLInputElement) => {
    inputRef = el;
    // Sync initial indeterminate state
    el.indeterminate = props.indeterminate ?? false;
    if (typeof props.ref === 'function') {
      props.ref(el);
    }
  };

  return (
    <label
      class={`inline-flex items-center gap-3 cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${props.class ?? ''}`}
    >
      <div
        class={`${sizeStyle().box} flex items-center justify-center`}
        classList={{
          'glass-checkbox-checked': isActive(),
          'glass-checkbox': !isActive(),
        }}
      >
        <input
          ref={setRef}
          type="checkbox"
          id={props.id}
          name={props.name}
          checked={visualChecked()}
          disabled={props.disabled}
          required={props.required}
          onChange={handleChange}
          class="sr-only"
        />
        <Show when={visualIndeterminate()}>
          <div class={`${sizeStyle().bar} bg-white rounded-full`} />
        </Show>
        <Show when={!visualIndeterminate()}>
          <CheckIcon class={iconClass()} />
        </Show>
      </div>
      <Show when={props.label}>
        <span class="text-sm text-surface-700 dark:text-surface-300">
          {props.label}
        </span>
      </Show>
    </label>
  );
};
