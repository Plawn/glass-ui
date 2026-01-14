# Chip

Compact elements for tags, filters, and selections.

## Import

```tsx
import { Chip } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Chip>Label</Chip>
```

### Variants

```tsx
<Chip variant="filled">Filled</Chip>
<Chip variant="outlined">Outlined</Chip>
<Chip variant="soft">Soft</Chip>
```

### Colors

```tsx
<Chip color="default">Default</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="error">Error</Chip>
```

### Sizes

```tsx
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

### Removable

```tsx
const [tags, setTags] = createSignal(['React', 'Solid', 'Vue']);

<For each={tags()}>
  {(tag) => (
    <Chip onRemove={() => setTags(tags().filter((t) => t !== tag))}>
      {tag}
    </Chip>
  )}
</For>
```

### Disabled

```tsx
<Chip disabled>Disabled</Chip>
```

### As Filter Tags

```tsx
function FilterTags() {
  const [filters, setFilters] = createSignal([
    { id: '1', label: 'Status: Active' },
    { id: '2', label: 'Type: User' },
  ]);

  const removeFilter = (id: string) => {
    setFilters(filters().filter((f) => f.id !== id));
  };

  return (
    <div class="flex flex-wrap gap-2">
      <For each={filters()}>
        {(filter) => (
          <Chip
            variant="outlined"
            size="sm"
            onRemove={() => removeFilter(filter.id)}
          >
            {filter.label}
          </Chip>
        )}
      </For>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Chip content |
| `variant` | `'filled' \| 'outlined' \| 'soft'` | `'filled'` | Visual variant |
| `color` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color theme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Chip size |
| `onRemove` | `() => void` | - | Show remove button and handle click |
| `disabled` | `boolean` | `false` | Disable the chip |
| `class` | `string` | - | Additional CSS classes |
