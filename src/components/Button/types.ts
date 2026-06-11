import type { JSX } from 'solid-js';
import type {
  BaseComponentProps,
  ButtonVariant,
  ComponentSize,
  DualIconProps,
  LoadableProps,
} from '../../types';

export interface ButtonProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    LoadableProps,
    DualIconProps {
  /** Button content */
  children: JSX.Element;
  /** Click handler */
  onClick?: () => void;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ComponentSize;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
}

export interface SpinnerProps extends BaseComponentProps {
  /** Spinner size */
  size?: ComponentSize;
}

// Re-export shared types for convenience
export type { ButtonVariant, ComponentSize as ButtonSize } from '../../types';
