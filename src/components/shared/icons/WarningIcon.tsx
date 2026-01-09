import type { Component } from 'solid-js';
import type { IconProps } from './CloseIcon';

/** Warning icon - triangle with exclamation */
export const WarningIcon: Component<IconProps> = (props) => {
  const size = () => props.size ?? 20;

  return (
    <svg
      class={props.class}
      width={size()}
      height={size()}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
};
