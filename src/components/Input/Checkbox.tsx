import {
  type Component,
  Show,
  createEffect,
  createSignal,
  splitProps,
} from 'solid-js';
import { TRANSITION_ALL } from '../../constants';
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
  const [local, rest] = splitProps(props, [
    'checked',
    'defaultChecked',
    'indeterminate',
    'size',
    'onChange',
    'ref',
    'label',
    'error',
    'id',
    'name',
    'class',
    'disabled',
    'required',
  ]);

  let inputRef: HTMLInputElement | undefined;
  const size = () => local.size ?? 'md';
  const sizeStyle = () => SIZE_STYLES[size()];

  // Internal visual state - this is what drives the UI
  const [visualChecked, setVisualChecked] = createSignal(
    local.checked ?? local.defaultChecked ?? false,
  );
  const [visualIndeterminate, setVisualIndeterminate] = createSignal(
    local.indeterminate ?? false,
  );

  // Sync with props.checked - works if props are reactive OR if component remounts
  createEffect(() => {
    const propValue = local.checked;
    if (propValue !== undefined) {
      setVisualChecked(propValue);
    }
  });

  createEffect(() => {
    const propValue = local.indeterminate;
    setVisualIndeterminate(propValue ?? false);
    if (inputRef) {
      inputRef.indeterminate = propValue ?? false;
    }
  });

  const isActive = () => visualChecked() || visualIndeterminate();
  const iconClass = () =>
    `${sizeStyle().icon} text-white ${TRANSITION_ALL} ${visualChecked() ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`;

  const handleChange = (e: Event) => {
    const newChecked = (e.currentTarget as HTMLInputElement).checked;
    // Update visual state immediately for responsiveness
    setVisualChecked(newChecked);
    // Notify parent
    local.onChange?.(newChecked);
  };

  const setRef = (el: HTMLInputElement) => {
    inputRef = el;
    // Sync initial indeterminate state
    el.indeterminate = local.indeterminate ?? false;
    if (typeof local.ref === 'function') {
      local.ref(el);
    }
  };

  return (
    <label
      class={`inline-flex items-center gap-3 cursor-pointer ${local.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${local.class ?? ''}`}
    >
      <div
        class={`${sizeStyle().box} flex items-center justify-center`}
        classList={{
          'glass-checkbox-checked': isActive(),
          'glass-checkbox': !isActive(),
        }}
      >
        <input
          {...rest}
          ref={setRef}
          type="checkbox"
          id={local.id}
          name={local.name}
          checked={visualChecked()}
          disabled={local.disabled}
          required={local.required}
          aria-checked={visualIndeterminate() ? 'mixed' : undefined}
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
      <Show when={local.label}>
        <span class="text-sm text-surface-700 dark:text-surface-300">
          {local.label}
        </span>
      </Show>
    </label>
  );
};
