import clsx from 'clsx';
import {
  type Component,
  Show,
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js';
import {
  ANIMATION_DURATION_SLOW,
  SHEET_ENTER,
  SHEET_EXIT,
} from '../../constants';
import { PortalOverlay } from '../shared';
import type { SheetProps } from './types';

// Default snap points if none provided
const DEFAULT_SNAP_POINTS = [0.5];

export const Sheet: Component<SheetProps> = (props) => {
  const snapPoints = () => props.snapPoints ?? DEFAULT_SNAP_POINTS;
  const defaultSnapIndex = () =>
    props.defaultSnapPoint ?? snapPoints().length - 1;
  const dismissible = () => props.dismissible ?? true;
  const showHandle = () => props.showHandle ?? true;

  // Current snap point index
  const [currentSnapIndex, setCurrentSnapIndex] = createSignal(
    defaultSnapIndex(),
  );

  // Drag state
  const [isDragging, setIsDragging] = createSignal(false);
  const [dragOffset, setDragOffset] = createSignal(0);
  const [startY, setStartY] = createSignal(0);

  // Reset snap point when opening
  createEffect(() => {
    if (props.open) {
      setCurrentSnapIndex(defaultSnapIndex());
      setDragOffset(0);
    }
  });

  // Calculate current height percentage
  const currentHeight = () => {
    const baseHeight = snapPoints()[currentSnapIndex()] * 100;
    if (isDragging()) {
      // Convert drag offset to percentage of viewport
      const offsetPercent = (dragOffset() / window.innerHeight) * 100;
      return Math.max(0, Math.min(100, baseHeight - offsetPercent));
    }
    return baseHeight;
  };

  // Handle drag start
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setStartY(clientY);
  };

  // Handle drag move
  const handleDragMove = (clientY: number) => {
    if (!isDragging()) {
      return;
    }
    const delta = clientY - startY();
    setDragOffset(delta);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging()) {
      return;
    }
    setIsDragging(false);

    const offset = dragOffset();
    const threshold = 50; // pixels

    // If dragged down significantly, try to go to lower snap point or dismiss
    if (offset > threshold) {
      if (dismissible() && currentSnapIndex() === 0) {
        // At lowest snap point and dismissible - close the sheet
        props.onOpenChange(false);
      } else if (currentSnapIndex() > 0) {
        // Go to lower snap point
        setCurrentSnapIndex((prev) => prev - 1);
      } else if (dismissible()) {
        // Dismiss if at lowest point
        props.onOpenChange(false);
      }
    }
    // If dragged up significantly, try to go to higher snap point
    else if (offset < -threshold) {
      if (currentSnapIndex() < snapPoints().length - 1) {
        setCurrentSnapIndex((prev) => prev + 1);
      }
    }

    setDragOffset(0);
  };

  // Mouse event handlers
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };

  // Touch event handlers
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleDragStart(touch.clientY);
    }
  };

  // Global mouse/touch move and end handlers
  createEffect(() => {
    if (!isDragging()) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleDragMove(touch.clientY);
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

  return (
    <PortalOverlay
      open={props.open}
      onClose={() => props.onOpenChange(false)}
      closeOnEscape={dismissible()}
      closeOnBackdrop={dismissible()}
      animated
      animationDuration={ANIMATION_DURATION_SLOW}
    >
      {({ isClosing, stopPropagation }) => {
        // Sheet animation classes
        const sheetClasses = () => {
          if (isClosing()) {
            return SHEET_EXIT;
          }
          if (isDragging()) {
            return ''; // No animation during drag
          }
          return SHEET_ENTER;
        };

        return (
          <div
            class={clsx(
              'absolute bottom-0 left-0 right-0',
              'glass-thick shadow-2xl',
              'rounded-t-3xl',
              'overflow-hidden',
              'flex flex-col',
              !isDragging() && 'transition-[height] duration-300 ease-out',
              sheetClasses(),
              props.class,
            )}
            style={{ height: `${currentHeight()}vh` }}
            onClick={stopPropagation}
          >
            {/* Handle indicator */}
            <Show when={showHandle()}>
              <div
                class="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div class="w-10 h-1.5 rounded-full bg-surface-400 dark:bg-surface-500" />
              </div>
            </Show>

            {/* Content */}
            <div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin">
              {props.children}
            </div>
          </div>
        );
      }}
    </PortalOverlay>
  );
};
