import { type Component, Show, createSignal, omit } from 'solid-js';
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
  const rest = omit(
    props,
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
  );

  const size = () => props.size ?? 'md';
  const sizeStyle = () => SIZE_STYLES[size()];

  const [visualChecked, setVisualChecked] = createSignal<boolean>(
    (previous) => props.checked ?? previous ?? props.defaultChecked ?? false,
  );
  const visualIndeterminate = () => props.indeterminate ?? false;

  const isActive = () => visualChecked() || visualIndeterminate();
  const iconClass = () =>
    `${sizeStyle().icon} text-white ${TRANSITION_ALL} ${visualChecked() ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`;

  const handleChange = (e: Event) => {
    const newChecked = (e.currentTarget as HTMLInputElement).checked;
    // Update visual state immediately for responsiveness
    setVisualChecked(newChecked);
    // Notify parent
    props.onChange?.(newChecked);
  };

  return (
    <label
      class={`inline-flex items-center gap-3 cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${props.class ?? ''}`}
    >
      <div
        class={[
          `${sizeStyle().box} flex items-center justify-center`,
          {
            'glass-checkbox-checked': isActive(),
            'glass-checkbox': !isActive(),
          },
        ]}
      >
        <input
          {...rest}
          ref={props.ref}
          prop:indeterminate={visualIndeterminate()}
          type="checkbox"
          id={props.id}
          name={props.name}
          checked={visualChecked()}
          disabled={props.disabled}
          required={props.required}
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
      <Show when={props.label}>
        <span class="text-sm text-surface-700 dark:text-surface-300">
          {props.label}
        </span>
      </Show>
    </label>
  );
};
