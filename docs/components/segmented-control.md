# SegmentedControl

Toggle between exclusive options.

## Import

```tsx
import { SegmentedControl } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [view, setView] = createSignal('list');

<SegmentedControl
  value={view()}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'table', label: 'Table' },
  ]}
/>
```

### With Icons

```tsx
<SegmentedControl
  value={view()}
  onChange={setView}
  options={[
    { value: 'list', label: <ListIcon class="w-4 h-4" /> },
    { value: 'grid', label: <GridIcon class="w-4 h-4" /> },
  ]}
/>
```

### Sizes

```tsx
<SegmentedControl size="sm" options={options} value={value()} onChange={setValue} />
<SegmentedControl size="md" options={options} value={value()} onChange={setValue} />
```

### Disabled Options

```tsx
<SegmentedControl
  value={plan()}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
/>
```

### With Numbers

```tsx
const [count, setCount] = createSignal(10);

<SegmentedControl<number>
  value={count()}
  onChange={setCount}
  options={[
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ]}
/>
```

### View Toggle

```tsx
function DataViewer() {
  const [view, setView] = createSignal<'table' | 'json'>('table');

  return (
    <div>
      <div class="flex justify-end mb-4">
        <SegmentedControl
          value={view()}
          onChange={setView}
          options={[
            { value: 'table', label: 'Table' },
            { value: 'json', label: 'JSON' },
          ]}
        />
      </div>
      <Show when={view() === 'table'} fallback={<JsonViewer data={data} />}>
        <Table data={data} columns={columns} />
      </Show>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SegmentedControlOption<T>[]` | required | Available options |
| `value` | `T` | required | Current value |
| `onChange` | `(value: T) => void` | required | Value change callback |
| `size` | `'sm' \| 'md'` | `'md'` | Control size |
| `aria-label` | `string` | - | Accessible label |
| `class` | `string` | - | Additional CSS classes |

### SegmentedControlOption

| Prop | Type | Description |
|------|------|-------------|
| `value` | `T` | Option value |
| `label` | `string \| JSX.Element` | Display label |
| `disabled` | `boolean` | Disable this option |

## Accessibility

- Uses `role="radiogroup"` and `role="radio"`
- Keyboard navigation with arrow keys
- Focus management
