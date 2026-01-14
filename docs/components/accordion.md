# Accordion

Collapsible panels for organizing content.

## Import

```tsx
import { Accordion, AccordionPanel } from 'glass-ui-solid';
```

## Usage

### With Items Array

```tsx
const items = [
  {
    id: 'section1',
    title: 'Section 1',
    content: <p>Content for section 1</p>,
    defaultOpen: true,
  },
  {
    id: 'section2',
    title: 'Section 2',
    content: <p>Content for section 2</p>,
  },
  {
    id: 'section3',
    title: 'Section 3',
    content: <p>Content for section 3</p>,
  },
];

<Accordion items={items} />
```

### Multiple Open

```tsx
<Accordion items={items} multiple />
```

### Using AccordionPanel

```tsx
<div class="space-y-2">
  <AccordionPanel title="FAQ 1" defaultOpen>
    <p>Answer to FAQ 1</p>
  </AccordionPanel>
  <AccordionPanel title="FAQ 2">
    <p>Answer to FAQ 2</p>
  </AccordionPanel>
  <AccordionPanel title="FAQ 3">
    <p>Answer to FAQ 3</p>
  </AccordionPanel>
</div>
```

### With Custom Title

```tsx
<AccordionPanel
  title={
    <div class="flex items-center gap-2">
      <SettingsIcon class="w-4 h-4" />
      <span>Settings</span>
    </div>
  }
>
  <p>Settings content here</p>
</AccordionPanel>
```

## Props

### Accordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | required | Array of accordion items |
| `multiple` | `boolean` | `false` | Allow multiple panels open |
| `class` | `string` | - | Additional CSS classes |

### AccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique identifier |
| `title` | `string \| JSX.Element` | required | Panel title |
| `content` | `JSX.Element` | required | Panel content |
| `defaultOpen` | `boolean` | `false` | Open by default |

### AccordionPanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| JSX.Element` | required | Panel title |
| `children` | `JSX.Element` | required | Panel content |
| `defaultOpen` | `boolean` | `false` | Open by default |
| `class` | `string` | - | Additional CSS classes |
