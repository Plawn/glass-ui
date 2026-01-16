import type { Component } from 'solid-js';
import type { IconProps } from './createIcon';

export type ChevronDirection = 'up' | 'down' | 'left' | 'right';

export interface ChevronIconProps extends IconProps {
  direction?: ChevronDirection;
}

const paths: Record<ChevronDirection, string> = {
  up: 'M5 15l7-7 7 7',
  down: 'M19 9l-7 7-7-7',
  left: 'M15 19l-7-7 7-7',
  right: 'M9 5l7 7-7 7',
};

/** Chevron icon with configurable direction */
export const ChevronIcon: Component<ChevronIconProps> = (props) => {
  const size = () => props.size ?? 16;
  const direction = () => props.direction ?? 'down';

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
      <path stroke-linecap="round" stroke-linejoin="round" d={paths[direction()]} />
    </svg>
  );
};

/** Convenience components for specific directions */
export const ChevronUpIcon: Component<IconProps> = (props) => (
  <ChevronIcon {...props} direction="up" />
);

export const ChevronDownIcon: Component<IconProps> = (props) => (
  <ChevronIcon {...props} direction="down" />
);

export const ChevronLeftIcon: Component<IconProps> = (props) => (
  <ChevronIcon {...props} direction="left" />
);

export const ChevronRightIcon: Component<IconProps> = (props) => (
  <ChevronIcon {...props} direction="right" />
);
