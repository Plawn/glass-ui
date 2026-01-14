# Dialog

Confirmation dialog with predefined action buttons.

## Import

```tsx
import { Dialog } from 'glass-ui-solid';
```

## Usage

### Basic Confirmation

```tsx
const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Delete Item</Button>

<Dialog
  open={open()}
  onOpenChange={setOpen}
  title="Delete Item"
  description="Are you sure you want to delete this item? This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={() => {
    deleteItem();
    setOpen(false);
  }}
/>
```

### Danger Variant

```tsx
<Dialog
  open={open()}
  onOpenChange={setOpen}
  variant="danger"
  title="Delete Account"
  description="This will permanently delete your account and all associated data."
  confirmLabel="Delete Account"
  cancelLabel="Keep Account"
  onConfirm={handleDeleteAccount}
/>
```

### With Custom Content

```tsx
<Dialog
  open={open()}
  onOpenChange={setOpen}
  title="Export Data"
  description="Choose your export format:"
  confirmLabel="Export"
  onConfirm={handleExport}
>
  <div class="space-y-2 mt-4">
    <label class="flex items-center gap-2">
      <input type="radio" name="format" value="csv" />
      CSV
    </label>
    <label class="flex items-center gap-2">
      <input type="radio" name="format" value="json" />
      JSON
    </label>
  </div>
</Dialog>
```

### Loading State

```tsx
const [loading, setLoading] = createSignal(false);

<Dialog
  open={open()}
  onOpenChange={setOpen}
  title="Save Changes"
  description="Do you want to save your changes?"
  confirmLabel={loading() ? 'Saving...' : 'Save'}
  confirmLoading={loading()}
  onConfirm={async () => {
    setLoading(true);
    await saveChanges();
    setLoading(false);
    setOpen(false);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Whether the dialog is open |
| `onOpenChange` | `(open: boolean) => void` | required | Callback when open state changes |
| `title` | `string` | required | Dialog title |
| `description` | `string` | - | Description text below title |
| `children` | `JSX.Element` | - | Additional content |
| `variant` | `'default' \| 'danger'` | `'default'` | Visual variant |
| `confirmLabel` | `string` | `'Confirm'` | Confirm button text |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button text |
| `onConfirm` | `() => void` | - | Confirm button callback |
| `onCancel` | `() => void` | - | Cancel button callback |
| `confirmLoading` | `boolean` | `false` | Show loading state on confirm |
| `class` | `string` | - | Additional CSS classes |

## Variants

### Default
- Confirm button: Primary style
- For general confirmations

### Danger
- Confirm button: Red/danger style
- For destructive actions (delete, remove, etc.)

## Accessibility

The Dialog component includes:
- `role="alertdialog"` for confirmation dialogs
- `aria-labelledby` pointing to title
- `aria-describedby` pointing to description
- Focus management on open/close
