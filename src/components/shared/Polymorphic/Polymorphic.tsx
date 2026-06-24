import {
  type ComponentProps,
  type JSX,
  type ValidComponent,
  splitProps,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

/**
 * Props for a polymorphic component.
 *
 * Merges a component's own props with the forwarded props of the element /
 * component supplied via `as`. When `as={A}` (e.g. `@solidjs/router`'s `<A>`),
 * the props of `A` — including `href` — become type-known on the call site.
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
  const [local, others] = splitProps(props as { as: ValidComponent }, ['as']);
  return <Dynamic component={local.as} {...others} />;
}
