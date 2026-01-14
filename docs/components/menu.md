# Menu

Dropdown menu triggered by a button.

## Import

```tsx
import { Menu } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Menu
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', onClick: () => console.log('Edit') },
    { label: 'Duplicate', onClick: () => console.log('Duplicate') },
    { divider: true },
    { label: 'Delete', onClick: () => console.log('Delete') },
  ]}
/>
```

### With Icons

```tsx
<Menu
  trigger={<Button variant="ghost" icon={<MoreIcon />} />}
  items={[
    { label: 'Edit', icon: <EditIcon class="w-4 h-4" />, onClick: handleEdit },
    { label: 'Copy', icon: <CopyIcon class="w-4 h-4" />, onClick: handleCopy },
    { divider: true },
    { label: 'Delete', icon: <TrashIcon class="w-4 h-4" />, onClick: handleDelete },
  ]}
/>
```

### Disabled Items

```tsx
<Menu
  trigger={<Button>Options</Button>}
  items={[
    { label: 'Available', onClick: handleClick },
    { label: 'Unavailable', disabled: true },
  ]}
/>
```

### Placement

```tsx
<Menu
  trigger={<Button>Bottom Start</Button>}
  items={items}
  placement="bottom-start"
/>
<Menu
  trigger={<Button>Bottom End</Button>}
  items={items}
  placement="bottom-end"
/>
<Menu
  trigger={<Button>Top Start</Button>}
  items={items}
  placement="top-start"
/>
<Menu
  trigger={<Button>Top End</Button>}
  items={items}
  placement="top-end"
/>
```

### In Table Row

```tsx
<Table
  columns={[
    { key: 'name', header: 'Name' },
    {
      key: 'actions',
      header: '',
      render: (_, row) => (
        <Menu
          trigger={<Button variant="ghost" size="sm" icon={<MoreIcon />} />}
          items={[
            { label: 'View', onClick: () => viewUser(row.id) },
            { label: 'Edit', onClick: () => editUser(row.id) },
            { divider: true },
            { label: 'Delete', onClick: () => deleteUser(row.id) },
          ]}
        />
      ),
    },
  ]}
  data={users}
/>
```

## Props

### Menu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `JSX.Element` | required | Trigger element |
| `items` | `MenuItem[]` | required | Menu items |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Menu placement |
| `class` | `string` | - | Additional CSS classes |

### MenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required* | Display label |
| `onClick` | `() => void` | - | Click handler |
| `icon` | `JSX.Element` | - | Optional icon |
| `disabled` | `boolean` | `false` | Disable the item |
| `divider` | `boolean` | `false` | Render as divider |

*Required unless `divider: true`
