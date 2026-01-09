import type { Component } from 'solid-js';
import type { IconProps } from './CloseIcon';

/** Error icon - circle with exclamation mark */
export const ErrorIcon: Component<IconProps> = (props) => {
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
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
