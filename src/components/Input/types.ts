import type { JSX } from 'solid-js';
import type {
  ComponentSize,
  FormFieldSemanticProps,
  TextInputProps,
} from '../../types';

/**
 * Base props shared by text input components
 */
export interface BaseInputProps extends TextInputProps {}

/**
 * Props for the Input component.
 *
 * Extends native `<input>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the underlying input element.
 */
export interface InputProps
  extends Omit<
      JSX.InputHTMLAttributes<HTMLInputElement>,
      'value' | 'onInput' | 'size' | 'type'
    >,
    FormFieldSemanticProps {
  /** Current input value (controlled). Omit to use uncontrolled mode. */
  value?: string;
  /** Initial value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when value changes */
  onInput?: (value: string) => void;
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search';
  /** Keyboard event handler */
  onKeyDown?: (e: KeyboardEvent) => void;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Size variant */
  size?: ComponentSize;
}

/**
 * Props for the Textarea component.
 *
 * Extends native `<textarea>` attributes (minus the ones we redefine with a
 * different shape) so arbitrary `data-*`/`aria-*`/HTML attributes are forwarded
 * to the underlying textarea element.
 */
export interface TextareaProps
  extends Omit<
      JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'value' | 'onInput' | 'size'
    >,
    FormFieldSemanticProps {
  /** Current textarea value (controlled). Omit to use uncontrolled mode. */
  value?: string;
  /** Initial value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when value changes */
  onInput?: (value: string) => void;
  /** Number of visible text rows */
  rows?: number;
  /** Whether the textarea is readonly */
  readonly?: boolean;
  /** Size variant */
  size?: ComponentSize;
}

/**
 * Option item for Select component
 */
export interface SelectOption<T = string> {
  /** Option value */
  value: T;
  /** Display label */
  label: string;
  /** Whether option is disabled */
  disabled?: boolean;
}

/**
 * Props for the Select component with children (string values only)
 */
export interface SelectPropsWithChildren
  extends Omit<
      JSX.SelectHTMLAttributes<HTMLSelectElement>,
      'value' | 'onChange' | 'size'
    >,
    FormFieldSemanticProps {
  /** Current selected value (controlled). Omit to use uncontrolled mode. */
  value?: string;
  /** Initial value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Option elements */
  children: JSX.Element;
  /** Array of option objects - not used with children */
  options?: never;
  /** Placeholder text for empty option */
  emptyOption?: never;
  /** Ref to the select element */
  ref?: HTMLSelectElement | ((el: HTMLSelectElement) => void);
}

/**
 * Props for the Select component with options array (generic values)
 */
export interface SelectPropsWithOptions<T>
  extends Omit<
      JSX.SelectHTMLAttributes<HTMLSelectElement>,
      'value' | 'onChange' | 'size'
    >,
    FormFieldSemanticProps {
  /** Current selected value (controlled). Omit to use uncontrolled mode. */
  value?: T | null;
  /** Initial value for uncontrolled mode */
  defaultValue?: T | null;
  /** Callback when selection changes */
  onChange?: (value: T | null) => void;
  /** Option elements - not used with options */
  children?: never;
  /** Array of option objects */
  options: SelectOption<T>[];
  /** Placeholder text for empty option */
  emptyOption?: string;
  /** Ref to the select element */
  ref?: HTMLSelectElement | ((el: HTMLSelectElement) => void);
}

/**
 * Props for the Select component
 */
export type SelectProps<T = string> =
  | SelectPropsWithChildren
  | SelectPropsWithOptions<T>;

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps
  extends Omit<
      JSX.InputHTMLAttributes<HTMLInputElement>,
      'checked' | 'onChange' | 'size'
    >,
    FormFieldSemanticProps {
  /** Whether the checkbox is checked (controlled). Omit to use uncontrolled mode. */
  checked?: boolean;
  /** Initial checked state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Whether the checkbox is in indeterminate state (partially selected) */
  indeterminate?: boolean;
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Ref to the checkbox input element */
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
}

// Re-export shared types for convenience
export type { ComponentSize as InputSize } from '../../types';
