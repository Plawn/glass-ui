# Card

Container with glass effect and optional header/footer.

## Import

```tsx
import { Card } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Card>
  <p>Card content goes here.</p>
</Card>
```

### With Header and Footer

```tsx
<Card
  header={<h3 class="font-bold">Card Title</h3>}
  footer={
    <div class="flex justify-end">
      <Button size="sm">Action</Button>
    </div>
  }
>
  <p>Card body content.</p>
</Card>
```

### Variants

```tsx
// Default - subtle glass effect
<Card variant="default">
  Default card
</Card>

// Elevated - more prominent shadow
<Card variant="elevated">
  Elevated card
</Card>

// Outlined - border without glass fill
<Card variant="outlined">
  Outlined card
</Card>
```

### Custom Styling

```tsx
<Card class="p-6 max-w-md">
  <h2 class="text-xl font-bold mb-2">Custom Card</h2>
  <p class="text-surface-600">
    Use class prop to add padding and sizing.
  </p>
</Card>
```

### As a Clickable Card

```tsx
<Card
  class="cursor-pointer hover:shadow-lg transition-shadow"
  onClick={() => navigateTo('/details')}
>
  <h3>Clickable Card</h3>
  <p>Click to navigate</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Card body content |
| `header` | `JSX.Element` | - | Header content |
| `footer` | `JSX.Element` | - | Footer content |
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Visual variant |
| `class` | `string` | - | Additional CSS classes |
| `style` | `JSX.CSSProperties` | - | Inline styles |

## CSS Classes

The Card component uses these CSS classes:
- `.glass-card` - Base glass effect styling
- Variants modify background opacity and shadow

## Examples

### Profile Card

```tsx
<Card class="p-4 max-w-sm">
  <div class="flex items-center gap-4">
    <Avatar name="John Doe" size="lg" />
    <div>
      <h3 class="font-bold">John Doe</h3>
      <p class="text-sm text-surface-500">Software Engineer</p>
    </div>
  </div>
</Card>
```

### Stats Card

```tsx
<Card variant="elevated" class="p-6">
  <div class="text-sm text-surface-500">Total Users</div>
  <div class="text-3xl font-bold">12,345</div>
  <div class="text-sm text-success-500">+12% from last month</div>
</Card>
```
