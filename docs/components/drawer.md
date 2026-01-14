# Drawer

Slide-in panel from left or right edge of the screen.

## Import

```tsx
import { Drawer } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Drawer</Button>

<Drawer
  open={open()}
  onClose={() => setOpen(false)}
  title="Drawer Title"
>
  <p>Drawer content here.</p>
</Drawer>
```

### Position

```tsx
// Right side (default)
<Drawer position="right" {...props}>
  Right drawer
</Drawer>

// Left side
<Drawer position="left" {...props}>
  Left drawer
</Drawer>
```

### Sizes

```tsx
<Drawer size="sm" {...props}>Small (320px)</Drawer>
<Drawer size="md" {...props}>Medium (400px, default)</Drawer>
<Drawer size="lg" {...props}>Large (500px)</Drawer>
<Drawer size="xl" {...props}>Extra large (640px)</Drawer>
<Drawer size="full" {...props}>Full width</Drawer>
```

### With Footer

```tsx
<Drawer
  open={open()}
  onClose={handleClose}
  title="Settings"
  footer={
    <div class="flex justify-end gap-2">
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  }
>
  {/* Settings form */}
</Drawer>
```

### Navigation Drawer

```tsx
<Drawer
  open={menuOpen()}
  onClose={() => setMenuOpen(false)}
  position="left"
  title="Navigation"
>
  <nav class="space-y-2">
    <a href="/" class="block px-4 py-2 rounded hover:bg-surface-100">
      Home
    </a>
    <a href="/about" class="block px-4 py-2 rounded hover:bg-surface-100">
      About
    </a>
    <a href="/contact" class="block px-4 py-2 rounded hover:bg-surface-100">
      Contact
    </a>
  </nav>
</Drawer>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Whether the drawer is open |
| `onClose` | `() => void` | required | Callback when drawer should close |
| `title` | `string` | - | Drawer title in header |
| `children` | `JSX.Element` | required | Drawer content |
| `position` | `'left' \| 'right'` | `'right'` | Slide-in direction |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Drawer width |
| `footer` | `JSX.Element` | - | Footer content |
| `showClose` | `boolean` | `true` | Show close button |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `class` | `string` | - | Additional CSS classes |

## Animation

The drawer uses slide animations:
- **Enter**: Slides in from the edge with fade
- **Exit**: Slides out to the edge with fade
- Duration: 300ms enter, 200ms exit

## Behavior

- **Body scroll lock**: Prevents page scrolling when open
- **Escape key**: Closes drawer by default
- **Backdrop click**: Closes drawer by default
- **Exit animation**: Waits for animation to complete before unmounting
