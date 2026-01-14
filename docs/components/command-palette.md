# CommandPalette

Keyboard-driven command palette (Cmd+K).

## Import

```tsx
import { CommandPalette } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const commands = [
  { id: 'new-file', label: 'New File', group: 'File' },
  { id: 'open-file', label: 'Open File', group: 'File' },
  { id: 'save', label: 'Save', group: 'File' },
  { id: 'settings', label: 'Settings', group: 'Preferences' },
  { id: 'theme', label: 'Toggle Theme', group: 'Preferences' },
];

<CommandPalette
  items={commands}
  onSelect={(item) => handleCommand(item.id)}
/>
```

### With Icons and Descriptions

```tsx
const commands = [
  {
    id: 'new-file',
    label: 'New File',
    description: 'Create a new file',
    icon: <FileIcon class="w-4 h-4" />,
    group: 'File',
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Search in files',
    icon: <SearchIcon class="w-4 h-4" />,
    group: 'Edit',
    keywords: ['find', 'lookup'],
  },
];

<CommandPalette
  items={commands}
  onSelect={(item) => executeCommand(item.id)}
/>
```

### Recent Items

```tsx
const [recentIds, setRecentIds] = createSignal(['settings', 'new-file']);

<CommandPalette
  items={commands}
  recentIds={recentIds()}
  onSelect={(item) => {
    executeCommand(item.id);
    setRecentIds([item.id, ...recentIds().filter(id => id !== item.id)].slice(0, 5));
  }}
/>
```

### Custom Shortcut Key

```tsx
<CommandPalette
  items={commands}
  onSelect={handleSelect}
  shortcutKey="p" // Cmd+P instead of Cmd+K
/>
```

### Disable Shortcut

```tsx
let paletteRef: CommandPaletteHandle;

<Button onClick={() => paletteRef.open()}>
  Open Command Palette
</Button>

<CommandPalette
  ref={(handle) => (paletteRef = handle)}
  items={commands}
  onSelect={handleSelect}
  disableShortcut
/>
```

### Controlled Mode

```tsx
const [open, setOpen] = createSignal(false);

<CommandPalette
  items={commands}
  onSelect={handleSelect}
  open={open()}
  onOpenChange={setOpen}
/>
```

### Custom Search

```tsx
<CommandPalette
  items={commands}
  onSelect={handleSelect}
  searchFn={(query, items) => {
    return items
      .filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
      .map(item => ({ item, score: 0 }));
  }}
/>
```

### With Footer

```tsx
<CommandPalette
  items={commands}
  onSelect={handleSelect}
  footer={
    <div class="flex justify-between text-xs text-surface-500">
      <span>↑↓ Navigate</span>
      <span>↵ Select</span>
      <span>Esc Close</span>
    </div>
  }
/>
```

### Disabled Items

```tsx
const commands = [
  { id: 'available', label: 'Available Action' },
  { id: 'premium', label: 'Premium Feature', disabled: true },
];

<CommandPalette items={commands} onSelect={handleSelect} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CommandPaletteItem[]` | required | Available commands |
| `onSelect` | `(item) => void` | required | Selection callback |
| `searchFn` | `(query, items) => SearchResult[]` | - | Custom search function |
| `shortcutKey` | `string` | `'k'` | Keyboard shortcut key |
| `disableShortcut` | `boolean` | `false` | Disable keyboard shortcut |
| `placeholder` | `string` | `'Search...'` | Input placeholder |
| `emptyText` | `string` | `'No results'` | No results message |
| `recentIds` | `string[]` | - | Recent item IDs |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open) => void` | - | Open state callback |
| `footer` | `JSX.Element` | - | Footer content |
| `ref` | `(handle) => void` | - | Imperative handle |
| `class` | `string` | - | Additional CSS classes |

### CommandPaletteItem

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display label |
| `description` | `string` | Secondary text |
| `group` | `string` | Group name |
| `icon` | `JSX.Element` | Optional icon |
| `keywords` | `string[]` | Search keywords |
| `disabled` | `boolean` | Disable item |
| `data` | `T` | Custom data |

### Handle Methods

| Method | Description |
|--------|-------------|
| `open()` | Open the palette |
| `close()` | Close the palette |
| `toggle()` | Toggle open state |
| `isOpen()` | Check if open |
