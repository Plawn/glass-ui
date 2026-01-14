import { type Component, Show } from 'solid-js';
import type { SwitchProps, SwitchSize } from './types';

/**
 * Size configuration for the switch track and thumb
 */
const sizeConfig: Record<SwitchSize, { track: string; thumb: string; translate: string }> = {
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
  const size = () => props.size ?? 'md';
  const labelPosition = () => props.labelPosition ?? 'right';
  const config = () => sizeConfig[size()];

  const handleClick = () => {
    if (!props.disabled) {
      props.onChange(!props.checked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const Label = () => (
    <Show when={props.label}>
      <span class="text-sm text-surface-700 dark:text-surface-300">{props.label}</span>
    </Show>
  );

  return (
    <label
      class={`inline-flex items-center gap-3 cursor-pointer select-none ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${props.class ?? ''}`}
    >
      <Show when={props.label && labelPosition() === 'left'}>
        <Label />
      </Show>

      {/* Hidden input for form submission */}
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        checked={props.checked}
        disabled={props.disabled}
        onChange={(e) => props.onChange(e.currentTarget.checked)}
        class="sr-only"
      />

      {/* Switch track */}
      <button
        type="button"
        role="switch"
        aria-checked={props.checked}
        aria-disabled={props.disabled}
        tabIndex={props.disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        class={`
          relative inline-flex items-center rounded-full
          transition-all duration-300 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          focus-visible:ring-accent-500 dark:focus-visible:ring-accent-400
          backdrop-blur-xl
          border border-white/20
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)]
          ${config().track}
          ${
            props.checked
              ? 'bg-accent-500/40 dark:bg-accent-400/30 border-accent-300/30'
              : 'bg-white/10 dark:bg-white/5'
          }
          ${props.disabled ? 'pointer-events-none' : ''}
        `}
      >
        {/* Switch thumb */}
        <span
          class={`
            inline-block rounded-full
            transform transition-all duration-300 ease-out
            backdrop-blur-md
            bg-white/30 dark:bg-white/20
            border border-white/40
            shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_2px_8px_rgba(0,0,0,0.15)]
            ${config().thumb}
            ${props.checked ? config().translate : 'translate-x-0.5'}
          `}
        />
      </button>

      <Show when={props.label && labelPosition() === 'right'}>
        <Label />
      </Show>
    </label>
  );
};
