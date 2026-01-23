import type { JSX } from 'solid-js';
import type { Position, Size, ResizeDirection } from '../../hooks';

export type { ResizeDirection };

export interface WindowConstraints {
  /** Minimum width in pixels */
  minWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum height in pixels */
  maxHeight?: number;
}

export interface WindowProps {
  /** Whether the window is open */
  open: boolean;
  /** Callback when window should close */
  onClose: () => void;
  /** Window title displayed in the header */
  title?: string;
  /** Window content */
  children: JSX.Element;
  /** Footer content */
  footer?: JSX.Element;

  // Position/Size
  /** Default position when uncontrolled. Use 'center' to center the window on screen. */
  defaultPosition?: Position | 'center';
  /** Default size when uncontrolled */
  defaultSize?: Size;
  /** Controlled position */
  position?: Position;
  /** Callback when position changes */
  onPositionChange?: (pos: Position) => void;
  /** Controlled size */
  size?: Size;
  /** Callback when size changes */
  onSizeChange?: (size: Size) => void;

  // Constraints
  /** Size constraints for the window */
  constraints?: WindowConstraints;
  /** Whether the window is draggable. Default: true */
  draggable?: boolean;
  /** Whether the window is resizable. Default: true */
  resizable?: boolean;
  /** Whether to bound the window to the viewport. Default: true */
  bounded?: boolean;

  // Appearance
  /** Whether to show a backdrop behind the window. Default: false */
  showBackdrop?: boolean;
  /** Whether clicking the backdrop closes the window. Default: true */
  closeOnBackdrop?: boolean;
  /** Whether to show the close button. Default: true */
  showClose?: boolean;
  /** Whether pressing Escape closes the window. Default: true */
  closeOnEscape?: boolean;
  /** Additional CSS class for the window */
  class?: string;
  /** Base z-index for the window. Default: 50. Actual z-index may be higher when focused. */
  zIndex?: number;

  // Focus
  /** Callback when window receives focus (clicked). Useful for multi-window z-index management. */
  onFocus?: () => void;
  /** Whether this window is currently focused (has highest z-index). Used with windowManager. */
  focused?: boolean;
}

export interface WindowHandleProps {
  /** Resize direction for this handle */
  direction: ResizeDirection;
  /** Props from useResizable.getResizeHandleProps */
  resizeHandleProps: {
    onMouseDown: (e: MouseEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    style: string;
  };
}
