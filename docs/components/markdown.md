# Markdown

Render markdown content with sanitization.

## Import

```tsx
import { Markdown } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Markdown content="# Hello World\n\nThis is **bold** and *italic* text." />
```

### From Variable

```tsx
const markdown = `
# Documentation

This is a paragraph with **bold** and *italic* text.

## Features

- Feature 1
- Feature 2
- Feature 3

## Code Example

\`\`\`javascript
const greeting = "Hello!";
console.log(greeting);
\`\`\`
`;

<Markdown content={markdown} />
```

### API Documentation

```tsx
function ApiDocs(props: { endpoint: Endpoint }) {
  return (
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">{props.endpoint.name}</h2>
      <Markdown content={props.endpoint.description} />
    </div>
  );
}
```

### In Cards

```tsx
<Card>
  <CardHeader>
    <h3>Release Notes</h3>
  </CardHeader>
  <CardContent>
    <Markdown content={releaseNotes} />
  </CardContent>
</Card>
```

### With Dynamic Content

```tsx
function ChatMessage(props: { message: string }) {
  return (
    <div class="p-4 rounded-lg bg-surface-100">
      <Markdown content={props.message} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| undefined` | required | Markdown content |
| `class` | `string` | - | Additional CSS classes |

## Security

- Content is sanitized using DOMPurify
- Safe from XSS attacks
- Unsafe HTML is stripped

## Supported Syntax

Standard markdown syntax:
- Headers (#, ##, ###)
- Bold (**text**)
- Italic (*text*)
- Links [text](url)
- Images ![alt](url)
- Code blocks (```)
- Inline code (`code`)
- Lists (-, *, 1.)
- Blockquotes (>)
- Horizontal rules (---)
- Tables
