// @wti/glass-ui - iOS 26-inspired glassmorphism UI components for SolidJS

// Styles - import CSS for build
import './styles/global.css';

// Shared types (core type system)
export type {
  // Size system
  Size,
  ComponentSize,
  AvatarSize,
  OverlaySize,
  // Color system
  StatusColor,
  SemanticColor,
  HttpMethodColor,
  // Placement system
  Direction,
  Placement,
  Alignment,
  // Common props
  BaseComponentProps,
  DisableableProps,
  FormFieldProps,
  TextInputProps,
  OverlayBehaviorProps,
  OverlayProps,
  LoadableProps,
  IconProps,
  DualIconProps,
  // Color style definitions
  FilledColorStyle,
  OutlinedColorStyle,
  AlertColorStyle,
  ProgressColorStyle,
} from './types';

// Components
export * from './components';

// Hooks
export * from './hooks';
