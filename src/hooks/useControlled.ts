import { type Accessor, createMemo, createSignal } from 'solid-js';

/**
 * Options for the useControlled hook
 */
export interface UseControlledOptions<T> {
  /**
   * The controlled value from props (if undefined, component is uncontrolled).
   * Can be a direct value or an accessor function for reactivity.
   */
  value: T | undefined | (() => T | undefined);

  /**
   * The default value for uncontrolled mode. Stored as-is, even when it is a
   * function. Either this or `getDefaultValue` must be provided.
   */
  defaultValue?: T;

  /**
   * Reactive default for uncontrolled mode; takes precedence over
   * `defaultValue`. Use it when the default derives from props: the
   * uncontrolled state follows it until the user changes the value, and
   * resets if the default itself changes.
   */
  getDefaultValue?: () => T;

  /**
   * Callback when the value changes
   */
  onChange?: (value: T) => void;
}

/**
 * Return type for the useControlled hook
 */
export type UseControlledReturn<T> = [
  value: Accessor<T>,
  setValue: (value: T) => void,
];

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
 *   value: () => props.open,
 *   getDefaultValue: () => props.defaultOpen ?? false,
 *   onChange: (open) => props.onOpenChange?.(open),
 * });
 *
 * // Use isOpen() to read the current value
 * // Use setIsOpen(newValue) to update it
 * ```
 */
export function useControlled<T>(
  options: UseControlledOptions<T>,
): UseControlledReturn<T> {
  // Memoised so the uncontrolled state resets only when the default itself
  // changes value, not every time one of its dependencies re-evaluates.
  const defaultValue = createMemo(() =>
    options.getDefaultValue
      ? options.getDefaultValue()
      : (options.defaultValue as T),
  );
  const [internal, setInternal] = createSignal<T>(() => defaultValue());

  // Resolve the controlled value - support both direct values and accessors
  const getValue = () => {
    const v = options.value;
    return typeof v === 'function' ? (v as () => T | undefined)() : v;
  };

  const isControlled = createMemo(() => getValue() !== undefined);

  const value = createMemo(() =>
    isControlled() ? (getValue() as T) : internal(),
  );

  const setValue = (newValue: T) => {
    if (!isControlled()) {
      setInternal(() => newValue);
    }
    options.onChange?.(newValue);
  };

  return [value, setValue];
}
