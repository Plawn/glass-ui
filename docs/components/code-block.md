# CodeBlock

Syntax-highlighted code display with copy functionality.

## Import

```tsx
import { CodeBlock } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<CodeBlock
  code={`function hello() {
  console.log("Hello, World!");
}`}
  language="javascript"
/>
```

### Different Languages

```tsx
<CodeBlock code={jsonData} language="json" />
<CodeBlock code={pythonCode} language="python" />
<CodeBlock code={bashScript} language="bash" />
<CodeBlock code={htmlMarkup} language="html" />
<CodeBlock code={cssStyles} language="css" />
```

### With Line Wrapping

```tsx
<CodeBlock
  code={longLineCode}
  language="json"
  wrap
/>
```

### Custom Max Height

```tsx
<CodeBlock
  code={longCode}
  language="typescript"
  maxHeight="400px"
/>
```

### Hide Copy Button

```tsx
<CodeBlock
  code={code}
  language="text"
  hideCopyButton
/>
```

### Custom Labels

```tsx
<CodeBlock
  code={code}
  language="javascript"
  copyLabel="Copier"
  copiedLabel="Copié!"
/>
```

### API Response Display

```tsx
function ApiResponse(props: { response: unknown }) {
  return (
    <div class="space-y-2">
      <h3 class="font-medium">Response</h3>
      <CodeBlock
        code={JSON.stringify(props.response, null, 2)}
        language="json"
        maxHeight="300px"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | required | The code to display |
| `language` | `string` | `'json'` | Programming language |
| `maxHeight` | `string` | `'31.25rem'` | Maximum height |
| `wrap` | `boolean` | `false` | Wrap long lines |
| `hideCopyButton` | `boolean` | `false` | Hide copy button |
| `copyLabel` | `string` | `'Copy'` | Copy button label |
| `copiedLabel` | `string` | `'Copied'` | Copied state label |
| `class` | `string` | - | Additional CSS classes |

## Supported Languages

Uses PrismJS for syntax highlighting. Common languages include:
- javascript, typescript, jsx, tsx
- json, yaml
- python, ruby, go, rust
- html, css, scss
- bash, shell
- sql
- markdown
