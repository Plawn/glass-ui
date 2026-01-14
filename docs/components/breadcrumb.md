# Breadcrumb

Navigation breadcrumbs showing the current location.

## Import

```tsx
import { Breadcrumb } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ]}
/>
```

### With Click Handlers

```tsx
<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Settings', onClick: () => navigate('/settings') },
    { label: 'Profile' },
  ]}
/>
```

### With Icons

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon class="w-4 h-4" /> },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics' },
  ]}
/>
```

### Custom Separator

```tsx
<Breadcrumb
  items={items}
  separator={<ChevronRightIcon class="w-4 h-4 text-surface-400" />}
/>
```

### In Page Header

```tsx
<div class="space-y-2">
  <Breadcrumb
    items={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Users', href: '/dashboard/users' },
      { label: 'Edit User' },
    ]}
  />
  <h1 class="text-2xl font-semibold">Edit User</h1>
</div>
```

## Props

### Breadcrumb

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Breadcrumb items |
| `separator` | `JSX.Element` | `/` | Custom separator element |
| `class` | `string` | - | Additional CSS classes |

### BreadcrumbItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Display label |
| `href` | `string` | - | Link URL |
| `onClick` | `() => void` | - | Click handler |
| `icon` | `JSX.Element` | - | Optional icon |

## Behavior

- Last item is displayed as non-clickable text
- Previous items are rendered as links or buttons
- Icons appear before the label
