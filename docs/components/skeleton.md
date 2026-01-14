# Skeleton

Loading placeholder with pulse animation.

## Import

```tsx
import { Skeleton } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Skeleton width="200px" height="20px" />
```

### Variants

```tsx
<Skeleton variant="text" width="100%" />
<Skeleton variant="rectangular" width="200px" height="100px" />
<Skeleton variant="circular" width="48px" height="48px" />
```

### Text Lines

```tsx
<div class="space-y-2">
  <Skeleton variant="text" width="100%" />
  <Skeleton variant="text" width="90%" />
  <Skeleton variant="text" width="80%" />
</div>
```

### Card Skeleton

```tsx
<Card>
  <div class="flex gap-4">
    <Skeleton variant="circular" width="48px" height="48px" />
    <div class="flex-1 space-y-2">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
</Card>
```

### With Rounded Corners

```tsx
<Skeleton width="100px" height="100px" rounded />
```

### Avatar Skeleton

```tsx
<Skeleton variant="circular" width="40px" height="40px" />
```

### Table Row Skeleton

```tsx
<div class="flex gap-4 items-center">
  <Skeleton width="40px" height="40px" rounded />
  <Skeleton variant="text" width="200px" />
  <Skeleton variant="text" width="100px" />
  <Skeleton variant="text" width="80px" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | - | Width (CSS value) |
| `height` | `string` | - | Height (CSS value) |
| `variant` | `'text' \| 'rectangular' \| 'circular'` | `'rectangular'` | Shape variant |
| `rounded` | `boolean` | `false` | Apply rounded corners |
| `class` | `string` | - | Additional CSS classes |
