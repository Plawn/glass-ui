/**
 * Centralized color constants for glass-ui components
 *
 * This module provides consistent color mappings across all components
 * with built-in dark mode support. Colors are organized by:
 * - Status types (success, warning, error, info)
 * - Semantic types (primary, default)
 * - Variants (filled, outlined)
 */

import type {
  AlertColorStyle,
  FilledColorStyle,
  HttpMethodColor,
  OutlinedColorStyle,
  ProgressColorStyle,
  SemanticColor,
  StatusColor,
  ToastColorStyle,
} from '../types';

// Re-export types for backwards compatibility
export type {
  AlertColorStyle,
  FilledColorStyle,
  HttpMethodColor,
  OutlinedColorStyle,
  ProgressColorStyle,
  SemanticColor,
  StatusColor,
  ToastColorStyle,
};

// =============================================================================
// Status Colors - Filled Variant
// =============================================================================

/**
 * Filled variant styles for status colors
 * Used in Badge, Chip (filled), and similar components
 */
export const STATUS_COLORS_FILLED: Record<StatusColor, FilledColorStyle> = {
  success: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200/50 dark:border-emerald-700/50',
  },
  warning: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200/50 dark:border-amber-700/50',
  },
  error: {
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200/50 dark:border-rose-700/50',
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200/50 dark:border-blue-700/50',
  },
};

// =============================================================================
// Status Colors - Outlined Variant
// =============================================================================

/**
 * Outlined variant styles for status colors
 * Used in Chip (outlined) and similar components
 */
export const STATUS_COLORS_OUTLINED: Record<StatusColor, OutlinedColorStyle> = {
  success: {
    border: 'border-emerald-300 dark:border-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    border: 'border-amber-300 dark:border-amber-600',
    text: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    border: 'border-rose-300 dark:border-rose-600',
    text: 'text-rose-600 dark:text-rose-400',
  },
  info: {
    border: 'border-blue-300 dark:border-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
  },
};

// =============================================================================
// Semantic Colors - Filled Variant (includes primary and default)
// =============================================================================

/**
 * Extended filled styles including primary and default
 * Used in components that need a broader color palette
 */
export const SEMANTIC_COLORS_FILLED: Record<SemanticColor, FilledColorStyle> = {
  ...STATUS_COLORS_FILLED,
  primary: {
    bg: 'bg-violet-100 dark:bg-violet-900/40',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200/50 dark:border-violet-700/50',
  },
  default: {
    bg: 'bg-surface-100 dark:bg-surface-800',
    text: 'text-surface-700 dark:text-surface-300',
    border: 'border-surface-200/50 dark:border-surface-700/50',
  },
};

// =============================================================================
// Semantic Colors - Outlined Variant (includes primary and default)
// =============================================================================

/**
 * Extended outlined styles including primary and default
 */
export const SEMANTIC_COLORS_OUTLINED: Record<
  SemanticColor,
  OutlinedColorStyle
> = {
  ...STATUS_COLORS_OUTLINED,
  primary: {
    border: 'border-violet-300 dark:border-violet-600',
    text: 'text-violet-600 dark:text-violet-400',
  },
  default: {
    border: 'border-surface-300 dark:border-surface-600',
    text: 'text-surface-700 dark:text-surface-300',
  },
};

// =============================================================================
// Alert Colors
// =============================================================================

/**
 * Alert-specific color styles with icon support
 * Used in Alert component for notifications and messages
 */
