import { type Component, Show, splitProps } from 'solid-js';
import { TRANSITION_ALL_SLOW } from '../../constants';
import { useControlled } from '../../hooks';
import type { SwitchProps, SwitchSize } from './types';

/**
 * Size configuration for the switch track and thumb
 */
const sizeConfig: Record<
  SwitchSize,
  { track: string; thumb: string; translate: string }
> = {
  sm: {
    track: 'w-8 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-3',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5',
  },
  lg: {
    track: 'w-14 h-8',
    thumb: 'w-7 h-7',
    translate: 'translate-x-6',
  },
};

/**
 * An iOS-style toggle switch component with glassmorphism styling.
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={isEnabled()}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 *   size="md"
 * />
 * ```
 */
export const Switch: Component<SwitchProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'checked',
    'defaultChecked',
    'onChange',
    'label',
    'labelPosition',
    'size',
    'disabled',
    'id',
    'name',
    'ref',
    'class',
  ]);
  const size = () => local.size ?? 'md';
  const labelPosition = () => local.labelPosition ?? 'right';
  const config = () => sizeConfig[size()];

  const [checked, setChecked] = useControlled({
    value: () => local.checked,
    defaultValue: local.defaultChecked ?? false,
    onChange: (v) => local.onChange?.(v),
  });

  const handleClick = () => {
    if (!local.disabled) {
      setChecked(!checked());
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const Label = () => (
    <Show when={local.label}>
      <span class="text-sm text-surface-700 dark:text-surface-300">
        {local.label}
      </span>
    </Show>
  );

  return (
    <label
      {...rest}
      class={`inline-flex items-center gap-3 cursor-pointer select-none ${
        local.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${local.class ?? ''}`}
    >
      <Show when={local.label && labelPosition() === 'left'}>
        <Label />
      </Show>

      {/* Hidden input for form submission */}
      <input
        ref={local.ref}
        type="checkbox"
        id={local.id}
        name={local.name}
        checked={checked()}
        disabled={local.disabled}
        onChange={(e) => setChecked(e.currentTarget.checked)}
        class="sr-only"
      />

      {/* Switch track */}
      <button
        type="button"
        role="switch"
        aria-checked={checked()}
        aria-disabled={local.disabled}
        tabIndex={local.disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        class={`
          relative inline-flex items-center rounded-full
          ${TRANSITION_ALL_SLOW}
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          focus-visible:ring-accent-500 dark:focus-visible:ring-accent-400
          backdrop-blur-xl
          border border-white/20
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)]
          ${config().track}
          ${
            checked()
              ? 'bg-accent-500/40 dark:bg-accent-400/30 border-accent-300/30'
              : 'bg-white/10 dark:bg-white/5'
          }
          ${local.disabled ? 'pointer-events-none' : ''}
        `}
      >
        {/* Switch thumb */}
        <span
          class={`
            inline-block rounded-full
            transform ${TRANSITION_ALL_SLOW}
            backdrop-blur-md
            bg-white/30 dark:bg-white/20
            border border-white/40
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_2px_8px_rgba(0,0,0,0.15)]
            ${config().thumb}
            ${checked() ? config().translate : 'translate-x-0.5'}
          `}
        />
      </button>

      <Show when={local.label && labelPosition() === 'right'}>
        <Label />
      </Show>
    </label>
  );
};
