import type { Component } from 'solid-js';
import type { IconProps } from './CloseIcon';

/** Info icon - circle with lowercase i */
export const InfoIcon: Component<IconProps> = (props) => {
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
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