export const ALERT_COLORS: Record<StatusColor, AlertColorStyle> = {
  info: {
    border: 'border-l-blue-500',
    bg: 'bg-blue-50/50 dark:bg-blue-900/10',
    icon: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  success: {
    border: 'border-l-emerald-500',
    bg: 'bg-emerald-50/50 dark:bg-emerald-900/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-50/50 dark:bg-amber-900/10',
    icon: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  error: {
    border: 'border-l-rose-500',
    bg: 'bg-rose-50/50 dark:bg-rose-900/10',
    icon: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
  },
};

// =============================================================================
// Progress Colors
// =============================================================================

/**
 * Linear progress bar color styles
 * Used for horizontal progress indicators
 */
export const PROGRESS_COLORS: Record<SemanticColor, ProgressColorStyle> = {
  primary: {
    track: 'bg-surface-200/60 dark:bg-surface-700/40',
    fill: 'bg-violet-500 dark:bg-violet-400',
  },
  success: {
    track: 'bg-emerald-100 dark:bg-emerald-900/30',
    fill: 'bg-emerald-500 dark:bg-emerald-400',
  },
  warning: {
    track: 'bg-amber-100 dark:bg-amber-900/30',
    fill: 'bg-amber-500 dark:bg-amber-400',
  },
  error: {
    track: 'bg-rose-100 dark:bg-rose-900/30',
    fill: 'bg-rose-500 dark:bg-rose-400',
  },
  info: {
    track: 'bg-blue-100 dark:bg-blue-900/30',
    fill: 'bg-blue-500 dark:bg-blue-400',
  },
  default: {
    track: 'bg-surface-200/60 dark:bg-surface-700/40',
    fill: 'bg-surface-500 dark:bg-surface-400',
  },
};

/**
 * Circular progress indicator color styles (using stroke classes)
 * Used for circular/radial progress indicators
 */
export const PROGRESS_COLORS_CIRCULAR: Record<
  SemanticColor,
  ProgressColorStyle
> = {
  primary: {
    track: 'stroke-surface-200 dark:stroke-surface-700',
    fill: 'stroke-violet-500 dark:stroke-violet-400',
  },
  success: {
    track: 'stroke-emerald-200 dark:stroke-emerald-900',
    fill: 'stroke-emerald-500 dark:stroke-emerald-400',
  },
  warning: {
    track: 'stroke-amber-200 dark:stroke-amber-900',
    fill: 'stroke-amber-500 dark:stroke-amber-400',
  },
  error: {
    track: 'stroke-rose-200 dark:stroke-rose-900',
    fill: 'stroke-rose-500 dark:stroke-rose-400',
  },
  info: {
    track: 'stroke-blue-200 dark:stroke-blue-900',
    fill: 'stroke-blue-500 dark:stroke-blue-400',
  },
  default: {
    track: 'stroke-surface-200 dark:stroke-surface-700',
    fill: 'stroke-surface-500 dark:stroke-surface-400',
  },
};

// =============================================================================
// HTTP Method Colors
// =============================================================================

/**
 * HTTP method color styles for API documentation and badges
 * Used in Badge component with method variant
 */
export const HTTP_METHOD_COLORS: Record<HttpMethodColor, FilledColorStyle> = {
  get: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  post: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
  },
  put: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
  },
  patch: {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-300',
  },
  delete: {
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    text: 'text-rose-700 dark:text-rose-300',
  },
  head: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-300',
  },
  options: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
  },
};

// =============================================================================
// Toast Colors
// =============================================================================

/**
 * Toast notification color styles by type
 * Used in Toast component for status-based styling
 */
export const TOAST_COLORS: Record<StatusColor, ToastColorStyle> = {
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  error: {
    bg: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/30',
    icon: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30',
    icon: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  info: {
    bg: 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800/30',
    icon: 'text-accent-600 dark:text-accent-400',
    iconBg: 'bg-accent-100 dark:bg-accent-900/30',
  },
};

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Combines filled color style properties into a single class string
 * @param style - The filled color style object
 * @param includeBorder - Whether to include the border class (default: false)
 */
export function getFilledClasses(
  style: FilledColorStyle,
  includeBorder = false,
): string {
  const classes = [style.bg, style.text];
  if (includeBorder && style.border) {
    classes.push('border', style.border);
  }
  return classes.join(' ');
}

/**
 * Combines outlined color style properties into a single class string
 * @param style - The outlined color style object
 */
export function getOutlinedClasses(style: OutlinedColorStyle): string {
  return `bg-transparent border ${style.border} ${style.text}`;
}

/**
 * Gets the appropriate color style based on variant
 * @param color - The semantic color key
 * @param variant - 'filled' or 'outlined'
 */
export function getSemanticColorStyle(
  color: SemanticColor,
  variant: 'filled' | 'outlined',
): FilledColorStyle | OutlinedColorStyle {
  return variant === 'filled'
    ? SEMANTIC_COLORS_FILLED[color]
    : SEMANTIC_COLORS_OUTLINED[color];
}
