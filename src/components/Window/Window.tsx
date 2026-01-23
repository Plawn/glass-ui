import clsx from 'clsx';
import {
  type Component,
  For,
  Show,
  createEffect,
  createSignal,
} from 'solid-js';
import {
  ANIMATION_DURATION,
  BACKDROP_ENTER,
  BACKDROP_EXIT,
  MODAL_PANEL_ENTER,
} from '../../constants';
import {
  type Position,
  useAnimationState,
  useDraggable,
  useEscapeKey,
  useResizable,
} from '../../hooks';
import { CloseButton, PortalWithDarkMode } from '../shared';
import { WindowHandle } from './WindowHandle';
import type { ResizeDirection, WindowProps } from './types';

/** All resize directions for the handles */
const RESIZE_DIRECTIONS: ResizeDirection[] = [
  'n',
  's',
  'e',
  'w',
  'ne',
  'nw',
  'se',
  'sw',
];

/**
 * A draggable and resizable window component.
 * Similar to Modal but allows user interaction for moving and resizing.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = createSignal(false);
 *
 * <Window
 *   open={open()}
 *   onClose={() => setOpen(false)}
 *   title="My Window"
 *   defaultPosition="center"
 *   defaultSize={{ width: 400, height: 300 }}
 * >
 *   <p>Window content</p>
 * </Window>
 * ```
 */
