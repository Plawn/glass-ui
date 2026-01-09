import type { Component } from 'solid-js';
import type { IconProps } from './CloseIcon';

/** Check/checkmark icon for success states and selections */
export const CheckIcon: Component<IconProps> = (props) => {
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
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};
