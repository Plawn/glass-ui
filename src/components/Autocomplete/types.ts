import type { BaseComponentProps, ComponentSize } from '../../types';

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
 * Props for the Autocomplete component
 */
export interface AutocompleteProps extends BaseComponentProps {
  /** List of available options */
  options: AutocompleteOption[];
  /** Currently selected value */
  value: string;
  /** Callback when the selected value changes */
  onChange: (value: string) => void;
  /** Callback when the input text changes (for async loading) */
  onInputChange?: (input: string) => void;
  /** Label displayed above the input */
  label?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Size variant */
  size?: ComponentSize;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Error message displayed below the input */
  error?: string;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Text to display when no options match */
  emptyText?: string;
  /** Allow custom values not in options list */
  allowCustomValue?: boolean;
  /** Custom filter function for options */
  filterFn?: (option: AutocompleteOption, inputValue: string) => boolean;
  /** HTML id attribute */
  id?: string;
  /** HTML name attribute */
  name?: string;
}

/**
 * Size-specific CSS classes for the input
 */
export type AutocompleteSize = ComponentSize;
