import type { JSX } from 'solid-js';
import type { ComponentSize, FormFieldSemanticProps } from '../../types';

/**
 * Switch size - uses standard 3-tier scale
 */
export type SwitchSize = ComponentSize;
export type SwitchLabelPosition = 'left' | 'right';

/**
 * Props for the Switch component.
 *
 * Extends native `<label>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer label wrapper element.
 */
export interface SwitchProps
  extends Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, 'onChange' | 'ref'>,
    FormFieldSemanticProps {
  /** Whether the switch is checked/on (controlled). Omit to use uncontrolled mode. */
  checked?: boolean;
  /** Initial checked state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
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
