import { type JSX, type Accessor, createSignal, createEffect, onCleanup } from 'solid-js';
import type { Placement, Direction } from '../types';

// =============================================================================
// TYPES
// =============================================================================

/** Position style properties for positioned elements */
export type PositionStyles = Pick<JSX.CSSProperties, 'top' | 'bottom' | 'left' | 'right' | 'transform'>;

/** Alignment options for positioned elements */
export type PositionAlignment = 'start' | 'end' | 'center';

/** Configuration options for usePositioning hook */
export interface UsePositioningOptions {
  /** Reference to the trigger element */
  triggerRef: Accessor<HTMLElement | undefined>;
  /** Reference to the content element (for measuring dimensions) */
  contentRef: Accessor<HTMLElement | undefined>;
  /** Whether positioning is active (content is visible) */
  isOpen?: Accessor<boolean>;
  /** Placement relative to trigger (full placement with alignment) */
  placement?: Accessor<Placement>;
  /** Simple direction placement (without alignment, defaults to center) */
  direction?: Accessor<Direction>;
  /** Offset distance from the trigger (in pixels). Must be an accessor for reactivity. */
  offset: Accessor<number>;
  /** Minimum space between element and viewport edge */
  viewportPadding?: number;
  /** Estimated size for initial positioning before content is measured */
  estimatedSize?: number;
  /** Whether to update position on scroll (default: false) */
  updateOnScroll?: boolean;
  /** Whether to update position on resize (default: true) */
  updateOnResize?: boolean;
}

/** Configuration for context menu positioning (cursor-based) */
export interface UseContextMenuPositioningOptions {
  /** Reference to the content element (for measuring dimensions) */
  contentRef: Accessor<HTMLElement | undefined>;
  /** Cursor position */
  position: Accessor<{ x: number; y: number }>;
  /** Minimum space between element and viewport edge */
  viewportPadding?: number;
  /** Estimated height for initial positioning */
  estimatedHeight?: number;
  /** Estimated width for initial positioning */
  estimatedWidth?: number;
}

/** Return type for usePositioning hook */
export interface UsePositioningReturn {
  /** Reactive position styles signal */
  positionStyles: Accessor<PositionStyles>;
  /** Reactive arrow styles signal */
  arrowStyles: Accessor<JSX.CSSProperties>;
  /** Get the primary direction from placement */
  getPrimaryDirection: () => Direction;
  /** Get the alignment from placement */
  getAlignment: () => PositionAlignment;
  /** Force recalculate position */
  updatePosition: () => void;
}

