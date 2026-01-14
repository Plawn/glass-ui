# Dropdown

Generic dropdown container for custom content.

## Import

```tsx
import { Dropdown } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Dropdown
  trigger={<Button>Open Dropdown</Button>}
>
  <div class="p-4">
    <p>Custom dropdown content</p>
  </div>
</Dropdown>
```

### Controlled

```tsx
const [open, setOpen] = createSignal(false);

<Dropdown
  trigger={<Button>Toggle</Button>}
  open={open()}
  onOpenChange={setOpen}
>
  <div class="p-4">
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Dropdown>
```

### Placement

```tsx
<Dropdown trigger={trigger} placement="bottom">
  Bottom centered
</Dropdown>
<Dropdown trigger={trigger} placement="bottom-start">
  Bottom left aligned
</Dropdown>
<Dropdown trigger={trigger} placement="bottom-end">
  Bottom right aligned
</Dropdown>
<Dropdown trigger={trigger} placement="top">
  Top centered
</Dropdown>
```

### Custom Content Class

```tsx
<Dropdown
  trigger={<Button>Settings</Button>}
  contentClass="w-80"
>
  <div class="p-4 space-y-4">
    <h3 class="font-semibold">Quick Settings</h3>
    <Checkbox label="Dark mode" checked={dark()} onChange={setDark} />
    <Checkbox label="Notifications" checked={notifs()} onChange={setNotifs} />
  </div>
</Dropdown>
```

### As User Menu

```tsx
<Dropdown
  trigger={
    <button class="flex items-center gap-2">
      <Avatar name={user.name} size="sm" />
      <span>{user.name}</span>
    </button>
  }
>
  <div class="py-2">
    <a href="/profile" class="block px-4 py-2 hover:bg-surface-100">
      Profile
    </a>
    <a href="/settings" class="block px-4 py-2 hover:bg-surface-100">
      Settings
    </a>
    <div class="border-t my-2" />
    <button onClick={logout} class="w-full text-left px-4 py-2 hover:bg-surface-100">
      Sign out
    </button>
  </div>
</Dropdown>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `JSX.Element` | required | Trigger element |
| `children` | `JSX.Element` | required | Dropdown content |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback |
| `placement` | `'bottom' \| 'bottom-start' \| 'bottom-end' \| 'top' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Dropdown placement |
| `contentClass` | `string` | - | CSS classes for content container |
| `class` | `string` | - | Additional CSS classes |

## Behavior

- Closes on click outside
- Closes on Escape key
- Positions with viewport boundary detection
