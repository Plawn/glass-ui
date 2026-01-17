/**
 * Central export for all constants used in glass-ui
 */

// Animation constants
export * from './animations';

// Color constants and types
export {
  // Types
  type StatusColor,
  type SemanticColor,
  type HttpMethodColor,
  type FilledColorStyle,
  type OutlinedColorStyle,
  type AlertColorStyle,
  type ProgressColorStyle,
  type ToastColorStyle,
  // Status colors (core status types)
  STATUS_COLORS_FILLED,
  STATUS_COLORS_OUTLINED,
  // Semantic colors (extended palette)
  SEMANTIC_COLORS_FILLED,
  SEMANTIC_COLORS_OUTLINED,
  // Component-specific colors
  ALERT_COLORS,
  PROGRESS_COLORS,
  PROGRESS_COLORS_CIRCULAR,
  HTTP_METHOD_COLORS,
  TOAST_COLORS,
  // Utility functions
  getFilledClasses,
  getOutlinedClasses,
  getSemanticColorStyle,
} from './colors';

// Style constants
export {
  // Types
  type OverlaySizeKey,
  // Text sizes
  TEXT_SIZES,
  LABEL_TEXT_SIZES,
  // Icon sizes
  ICON_SIZES,
  ICON_SIZES_SMALL,
  // Overlay sizes
  OVERLAY_MAX_WIDTHS,
  DIALOG_MAX_WIDTHS,
  DRAWER_MAX_WIDTHS,
  // Spacing
  GAP_SIZES,
  INLINE_PADDING,
  TAB_PADDING,
  // Input sizes
  INPUT_SIZE_CLASSES,
  DROPDOWN_ITEM_SIZE_CLASSES,
} from './styles';