/** Return type for useContextMenuPositioning hook */
export interface UseContextMenuPositioningReturn {
  /** Reactive position styles signal */
  positionStyles: Accessor<PositionStyles>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default minimum space required between element and viewport edge */
const DEFAULT_VIEWPORT_PADDING = 8;

/** Default estimated element size for viewport calculations */
const DEFAULT_ESTIMATED_SIZE = 200;

/** Arrow size in pixels */
const ARROW_SIZE = 8;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the primary direction from a placement string
 */
export const getPrimaryDirection = (placement: Placement | Direction): Direction => {
  if (placement.startsWith('top')) return 'top';
  if (placement.startsWith('bottom')) return 'bottom';
  if (placement.startsWith('left')) return 'left';
  return 'right';
};

/**
 * Get the alignment from a placement string
 */
export const getAlignment = (placement: Placement | Direction): PositionAlignment => {
  if (placement.includes('start')) return 'start';
  if (placement.includes('end')) return 'end';
  return 'center';
};

/**
 * Calculate arrow position styles based on placement
 */
export const calculateArrowStyles = (placement: Placement | Direction): JSX.CSSProperties => {
  const direction = getPrimaryDirection(placement);
  const alignment = getAlignment(placement);

  const baseStyles: JSX.CSSProperties = {
    position: 'absolute',
    width: `${ARROW_SIZE}px`,
    height: `${ARROW_SIZE}px`,
    transform: 'rotate(45deg)',
  };

  // Position arrow opposite to the popover direction
  switch (direction) {
    case 'top':
      // Arrow points down (at bottom of popover)
      return {
        ...baseStyles,
        bottom: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start'
          ? { left: '16px' }
          : alignment === 'end'
            ? { right: '16px' }
            : { left: '50%', 'margin-left': `-${ARROW_SIZE / 2}px` }),
      };
    case 'bottom':
      // Arrow points up (at top of popover)
      return {
        ...baseStyles,
        top: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start'
          ? { left: '16px' }
          : alignment === 'end'
            ? { right: '16px' }
            : { left: '50%', 'margin-left': `-${ARROW_SIZE / 2}px` }),
      };
    case 'left':
      // Arrow points right (at right of popover)
      return {
        ...baseStyles,
        right: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start'
          ? { top: '16px' }
          : alignment === 'end'
            ? { bottom: '16px' }
            : { top: '50%', 'margin-top': `-${ARROW_SIZE / 2}px` }),
      };
    case 'right':
      // Arrow points left (at left of popover)
      return {
        ...baseStyles,
        left: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start'
          ? { top: '16px' }
          : alignment === 'end'
            ? { bottom: '16px' }
            : { top: '50%', 'margin-top': `-${ARROW_SIZE / 2}px` }),
      };
  }
};

/**
 * Calculate position styles for an element relative to a trigger
 */
