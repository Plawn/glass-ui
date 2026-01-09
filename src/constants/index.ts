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
  // Utility functions
  getFilledClasses,
  getOutlinedClasses,
  getSemanticColorStyle,
} from './colors';
