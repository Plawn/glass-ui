# Toast

Toast notifications that appear temporarily and auto-dismiss.

## Import

```tsx
import { ToastContainer, toast, dismissToast, clearToasts } from 'glass-ui-solid';
```

## Setup

Add `ToastContainer` once at the root of your app:

```tsx
function App() {
  return (
    <>
      <ToastContainer />
      {/* rest of your app */}
    </>
  );
}
```

## Usage

### Basic

```tsx
toast('This is a message');
```

### Toast Types

```tsx
toast.success('Changes saved successfully!');
toast.error('Failed to save changes.');
toast.warning('Your session will expire soon.');
toast.info('New updates are available.');
```

### Custom Duration

```tsx
// Default is 4000ms (4 seconds)
toast.success('Saved!', 2000);  // 2 seconds
toast.error('Error occurred', 6000);  // 6 seconds
```

### Programmatic Dismissal

```tsx
// Dismiss a specific toast
const id = toast.info('Processing...');
// later...
dismissToast(id);

// Clear all toasts
clearToasts();
```

### In Event Handlers

```tsx
async function handleSave() {
  try {
    await saveData();
    toast.success('Data saved successfully!');
  } catch (error) {
    toast.error('Failed to save data. Please try again.');
  }
}

<Button onClick={handleSave}>Save</Button>
```

### With Async Operations

```tsx
async function handleSubmit() {
  const loadingId = toast.info('Submitting...');

  try {
    await submitForm();
    dismissToast(loadingId);
    toast.success('Form submitted!');
  } catch (error) {
    dismissToast(loadingId);
    toast.error('Submission failed.');
  }
}
```

## API

### toast(message, type?, duration?)

Show a toast notification.

```tsx
toast('Message');  // Default type: 'info'
toast('Message', 'success');
toast('Message', 'error', 5000);
```

### toast.success(message, duration?)

```tsx
toast.success('Operation completed!');
toast.success('Saved!', 2000);
```

### toast.error(message, duration?)

```tsx
toast.error('Something went wrong.');
```

### toast.warning(message, duration?)

```tsx
toast.warning('Please review your input.');
```

### toast.info(message, duration?)

```tsx
toast.info('New feature available!');
```

### dismissToast(id)

Dismiss a specific toast by ID.

```tsx
const id = toast.info('Loading...');
dismissToast(id);
```

### clearToasts()

Remove all toasts.

```tsx
clearToasts();
```

## ToastContainer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

## Toast Types

| Type | Color | Use Case |
|------|-------|----------|
| `success` | Green | Successful operations |
| `error` | Red | Errors, failures |
| `warning` | Amber | Cautions, confirmations needed |
| `info` | Blue | General information |

## Positioning

Toasts appear in the top-right corner by default. They stack vertically with the newest toast on top.

## Animation

- **Enter**: Slides in from the right with fade
- **Exit**: Fades out and slides right
- Duration: 200ms
