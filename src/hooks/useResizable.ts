import { type Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
import type { Position } from './useDraggable';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface Size {
  width: number;
  height: number;
}

export interface UseResizableOptions {
  /** Default size when uncontrolled */
  defaultSize?: Size;
  /** Controlled size (optional) */
  size?: Accessor<Size | undefined>;
  /** Callback when size changes */
  onSizeChange?: (size: Size) => void;
  /** Callback when position needs to change (for n/w/nw/ne/sw resize) */
  onPositionChange?: (pos: Position) => void;
  /** Current position (needed for bounded mode) */
  position?: Accessor<Position>;
  /** Minimum width */
  minWidth?: number;
  /** Maximum width */
  maxWidth?: number;
  /** Minimum height */
  minHeight?: number;
  /** Maximum height */
  maxHeight?: number;
  /** Whether resizing is enabled */
  enabled?: Accessor<boolean>;
  /** Whether to bound to viewport */
  bounded?: Accessor<boolean>;
}

export interface ResizeHandleProps {
  onMouseDown: (e: MouseEvent) => void;
  onTouchStart: (e: TouchEvent) => void;
  style: string;
}

export interface UseResizableReturn {
  /** Current size */
  size: Accessor<Size>;
  /** Whether currently resizing */
  isResizing: Accessor<boolean>;
  /** Current resize direction (null when not resizing) */
  resizeDirection: Accessor<ResizeDirection | null>;
  /** Get props for a resize handle */
  getResizeHandleProps: (direction: ResizeDirection) => ResizeHandleProps;
  /** Imperatively set size */
  setSize: (size: Size) => void;
}

/** Cursor styles for each resize direction */
const CURSOR_MAP: Record<ResizeDirection, string> = {
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
  nw: 'nwse-resize',
  se: 'nwse-resize',
};

/**
 * Hook to make an element resizable.
 * Supports 8 resize directions and position adjustment for n/w/nw/ne/sw handles.
 */
export function useResizable(
  options: UseResizableOptions = {},
): UseResizableReturn {
  const {
    defaultSize = { width: 400, height: 300 },
    size: controlledSize,
    onSizeChange,
    onPositionChange,
    position = () => ({ x: 0, y: 0 }),
    minWidth = 100,
    maxWidth = Number.POSITIVE_INFINITY,
    minHeight = 100,
    maxHeight = Number.POSITIVE_INFINITY,
    enabled = () => true,
    bounded = () => false,
  } = options;

  // Internal size state (used when uncontrolled)
  const [internalSize, setInternalSize] = createSignal<Size>(defaultSize);
  const [isResizing, setIsResizing] = createSignal(false);
  const [resizeDirection, setResizeDirection] =
    createSignal<ResizeDirection | null>(null);

  // Captured at resize start - immutable during resize
  const [startSize, setStartSize] = createSignal<Size>({ width: 0, height: 0 });
  const [startMouse, setStartMouse] = createSignal<Position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = createSignal<Position>({
    x: 0,
    y: 0,
  });

  // Determine actual size (controlled or internal)
  const size = (): Size => {
    const controlled = controlledSize?.();
    return controlled ?? internalSize();
  };

  // Update size
  const setSize = (newSize: Size) => {
    setInternalSize(newSize);
    onSizeChange?.(newSize);
  };

  // Handle resize start
  const handleResizeStart = (
    direction: ResizeDirection,
    clientX: number,
    clientY: number,
  ) => {
    if (!enabled()) {
      return;
    }

    setIsResizing(true);
    setResizeDirection(direction);
    setStartSize(size());
    setStartMouse({ x: clientX, y: clientY });
    setStartPosition(position());
  };

  // Handle resize move
  const handleResizeMove = (clientX: number, clientY: number) => {
    if (!isResizing()) {
      return;
    }

    const direction = resizeDirection();
    if (!direction) {
      return;
    }

    const deltaX = clientX - startMouse().x;
    const deltaY = clientY - startMouse().y;
    const start = startSize();
    const startPos = startPosition();

    // Step 1: Calculate raw new size based on direction
    let rawWidth = start.width;
    let rawHeight = start.height;

    if (direction.includes('e')) {
      rawWidth = start.width + deltaX;
    }
    if (direction.includes('w')) {
      rawWidth = start.width - deltaX;
    }
    if (direction.includes('s')) {
      rawHeight = start.height + deltaY;
    }
    if (direction.includes('n')) {
      rawHeight = start.height - deltaY;
    }

    // Step 2: Apply min/max constraints
    let finalWidth = Math.max(minWidth, Math.min(rawWidth, maxWidth));
    let finalHeight = Math.max(minHeight, Math.min(rawHeight, maxHeight));

    // Step 3: Apply viewport bounds if needed
    if (bounded()) {
      // For east/south directions, limit size to viewport edge
      if (direction.includes('e')) {
        const maxW = window.innerWidth - startPos.x;
        finalWidth = Math.min(finalWidth, maxW);
      }
      if (direction.includes('s')) {
        const maxH = window.innerHeight - startPos.y;
        finalHeight = Math.min(finalHeight, maxH);
      }

      // For west/north directions, limit size based on position
      if (direction.includes('w')) {
        // Can't grow wider than current position allows (would go off left edge)
        const maxW = start.width + startPos.x;
        finalWidth = Math.min(finalWidth, maxW);
      }
      if (direction.includes('n')) {
        // Can't grow taller than current position allows (would go off top edge)
        const maxH = start.height + startPos.y;
        finalHeight = Math.min(finalHeight, maxH);
      }
    }

    // Re-apply min constraints after bounds
    finalWidth = Math.max(minWidth, finalWidth);
    finalHeight = Math.max(minHeight, finalHeight);

    // Step 4: Calculate final position for n/w directions
    // Position changes by the difference between start size and final size
    let finalX = startPos.x;
    let finalY = startPos.y;

    if (direction.includes('w')) {
      finalX = startPos.x + (start.width - finalWidth);
    }
    if (direction.includes('n')) {
      finalY = startPos.y + (start.height - finalHeight);
    }

    // Step 5: Apply final bounds to position
    if (bounded()) {
      finalX = Math.max(0, finalX);
      finalY = Math.max(0, finalY);
    }

    // Step 6: Update size
    setSize({ width: finalWidth, height: finalHeight });

    // Step 7: Update position if needed (for n/w directions)
    if (
      onPositionChange &&
      (direction.includes('n') || direction.includes('w'))
    ) {
      onPositionChange({ x: finalX, y: finalY });
    }
  };

  // Handle resize end
  const handleResizeEnd = () => {
    if (!isResizing()) {
      return;
    }
    setIsResizing(false);
    setResizeDirection(null);
  };

  // Get props for a resize handle
  const getResizeHandleProps = (
    direction: ResizeDirection,
  ): ResizeHandleProps => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleResizeStart(direction, e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.stopPropagation();
      const touch = e.touches[0];
      if (touch) {
        handleResizeStart(direction, touch.clientX, touch.clientY);
      }
    };

    return {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      style: `cursor: ${CURSOR_MAP[direction]}; touch-action: none;`,
    };
  };

  // Global mouse/touch move and end handlers
  createEffect(() => {
    if (!isResizing()) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleResizeMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleResizeMove(touch.clientX, touch.clientY);
      }
    };

    const handleMouseUp = () => {
      handleResizeEnd();
    };

    const handleTouchEnd = () => {
      handleResizeEnd();
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
    size,
    isResizing,
    resizeDirection,
    getResizeHandleProps,
    setSize,
  };
}
