# Button

Buttons with multiple variants, sizes, and states including loading.

## Import

```tsx
import { Button, Spinner } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>
```

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With Icons

```tsx
<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowIcon />}>Continue</Button>
<Button leftIcon={<SaveIcon />} rightIcon={<CheckIcon />}>
  Save Changes
</Button>
```

### Loading State

```tsx
const [loading, setLoading] = createSignal(false);

<Button
  loading={loading()}
  onClick={() => {
    setLoading(true);
    // async operation...
  }}
>
  {loading() ? 'Saving...' : 'Save'}
</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

### Disabled

```tsx
<Button disabled>Cannot Click</Button>
```

### Form Submit

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit Form</Button>
</form>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Button content |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger'` | `'primary'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `onClick` | `() => void` | - | Click handler |
| `disabled` | `boolean` | `false` | Disable the button |
| `loading` | `boolean` | `false` | Show loading spinner |
| `fullWidth` | `boolean` | `false` | Take full width of container |
| `leftIcon` | `JSX.Element` | - | Icon on the left |
| `rightIcon` | `JSX.Element` | - | Icon on the right |
| `class` | `string` | - | Additional CSS classes |
| `style` | `JSX.CSSProperties` | - | Inline styles |

## Spinner

Standalone spinner component used by Button internally.

```tsx
import { Spinner } from 'glass-ui-solid';

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### Spinner Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `class` | `string` | - | Additional CSS classes |
