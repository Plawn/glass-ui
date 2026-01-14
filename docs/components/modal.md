# Modal

Centered dialog with backdrop, escape key handling, and body scroll lock.

## Import

```tsx
import { Modal } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal
  open={open()}
  onClose={() => setOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here.</p>
</Modal>
```

### With useDisclosure Hook

```tsx
import { Modal, useDisclosure } from 'glass-ui-solid';

function MyComponent() {
  const modal = useDisclosure();

  return (
    <>
      <Button onClick={modal.onOpen}>Open</Button>

      <Modal
        open={modal.isOpen()}
        onClose={modal.onClose}
        title="Example Modal"
      >
        <p>Content here</p>
      </Modal>
    </>
  );
}
```

### Sizes

```tsx
<Modal size="sm" {...props}>Small modal</Modal>
<Modal size="md" {...props}>Medium modal (default)</Modal>
<Modal size="lg" {...props}>Large modal</Modal>
<Modal size="xl" {...props}>Extra large modal</Modal>
<Modal size="full" {...props}>Full screen modal</Modal>
```

### With Footer

```tsx
<Modal
  open={open()}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <div class="flex justify-end gap-2">
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Without Close Button

```tsx
<Modal
  open={open()}
  onClose={handleClose}
  showClose={false}
  title="Important Notice"
>
  <p>You must acknowledge this message.</p>
  <Button onClick={handleClose}>I Understand</Button>
</Modal>
```

### Prevent Backdrop Close

```tsx
<Modal
  open={open()}
  onClose={handleClose}
  closeOnBackdrop={false}
  title="Form Modal"
>
  <p>Clicking outside won't close this modal.</p>
</Modal>
```

### Prevent Escape Close

```tsx
<Modal
  open={open()}
  onClose={handleClose}
  closeOnEscape={false}
  title="Locked Modal"
>
  <p>Pressing Escape won't close this modal.</p>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Whether the modal is open |
| `onClose` | `() => void` | required | Callback when modal should close |
| `title` | `string` | - | Modal title in header |
| `children` | `JSX.Element` | required | Modal content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `footer` | `JSX.Element` | - | Footer content |
| `showClose` | `boolean` | `true` | Show close button in header |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `class` | `string` | - | Additional CSS classes |
| `style` | `JSX.CSSProperties` | - | Inline styles |

## Behavior

- **Body scroll lock**: Prevents page scrolling when modal is open
- **Escape key**: Closes modal by default (configurable)
- **Backdrop click**: Closes modal by default (configurable)
- **Focus trap**: Recommended to implement for accessibility
- **Portal rendering**: Renders outside the component tree for proper stacking

## Accessibility

The modal includes:
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` pointing to title

For full accessibility, consider adding focus management.
