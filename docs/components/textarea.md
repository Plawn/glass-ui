# Textarea

Multiline text input with label and error states.

## Import

```tsx
import { Textarea } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [value, setValue] = createSignal('');

<Textarea
  value={value()}
  onInput={setValue}
  placeholder="Enter description..."
/>
```

### With Label

```tsx
<Textarea
  label="Description"
  value={description()}
  onInput={setDescription}
  placeholder="Enter a detailed description..."
/>
```

### Custom Rows

```tsx
<Textarea
  label="Bio"
  value={bio()}
  onInput={setBio}
  rows={5}
/>
```

### With Error

```tsx
<Textarea
  label="Message"
  value={message()}
  onInput={setMessage}
  error={!message() ? 'Message is required' : undefined}
/>
```

### Sizes

```tsx
<Textarea size="sm" label="Small" {...props} />
<Textarea size="md" label="Medium" {...props} />
<Textarea size="lg" label="Large" {...props} />
```

### Disabled

```tsx
<Textarea
  label="Notes"
  value="Cannot edit"
  disabled
/>
```

### Read-only

```tsx
<Textarea
  label="Terms"
  value={terms()}
  readonly
  rows={10}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Current value |
| `onInput` | `(value: string) => void` | required | Value change callback |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `rows` | `number` | `3` | Number of visible rows |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Textarea size |
| `error` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `readonly` | `boolean` | `false` | Make read-only |
| `required` | `boolean` | `false` | Mark as required |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute |
| `class` | `string` | - | Additional CSS classes |
