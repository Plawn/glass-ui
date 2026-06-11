import type { JSX } from 'solid-js';
import type { ComponentSize, FormFieldSemanticProps } from '../../types';

/**
 * Slider mark definition
 */
export interface SliderMark {
  /** Value where the mark should appear */
  value: number;
  /** Optional label to display at the mark */
  label?: string;
}

/**
 * Props for the Slider component.
 *
 * Extends native `<div>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer wrapper element.
 */
export interface SliderProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange' | 'ref'>,
    FormFieldSemanticProps {
  /** Current value of the slider (controlled). Omit to use uncontrolled mode. */
  value?: number;
  /** Initial value for uncontrolled mode (defaults to min) */
  defaultValue?: number;
  /** Callback when the value changes */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Size variant */
  size?: ComponentSize;
  /** Optional marks/ticks to display on the slider */
  marks?: SliderMark[];
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute for form submission */
  name?: string;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Ref to the range input element */
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
}

// Re-export for convenience
export type { ComponentSize as SliderSize } from '../../types';
