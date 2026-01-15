import { type Accessor, createMemo, createSignal } from 'solid-js';

/**
 * Options for the useControlled hook
 */
export interface UseControlledOptions<T> {
  /**
   * The controlled value from props (if undefined, component is uncontrolled)
   */
  value: T | undefined;

  /**
   * The default value for uncontrolled mode
   */
  defaultValue: T;

  /**
   * Callback when the value changes
   */
  onChange?: (value: T) => void;
}

/**
 * Return type for the useControlled hook
 */
export type UseControlledReturn<T> = [value: Accessor<T>, setValue: (value: T) => void];

/**
 * A hook for managing controlled/uncontrolled component state.
 *
 * When `value` is provided (not undefined), the component is controlled
 * and state changes are delegated to the parent via `onChange`.
 *
 * When `value` is undefined, the component manages its own internal state
 * initialized with `defaultValue`, while still calling `onChange` on updates.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useControlled({
 *   value: props.open,
 *   defaultValue: props.defaultOpen ?? false,
 *   onChange: props.onOpenChange,
 * });
 *
 * // Use isOpen() to read the current value
 * // Use setIsOpen(newValue) to update it
 * ```
 */
export function useControlled<T>(options: UseControlledOptions<T>): UseControlledReturn<T> {
  const [internal, setInternal] = createSignal<T>(options.defaultValue);

  const isControlled = createMemo(() => options.value !== undefined);

  const value = createMemo(() => (isControlled() ? (options.value as T) : internal()));

  const setValue = (newValue: T) => {
    if (!isControlled()) {
      setInternal(() => newValue);
    }
    options.onChange?.(newValue);
  };

  return [value, setValue];
}
