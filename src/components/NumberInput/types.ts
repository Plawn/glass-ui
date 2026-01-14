import type { ComponentSize } from '../../types';

/**
 * Size type for NumberInput
 */
export type NumberInputSize = ComponentSize;

/**
 * Props for the NumberInput component
 */
export interface NumberInputProps {
  /** Current numeric value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment/decrement value */
  step?: number;
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: NumberInputSize;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Error message displayed below the input */
  error?: string;
  /** Additional CSS classes */
  class?: string;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
}
