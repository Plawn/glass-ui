# ContextMenu

Right-click context menu with support for contextual data in lists.

## Import

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  createContextMenu
} from 'glass-ui-solid';
```

## Usage

### Simple Context Menu

```tsx
<ContextMenu>
  <ContextMenuTrigger>
    <div class="p-8 border-2 border-dashed rounded-lg">
      Right-click this area
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={() => console.log('New File')}>
      New File
    </ContextMenuItem>
    <ContextMenuItem onSelect={() => console.log('New Folder')}>
      New Folder
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem onSelect={() => console.log('Paste')}>
      Paste
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### With Data (For Lists)

Use `createContextMenu<T>()` for typed context menus where each trigger passes its own data:

```tsx
interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

function FileList() {
  const menu = createContextMenu<FileItem>();
  const [files] = createSignal<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder' },
    { id: '2', name: 'report.pdf', type: 'file' },
    { id: '3', name: 'photo.jpg', type: 'file' },
  ]);

  return (
    <ContextMenu {...menu.props}>
      {/* Multiple triggers sharing the same menu */}
      <For each={files()}>
        {(file) => (
          <ContextMenuTrigger data={file}>
            <div class="flex items-center gap-2 p-2 hover:bg-surface-100 rounded">
              <span>{file.type === 'folder' ? '📁' : '📄'}</span>
              <span>{file.name}</span>
            </div>
          </ContextMenuTrigger>
        )}
      </For>

      {/* Menu content - menu.data() contains the clicked item */}
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => openFile(menu.data()!.id)}>
          Open "{menu.data()?.name}"
        </ContextMenuItem>
        <ContextMenuItem
          shortcut="Cmd+C"
          onSelect={() => copyFile(menu.data()!.id)}
        >
          Copy
        </ContextMenuItem>
        <ContextMenuItem
          shortcut="Cmd+X"
          onSelect={() => cutFile(menu.data()!.id)}
        >
          Cut
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => renameFile(menu.data()!.id)}>
          Rename
        </ContextMenuItem>
        <ContextMenuItem
          destructive
          shortcut="Cmd+Del"
          onSelect={() => deleteFile(menu.data()!.id)}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### With Icons

```tsx
<ContextMenuContent>
  <ContextMenuItem
    icon={<CopyIcon />}
    shortcut="Cmd+C"
    onSelect={handleCopy}
  >
    Copy
  </ContextMenuItem>
  <ContextMenuItem
    icon={<PasteIcon />}
    shortcut="Cmd+V"
    onSelect={handlePaste}
  >
    Paste
  </ContextMenuItem>
</ContextMenuContent>
```

### Disabled Items

```tsx
<ContextMenuContent>
  <ContextMenuItem onSelect={handleCut}>Cut</ContextMenuItem>
  <ContextMenuItem onSelect={handleCopy}>Copy</ContextMenuItem>
  <ContextMenuItem disabled>
    Paste (clipboard empty)
  </ContextMenuItem>
</ContextMenuContent>
```

### Destructive Actions

```tsx
<ContextMenuContent>
  <ContextMenuItem onSelect={handleEdit}>Edit</ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem destructive onSelect={handleDelete}>
    Delete
  </ContextMenuItem>
</ContextMenuContent>
```

### Programmatic Control

```tsx
const menu = createContextMenu<Item>();

// Check if menu is open
if (menu.isOpen()) {
  // ...
}

// Get current data
const currentItem = menu.data();

// Close programmatically
menu.close();

// Get position
const { x, y } = menu.position();
```

## Components

### ContextMenu

Wrapper component that provides context to children.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Child components |
| `onOpenChange` | `(open: boolean, data: T \| null) => void` | - | Open state change callback |
| `class` | `string` | - | Additional CSS classes |

### ContextMenuTrigger

Captures right-click events on its children.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Trigger content |
| `data` | `T` | - | Data to pass to menu |
| `disabled` | `boolean` | `false` | Disable the trigger |
| `class` | `string` | - | Additional CSS classes |

### ContextMenuContent

The menu panel that appears on right-click.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Menu items |
| `class` | `string` | - | Additional CSS classes |

### ContextMenuItem

Individual menu item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | required | Item label |
| `onSelect` | `() => void` | - | Selection callback |
| `disabled` | `boolean` | `false` | Disable the item |
| `icon` | `JSX.Element` | - | Icon on the left |
| `shortcut` | `string` | - | Keyboard shortcut display |
| `destructive` | `boolean` | `false` | Red styling for dangerous actions |
| `class` | `string` | - | Additional CSS classes |

### ContextMenuSeparator

Visual separator between item groups.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

## createContextMenu Hook

Creates a typed context menu with shared state.

```tsx
const menu = createContextMenu<T>();
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `props` | `ContextMenuProps<T>` | Props to spread on ContextMenu |
| `data` | `Accessor<T \| null>` | Current item data |
| `position` | `Accessor<{x, y}>` | Menu position |
| `isOpen` | `Accessor<boolean>` | Open state |
| `close` | `() => void` | Close the menu |

## Behavior

- **Positioning**: Appears at cursor position with viewport boundary detection
- **Close triggers**: Click outside, Escape key, item selection
- **Native menu**: Prevents browser's default context menu
- **Portal**: Renders outside component tree for proper stacking

## Accessibility

- `role="menu"` on content
- `role="menuitem"` on items
- `role="separator"` on separators
- `aria-disabled` for disabled items
- Keyboard navigation (Arrow keys, Enter, Escape)
