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

## Hooks

```typescript
import {
  useDialogState,
  useDisclosure,
  useCopyToClipboard,
  useIsDark
} from 'glass-ui-solid';
```

- **useDialogState** - Escape key, backdrop click, body scroll lock for modals
- **useDisclosure** - Simple open/close state management
- **useCopyToClipboard** - Copy text with success feedback
- **useIsDark** - Detect dark mode (useful for Portals)

## Theming

The library uses CSS custom properties for theming. Override these in your CSS:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-blur: 20px;

  --color-surface: #ffffff;
  --color-surface-secondary: #f5f5f7;
  --color-text: #1d1d1f;
  --color-text-secondary: #86868b;

  --color-accent: #007aff;
  --color-success: #34c759;
  --color-warning: #ff9500;
  --color-error: #ff3b30;
}

.dark {
  --glass-bg: rgba(30, 30, 30, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);

  --color-surface: #1c1c1e;
  --color-surface-secondary: #2c2c2e;
  --color-text: #f5f5f7;
  --color-text-secondary: #98989d;
}
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
  TableColumn
} from 'glass-ui-solid';
```

## License

Apache-2.0
