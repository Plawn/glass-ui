# Avatar

User avatars with image or initials fallback.

## Import

```tsx
import { Avatar } from 'glass-ui-solid';
```

## Usage

### With Image

```tsx
<Avatar
  src="https://example.com/avatar.jpg"
  name="John Doe"
/>
```

### Initials Fallback

```tsx
<Avatar name="John Doe" />
// Displays "JD"
```

### Sizes

```tsx
<Avatar name="John Doe" size="sm" />
<Avatar name="John Doe" size="md" />
<Avatar name="John Doe" size="lg" />
<Avatar name="John Doe" size="xl" />
```

### Custom Fallback Color

```tsx
<Avatar
  name="Jane Smith"
  fallbackColor="#7c3aed"
/>
```

### In Lists

```tsx
<div class="flex -space-x-2">
  <Avatar name="User 1" size="sm" />
  <Avatar name="User 2" size="sm" />
  <Avatar name="User 3" size="sm" />
</div>
```

### With Status Badge

```tsx
<div class="relative">
  <Avatar name="John Doe" size="lg" />
  <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
</div>
```

### In User Cards

```tsx
<Card>
  <div class="flex items-center gap-3">
    <Avatar
      src={user.avatar}
      name={user.name}
      size="lg"
    />
    <div>
      <div class="font-medium">{user.name}</div>
      <div class="text-sm text-surface-500">{user.email}</div>
    </div>
  </div>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Name for generating initials |
| `src` | `string` | - | Image source URL |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `fallbackColor` | `string` | - | Custom background color for initials |
| `alt` | `string` | - | Alt text for the image |
| `class` | `string` | - | Additional CSS classes |

## Size Reference

| Size | Dimensions |
|------|------------|
| `sm` | 32x32px |
| `md` | 40x40px |
| `lg` | 48x48px |
| `xl` | 64x64px |
