import type { JSX, ValidComponent } from 'solid-js';
import type {
  BaseComponentProps,
  ButtonVariant,
  ComponentSize,
  DualIconProps,
  LoadableProps,
} from '../../types';
import type { PolymorphicProps } from '../shared/Polymorphic';

/**
 * Button's own props, independent of the rendered element.
 */
export interface ButtonOwnProps extends LoadableProps, DualIconProps {
  /** Button content */
  children: JSX.Element;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ComponentSize;
  /** Button type attribute (only applied when rendering a native `<button>`) */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Polymorphic Button props. Defaults to a native `<button>`; pass `as` to render
 * a different element/component (e.g. `as="a"` or `as={A}` for a router link),
 * with that element's props — including `href` — forwarded and type-checked.
 */
export type ButtonProps<T extends ValidComponent = 'button'> = PolymorphicProps<
  T,
  ButtonOwnProps
>;

export interface SpinnerProps extends BaseComponentProps {
  /** Spinner size */
  size?: ComponentSize;
}

// Re-export shared types for convenience
export type { ButtonVariant, ComponentSize as ButtonSize } from '../../types';
