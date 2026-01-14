# Alert

Inline alert messages for feedback and notifications.

## Import

```tsx
import { Alert } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Alert type="info">
  This is an informational message.
</Alert>
```

### Alert Types

```tsx
<Alert type="info" title="Information">
  Your session will expire in 5 minutes.
</Alert>

<Alert type="success" title="Success">
  Your changes have been saved.
</Alert>

<Alert type="warning" title="Warning">
  Please review before continuing.
</Alert>

<Alert type="error" title="Error">
  Failed to save changes. Please try again.
</Alert>
```

### With Title

```tsx
<Alert type="success" title="Payment Successful">
  Your order #12345 has been confirmed.
</Alert>
```

### Dismissible

```tsx
const [visible, setVisible] = createSignal(true);

<Show when={visible()}>
  <Alert
    type="info"
    title="New Feature"
    onClose={() => setVisible(false)}
  >
    Check out our new dashboard!
  </Alert>
</Show>
```

### Custom Icon

```tsx
<Alert type="info" icon={<CustomIcon />}>
  Custom icon alert.
</Alert>
```

### In Forms

```tsx
<form onSubmit={handleSubmit}>
  <Show when={error()}>
    <Alert type="error" class="mb-4">
      {error()}
    </Alert>
  </Show>

  <Show when={success()}>
    <Alert type="success" class="mb-4">
      Form submitted successfully!
    </Alert>
  </Show>

  {/* form fields */}
</form>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | required | Alert type |
| `title` | `string` | - | Alert title |
| `children` | `JSX.Element` | required | Alert content |
| `icon` | `JSX.Element` | - | Custom icon (overrides default) |
| `onClose` | `() => void` | - | Close callback (shows close button when provided) |
| `class` | `string` | - | Additional CSS classes |
| `style` | `JSX.CSSProperties` | - | Inline styles |

## Styling

Each type has its own color scheme:

| Type | Background | Border | Icon |
|------|------------|--------|------|
| `info` | Blue | Blue | Info circle |
| `success` | Green | Green | Check circle |
| `warning` | Amber | Amber | Warning triangle |
| `error` | Red | Red | Error circle |

## Best Practices

1. **Use appropriate types**: Match the alert type to the message severity
2. **Keep messages concise**: Users should understand quickly
3. **Use titles for context**: Add titles for important alerts
4. **Allow dismissal**: Let users close non-critical alerts
5. **Position consistently**: Place alerts in predictable locations
