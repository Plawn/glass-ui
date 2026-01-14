# Select

Dropdown select input with label and error states.

## Import

```tsx
import { Select } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [value, setValue] = createSignal('');

<Select value={value()} onChange={setValue}>
  <option value="">Select an option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</Select>
```

### With Label

```tsx
<Select
  label="Country"
  value={country()}
  onChange={setCountry}
>
  <option value="">Select a country...</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="fr">France</option>
</Select>
```

### With Error

```tsx
<Select
  label="Category"
  value={category()}
  onChange={setCategory}
  error={!category() ? 'Please select a category' : undefined}
>
  <option value="">Select...</option>
  <option value="tech">Technology</option>
  <option value="design">Design</option>
</Select>
```

### Sizes

```tsx
<Select size="sm" {...props}>...</Select>
<Select size="md" {...props}>...</Select>
<Select size="lg" {...props}>...</Select>
```

### Disabled

```tsx
<Select label="Plan" value="free" disabled>
  <option value="free">Free Plan</option>
  <option value="pro">Pro Plan</option>
</Select>
```

### Required

```tsx
<Select label="Priority" required {...props}>
  <option value="">Select priority...</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</Select>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Current selected value |
| `onChange` | `(value: string) => void` | required | Value change callback |
| `children` | `JSX.Element` | required | Option elements |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size |
| `error` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disable the select |
| `required` | `boolean` | `false` | Mark as required |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute |
| `class` | `string` | - | Additional CSS classes |

## Example with Option Groups

```tsx
<Select label="Car" value={car()} onChange={setCar}>
  <option value="">Select a car...</option>
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</Select>
```
