import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js';

export interface Position {
  x: number;
  y: number;
}

export interface UseDraggableOptions {
  /** Default position when uncontrolled */
  defaultPosition?: Position;
  /** Controlled position (optional) */
  position?: Accessor<Position | undefined>;
  /** Callback when position changes */
  onPositionChange?: (pos: Position) => void;
  /** Whether dragging is enabled */
  enabled?: Accessor<boolean>;
  /** Whether to bound to viewport */
  bounded?: Accessor<boolean>;
  /** Reference to the element being dragged (needed for bounded mode) */
  elementRef?: Accessor<HTMLElement | undefined>;
}

export interface UseDraggableReturn {
  /** Current position */
  position: Accessor<Position>;
  /** Whether currently dragging */
  isDragging: Accessor<boolean>;
  /** Props to spread on the drag handle element */
  dragHandleProps: {
    onMouseDown: (e: MouseEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    style: string;
  };
  /** Imperatively set position */
  setPosition: (pos: Position) => void;
}

/**
 * Hook to make an element draggable.
 * Provides position tracking and drag handle props.
 *
 * @example
 * ```tsx
 * const { position, isDragging, dragHandleProps } = useDraggable({
 *   defaultPosition: { x: 100, y: 100 },
 *   bounded: () => true,
 *   elementRef: () => windowRef,
 * });
 *
 * <div style={{ transform: `translate(${position().x}px, ${position().y}px)` }}>
 *   <div {...dragHandleProps}>Drag here</div>
 * </div>
 * ```
 */
export function useDraggable(options: UseDraggableOptions = {}): UseDraggableReturn {
  const {
    defaultPosition = { x: 0, y: 0 },
    position: controlledPosition,
    onPositionChange,
    enabled = () => true,
    bounded = () => false,
    elementRef,
  } = options;

  // Internal position state (used when uncontrolled)
  const [internalPosition, setInternalPosition] = createSignal<Position>(defaultPosition);
  const [isDragging, setIsDragging] = createSignal(false);
  const [startPosition, setStartPosition] = createSignal<Position>({ x: 0, y: 0 });
  const [startMouse, setStartMouse] = createSignal<Position>({ x: 0, y: 0 });

  // Determine actual position (controlled or internal)
  const position = (): Position => {
    const controlled = controlledPosition?.();
    return controlled ?? internalPosition();
  };

  // Update position
  const setPosition = (pos: Position) => {
    let boundedPos = pos;

    // Apply bounds if needed
    if (bounded() && elementRef) {
      const el = elementRef();
      if (el) {
        const rect = el.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        boundedPos = {
          x: Math.max(0, Math.min(pos.x, maxX)),
          y: Math.max(0, Math.min(pos.y, maxY)),
        };
      }
    }

    setInternalPosition(boundedPos);
    onPositionChange?.(boundedPos);
  };

  // Handle drag start
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!enabled()) return;

    setIsDragging(true);
    setStartPosition(position());
    setStartMouse({ x: clientX, y: clientY });
  };

  // Handle drag move
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging()) return;

    const deltaX = clientX - startMouse().x;
    const deltaY = clientY - startMouse().y;

    const newPosition: Position = {
      x: startPosition().x + deltaX,
      y: startPosition().y + deltaY,
    };

    setPosition(newPosition);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging()) return;
    setIsDragging(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleDragStart(touch.clientX, touch.clientY);
    }
  };

  // Global mouse/touch move and end handlers
  createEffect(() => {
    if (!isDragging()) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleDragMove(touch.clientX, touch.clientY);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    onCleanup(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    });
  });

  return {
    position,
    isDragging,
    dragHandleProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      style: 'cursor: grab; touch-action: none;',
    },
    setPosition,
  };
}
