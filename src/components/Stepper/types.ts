import type { JSX } from 'solid-js';
import type { BaseComponentProps, ComponentSize } from '../../types';

/**
 * Stepper orientation - horizontal or vertical layout
 */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Individual step configuration
 */
export interface StepperStep {
  /** Label text for the step */
  label: string;
  /** Optional description text displayed below the label */
  description?: string;
  /** Optional custom icon for the step */
  icon?: JSX.Element;
}

/**
 * Props for the Stepper component
 */
export interface StepperProps extends BaseComponentProps {
  /** Array of step configurations */
  steps: StepperStep[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Callback when a step is clicked */
  onStepClick?: (step: number) => void;
  /** Layout orientation */
  orientation?: StepperOrientation;
  /** Size variant */
  size?: ComponentSize;
  /** Allow clicking on completed (previous) steps */
  allowClickPrevious?: boolean;
}

// Re-export for convenience
export type { ComponentSize as StepperSize } from '../../types';
