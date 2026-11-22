import type { ComponentProps, JSX, ValidComponent } from '@solidjs/web';
import { Dynamic } from '@solidjs/web';
import { omit } from 'solid-js';

/**
 * Props for a polymorphic component.
 *
 * Merges a component's own props with the forwarded props of the element /
 * component supplied via `as`. When `as={Link}` uses a custom link component,
 * the props of `Link` — including `href` — become type-known on the call site.
 *
 * @typeParam T - The element tag or component to render (`'a'`, `'button'`, `A`, …)
 * @typeParam OwnProps - The component's own (non-forwarded) props
 */
export type PolymorphicProps<
  T extends ValidComponent,
  OwnProps extends object = Record<string, never>,
> = OwnProps & {
  /** Element tag or component to render as. Defaults to the component's base element. */
  as?: T;
} & Omit<ComponentProps<T>, keyof OwnProps | 'as'>;

/**
 * Renders an arbitrary element or component via Solid's `Dynamic`, forwarding
 * all remaining props. This is the low-level escape hatch behind the `as` prop;
 * most components call `Dynamic` directly, but this is exported for consumers
 * (and item renderers) that want the same behaviour with `PolymorphicProps`.
 */
export function Polymorphic<T extends ValidComponent>(
  props: PolymorphicProps<T> & { as: T },
): JSX.Element {
  const local = props as { as: ValidComponent };
  const others = omit(local, 'as');
  return <Dynamic component={local.as} {...others} />;
}
