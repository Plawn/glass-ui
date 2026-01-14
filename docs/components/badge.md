# Badge

Status badges and labels with multiple variants.

## Import

```tsx
import { Badge } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Badge>Default</Badge>
```

### Variants (Status Colors)

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### HTTP Method Badges

```tsx
<Badge variant="get">GET</Badge>
<Badge variant="post">POST</Badge>
<Badge variant="put">PUT</Badge>
<Badge variant="patch">PATCH</Badge>
<Badge variant="delete">DELETE</Badge>
<Badge variant="head">HEAD</Badge>
<Badge variant="options">OPTIONS</Badge>
```

### In Tables

```tsx
<Table
  columns={[
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>
          {value}
        </Badge>
      ),
    },
  ]}
  data={data}
/>
```

### With Icons

```tsx
<Badge variant="success">
  <CheckIcon class="w-3 h-3 mr-1" />
  Verified
</Badge>
```

### As Notification Count

```tsx
<div class="relative">
  <BellIcon class="w-6 h-6" />
  <Badge
    variant="error"
    size="sm"
    class="absolute -top-1 -right-1"
  >
    3
  </Badge>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Badge content |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'get' \| 'post' \| 'put' \| 'patch' \| 'delete' \| 'head' \| 'options'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `class` | `string` | - | Additional CSS classes |
| `style` | `JSX.CSSProperties` | - | Inline styles |

## Color Reference

### Status Variants

| Variant | Background | Text |
|---------|------------|------|
| `default` | Gray | Gray |
| `success` | Green | Green |
| `warning` | Amber | Amber |
| `error` | Red | Red |
| `info` | Blue | Blue |

### HTTP Method Variants

| Variant | Color |
|---------|-------|
| `get` | Green |
| `post` | Blue |
| `put` | Amber |
| `patch` | Purple |
| `delete` | Red |
| `head` | Cyan |
| `options` | Gray |
