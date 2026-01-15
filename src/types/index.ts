import type { JSX } from 'solid-js';

// =============================================================================
// SIZE SYSTEM
// =============================================================================

/**
 * Standard size scale for components.
 * Components should pick the subset they support.
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common 3-tier size scale (most components)
 * Used by: Switch, CloseButton, Button, Input, Badge, Chip, RadioGroup, NumberInput, EmptyState, Autocomplete
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Extended 5-tier size scale (Avatar, Modal)
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Modal/Drawer size scale (includes 'full')
 */
export type OverlaySize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Dialog size - subset of OverlaySize (excludes xl and full)
 */
export type DialogSize = Extract<OverlaySize, 'sm' | 'md' | 'lg'>;

/**
 * Drawer size - excludes 'full' since drawers slide from edges
 */
export type DrawerSize = Exclude<OverlaySize, 'full'>;

/**
 * Extended 4-tier size scale (Spinner)
 */
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Compact 2-tier size scale (SegmentedControl)
 */
export type CompactSize = 'sm' | 'md';

// =============================================================================
// COLOR SYSTEM
// =============================================================================

/**
 * Semantic status colors for feedback components (Alert, Toast, Badge, etc.)
 */
export type StatusColor = 'success' | 'warning' | 'error' | 'info';

/**
 * Extended color palette including default and primary
 */
export type SemanticColor = 'default' | 'primary' | StatusColor;

/**
 * HTTP method colors for API-related badges
 */
export type HttpMethodColor = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

// =============================================================================
// VARIANT SYSTEM
// =============================================================================

/**
 * Button variants - semantic action types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';

/**
 * Card variants - visual styles
 */
export type CardVariant = 'default' | 'elevated' | 'outlined';

/**
 * Chip variants - filled vs outlined
 */
export type ChipVariant = 'filled' | 'outlined';

/**
 * Dialog variants - default vs danger for destructive actions
 */
export type DialogVariant = 'default' | 'danger';

/**
 * Progress variants - linear vs circular
 */
export type ProgressVariant = 'linear' | 'circular';

/**
 * Skeleton variants - shape types
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

// =============================================================================
// POSITION/PLACEMENT SYSTEM
// =============================================================================

/**
 * Simple 4-direction placement (Tooltip, Drawer)
 */
export type Direction = 'top' | 'bottom' | 'left' | 'right';

/**
 * Extended placement with alignment (Dropdown, Menu, Popover)
 */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Horizontal drawer position
 */
export type DrawerPosition = 'left' | 'right';

/**
 * Snackbar position (bottom row)
 */
export type SnackbarPosition = 'bottom-left' | 'bottom-center' | 'bottom-right';

/**
 * Dropdown placement - vertical placements only (subset of Placement)
 */
export type DropdownPlacement = Extract<Placement, 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'bottom' | 'top'>;

/**
 * Table column alignment
 */
export type Alignment = 'left' | 'center' | 'right';

// =============================================================================
// COMMON PROPS
// =============================================================================

/**
 * Base props shared by all components
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: JSX.CSSProperties;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Props for form-related components
 */
export interface FormFieldProps extends BaseComponentProps, DisableableProps {
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Label text displayed with the field */
  label?: string;
  /** Error message displayed below the field */
  error?: string;
}

/**
 * Props for text input components
 */
export interface TextInputProps extends FormFieldProps {
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: ComponentSize;
}

/**
 * Props for overlay/dialog behavior (Modal, Drawer, Dialog)
 */
export interface OverlayBehaviorProps {
  /** Whether to show the close button */
  showClose?: boolean;
  /** Whether clicking the backdrop closes the overlay */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the overlay */
  closeOnEscape?: boolean;
}

/**
 * Props for overlay/dialog components
 */
export interface OverlayProps extends BaseComponentProps, OverlayBehaviorProps {
  /** Whether the overlay is open */
  open: boolean;
  /** Callback when the overlay should close */
  onClose: () => void;
  /** Title displayed in the header */
  title?: string;
}

/**
 * Props for components with loading state
 */
export interface LoadableProps {
  /** Whether the component is in loading state */
  loading?: boolean;
}

/**
 * Props for components with icons
 */
export interface IconProps {
  /** Icon element */
  icon?: JSX.Element;
}

/**
 * Props for components with left/right icons
 */
export interface DualIconProps {
  /** Icon displayed on the left */
  leftIcon?: JSX.Element;
  /** Icon displayed on the right */
  rightIcon?: JSX.Element;
}

// =============================================================================
// COLOR STYLE DEFINITIONS (for constants)
// =============================================================================

/**
 * Style definition for filled color variants
 */
export interface FilledColorStyle {
  bg: string;
  text: string;
  border?: string;
}

/**
 * Style definition for outlined color variants
 */
export interface OutlinedColorStyle {
  border: string;
  text: string;
}

/**
 * Style definition for alert components
 */
export interface AlertColorStyle {
  border: string;
  bg: string;
  icon: string;
  iconBg: string;
}

/**
 * Style definition for progress components
 */
export interface ProgressColorStyle {
  track: string;
  fill: string;
}
