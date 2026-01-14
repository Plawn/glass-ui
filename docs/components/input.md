# Input

Text input with label, placeholder, and error states.

## Import

```tsx
import { Input } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [value, setValue] = createSignal('');

<Input
  value={value()}
  onInput={setValue}
  placeholder="Enter text..."
/>
```

### With Label

```tsx
<Input
  label="Email"
  value={email()}
  onInput={setEmail}
  placeholder="you@example.com"
/>
```

### With Error

```tsx
<Input
  label="Username"
  value={username()}
  onInput={setUsername}
  error={!username() ? 'Username is required' : undefined}
/>
```

### Input Types

```tsx
<Input type="text" label="Name" {...props} />
<Input type="email" label="Email" {...props} />
<Input type="password" label="Password" {...props} />
<Input type="number" label="Age" {...props} />
<Input type="tel" label="Phone" {...props} />
<Input type="url" label="Website" {...props} />
<Input type="search" label="Search" {...props} />
```

### Sizes

```tsx
<Input size="sm" label="Small" {...props} />
<Input size="md" label="Medium" {...props} />
<Input size="lg" label="Large" {...props} />
```

### Required Field

```tsx
<Input
  label="Email"
  required
  value={email()}
  onInput={setEmail}
/>
```

### Disabled

```tsx
<Input
  label="Locked Field"
  value="Cannot edit"
  disabled
/>
```

### Read-only

```tsx
<Input
  label="Reference ID"
  value="REF-12345"
  readonly
/>
```

### With Keyboard Events

```tsx
<Input
  label="Search"
  value={search()}
  onInput={setSearch}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Current input value |
| `onInput` | `(value: string) => void` | required | Value change callback |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'url' \| 'tel' \| 'search'` | `'text'` | Input type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `error` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Make input read-only |
| `required` | `boolean` | `false` | Mark as required |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute |
| `autocomplete` | `string` | - | Autocomplete attribute |
| `onKeyDown` | `(e: KeyboardEvent) => void` | - | Keyboard event handler |
| `class` | `string` | - | Additional CSS classes |

## Form Example

```tsx
function ContactForm() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [errors, setErrors] = createSignal({});

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // validate and submit
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <Input
        label="Name"
        value={name()}
        onInput={setName}
        error={errors().name}
        required
      />
      <Input
        label="Email"
        type="email"
        value={email()}
        onInput={setEmail}
        error={errors().email}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```
