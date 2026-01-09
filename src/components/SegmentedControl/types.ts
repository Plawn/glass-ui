import type { JSX } from 'solid-js';
import type { BaseComponentProps, DisableableProps } from '../../types';

/**
 * SegmentedControl size - only sm and md supported
 */
export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlOption<T extends string | number> extends DisableableProps {
  /** Option value */
  value: T;
  /** Display label */
  label: string | JSX.Element;
}

export interface SegmentedControlProps<T extends string | number> extends BaseComponentProps {
  /** Available options */
  options: SegmentedControlOption<T>[];
  /** Current value */
  value: T;
  /** Callback when value changes */
  onChange: (value: T) => void;
  /** Size variant */
  size?: SegmentedControlSize;
  /** Accessible label for the group */
  'aria-label'?: string;
}
