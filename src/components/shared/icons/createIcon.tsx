import type { Component, JSX } from 'solid-js';

/** Props shared by all icon components */
export interface IconProps {
  class?: string;
  size?: number;
}

/** Configuration for creating an icon component */
export interface CreateIconOptions {
  /** The SVG path element(s) to render */
  path: JSX.Element;
  /** Default size in pixels (default: 20) */
  defaultSize?: number;
  /** SVG viewBox attribute (default: "0 0 24 24") */
  viewBox?: string;
}

/**
 * Factory function to create consistent icon components.
 * All icons use stroke-based rendering with currentColor.
 *
 * @example
 * export const CheckIcon = createIcon({
 *   path: <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />,
 * });
 */
export function createIcon(options: CreateIconOptions): Component<IconProps> {
  const { path, defaultSize = 20, viewBox = '0 0 24 24' } = options;

  return (props) => {
    const size = () => props.size ?? defaultSize;

    return (
      <svg
        class={props.class}
        width={size()}
        height={size()}
        fill="none"
        viewBox={viewBox}
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        {path}
      </svg>
    );
  };
}
