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
- **Table** - Data table with sorting
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

## Hooks

```typescript
import {
  useDialogState,
  useDisclosure,
  useCopyToClipboard,
  useIsDark,
  useAnimationState
} from 'glass-ui-solid';
```

- **useDialogState** - Escape key, backdrop click, body scroll lock for modals
- **useDisclosure** - Simple open/close state management
- **useCopyToClipboard** - Copy text with success feedback
- **useIsDark** - Detect dark mode (useful for Portals)
- **useAnimationState** - Manage enter/exit animations with mounting state

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
  ErrorDisplayProps,
  GlassBackgroundProps
} from 'glass-ui-solid';
```

## License

Apache-2.0
