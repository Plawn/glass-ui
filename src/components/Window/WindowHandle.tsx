import type { Component } from 'solid-js';
import type { ResizeDirection, WindowHandleProps } from './types';

/** Position classes for each resize handle direction */
const POSITION_MAP: Record<ResizeDirection, string> = {
  n: 'top-0 left-2 right-2 h-1',
  s: 'bottom-0 left-2 right-2 h-1',
  e: 'right-0 top-2 bottom-2 w-1',
  w: 'left-0 top-2 bottom-2 w-1',
  ne: 'top-0 right-0 w-3 h-3',
  nw: 'top-0 left-0 w-3 h-3',
  se: 'bottom-0 right-0 w-3 h-3',
  sw: 'bottom-0 left-0 w-3 h-3',
};

/**
 * Invisible resize handle positioned on window edges and corners.
 * Handles mouse/touch events for resizing the window.
 */
export const WindowHandle: Component<WindowHandleProps> = (props) => {
  return (
    <div
      class={`absolute ${POSITION_MAP[props.direction]} z-10`}
      style={props.resizeHandleProps.style}
      onMouseDown={props.resizeHandleProps.onMouseDown}
      onTouchStart={props.resizeHandleProps.onTouchStart}
    />
  );
};
