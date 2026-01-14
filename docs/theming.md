# Theming

Customize the look and feel of glass-ui-solid components.

## Color System

The library uses OKLCH color space for consistent color perception across the palette.

### Surface Colors

Used for backgrounds, cards, inputs, and text:

```css
:root {
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
}
```

### Accent Colors

Used for buttons, links, and focus states:

```css
:root {
  --color-accent-50: oklch(0.97 0.02 250);
  --color-accent-100: oklch(0.94 0.05 250);
  --color-accent-200: oklch(0.88 0.1 250);
  --color-accent-300: oklch(0.78 0.15 250);
  --color-accent-400: oklch(0.68 0.18 250);
  --color-accent-500: oklch(0.55 0.2 250);
  --color-accent-600: oklch(0.48 0.2 250);
  --color-accent-700: oklch(0.42 0.18 250);
  --color-accent-800: oklch(0.35 0.15 250);
  --color-accent-900: oklch(0.28 0.12 250);
  --color-accent-950: oklch(0.18 0.08 250);
}
```

### Semantic Colors

Status colors for success, warning, error, and info:

```css
:root {
  --color-success-500: oklch(0.6 0.15 145);
  --color-warning-500: oklch(0.75 0.15 75);
  --color-error-500: oklch(0.55 0.2 25);
  --color-info-500: oklch(0.6 0.15 230);
}
```

## Glass Effects

Customize the glassmorphism appearance:

```css
:root {
  /* Background transparency */
  --glass-bg: rgba(255, 255, 255, 0.7);

  /* Border color */
  --glass-border: rgba(255, 255, 255, 0.3);

  /* Blur amount */
  --glass-blur: 20px;
}

.dark {
  --glass-bg: rgba(30, 30, 30, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

## Dark Mode

### Enabling Dark Mode

Add the `dark` class to enable dark mode:

```html
<html class="dark">
  ...
</html>
```

### Toggle Dynamically

```typescript
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

### System Preference

```typescript
// Match system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', prefersDark);

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    document.documentElement.classList.toggle('dark', e.matches);
  });
```

## Importing Theme

Import the full theme file in your CSS:

```css
@import "glass-ui-solid/theme.css";
```

Or import just the styles:

```typescript
import 'glass-ui-solid/styles.css';
```

## Custom Theme Example

Create a custom purple theme:

```css
:root {
  /* Custom accent (purple) */
  --color-accent-500: oklch(0.55 0.25 290);
  --color-accent-600: oklch(0.48 0.25 290);
  --color-accent-700: oklch(0.42 0.22 290);

  /* Warmer surface tones */
  --color-surface-50: oklch(0.99 0.005 30);
  --color-surface-100: oklch(0.97 0.008 30);

  /* More blur for glass */
  --glass-blur: 30px;
}
```

## CSS Utility Classes

Available utility classes for glass effects:

```html
<!-- Standard glass -->
<div class="glass">...</div>

<!-- Glass card with padding and border -->
<div class="glass-card">...</div>

<!-- Thick glass (more blur, less transparency) -->
<div class="glass-thick">...</div>

<!-- Glass input styling -->
<input class="glass-input" />

<!-- Button variants -->
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-tertiary">Tertiary</button>
```

## Tailwind CSS Integration

For Tailwind CSS v4 projects, you can use the theme tokens directly:

```css
@import "glass-ui-solid/theme.css";

/* Now you can use: */
.my-element {
  background: var(--color-surface-100);
  color: var(--color-surface-900);
}
```
