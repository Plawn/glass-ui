import type { BaseComponentProps, ComponentSize } from '../../types';

/**
 * Switch size - uses standard 3-tier scale
 */
export type SwitchSize = ComponentSize;
export type SwitchLabelPosition = 'left' | 'right';

export interface SwitchProps extends BaseComponentProps {
  /** Whether the switch is checked/on */
  checked: boolean;
  /** Callback when checked state changes */
  onChange: (checked: boolean) => void;
  /** Optional label text */
  label?: string;
  /** Position of the label relative to the switch */
  labelPosition?: SwitchLabelPosition;
  /** Size variant */
  size?: SwitchSize;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute for form submission */
  name?: string;
  /** Ref to the hidden checkbox input element */
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
}
