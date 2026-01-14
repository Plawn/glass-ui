# Tabs

Tab navigation with multiple variants and orientations.

## Import

```tsx
import { Tabs } from 'glass-ui-solid';
import type { TabItem } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Tabs
  items={[
    { id: 'tab1', label: 'Overview', content: <Overview /> },
    { id: 'tab2', label: 'Details', content: <Details /> },
    { id: 'tab3', label: 'Settings', content: <Settings /> },
  ]}
/>
```

### Variants

```tsx
// Pills (default)
<Tabs variant="pills" items={items} />

// Underline
<Tabs variant="underline" items={items} />

// Enclosed (bordered content area)
<Tabs variant="enclosed" items={items} />
```

### Sizes

```tsx
<Tabs size="sm" items={items} />
<Tabs size="md" items={items} />
<Tabs size="lg" items={items} />
```

### Full Width

```tsx
<Tabs fullWidth items={items} />
```

### Vertical Orientation

```tsx
<Tabs orientation="vertical" items={items} />
```

### With Icons

```tsx
<Tabs
  items={[
    {
      id: 'inbox',
      label: 'Inbox',
      icon: <InboxIcon />,
      content: <InboxContent />,
    },
    {
      id: 'sent',
      label: 'Sent',
      icon: <SendIcon />,
      content: <SentContent />,
    },
  ]}
/>
```

### With Badges

```tsx
<Tabs
  items={[
    { id: 'all', label: 'All', content: <All /> },
    { id: 'unread', label: 'Unread', badge: 5, content: <Unread /> },
    { id: 'flagged', label: 'Flagged', badge: 2, content: <Flagged /> },
  ]}
/>
```

### Disabled Tabs

```tsx
<Tabs
  items={[
    { id: 'tab1', label: 'Active', content: <p>Active tab</p> },
    { id: 'tab2', label: 'Disabled', disabled: true, content: <p>Hidden</p> },
    { id: 'tab3', label: 'Also Active', content: <p>Another tab</p> },
  ]}
/>
```

### Controlled Mode

```tsx
const [activeTab, setActiveTab] = createSignal('tab1');

<Tabs
  activeTab={activeTab()}
  onTabChange={setActiveTab}
  items={items}
/>

// External controls
<div class="flex gap-2">
  <Button onClick={() => setActiveTab('tab1')}>Go to Tab 1</Button>
  <Button onClick={() => setActiveTab('tab2')}>Go to Tab 2</Button>
</div>
```

### Lazy Loading

```tsx
<Tabs
  lazy
  items={[
    { id: 'tab1', label: 'Tab 1', content: <ExpensiveComponent /> },
    { id: 'tab2', label: 'Tab 2', content: <AnotherExpensiveComponent /> },
  ]}
/>
```

### Keep Mounted

```tsx
<Tabs
  keepMounted
  items={items}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | required | Tab items |
| `defaultTab` | `string` | - | Initial active tab (uncontrolled) |
| `activeTab` | `string` | - | Active tab (controlled) |
| `onTabChange` | `(tabId: string) => void` | - | Tab change callback |
| `variant` | `'pills' \| 'underline' \| 'enclosed'` | `'pills'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab size |
| `fullWidth` | `boolean` | `false` | Stretch tabs to fill width |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab orientation |
| `lazy` | `boolean` | `false` | Only render active tab content |
| `keepMounted` | `boolean` | `false` | Keep inactive content mounted |
| `tabListClass` | `string` | - | Tab list container class |
| `contentClass` | `string` | - | Content panel class |
| `class` | `string` | - | Additional CSS classes |

## TabItem

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Tab label text |
| `content` | `JSX.Element` | Tab content |
| `icon` | `JSX.Element` | Icon before label |
| `badge` | `number \| string` | Badge count/text |
| `disabled` | `boolean` | Disable the tab |

## Best Practices

1. **Consistent content height**: Avoid jarring layout shifts
2. **Meaningful labels**: Keep tab labels short and descriptive
3. **Limit tab count**: 5-7 tabs maximum for usability
4. **Use lazy loading**: For tabs with heavy content
5. **Consider vertical**: For settings/navigation with many options
