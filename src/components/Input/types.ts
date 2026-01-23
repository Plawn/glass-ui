import type { JSX } from 'solid-js';
import type { TextInputProps } from '../../types';

/**
 * Base props shared by text input components
 */
export interface BaseInputProps extends TextInputProps {}

/**
 * Props for the Input component
 */
export interface InputProps extends BaseInputProps {
  /** Current input value */
  value: string;
  /** Callback when value changes */
  onInput: (value: string) => void;
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search';
  /** Keyboard event handler */
  onKeyDown?: (e: KeyboardEvent) => void;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Ref to the input element */
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
}

/**
 * Props for the Textarea component
 */
export interface TextareaProps extends BaseInputProps {
  /** Current textarea value */
  value: string;
  /** Callback when value changes */
  onInput: (value: string) => void;
  /** Number of visible text rows */
  rows?: number;
  /** Whether the textarea is readonly */
  readonly?: boolean;
  /** Ref to the textarea element */
  ref?: HTMLTextAreaElement | ((el: HTMLTextAreaElement) => void);
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
export interface SelectPropsWithChildren extends BaseInputProps {
  /** Current selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
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
export interface SelectPropsWithOptions<T> extends BaseInputProps {
  /** Current selected value */
  value: T | null;
  /** Callback when selection changes */
  onChange: (value: T | null) => void;
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
  extends Omit<BaseInputProps, 'placeholder' | 'size'> {
  /** Whether the checkbox is checked */
  checked: boolean;
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
