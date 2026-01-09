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
}

/**
 * Props for the Select component
 */
export interface SelectProps extends BaseInputProps {
  /** Current selected value */
  value: string;
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Option elements */
  children: JSX.Element;
}

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps extends Omit<BaseInputProps, 'placeholder' | 'size'> {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
}

// Re-export shared types for convenience
export type { ComponentSize as InputSize } from '../../types';
