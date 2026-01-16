import { Markdown, Card } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, FeatureList } from '../../components/demo';

const basicMarkdown = `# Hello World

This is **bold** and *italic* text.

Here's a [link to SolidJS](https://solidjs.com).`;

const fullFeaturedMarkdown = `# Documentation

This is a paragraph with **bold** and *italic* text.

## Features

- Feature 1: Automatic sanitization
- Feature 2: Full markdown support
- Feature 3: Dark mode compatible

## Code Example

\`\`\`javascript
const greeting = "Hello!";
console.log(greeting);
\`\`\`

Inline code looks like \`this\`.

## Blockquote

> This is a blockquote. It's useful for highlighting important information or quotes.

## Table

| Feature | Supported |
|---------|-----------|
| Headers | Yes |
| Lists | Yes |
| Code | Yes |
| Tables | Yes |

---

*End of documentation*`;

const chatMessage = `Thanks for your question! Here's how you can solve it:

1. First, install the package:
   \`\`\`bash
   npm install glass-ui-solid
   \`\`\`

2. Then import the component:
   \`\`\`tsx
   import { Button } from 'glass-ui-solid';
   \`\`\`

3. Use it in your app:
   \`\`\`tsx
   <Button variant="primary">Click me</Button>
   \`\`\`

Let me know if you have any other questions!`;

const releaseNotes = `## Version 2.0.0

### Breaking Changes

- **Button**: Removed \`type\` prop, use \`variant\` instead
- **Modal**: \`isOpen\` renamed to \`open\`

### New Features

- Added \`JsonViewer\` component
- Added \`Markdown\` component
- New \`glass\` variant for all components

### Bug Fixes

- Fixed focus trap in Modal
- Fixed animation glitch in Drawer`;

export default function MarkdownPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Markdown"
        description="Render markdown content with automatic sanitization for safe display of user-generated content."
      />

      <DemoSection title="Import" code="import { Markdown } from 'glass-ui-solid';" />

      <DemoSection
        title="Basic Usage"
        code={`<Markdown content="# Hello World\\n\\nThis is **bold** and *italic* text." />`}
      >
        <Markdown content={basicMarkdown} />
      </DemoSection>

      <DemoSection
        title="Full Featured Example"
        description="Markdown supports headers, lists, code blocks, tables, blockquotes, and more."
        code={`const markdown = \`
# Documentation

This is a paragraph with **bold** and *italic* text.

## Features

- Feature 1: Automatic sanitization
- Feature 2: Full markdown support
- Feature 3: Dark mode compatible

## Code Example

\\\`\\\`\\\`javascript
const greeting = "Hello!";
console.log(greeting);
\\\`\\\`\\\`
\`;

<Markdown content={markdown} />`}
      >
        <Markdown content={fullFeaturedMarkdown} />
      </DemoSection>

      <DemoSection
        title="Chat Messages"
        description="Perfect for rendering AI chat responses or user messages with formatting."
        code={`function ChatMessage(props: { message: string }) {
  return (
    <div class="p-4 rounded-lg bg-surface-100">
      <Markdown content={props.message} />
    </div>
  );
}`}
        cardClass="p-6 bg-surface-50 dark:bg-surface-800/50"
      >
        <Markdown content={chatMessage} />
      </DemoSection>

      <DemoSection
        title="Release Notes"
        description="Great for displaying changelogs and release notes."
      >
        <Markdown content={releaseNotes} />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'content', type: 'string | undefined', default: 'required', description: 'Markdown content to render' },
            { name: 'class', type: 'string', default: '-', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Security" card={false}>
        <FeatureList
          items={[
            'Content is sanitized using DOMPurify',
            'Safe from XSS attacks',
            'Unsafe HTML is automatically stripped',
          ]}
        />
      </DemoSection>

      <DemoSection title="Supported Syntax" card={false}>
        <div class="grid gap-4 md:grid-cols-2">
          <Card class="p-4">
            <h3 class="font-semibold text-surface-900 dark:text-white mb-2">Text Formatting</h3>
            <ul class="list-disc list-inside space-y-1 text-sm text-surface-600 dark:text-surface-400">
              <li>Headers (#, ##, ###)</li>
              <li>Bold (**text**)</li>
              <li>Italic (*text*)</li>
              <li>Strikethrough (~~text~~)</li>
            </ul>
          </Card>
          <Card class="p-4">
            <h3 class="font-semibold text-surface-900 dark:text-white mb-2">Links & Media</h3>
            <ul class="list-disc list-inside space-y-1 text-sm text-surface-600 dark:text-surface-400">
              <li>Links [text](url)</li>
              <li>Images ![alt](url)</li>
            </ul>
          </Card>
          <Card class="p-4">
            <h3 class="font-semibold text-surface-900 dark:text-white mb-2">Code</h3>
            <ul class="list-disc list-inside space-y-1 text-sm text-surface-600 dark:text-surface-400">
              <li>Code blocks (```)</li>
              <li>Inline code (`code`)</li>
            </ul>
          </Card>
          <Card class="p-4">
            <h3 class="font-semibold text-surface-900 dark:text-white mb-2">Structure</h3>
            <ul class="list-disc list-inside space-y-1 text-sm text-surface-600 dark:text-surface-400">
              <li>Lists (-, *, 1.)</li>
              <li>Blockquotes (&gt;)</li>
              <li>Horizontal rules (---)</li>
              <li>Tables</li>
            </ul>
          </Card>
        </div>
      </DemoSection>
    </div>
  );
}
