# Progress

Progress indicators for loading and completion states.

## Import

```tsx
import { Progress } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Progress value={60} />
```

### Variants

```tsx
<Progress value={60} variant="bar" />
<Progress value={60} variant="circular" />
```

### Colors

```tsx
<Progress value={60} color="primary" />
<Progress value={60} color="success" />
<Progress value={60} color="warning" />
<Progress value={60} color="error" />
```

### Sizes

```tsx
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />
```

### Show Value

```tsx
<Progress value={75} showValue />
```

### Circular Progress

```tsx
<Progress value={75} variant="circular" size="lg" showValue />
```

### Dynamic Progress

```tsx
function UploadProgress() {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 500);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <Progress value={progress()} color="primary" showValue />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Progress value (0-100) |
| `variant` | `'bar' \| 'circular'` | `'bar'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the indicator |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color theme |
| `showValue` | `boolean` | `false` | Show percentage value |
| `class` | `string` | - | Additional CSS classes |

## Accessibility

- Uses `role="progressbar"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attributes
