import type { JSX } from 'solid-js';
import { For } from 'solid-js';

export interface VariantShowcaseProps<T extends string> {
  variants: readonly T[];
  label?: string;
  children: (variant: T) => JSX.Element;
  columns?: 1 | 2 | 3;
}

/**
 * Displays multiple variants of a component in a grid.
 * @example
 * <VariantShowcase variants={['sm', 'md', 'lg']} label="Size">
 *   {(size) => <Button size={size}>Button</Button>}
 * </VariantShowcase>
 */
export function VariantShowcase<T extends string>(props: VariantShowcaseProps<T>) {
  const label = () => props.label ?? 'Variant';
  const columns = () => props.columns ?? 1;

  const gridClass = () => {
    switch (columns()) {
      case 2:
        return 'grid gap-4 md:grid-cols-2';
      case 3:
        return 'grid gap-4 md:grid-cols-3';
      default:
        return 'space-y-6';
    }
  };

  return (
    <div class={gridClass()}>
      <For each={props.variants}>
        {(variant) => (
          <div class="p-6 glass-card rounded-xl">
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
              {label()}: {variant}
            </p>
            {props.children(variant)}
          </div>
        )}
      </For>
    </div>
  );
}
