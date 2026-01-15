/**
 * Centralized size and style constants for glass-ui components
 *
 * This module provides consistent size mappings across components
 * to reduce duplication and ensure visual consistency.
 *
 * Only patterns that are genuinely duplicated across 3+ components
 * are centralized here. Component-specific styles remain local.
 */

import type { ComponentSize, OverlaySize } from '../types';

// Re-export OverlaySize as OverlaySizeKey for backwards compatibility
export type OverlaySizeKey = OverlaySize;

// =============================================================================
// TEXT SIZE CLASSES
// =============================================================================

/**
 * Standard text size classes for the sm/md/lg size scale.
 * Used by Badge, Chip, Slider, Spinner, EmptyState, and other components.
 */
export const TEXT_SIZES: Record<ComponentSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * Label text sizes, slightly smaller than standard for secondary text.
 * Used by Spinner, Slider, and other components with labels.
 */
export const LABEL_TEXT_SIZES: Record<ComponentSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

// =============================================================================
// ICON SIZE CLASSES
// =============================================================================

/**
 * Standard icon size classes for the sm/md/lg size scale.
 * Used by Chip, Tabs, CloseButton, and other icon-containing components.
 */
export const ICON_SIZES: Record<ComponentSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

/**
 * Slightly smaller icon sizes for inline/compact contexts.
 */
export const ICON_SIZES_SMALL: Record<ComponentSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

// =============================================================================
// OVERLAY SIZE CLASSES
// =============================================================================

/**
 * Max-width classes for overlay components (Modal, Dialog, Drawer).
 * Provides consistent sizing across all dialog-type components.
 */
export const OVERLAY_MAX_WIDTHS: Record<OverlaySizeKey, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

/**
 * Subset for components that don't support 'full' size (Dialog).
 */
export const DIALOG_MAX_WIDTHS: Record<ComponentSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

/**
 * Drawer-specific widths (narrower than modals).
 */
export const DRAWER_MAX_WIDTHS: Record<Exclude<OverlaySizeKey, 'full'>, string> = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  xl: 'max-w-lg',
};

// =============================================================================
// SPACING CLASSES
// =============================================================================

/**
 * Gap spacing for component internals (between icon and text, etc.)
 */
export const GAP_SIZES: Record<ComponentSize, string> = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
};

// =============================================================================
// PADDING PATTERNS
// =============================================================================

/**
 * Common inline element padding (badges, chips, pills).
 * These are baseline values - components may add specific overrides.
 */
export const INLINE_PADDING: Record<ComponentSize, string> = {
  sm: 'px-2 py-0.5',
  md: 'px-2.5 py-1',
  lg: 'px-3 py-1.5',
};

/**
 * Tab/button-like padding (slightly larger vertical padding).
 */
export const TAB_PADDING: Record<ComponentSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-5 py-2.5',
};

// =============================================================================
// INPUT SIZE CLASSES
// =============================================================================

/**
 * Size classes for text input components (Input, Autocomplete input field).
 * Includes responsive padding for medium size.
 */
export const INPUT_SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3 sm:px-4 py-2 sm:py-2.5 text-sm',
  lg: 'px-4 py-3 text-base',
};

/**
 * Size classes for dropdown/listbox items (Autocomplete options, Select options).
 * Similar to input sizes but without responsive variants.
 */
export const DROPDOWN_ITEM_SIZE_CLASSES: Record<ComponentSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};
