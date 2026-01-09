import type { Component } from 'solid-js';
import type { IconProps } from './CloseIcon';

/** Sort icon - bidirectional arrows for sortable columns */
export const SortIcon: Component<IconProps> = (props) => {
  const size = () => props.size ?? 14;

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
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  );
};
