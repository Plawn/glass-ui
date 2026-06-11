import type { JSX } from 'solid-js';
import type { CompactSize, DisableableProps } from '../../types';

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

/**
 * Props for the SegmentedControl component.
 *
 * Extends native `<div>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer container element.
 */
export interface SegmentedControlProps<T extends string | number>
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Available options */
  options: SegmentedControlOption<T>[];
  /** Current value (controlled). Omit to use uncontrolled mode. */
  value?: T;
  /** Initial value for uncontrolled mode (defaults to the first option) */
  defaultValue?: T;
  /** Callback when value changes */
  onChange?: (value: T) => void;
  /** Size variant */
  size?: SegmentedControlSize;
  /** Orientation - horizontal or vertical */
  orientation?: 'horizontal' | 'vertical';
}
