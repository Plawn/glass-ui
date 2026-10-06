# Changelog

## 0.7.0

Accessibility release. No prop was removed, but several defaults change
behavior (see **Behavior changes**).

### Behavior changes

- **Escape**: `useEscapeKey` handlers share one stack; only the top-most overlay
  closes. A Popover or Dialog opened inside a Modal/Drawer now closes alone, and
  an Escape already `preventDefault`-ed by a nested widget (Autocomplete,
  CommandPalette input, Popover trigger) no longer closes the parent. `Window`
  only registers while `closeOnEscape` is enabled.
- **Modal / Dialog / Drawer**: `role`, `aria-modal` and `aria-labelledby` /
  `aria-describedby` move from the backdrop to the panel.
- **Toast**: error toasts default to 10000 ms (others stay at 4000 ms) and pause
  on hover/focus. Announcements go through two persistent visually hidden live
  regions (polite, and assertive for errors); the visible toast no longer has
  `role="alert"`.
- **Progress**: ARIA props are applied to the `progressbar` element; the default
  name is "Progress" (was "Progress: N%", and the linear bar had none) and
  `aria-valuetext` defaults to "N%".
- **SegmentedControl**: radiogroup semantics with roving tabindex — only one
  option is in the Tab order; arrows/Home/End move and select. `sm` is at least
  24 px high.
- **Styles**: `prefers-reduced-motion: reduce` makes animations and transitions
  near-instant through a global `*` rule, which also affects the host app;
  `.animate-spin` keeps turning at 1.5 s.

### Features

- **Modal / Dialog**: `role` prop (`dialog` / `alertdialog`; Modal defaults to
  `dialog`, Dialog keeps `alertdialog`). Title/description IDs come from
  `createUniqueId()`.
- **Modal / Dialog / Drawer**: `returnFocusTo?: FocusReturnTarget`, also on
  `useFocusTrap`. Falls back to the element focused before opening when it is
  still in the document. `FocusReturnTarget` is exported.
- **Table**: `rowHref` and `rowLinkColumn` render a real `<a href>` per row;
  clickable rows without a link are focusable and activate on Enter
  (`onRowClick` receives a synthetic `click` carrying the modifiers).
- **EmptyState**: `headingLevel` (2–6, default 3); `EmptyStateHeadingLevel` exported.
- **Toast**: `TOAST_DEFAULT_DURATION`, `TOAST_ERROR_DURATION`, `pauseToast`,
  `resumeToast`; notification stores accept `durationByType`.
- **Spinner**: overridable `role`; with `aria-hidden` it is decorative.

### Known issue

- Table selected-row classes `bg-primary-*` generate no CSS (the theme has no
  `primary` color); unchanged in this release.

## 0.6.2

**Dialog**: `confirmDisabled`, `onConfirm` may return `false` (or a promise of
it) to keep the dialog open, and `children` are rendered.

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