function calculatePositionStyles(
  triggerEl: HTMLElement,
  contentEl: HTMLElement | undefined,
  placement: Placement,
  offset: number,
  viewportPadding: number,
  estimatedSize: number
): PositionStyles {
  const rect = triggerEl.getBoundingClientRect();

  // Get actual content dimensions if available, otherwise use estimate
  const contentHeight = contentEl?.offsetHeight || estimatedSize;
  const contentWidth = contentEl?.offsetWidth || estimatedSize;

  // Calculate available space in each direction
  const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
  const spaceAbove = rect.top - viewportPadding;
  const spaceRight = window.innerWidth - rect.right - viewportPadding;
  const spaceLeft = rect.left - viewportPadding;

  const primaryDirection = getPrimaryDirection(placement);
  const alignment = getAlignment(placement);

  // Determine actual direction (with auto-flip if needed)
  let actualDirection = primaryDirection;
  if (primaryDirection === 'bottom' && spaceBelow < contentHeight && spaceAbove > spaceBelow) {
    actualDirection = 'top';
  } else if (primaryDirection === 'top' && spaceAbove < contentHeight && spaceBelow > spaceAbove) {
    actualDirection = 'bottom';
  } else if (primaryDirection === 'right' && spaceRight < contentWidth && spaceLeft > spaceRight) {
    actualDirection = 'left';
  } else if (primaryDirection === 'left' && spaceLeft < contentWidth && spaceRight > spaceLeft) {
    actualDirection = 'right';
  }

  const styles: PositionStyles = {};

  // Apply positioning based on direction
  if (actualDirection === 'bottom') {
    styles.top = `${rect.bottom + offset}px`;
    // Horizontal alignment with overflow protection
    if (alignment === 'start') {
      const left = Math.max(viewportPadding, rect.left);
      // Check if content would overflow right edge
      const maxLeft = window.innerWidth - contentWidth - viewportPadding;
      styles.left = `${Math.min(left, maxLeft)}px`;
    } else if (alignment === 'end') {
      const right = Math.max(viewportPadding, window.innerWidth - rect.right);
      // Check if content would overflow left edge
      const maxRight = window.innerWidth - contentWidth - viewportPadding;
      styles.right = `${Math.min(right, maxRight)}px`;
    } else {
      // Center alignment
      let left = rect.left + rect.width / 2 - contentWidth / 2;
      // Clamp to viewport bounds
      left = Math.max(viewportPadding, Math.min(left, window.innerWidth - contentWidth - viewportPadding));
      styles.left = `${left}px`;
    }
  } else if (actualDirection === 'top') {
    styles.bottom = `${window.innerHeight - rect.top + offset}px`;
    // Horizontal alignment with overflow protection
    if (alignment === 'start') {
      const left = Math.max(viewportPadding, rect.left);
      const maxLeft = window.innerWidth - contentWidth - viewportPadding;
      styles.left = `${Math.min(left, maxLeft)}px`;
    } else if (alignment === 'end') {
      const right = Math.max(viewportPadding, window.innerWidth - rect.right);
      const maxRight = window.innerWidth - contentWidth - viewportPadding;
      styles.right = `${Math.min(right, maxRight)}px`;
    } else {
      // Center alignment
      let left = rect.left + rect.width / 2 - contentWidth / 2;
      left = Math.max(viewportPadding, Math.min(left, window.innerWidth - contentWidth - viewportPadding));
      styles.left = `${left}px`;
    }
  } else if (actualDirection === 'right') {
    styles.left = `${rect.right + offset}px`;
    // Vertical alignment with overflow protection
    if (alignment === 'start') {
      const top = Math.max(viewportPadding, rect.top);
      const maxTop = window.innerHeight - contentHeight - viewportPadding;
      styles.top = `${Math.min(top, maxTop)}px`;
    } else if (alignment === 'end') {
      const bottom = Math.max(viewportPadding, window.innerHeight - rect.bottom);
      const maxBottom = window.innerHeight - contentHeight - viewportPadding;
      styles.bottom = `${Math.min(bottom, maxBottom)}px`;
    } else {
      // Center alignment
      let top = rect.top + rect.height / 2 - contentHeight / 2;
      top = Math.max(viewportPadding, Math.min(top, window.innerHeight - contentHeight - viewportPadding));
      styles.top = `${top}px`;
    }
  } else if (actualDirection === 'left') {
    styles.right = `${window.innerWidth - rect.left + offset}px`;
    // Vertical alignment with overflow protection
    if (alignment === 'start') {
      const top = Math.max(viewportPadding, rect.top);
      const maxTop = window.innerHeight - contentHeight - viewportPadding;
      styles.top = `${Math.min(top, maxTop)}px`;
    } else if (alignment === 'end') {
      const bottom = Math.max(viewportPadding, window.innerHeight - rect.bottom);
      const maxBottom = window.innerHeight - contentHeight - viewportPadding;
      styles.bottom = `${Math.min(bottom, maxBottom)}px`;
    } else {
      // Center alignment
      let top = rect.top + rect.height / 2 - contentHeight / 2;
      top = Math.max(viewportPadding, Math.min(top, window.innerHeight - contentHeight - viewportPadding));
      styles.top = `${top}px`;
    }
  }

  return styles;
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook for positioning elements relative to a trigger element.
 * Handles viewport boundary checking, automatic flip behavior, and reactive updates.
 *
 * @example
 * ```tsx
 * const { positionStyles, arrowStyles } = usePositioning({
 *   triggerRef: () => triggerEl,
 *   contentRef: () => contentEl,
 *   isOpen: () => isOpen(),
 *   placement: () => 'bottom',
 *   offset: 8,
 * });
 *
 * <div style={positionStyles()}>
 *   Content
 *   <div style={arrowStyles()} />
 * </div>
 * ```
 */
export function usePositioning(options: UsePositioningOptions): UsePositioningReturn {
  const viewportPadding = options.viewportPadding ?? DEFAULT_VIEWPORT_PADDING;
  const estimatedSize = options.estimatedSize ?? DEFAULT_ESTIMATED_SIZE;
  const updateOnScroll = options.updateOnScroll ?? false;
  const updateOnResize = options.updateOnResize ?? true;

  const [positionStyles, setPositionStyles] = createSignal<PositionStyles>({});
  const [arrowStyles, setArrowStyles] = createSignal<JSX.CSSProperties>({});

  const getPlacement = (): Placement => {
    if (options.placement) {
      return options.placement();
    }
    if (options.direction) {
      return options.direction();
    }
    return 'bottom';
  };

  const getCurrentPrimaryDirection = (): Direction => {
    return getPrimaryDirection(getPlacement());
  };

  const getCurrentAlignment = (): PositionAlignment => {
    return getAlignment(getPlacement());
  };

  const updatePosition = () => {
    const triggerEl = options.triggerRef();
    if (!triggerEl) {
      setPositionStyles({});
      return;
    }

    const placement = getPlacement();
    const contentEl = options.contentRef();

    const styles = calculatePositionStyles(
      triggerEl,
      contentEl,
      placement,
      options.offset(),
      viewportPadding,
      estimatedSize
    );

    setPositionStyles(styles);
    setArrowStyles(calculateArrowStyles(placement));
  };

  // Update position when isOpen changes or dependencies change
  createEffect(() => {
    const isOpen = options.isOpen?.() ?? true;
    if (!isOpen) {
      return;
    }

    // Initial calculation
    updatePosition();

    // Recalculate after a frame to get accurate content dimensions
    requestAnimationFrame(() => {
      updatePosition();
    });
  });

  // Set up scroll listener if needed
  createEffect(() => {
    const isOpen = options.isOpen?.() ?? true;
    if (!isOpen || !updateOnScroll) {
      return;
    }

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScroll, true);
    onCleanup(() => window.removeEventListener('scroll', handleScroll, true));
  });

  // Set up resize listener
  createEffect(() => {
    const isOpen = options.isOpen?.() ?? true;
    if (!isOpen || !updateOnResize) {
      return;
    }

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    onCleanup(() => window.removeEventListener('resize', handleResize));
  });

  return {
    positionStyles,
    arrowStyles,
    getPrimaryDirection: getCurrentPrimaryDirection,
    getAlignment: getCurrentAlignment,
    updatePosition,
  };
}

