# Snackbar

Brief messages at the bottom of the screen.

## Import

```tsx
import { Snackbar, showSnackbar, hideSnackbar } from 'glass-ui-solid';
```

## Usage

### Imperative API

```tsx
// Show a simple message
showSnackbar('Changes saved successfully');

// With action
showSnackbar('Item deleted', {
  action: 'Undo',
  onAction: () => restoreItem(),
});

// Custom duration
showSnackbar('Processing...', { duration: 0 }); // Won't auto-dismiss

// Custom position
showSnackbar('Message', { position: 'top' });

// Hide programmatically
hideSnackbar();
```

### Component Usage

```tsx
const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Show Snackbar</Button>

<Snackbar
  open={open()}
  onClose={() => setOpen(false)}
  message="Operation completed"
  action="View"
  onAction={() => navigate('/details')}
/>
```

### Positions

```tsx
showSnackbar('Top message', { position: 'top' });
showSnackbar('Bottom message', { position: 'bottom' });
showSnackbar('Top-left', { position: 'top-start' });
showSnackbar('Top-right', { position: 'top-end' });
showSnackbar('Bottom-left', { position: 'bottom-start' });
showSnackbar('Bottom-right', { position: 'bottom-end' });
```

### With Actions

```tsx
function DeleteItem() {
  const deleteItem = async () => {
    await api.delete(itemId);
    showSnackbar('Item deleted', {
      action: 'Undo',
      onAction: async () => {
        await api.restore(itemId);
        showSnackbar('Item restored');
      },
    });
  };

  return <Button onClick={deleteItem}>Delete</Button>;
}
```

### Custom Duration

```tsx
// Quick message (2 seconds)
showSnackbar('Quick tip!', { duration: 2000 });

// Longer message (10 seconds)
showSnackbar('Important: Please review your settings', { duration: 10000 });

// Persistent (no auto-dismiss)
showSnackbar('Uploading...', { duration: 0 });
```

## Props

### Snackbar Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Whether visible |
| `onClose` | `() => void` | required | Close callback |
| `message` | `string` | required | Message to display |
| `action` | `string` | - | Action button label |
| `onAction` | `() => void` | - | Action button callback |
| `duration` | `number` | `4000` | Auto-dismiss delay (0 = never) |
| `position` | `SnackbarPosition` | `'bottom'` | Screen position |

### showSnackbar Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `action` | `string` | - | Action button label |
| `onAction` | `() => void` | - | Action button callback |
| `duration` | `number` | `4000` | Auto-dismiss delay |
| `position` | `SnackbarPosition` | `'bottom'` | Screen position |

### SnackbarPosition

`'top' | 'bottom' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'`
