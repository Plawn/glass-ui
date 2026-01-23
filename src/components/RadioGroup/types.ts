import type {
  BaseComponentProps,
  ComponentSize,
  DisableableProps,
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
 * Props for the RadioGroup component
 */
export interface RadioGroupProps extends BaseComponentProps, DisableableProps {
  /** Available options */
  options: RadioOption[];
  /** Current selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Label for the entire group */
  label?: string;
  /** Orientation of the options */
  orientation?: RadioGroupOrientation;
  /** Size variant */
  size?: RadioGroupSize;
  /** Error message displayed below the group */
  error?: string;
  /** HTML name attribute for the radio inputs */
  name?: string;
}
