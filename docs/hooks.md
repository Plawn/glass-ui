# Hooks

Utility hooks for common UI patterns.

## Import

```tsx
import {
  useDisclosure,
  useCopyToClipboard,
  useIsDark,
  useDialogState,
  useAnimationState,
} from 'glass-ui-solid';
```

---

## useDisclosure

Manage open/close state for modals, drawers, menus, etc.

### Usage

```tsx
function MyComponent() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal open={isOpen()} onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    </>
  );
}
```

### With Initial State

```tsx
const { isOpen, onClose } = useDisclosure(true); // Start open
```

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `Accessor<boolean>` | Current open state |
| `onOpen` | `() => void` | Open the disclosure |
| `onClose` | `() => void` | Close the disclosure |
| `onToggle` | `() => void` | Toggle open state |

---

## useCopyToClipboard

Copy text to clipboard with feedback state.

### Usage

```tsx
function CopyButton(props: { text: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button onClick={() => copy(props.text)}>
      {copied() ? 'Copied!' : 'Copy'}
    </Button>
  );
}
```

### Custom Reset Delay

```tsx
const { copied, copy } = useCopyToClipboard(5000); // 5 seconds
```

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `copied` | `() => boolean` | Whether recently copied |
| `copy` | `(text: string) => Promise<boolean>` | Copy text (returns success) |

---

## useIsDark

Check if dark mode is active (useful for portals).

### Usage

```tsx
function MyPortalContent() {
  const isDark = useIsDark();

  return (
    <Portal>
      <div class={isDark() ? 'dark' : ''}>
        Portal content with correct theme
      </div>
    </Portal>
  );
}
```

### Return Value

| Type | Description |
|------|-------------|
| `() => boolean` | Function that returns current dark mode state |

---

## useDialogState

Shared dialog behavior for modals and drawers. Handles escape key, body scroll prevention, and backdrop clicks.

### Usage

```tsx
function MyDialog(props: { open: boolean; onClose: () => void }) {
  const { handleBackdropClick } = useDialogState({
    open: () => props.open,
    onClose: props.onClose,
  });

  return (
    <Show when={props.open}>
      <div class="backdrop" onClick={handleBackdropClick}>
        <div class="dialog-content">
          {props.children}
        </div>
      </div>
    </Show>
  );
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `open` | `Accessor<boolean>` | required | Open state accessor |
| `onClose` | `() => void` | required | Close callback |
| `closeOnEscape` | `Accessor<boolean>` | `() => true` | Close on Escape key |
| `closeOnBackdrop` | `Accessor<boolean>` | `() => true` | Close on backdrop click |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `shouldCloseOnBackdrop` | `Accessor<boolean>` | Whether backdrop click should close |
| `handleBackdropClick` | `(e: MouseEvent, targetCheck?) => void` | Backdrop click handler |

---

## useAnimationState

Manage enter/exit animation state. Keeps elements in DOM during exit animation.

### Usage

```tsx
function AnimatedModal(props: { open: boolean }) {
  const { visible, isClosing } = useAnimationState({
    open: () => props.open,
    duration: 200,
  });

  const animationClass = () =>
    isClosing()
      ? 'animate-out fade-out zoom-out-95'
      : 'animate-in fade-in zoom-in-95';

  return (
    <Show when={visible()}>
      <div class={animationClass()}>
        Modal content
      </div>
    </Show>
  );
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `open` | `Accessor<boolean>` | required | Open state accessor |
| `duration` | `number` | `200` | Animation duration (ms) |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `visible` | `Accessor<boolean>` | Whether element should be in DOM |
| `isClosing` | `Accessor<boolean>` | Whether exit animation is playing |

### Behavior

1. When `open` becomes `true`:
   - `visible` becomes `true` immediately
   - `isClosing` is `false`

2. When `open` becomes `false`:
   - `isClosing` becomes `true`
   - `visible` stays `true` (for exit animation)
   - After `duration` ms, both become `false`
