import { createMemo, type Accessor } from 'solid-js';

/**
 * Creates accessors for props with default values.
 * Reduces the boilerplate of `const size = () => props.size ?? 'md'` pattern.
 *
 * @example
 * ```tsx
 * interface ButtonProps {
 *   size?: 'sm' | 'md' | 'lg';
 *   variant?: 'primary' | 'secondary';
 *   disabled?: boolean;
 * }
 *
 * function Button(props: ButtonProps) {
 *   const { size, variant } = useDefaultProps(props, {
 *     size: 'md',
 *     variant: 'primary',
 *   });
 *
 *   // size() returns 'sm' | 'md' | 'lg' (never undefined)
 *   // variant() returns 'primary' | 'secondary' (never undefined)
 *   return <button class={buttonClasses[size()][variant()]}>...</button>;
 * }
 * ```
 *
 * @param props - The component props object
 * @param defaults - An object mapping prop names to their default values
 * @returns An object with the same keys as `defaults`, where each value is an Accessor
 *          that returns the prop value or the default if the prop is nullish
 */
export function useDefaultProps<T extends Record<string, unknown>, D extends Partial<T>>(
  props: T,
  defaults: D
): { [K in keyof D]-?: Accessor<NonNullable<D[K]>> } {
  const result = {} as { [K in keyof D]-?: Accessor<NonNullable<D[K]>> };

  for (const key of Object.keys(defaults) as (keyof D)[]) {
    result[key] = createMemo(() => props[key as keyof T] ?? defaults[key]) as Accessor<NonNullable<D[typeof key]>>;
  }

  return result;
}
