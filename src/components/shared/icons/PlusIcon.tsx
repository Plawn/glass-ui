import type { Component } from 'solid-js';
import type { IconProps } from './CloseIcon';

/** Plus icon for add actions */
export const PlusIcon: Component<IconProps> = (props) => {
  const size = () => props.size ?? 16;

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
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
};
