import { Markdown, CodeBlock, Card } from 'glass-ui-solid';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Markdown</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Render markdown content with automatic sanitization for safe display of user-generated content.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Markdown } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Markdown content={basicMarkdown} />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Markdown content="# Hello World\\n\\nThis is **bold** and *italic* text." />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Full Featured Example</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Markdown supports headers, lists, code blocks, tables, blockquotes, and more.
        </p>
        <Card class="p-6">
          <Markdown content={fullFeaturedMarkdown} />
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Chat Messages</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Perfect for rendering AI chat responses or user messages with formatting.
        </p>
        <Card class="p-6 bg-surface-50 dark:bg-surface-800/50">
          <Markdown content={chatMessage} />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`function ChatMessage(props: { message: string }) {
  return (
    <div class="p-4 rounded-lg bg-surface-100">
      <Markdown content={props.message} />
    </div>
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Release Notes</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Great for displaying changelogs and release notes.
        </p>
        <Card class="p-6">
          <Markdown content={releaseNotes} />
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 px-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">content</td>
                <td class="py-2 px-4 font-mono text-xs">string | undefined</td>
                <td class="py-2 px-4">required</td>
                <td class="py-2 px-4">Markdown content to render</td>
              </tr>
              <tr>
                <td class="py-2 px-4 font-mono text-xs">class</td>
                <td class="py-2 px-4 font-mono text-xs">string</td>
                <td class="py-2 px-4">-</td>
                <td class="py-2 px-4">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Security</h2>
        <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
          <li>Content is sanitized using DOMPurify</li>
          <li>Safe from XSS attacks</li>
          <li>Unsafe HTML is automatically stripped</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Supported Syntax</h2>
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
      </section>
    </div>
  );
}
