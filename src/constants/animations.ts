/**
 * Centralized animation constants for glass-ui components
 * These constants ensure consistent animation behavior across all components
 */

// ============================================================================
// DURATION CONSTANTS
// ============================================================================

/** Standard animation duration in milliseconds (200ms) */
export const ANIMATION_DURATION = 200;

/** Fast animation duration for quick interactions (150ms) */
export const ANIMATION_DURATION_FAST = 150;

/** Slow animation duration for emphasized transitions (300ms) */
export const ANIMATION_DURATION_SLOW = 300;

// ============================================================================
// TAILWIND DURATION CLASSES
// ============================================================================

/** Duration class for standard animations */
export const DURATION_DEFAULT = 'duration-200';

/** Duration class for fast animations */
export const DURATION_FAST = 'duration-150';

/** Duration class for slow animations */
export const DURATION_SLOW = 'duration-300';

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

/** Fade in animation */
export const FADE_IN = 'animate-in fade-in';

/** Fade out animation */
export const FADE_OUT = 'animate-out fade-out';

/** Fade in with standard duration */
export const FADE_IN_DEFAULT = 'animate-in fade-in duration-200';

/** Fade out with standard duration */
export const FADE_OUT_DEFAULT = 'animate-out fade-out duration-200';

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

/** Slide in from bottom (small offset - 2 units) */
export const SLIDE_IN_FROM_BOTTOM_SM = 'slide-in-from-bottom-2';

/** Slide in from bottom (medium offset - 4 units) */
export const SLIDE_IN_FROM_BOTTOM = 'slide-in-from-bottom-4';

/** Slide in from top (small offset - 2 units) */
export const SLIDE_IN_FROM_TOP_SM = 'slide-in-from-top-2';

/** Slide in from left (no offset) */
export const SLIDE_IN_FROM_LEFT = 'slide-in-from-left';

/** Slide in from left (medium offset - 4 units) */
export const SLIDE_IN_FROM_LEFT_MD = 'slide-in-from-left-4';

/** Slide in from right (no offset) */
export const SLIDE_IN_FROM_RIGHT = 'slide-in-from-right';

/** Slide in from right (medium offset - 4 units) */
export const SLIDE_IN_FROM_RIGHT_MD = 'slide-in-from-right-4';

/** Slide out to bottom (medium offset - 4 units) */
export const SLIDE_OUT_TO_BOTTOM = 'slide-out-to-bottom-4';

/** Slide out to left (no offset) */
export const SLIDE_OUT_TO_LEFT = 'slide-out-to-left';

/** Slide out to left (medium offset - 4 units) */
export const SLIDE_OUT_TO_LEFT_MD = 'slide-out-to-left-4';

/** Slide out to right (no offset) */
export const SLIDE_OUT_TO_RIGHT = 'slide-out-to-right';

/** Slide out to right (medium offset - 4 units) */
export const SLIDE_OUT_TO_RIGHT_MD = 'slide-out-to-right-4';

// ============================================================================
// SCALE/ZOOM ANIMATIONS
// ============================================================================

/** Zoom in from 95% scale */
export const ZOOM_IN_95 = 'zoom-in-95';

/** Scale in animation (zoom from 95%) */
export const SCALE_IN = 'animate-in zoom-in-95';

// ============================================================================
// COMPOSITE ANIMATIONS (commonly used combinations)
// ============================================================================

/**
 * Modal/Dialog backdrop animation
 * Used for overlay backgrounds
 */
export const BACKDROP_ENTER = 'animate-in fade-in duration-200';
export const BACKDROP_EXIT = 'animate-out fade-out duration-200';

/**
 * Modal/Dialog panel animation
 * Combines fade and scale for a polished entrance
 */
export const MODAL_PANEL_ENTER = 'animate-in zoom-in-95 fade-in duration-200';

/**
 * Command Palette panel animation
 * Combines fade and slight scale for quick entrance
 */
export const COMMAND_PALETTE_PANEL_ENTER = 'animate-in zoom-in-95 fade-in duration-150';

/**
 * Dropdown/Menu/Tooltip animation
 * Fast fade with subtle scale
 */
export const POPOVER_ENTER = 'animate-in fade-in zoom-in-95 duration-150';
export const POPOVER_EXIT = 'animate-out fade-out zoom-out-95 duration-150';

/**
 * Toast/Notification animation (slides from right)
 */
export const TOAST_ENTER = 'animate-in slide-in-from-right-4 fade-in';

/**
 * Accordion/Collapsible content animation
 */
export const ACCORDION_CONTENT_ENTER = 'animate-in fade-in slide-in-from-top-2 duration-200';

/**
 * Tab panel animation
 */
export const TAB_PANEL_ENTER = 'animate-in fade-in slide-in-from-bottom-2 duration-200';

// ============================================================================
// SNACKBAR ANIMATIONS (position-based)
// ============================================================================

export const SNACKBAR_ENTER = {
  'bottom-left': 'animate-in slide-in-from-left-4 fade-in',
  'bottom-center': 'animate-in slide-in-from-bottom-4 fade-in',
  'bottom-right': 'animate-in slide-in-from-right-4 fade-in',
} as const;

export const SNACKBAR_EXIT = {
  'bottom-left': 'animate-out slide-out-to-left-4 fade-out',
  'bottom-center': 'animate-out slide-out-to-bottom-4 fade-out',
  'bottom-right': 'animate-out slide-out-to-right-4 fade-out',
} as const;

// ============================================================================
// DRAWER ANIMATIONS (position-based)
// ============================================================================

export const DRAWER_ENTER = {
  left: 'animate-in slide-in-from-left',
  right: 'animate-in slide-in-from-right',
} as const;

export const DRAWER_EXIT = {
  left: 'animate-out slide-out-to-left',
  right: 'animate-out slide-out-to-right',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type SnackbarPosition = keyof typeof SNACKBAR_ENTER;
export type DrawerPosition = keyof typeof DRAWER_ENTER;
