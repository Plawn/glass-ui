# Checkbox

Checkbox input with label.

## Import

```tsx
import { Checkbox } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [checked, setChecked] = createSignal(false);

<Checkbox
  checked={checked()}
  onChange={setChecked}
  label="Accept terms and conditions"
/>
```

### Without Label

```tsx
<Checkbox
  checked={checked()}
  onChange={setChecked}
/>
```

### Disabled

```tsx
<Checkbox
  checked={true}
  disabled
  label="Premium feature (upgrade required)"
/>
```

### Required

```tsx
<Checkbox
  checked={accepted()}
  onChange={setAccepted}
  label="I agree to the terms"
  required
/>
```

### In Forms

```tsx
function SettingsForm() {
  const [notifications, setNotifications] = createSignal(true);
  const [marketing, setMarketing] = createSignal(false);
  const [analytics, setAnalytics] = createSignal(true);

  return (
    <form class="space-y-4">
      <Checkbox
        checked={notifications()}
        onChange={setNotifications}
        label="Email notifications"
      />
      <Checkbox
        checked={marketing()}
        onChange={setMarketing}
        label="Marketing emails"
      />
      <Checkbox
        checked={analytics()}
        onChange={setAnalytics}
        label="Usage analytics"
      />
      <Button type="submit">Save Preferences</Button>
    </form>
  );
}
```

### With Error State

```tsx
<div>
  <Checkbox
    checked={accepted()}
    onChange={setAccepted}
    label="I accept the terms"
    required
  />
  <Show when={error()}>
    <p class="text-sm text-error-500 mt-1">{error()}</p>
  </Show>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | required | Whether checked |
| `onChange` | `(checked: boolean) => void` | - | Change callback |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disable the checkbox |
| `required` | `boolean` | `false` | Mark as required |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute |
| `error` | `string` | - | Error message |
| `class` | `string` | - | Additional CSS classes |

## Accessibility

- Uses native `<input type="checkbox">`
- Label is clickable
- Supports keyboard navigation (Space to toggle)
- Proper `aria-*` attributes when disabled
