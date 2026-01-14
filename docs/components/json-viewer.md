# JsonViewer

Interactive collapsible JSON viewer.

## Import

```tsx
import { JsonViewer } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const data = {
  name: "John Doe",
  age: 30,
  address: {
    city: "New York",
    country: "USA"
  }
};

<JsonViewer data={data} />
```

### Custom Expand Depth

```tsx
<JsonViewer data={data} initialExpandDepth={1} />
<JsonViewer data={data} initialExpandDepth={3} />
<JsonViewer data={data} initialExpandDepth={0} /> // All collapsed
```

### Custom Max Height

```tsx
<JsonViewer data={largeData} maxHeight="400px" />
```

### Custom Labels

```tsx
<JsonViewer
  data={data}
  copyLabel="Copier"
  copiedLabel="Copié!"
  expandAllLabel="Tout ouvrir"
  collapseAllLabel="Tout fermer"
/>
```

### API Response Viewer

```tsx
function ApiDebugger() {
  const [response] = createResource(() => fetchApi());

  return (
    <div class="space-y-4">
      <h3 class="font-medium">API Response</h3>
      <Show when={response()} fallback={<Skeleton height="200px" />}>
        <JsonViewer
          data={response()}
          initialExpandDepth={2}
          maxHeight="500px"
        />
      </Show>
    </div>
  );
}
```

### With Different Data Types

```tsx
const complexData = {
  string: "Hello",
  number: 42,
  boolean: true,
  null: null,
  array: [1, 2, 3],
  nested: {
    deep: {
      value: "found"
    }
  }
};

<JsonViewer data={complexData} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `unknown` | required | JSON data to display |
| `maxHeight` | `string` | `'31.25rem'` | Maximum height |
| `initialExpandDepth` | `number` | `2` | Initial expand depth |
| `copyLabel` | `string` | `'Copy'` | Copy button label |
| `copiedLabel` | `string` | `'Copied'` | Copied state label |
| `expandAllLabel` | `string` | `'Expand all'` | Expand all tooltip |
| `collapseAllLabel` | `string` | `'Collapse all'` | Collapse all tooltip |
| `class` | `string` | - | Additional CSS classes |

## Features

- Collapsible objects and arrays
- Syntax coloring for different types
- Copy to clipboard
- Expand/collapse all buttons
- Shows item counts for arrays/objects