/**
 * Hook for positioning context menus at cursor position.
 * Handles viewport boundary checking to keep menu visible.
 *
 * @example
 * ```tsx
 * const { positionStyles } = useContextMenuPositioning({
 *   contentRef: () => menuEl,
 *   position: () => ({ x: event.clientX, y: event.clientY }),
 * });
 *
 * <div style={positionStyles()}>Menu items</div>
 * ```
 */
export function useContextMenuPositioning(
  options: UseContextMenuPositioningOptions
): UseContextMenuPositioningReturn {
  const viewportPadding = options.viewportPadding ?? DEFAULT_VIEWPORT_PADDING;
  const estimatedHeight = options.estimatedHeight ?? DEFAULT_ESTIMATED_SIZE;
  const estimatedWidth = options.estimatedWidth ?? DEFAULT_ESTIMATED_SIZE;

  const [positionStyles, setPositionStyles] = createSignal<PositionStyles>({});

  createEffect(() => {
    const pos = options.position();
    const contentEl = options.contentRef();
    const menuHeight = contentEl?.offsetHeight || estimatedHeight;
    const menuWidth = contentEl?.offsetWidth || estimatedWidth;

    const styles: PositionStyles = {};

    // Vertical: prefer below cursor, flip if not enough space
    if (pos.y + menuHeight + viewportPadding > window.innerHeight) {
      styles.bottom = `${window.innerHeight - pos.y}px`;
    } else {
      styles.top = `${pos.y}px`;
    }

    // Horizontal: prefer right of cursor, flip if not enough space
    if (pos.x + menuWidth + viewportPadding > window.innerWidth) {
      styles.right = `${window.innerWidth - pos.x}px`;
    } else {
      styles.left = `${pos.x}px`;
    }

    setPositionStyles(styles);
  });

  return {
    positionStyles,
  };
}
