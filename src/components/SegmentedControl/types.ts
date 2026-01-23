import type { JSX } from 'solid-js';
import type {
  BaseComponentProps,
  CompactSize,
  DisableableProps,
} from '../../types';

/**
 * SegmentedControl size - uses compact 2-tier scale
 */
export type SegmentedControlSize = CompactSize;

export interface SegmentedControlOption<T extends string | number>
  extends DisableableProps {
  /** Option value */
  value: T;
  /** Display label */
  label: string | JSX.Element;
}

export interface SegmentedControlProps<T extends string | number>
  extends BaseComponentProps {
  /** Available options */
  options: SegmentedControlOption<T>[];
  /** Current value */
  value: T;
  /** Callback when value changes */
  onChange: (value: T) => void;
  /** Size variant */
  size?: SegmentedControlSize;
  /** Orientation - horizontal or vertical */
  orientation?: 'horizontal' | 'vertical';
  /** Accessible label for the group */
  'aria-label'?: string;
}