export const Window: Component<WindowProps> = (props) => {
  const draggable = () => props.draggable ?? true;
  const resizable = () => props.resizable ?? true;
  const bounded = () => props.bounded ?? true;
  const showClose = () => props.showClose ?? true;
  const showBackdrop = () => props.showBackdrop ?? false;
  const closeOnBackdrop = () => props.closeOnBackdrop ?? true;
  const closeOnEscape = () => props.closeOnEscape ?? true;
  const zIndex = () => props.zIndex ?? 50;

  // Default size
  const defaultSize = () => props.defaultSize ?? { width: 400, height: 300 };

  // Calculate default position (center or provided)
  const calculateDefaultPosition = (): Position => {
    if (props.defaultPosition === 'center') {
      const size = defaultSize();
      return {
        x: Math.max(0, (window.innerWidth - size.width) / 2),
        y: Math.max(0, (window.innerHeight - size.height) / 2),
      };
    }
    if (props.defaultPosition) {
      return props.defaultPosition;
    }
    // Default to centered
    const size = defaultSize();
    return {
      x: Math.max(0, (window.innerWidth - size.width) / 2),
      y: Math.max(0, (window.innerHeight - size.height) / 2),
    };
  };

  // Element ref for bounded mode
  let windowRef: HTMLDivElement | undefined;

  // Internal position state (for when resizable needs to adjust position)
  const [internalPosition, setInternalPosition] = createSignal<Position>(
    calculateDefaultPosition(),
  );

  // Determine actual position (controlled or internal)
  const currentPosition = (): Position => {
    return props.position ?? internalPosition();
  };

  // Handle position change (from drag or resize)
  const handlePositionChange = (pos: Position) => {
    setInternalPosition(pos);
    props.onPositionChange?.(pos);
  };

  // Use animation state hook for enter/exit animations
  const { visible, isClosing } = useAnimationState({
    open: () => props.open,
    duration: () => ANIMATION_DURATION,
  });

  // Escape key handling
  useEscapeKey({
    onEscape: () => {
      if (closeOnEscape()) {
        props.onClose();
      }
    },
    enabled: visible,
  });

  // Draggable hook
  const { isDragging, dragHandleProps } = useDraggable({
    defaultPosition: calculateDefaultPosition(),
    position: currentPosition,
    onPositionChange: handlePositionChange,
    enabled: draggable,
    bounded,
    elementRef: () => windowRef,
  });

  // Resizable hook
  const { size, getResizeHandleProps } = useResizable({
    defaultSize: defaultSize(),
    size: () => props.size,
    onSizeChange: props.onSizeChange,
    onPositionChange: handlePositionChange,
    position: currentPosition,
    minWidth: props.constraints?.minWidth ?? 200,
    maxWidth: props.constraints?.maxWidth,
    minHeight: props.constraints?.minHeight ?? 150,
    maxHeight: props.constraints?.maxHeight,
    enabled: resizable,
    bounded,
  });

  // Recenter when opening if using 'center'
  createEffect(() => {
    if (props.open && props.defaultPosition === 'center') {
      const s = props.size ?? size();
      setInternalPosition({
        x: Math.max(0, (window.innerWidth - s.width) / 2),
        y: Math.max(0, (window.innerHeight - s.height) / 2),
      });
    }
  });

  // Handle backdrop click
  const handleBackdropClick = (e: MouseEvent) => {
    if (closeOnBackdrop() && e.target === e.currentTarget) {
      props.onClose();
    }
  };

  // Handle window focus (bring to front)
  const handleWindowFocus = () => {
    props.onFocus?.();
  };

  // Animation classes
  const backdropClasses = () => (isClosing() ? BACKDROP_EXIT : BACKDROP_ENTER);
  const windowClasses = () =>
    isClosing()
      ? 'animate-out fade-out zoom-out-95 duration-200'
      : MODAL_PANEL_ENTER;

  // Cursor class for dragging state
  const cursorClass = () => {
    if (isDragging()) return 'cursor-grabbing';
    if (draggable()) return 'cursor-grab';
    return '';
  };

  return (
    <Show when={visible()}>
      <PortalWithDarkMode>
        {/* Backdrop (optional) */}
        <Show when={showBackdrop()}>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is supplementary to Escape key */}
          <div
            class={clsx(
              'fixed inset-0 bg-black/50 backdrop-blur-sm',
              backdropClasses(),
            )}
            style={{ 'z-index': zIndex() - 1 }}
            onClick={handleBackdropClick}
          />
        </Show>

        {/* Window */}
        <div
          ref={windowRef}
          class={clsx(
            'fixed glass-card rounded-2xl shadow-2xl overflow-hidden flex flex-col',
            windowClasses(),
            props.class,
          )}
          style={{
            'z-index': zIndex(),
            left: `${currentPosition().x}px`,
            top: `${currentPosition().y}px`,
            width: `${props.size?.width ?? size().width}px`,
            height: `${props.size?.height ?? size().height}px`,
          }}
          role="dialog"
          aria-modal={showBackdrop()}
          aria-labelledby={props.title ? 'window-title' : undefined}
          onMouseDown={handleWindowFocus}
          onTouchStart={handleWindowFocus}
        >
          {/* Header (drag handle) */}
          <div
            class={clsx(
              'flex items-center justify-between px-4 py-3 border-b border-surface-200/50 dark:border-surface-700/50 select-none',
              cursorClass(),
            )}
            onMouseDown={draggable() ? dragHandleProps.onMouseDown : undefined}
            onTouchStart={
              draggable() ? dragHandleProps.onTouchStart : undefined
            }
            style={draggable() ? 'touch-action: none;' : undefined}
          >
            <Show when={props.title}>
              <h2
                id="window-title"
                class="text-base font-semibold text-surface-900 dark:text-white truncate"
              >
                {props.title}
              </h2>
            </Show>
            <Show when={!props.title}>
              <div />
            </Show>
            <Show when={showClose()}>
              <CloseButton onClick={props.onClose} size="sm" />
            </Show>
          </div>

          {/* Content */}
          <div class="flex-1 min-h-0 overflow-auto p-4 scrollbar-thin">
            {props.children}
          </div>

          {/* Footer (optional) */}
          <Show when={props.footer}>
            <div class="px-4 py-3 border-t border-surface-200/50 dark:border-surface-700/50">
              {props.footer}
            </div>
          </Show>

          {/* Resize handles */}
          <Show when={resizable()}>
            <For each={RESIZE_DIRECTIONS}>
              {(direction) => (
                <WindowHandle
                  direction={direction}
                  resizeHandleProps={getResizeHandleProps(direction)}
                />
              )}
            </For>
          </Show>
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
