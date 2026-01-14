# Tooltip

Hover tooltips for additional context.

## Import

```tsx
import { Tooltip } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Tooltip content="This is a helpful tip">
  <Button>Hover me</Button>
</Tooltip>
```

### Positions

```tsx
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Left tooltip" position="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>
```

### With Delay

```tsx
<Tooltip content="Appears after 500ms" delay={500}>
  <Button>Delayed tooltip</Button>
</Tooltip>
```

### With JSX Content

```tsx
<Tooltip
  content={
    <div class="flex items-center gap-2">
      <InfoIcon class="w-4 h-4" />
      <span>Rich content tooltip</span>
    </div>
  }
>
  <Button>Rich tooltip</Button>
</Tooltip>
```

### On Icons

```tsx
<Tooltip content="Edit this item">
  <button class="p-2 hover:bg-surface-100 rounded">
    <EditIcon class="w-5 h-5" />
  </button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| JSX.Element` | required | Tooltip content |
| `children` | `JSX.Element` | required | Trigger element |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger |
| `delay` | `number` | `0` | Delay before showing (ms) |
| `class` | `string` | - | Additional CSS classes |

## Accessibility

- Uses `role="tooltip"`
- Connected via `aria-describedby`
- Shows on focus for keyboard users
