import type { JSX, Accessor } from 'solid-js';
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
  /** Placement relative to trigger (full placement with alignment) */
  placement?: Accessor<Placement>;
  /** Simple direction placement (without alignment, defaults to center) */
  direction?: Accessor<Direction>;
  /** Offset distance from the trigger (in pixels) */
  offset?: number;
  /** Minimum space between element and viewport edge */
  viewportPadding?: number;
  /** Estimated size for initial positioning before content is measured */
  estimatedSize?: number;
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
  /** Get position styles for the content element */
  getPositionStyles: () => PositionStyles;
  /** Get arrow styles for the optional arrow element */
  getArrowStyles: () => JSX.CSSProperties;
  /** Get the primary direction from placement */
  getPrimaryDirection: () => Direction;
  /** Get the alignment from placement */
  getAlignment: () => PositionAlignment;
}

/** Return type for useContextMenuPositioning hook */
export interface UseContextMenuPositioningReturn {
  /** Get position styles for the menu element */
  getPositionStyles: () => PositionStyles;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default minimum space required between element and viewport edge */
const DEFAULT_VIEWPORT_PADDING = 8;

/** Default offset between trigger and positioned element */
const DEFAULT_OFFSET = 8;

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

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook for positioning elements relative to a trigger element.
 * Handles viewport boundary checking and automatic flip behavior.
 *
 * @example
 * ```tsx
 * const { getPositionStyles, getArrowStyles } = usePositioning({
 *   triggerRef: () => triggerEl,
 *   contentRef: () => contentEl,
 *   placement: () => 'bottom',
 *   offset: 8,
 * });
 *
 * <div style={getPositionStyles()}>
 *   Content
 *   <div style={getArrowStyles()} />
 * </div>
 * ```
 */
export function usePositioning(options: UsePositioningOptions): UsePositioningReturn {
  const viewportPadding = options.viewportPadding ?? DEFAULT_VIEWPORT_PADDING;
  const offset = options.offset ?? DEFAULT_OFFSET;
  const estimatedSize = options.estimatedSize ?? DEFAULT_ESTIMATED_SIZE;

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

  const getPositionStyles = (): PositionStyles => {
    const triggerEl = options.triggerRef();
    if (!triggerEl) {
      return {};
    }

    const rect = triggerEl.getBoundingClientRect();
    const requestedPlacement = getPlacement();

    // Get actual content dimensions if available, otherwise use estimate
    const contentEl = options.contentRef();
    const contentHeight = contentEl?.offsetHeight || estimatedSize;
    const contentWidth = contentEl?.offsetWidth || estimatedSize;

    // Calculate available space in each direction
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
    const spaceAbove = rect.top - viewportPadding;
    const spaceRight = window.innerWidth - rect.right - viewportPadding;
    const spaceLeft = rect.left - viewportPadding;

    const primaryDirection = getPrimaryDirection(requestedPlacement);
    const alignment = getAlignment(requestedPlacement);

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
      // Horizontal alignment
      if (alignment === 'start') {
        styles.left = `${Math.max(viewportPadding, rect.left)}px`;
      } else if (alignment === 'end') {
        styles.right = `${Math.max(viewportPadding, window.innerWidth - rect.right)}px`;
      } else {
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
      }
    } else if (actualDirection === 'top') {
      styles.bottom = `${window.innerHeight - rect.top + offset}px`;
      // Horizontal alignment
      if (alignment === 'start') {
        styles.left = `${Math.max(viewportPadding, rect.left)}px`;
      } else if (alignment === 'end') {
        styles.right = `${Math.max(viewportPadding, window.innerWidth - rect.right)}px`;
      } else {
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
      }
    } else if (actualDirection === 'right') {
      styles.left = `${rect.right + offset}px`;
      // Vertical alignment
      if (alignment === 'start') {
        styles.top = `${Math.max(viewportPadding, rect.top)}px`;
      } else if (alignment === 'end') {
        styles.bottom = `${Math.max(viewportPadding, window.innerHeight - rect.bottom)}px`;
      } else {
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
      }
    } else if (actualDirection === 'left') {
      styles.right = `${window.innerWidth - rect.left + offset}px`;
      // Vertical alignment
      if (alignment === 'start') {
        styles.top = `${Math.max(viewportPadding, rect.top)}px`;
      } else if (alignment === 'end') {
        styles.bottom = `${Math.max(viewportPadding, window.innerHeight - rect.bottom)}px`;
      } else {
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
      }
    }

    return styles;
  };

  const getArrowStyles = (): JSX.CSSProperties => {
    return calculateArrowStyles(getPlacement());
  };

  return {
    getPositionStyles,
    getArrowStyles,
    getPrimaryDirection: getCurrentPrimaryDirection,
    getAlignment: getCurrentAlignment,
  };
}

/**
 * Hook for positioning context menus at cursor position.
 * Handles viewport boundary checking to keep menu visible.
 *
 * @example
 * ```tsx
 * const { getPositionStyles } = useContextMenuPositioning({
 *   contentRef: () => menuEl,
 *   position: () => ({ x: event.clientX, y: event.clientY }),
 * });
 *
 * <div style={getPositionStyles()}>Menu items</div>
 * ```
 */
export function useContextMenuPositioning(
  options: UseContextMenuPositioningOptions
): UseContextMenuPositioningReturn {
  const viewportPadding = options.viewportPadding ?? DEFAULT_VIEWPORT_PADDING;
  const estimatedHeight = options.estimatedHeight ?? DEFAULT_ESTIMATED_SIZE;
  const estimatedWidth = options.estimatedWidth ?? DEFAULT_ESTIMATED_SIZE;

  const getPositionStyles = (): PositionStyles => {
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

    return styles;
  };

  return {
    getPositionStyles,
  };
}
