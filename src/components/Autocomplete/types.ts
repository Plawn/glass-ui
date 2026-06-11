import type { JSX } from 'solid-js';
import type {
  ComponentSize,
  FormFieldSemanticProps,
  LoadableProps,
} from '../../types';

/**
 * Single option in the Autocomplete dropdown
 */
export interface AutocompleteOption {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

/**
 * Props for the Autocomplete component.
 *
 * Extends native `<div>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the outer wrapper element. Note `ref` targets the inner `<input>`, so it is
 * omitted from the native div attributes and redefined below.
 */
export interface AutocompleteProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange' | 'ref'>,
    FormFieldSemanticProps,
    LoadableProps {
  /** List of available options */
  options: AutocompleteOption[];
  /** Currently selected value (controlled). Omit to use uncontrolled mode. */
  value?: string;
  /** Initial value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when the selected value changes */
  onChange?: (value: string) => void;
  /** Callback when the input text changes (for async loading) */
  onInputChange?: (input: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Size variant */
  size?: ComponentSize;
  /** Text to display when no options match */
  emptyText?: string;
  /** Allow custom values not in options list */
  allowCustomValue?: boolean;
  /** Custom filter function for options */
  filterFn?: (option: AutocompleteOption, inputValue: string) => boolean;
  /** HTML name attribute for the input */
  name?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Ref to the input element */
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
}

/**
 * Size-specific CSS classes for the input
 */
export type AutocompleteSize = ComponentSize;
