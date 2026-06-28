# Changelog

## 0.6.1

### Fixes

**Tabs**: no longer rebuilds tab content on every tab switch. The keydown/click
handlers read `items` imperatively (with no reactive owner); when a caller
passes an inline `items={[...]}` array, Solid compiles it into a getter that
rebuilds — and re-creates — every tab's content on each read. That reset
stateful content (e.g. live subscriptions) and threw
`<A> and 'use' router primitives can be only used inside a Route` when a tab's
content used router primitives. `items` is now snapshotted via `createMemo`, so
imperative reads return a cached array and only recompute when the caller's
reactive deps (e.g. badges) actually change.

## 0.6.0

### Breaking changes

Navigational components now choose their rendered element **explicitly** via a
polymorphic `as` prop (Kobalte/Radix-style, backed by Solid's `Dynamic`) instead
of inferring `<a>` from the presence of `href`.

Affected: **Breadcrumb**, **Sidebar**, and **Navbar** items. An item with only
`href` no longer renders an anchor — set `as` to render a link:

```tsx
// before (href inferred an <a>)
{ label: 'Users', href: '/users' }

// after — explicit element
{ label: 'Users', as: 'a', href: '/users' }     // plain anchor
{ label: 'Users', as: A, href: '/users' }       // @solidjs/router <A> (client-side routing)
```

Without `as`, items render a `<button>` (or, for Breadcrumb, a `<span>` when there
is no `onClick`). The current (last) Breadcrumb item remains a non-interactive
`<span aria-current="page">`.

### Added

Polymorphic `as` support across navigational / actionable components, forwarding
the target element's props (`href`, `target`, `rel`, router `activeClass`, …):

- **Button** — `<Button as="a" href="/x">` / `<Button as={A} href="/x">`. Full
  generic typing: the `as` element's props (incl. `href`) are type-checked. `type`
  and the `disabled` attribute are emitted only for a native `<button>`; on other
  elements `disabled` maps to `aria-disabled` + `pointer-events-none`.
- **Breadcrumb**, **Sidebar** (leaf items), **Navbar** items — per-item `as`.
- **Pagination** — `as` + `getPageProps(page)` to render numbered pages as real
  links.
- **Menu** items — per-item `as` / `href`.
- New shared `Polymorphic` component + `PolymorphicProps<T, OwnProps>` type
  (`glass-ui-solid` → `Polymorphic`).

Real anchors restore standard link affordances: ⌘/middle-click to open in a new
tab, right-click → "Copy link", `role="link"` semantics, and visible target URL.
