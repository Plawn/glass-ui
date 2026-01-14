import type { ComponentSize, BaseComponentProps, DisableableProps } from '../../types';

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
 * Props for the Slider component
 */
export interface SliderProps extends BaseComponentProps, DisableableProps {
  /** Current value of the slider */
  value: number;
  /** Callback when the value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text displayed above the slider */
  label?: string;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Size variant */
  size?: ComponentSize;
  /** Optional marks/ticks to display on the slider */
  marks?: SliderMark[];
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
}

// Re-export for convenience
export type { ComponentSize as SliderSize } from '../../types';
