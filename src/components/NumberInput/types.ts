import type { JSX } from 'solid-js';
import type { ComponentSize, FormFieldSemanticProps } from '../../types';

/**
 * Size type for NumberInput
 */
export type NumberInputSize = ComponentSize;

/**
 * Props for the NumberInput component.
 *
 * Extends native `<input>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the underlying input element.
 */
export interface NumberInputProps
  extends Omit<
      JSX.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'onChange' | 'min' | 'max' | 'step' | 'size'
    >,
    FormFieldSemanticProps {
  /** Current numeric value (controlled). Omit to use uncontrolled mode. */
  value?: number;
  /** Initial value for uncontrolled mode (defaults to min, or 0) */
  defaultValue?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment/decrement value */
  step?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: NumberInputSize;
}
