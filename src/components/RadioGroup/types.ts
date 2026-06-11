import type { JSX } from 'solid-js';
import type {
  ComponentSize,
  DisableableProps,
  FormFieldSemanticProps,
} from '../../types/index';

/**
 * RadioGroup size variants
 */
export type RadioGroupSize = ComponentSize;

/**
 * RadioGroup orientation
 */
export type RadioGroupOrientation = 'horizontal' | 'vertical';

/**
 * Individual radio option
 */
export interface RadioOption extends DisableableProps {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
}

/**
 * Props for the RadioGroup component.
 *
 * Extends native `<div>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer container element.
 */
export interface RadioGroupProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    FormFieldSemanticProps {
  /** Available options */
  options: RadioOption[];
  /** Current selected value (controlled). Omit to use uncontrolled mode. */
  value?: string;
  /** Initial value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Orientation of the options */
  orientation?: RadioGroupOrientation;
  /** Size variant */
  size?: RadioGroupSize;
  /** HTML name attribute for the radio inputs */
  name?: string;
  /** Whether the whole group is disabled */
  disabled?: boolean;
}
