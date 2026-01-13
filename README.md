# glass-ui-solid

iOS 26-inspired glassmorphism UI components for SolidJS.

## Installation

```bash
# npm
npm install glass-ui-solid solid-js

# bun
bun add glass-ui-solid solid-js

# pnpm
pnpm add glass-ui-solid solid-js
```

## Setup

Import the CSS in your app entry point:

```typescript
import 'glass-ui-solid/styles.css';
```

For Tailwind CSS v4 projects, you can also import the theme tokens:

```css
@import "glass-ui-solid/theme.css";
```

## Usage

```tsx
import { Button, Modal, Toast, toast } from 'glass-ui-solid';

function App() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Button onClick={() => toast.success('Hello!')}>
        Show Toast
      </Button>

      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal isOpen={open()} onClose={() => setOpen(false)} title="Example">
        <p>Modal content here</p>
      </Modal>

      <ToastContainer />
    </>
  );
}
```

## Components

### Layout & Containers
- **Card** - Container with glass effect and variants
- **Section** - Collapsible section with header
- **Modal** - Centered dialog with backdrop
- **Dialog** - Confirmation dialog with actions
- **Drawer** - Slide-in panel (left/right/top/bottom)

### Forms & Inputs
- **Button** - Primary, secondary, tertiary variants with loading state
- **Input** - Text input with label and error states
- **Textarea** - Multiline text input
- **Select** - Dropdown select
- **Checkbox** - Checkbox with label
- **JsonSchemaForm** - Auto-generated form from JSON Schema

### Feedback
- **Toast** / **ToastContainer** - Toast notifications with `toast.success()`, `toast.error()`, etc.
- **Snackbar** - Bottom notification bar
- **Alert** - Inline alert messages (info, success, warning, error)
- **Progress** - Progress bar with variants
- **Skeleton** - Loading placeholder
- **ErrorDisplay** - Error message display with optional details

### Navigation
- **Tabs** - Tab navigation
- **SegmentedControl** - iOS-style segmented control
- **Breadcrumb** - Breadcrumb navigation
- **Pagination** - Page navigation
- **Menu** - Dropdown menu with items
- **Dropdown** - Generic dropdown container

### Data Display
- **Table** - Data table with sorting, selection, and sticky headers
- **VirtualList** - Virtualized list for large datasets (react-virtuoso inspired)
- **VirtualTable** - Virtualized table with sticky header for large datasets
- **Badge** - Status badges and HTTP method badges
- **Chip** - Dismissible chips/tags
- **Avatar** - User avatar with fallback
- **Tooltip** - Hover tooltips
- **CodeBlock** - Syntax-highlighted code with copy button
- **JsonViewer** - Collapsible JSON tree view
- **Markdown** - Markdown renderer

### Disclosure
- **Accordion** - Collapsible accordion panels

### Backgrounds
- **GlassBackground** - Animated glassmorphism background with customizable blobs

## Table & Virtualization

### Table

Standard table component for small to medium datasets:

```tsx
import { Table } from 'glass-ui-solid';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const data = [
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User' },
];

<Table
  columns={columns}
  data={data}
  sortable
  selectable="multiple"
  maxHeight="400px"
  onSelectionChange={(keys, rows) => console.log(rows)}
/>
```

### VirtualList

For large lists (1000+ items), use VirtualList for optimal performance:

```tsx
import { VirtualList } from 'glass-ui-solid';

<VirtualList
  style={{ height: '400px' }}
  totalCount={10000}
  defaultItemHeight={56}
  itemContent={(index) => (
    <div class="px-4 py-3 border-b border-surface-200">
      Item {index}
    </div>
  )}
/>
```

### VirtualTable

For large tables, use VirtualTable with sticky headers:

```tsx
import { VirtualTable } from 'glass-ui-solid';

<VirtualTable
  style={{ height: '400px' }}
  totalCount={10000}
  fixedHeaderContent={() => (
    <tr>
      <th class="px-4 py-3 text-left">ID</th>
      <th class="px-4 py-3 text-left">Name</th>
      <th class="px-4 py-3 text-left">Email</th>
    </tr>
  )}
  itemContent={(index) => (
    <>
      <td class="px-4 py-3">{index + 1}</td>
      <td class="px-4 py-3">User {index + 1}</td>
      <td class="px-4 py-3">user{index + 1}@example.com</td>
    </>
  )}
/>
```

You can also pass a `data` array for type-safe access:

```tsx
<VirtualTable
  style={{ height: '400px' }}
  data={users}
  fixedHeaderContent={() => (
    <tr>
      <th class="px-4 py-3">Name</th>
      <th class="px-4 py-3">Email</th>
    </tr>
  )}
  itemContent={(index, user) => (
    <>
      <td class="px-4 py-3">{user.name}</td>
      <td class="px-4 py-3">{user.email}</td>
    </>
  )}
/>
```

## Hooks

```typescript
import {
  useDialogState,
  useDisclosure,
  useCopyToClipboard,
  useIsDark,
  useAnimationState,
  useVirtualizer
} from 'glass-ui-solid';
```

- **useDialogState** - Escape key, backdrop click, body scroll lock for modals
- **useDisclosure** - Simple open/close state management
- **useCopyToClipboard** - Copy text with success feedback
- **useIsDark** - Detect dark mode (useful for Portals)
- **useAnimationState** - Manage enter/exit animations with mounting state
- **useVirtualizer** - Low-level virtualization hook for custom implementations

## Theming

The library uses CSS custom properties with a numbered scale (OKLCH color space). Override these in your CSS:

```css
:root {
  /* Glass effects */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-blur: 20px;

  /* Surface colors (backgrounds, cards, inputs) */
  --color-surface-50: oklch(0.99 0.002 240);
  --color-surface-100: oklch(0.97 0.004 240);
  --color-surface-200: oklch(0.92 0.01 240);
  --color-surface-300: oklch(0.8 0.02 240);
  --color-surface-400: oklch(0.6 0.025 240);
  --color-surface-500: oklch(0.4 0.03 240);
  --color-surface-600: oklch(0.3 0.03 250);
  --color-surface-700: oklch(0.2 0.03 260);
  --color-surface-800: oklch(0.15 0.03 260);
  --color-surface-900: oklch(0.1 0.03 260);
  --color-surface-950: oklch(0.05 0.03 260);

  /* Accent colors (buttons, links, focus states) */
  --color-accent-500: oklch(0.55 0.2 250);
  /* ... see theme.css for full scale */
}

.dark {
  --glass-bg: rgba(30, 30, 30, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

For the full color palette, import the theme file directly:

```css
@import "glass-ui-solid/theme.css";
```

## Dark Mode

Add the `dark` class to enable dark mode:

```html
<html class="dark">
```

Or toggle dynamically:

```typescript
document.documentElement.classList.toggle('dark');
```

## CSS Utilities

The library includes utility classes you can use:

```html
<!-- Glass effects -->
<div class="glass">...</div>
<div class="glass-card">...</div>
<div class="glass-thick">...</div>

<!-- Buttons -->
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-tertiary">Tertiary</button>

<!-- Inputs -->
<input class="glass-input" />
```

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  ButtonProps,
  ModalProps,
  Schema,
  TableColumn,
  TableProps,
  VirtualListProps,
  VirtualTableProps,
  ErrorDisplayProps,
  GlassBackgroundProps
} from 'glass-ui-solid';
```

## License

Apache-2.0
