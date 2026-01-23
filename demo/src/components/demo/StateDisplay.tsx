import type { JSX } from 'solid-js';

export interface StateDisplayProps {
  label: string;
  value: JSX.Element | string | number | boolean | null | undefined;
  mono?: boolean;
}

/**
 * Displays current state value in demo sections.
 * @example <StateDisplay label="Selected" value={value()} />
 */
export function StateDisplay(props: StateDisplayProps) {
  const useMono = () => props.mono ?? true;

  return (
    <p class="text-sm text-surface-500 dark:text-surface-400">
      {props.label}:{' '}
      <span class={useMono() ? 'font-mono' : ''}>
        {typeof props.value === 'boolean'
          ? props.value
            ? 'true'
            : 'false'
          : (props.value ?? 'null')}
      </span>
    </p>
  );
}
