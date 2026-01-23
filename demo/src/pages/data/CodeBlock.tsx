import { CodeBlock as CB, Card } from 'glass-ui-solid';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

export default function CodeBlockPage() {
  const jsCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return { greeting: "Hello", target: name };
}

greet("World");`;

  const tsCode = `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function getUser(id: string): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}`;

  const jsonCode = `{
  "name": "glass-ui-solid",
  "version": "1.0.0",
  "description": "iOS 26-inspired glassmorphism UI components",
  "dependencies": {
    "solid-js": "^1.8.0",
    "clsx": "^2.0.0"
  }
}`;

  const bashCode = `# Install dependencies
npm install glass-ui-solid

# Or with bun
bun add glass-ui-solid

# Run the development server
bun run dev`;

  const longLineCode = `{"users":[{"id":"1","name":"John Doe","email":"john@example.com","address":{"street":"123 Main St","city":"San Francisco","state":"CA","zip":"94102","country":"USA"}},{"id":"2","name":"Jane Smith","email":"jane@example.com","address":{"street":"456 Oak Ave","city":"New York","state":"NY","zip":"10001","country":"USA"}}]}`;

  return (
    <div class="space-y-8">
      <PageHeader
        title="CodeBlock"
        description="Syntax-highlighted code display with copy functionality. Uses PrismJS for syntax highlighting and includes a built-in copy button."
      />

      <DemoSection
        title="Import"
        code="import { CodeBlock } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`<CodeBlock
  code={\`function hello() {
  console.log("Hello, World!");
}\`}
  language="javascript"
/>`}
      >
        <CB
          code={`function hello() {
  console.log("Hello, World!");
}`}
          language="javascript"
        />
      </DemoSection>

      <DemoSection
        title="Different Languages"
        code={`<CodeBlock code={jsonData} language="json" />
<CodeBlock code={pythonCode} language="python" />
<CodeBlock code={bashScript} language="bash" />
<CodeBlock code={htmlMarkup} language="html" />`}
        card={false}
      >
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              JavaScript
            </h3>
            <CB code={jsCode} language="javascript" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              TypeScript
            </h3>
            <CB code={tsCode} language="typescript" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              JSON
            </h3>
            <CB code={jsonCode} language="json" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Bash
            </h3>
            <CB code={bashCode} language="bash" />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="With Line Wrapping"
        description="Enable line wrapping for long lines that would otherwise require horizontal scrolling."
        code={`<CodeBlock
  code={longLineCode}
  language="json"
  wrap
/>`}
        card={false}
      >
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Without wrapping (default)
            </h3>
            <CB code={longLineCode} language="json" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              With wrapping enabled
            </h3>
            <CB code={longLineCode} language="json" wrap />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Max Height"
        description="Control the maximum height of the code block. Content exceeding this height will be scrollable."
        code={`<CodeBlock
  code={longCode}
  language="typescript"
  maxHeight="150px"
/>`}
        card={false}
      >
        <CB code={tsCode} language="typescript" maxHeight="150px" />
      </DemoSection>

      <DemoSection
        title="Hide Copy Button"
        description="Hide the copy button for read-only displays or when copying is not desired."
        code={`<CodeBlock
  code={code}
  language="javascript"
  hideCopyButton
/>`}
        card={false}
      >
        <CB
          code={`const message = "No copy button here";`}
          language="javascript"
          hideCopyButton
        />
      </DemoSection>

      <DemoSection
        title="Custom Labels"
        description="Customize the copy and copied button labels for internationalization."
        code={`<CodeBlock
  code={code}
  language="javascript"
  copyLabel="Copier"
  copiedLabel="Copie!"
/>`}
        card={false}
      >
        <CB
          code={`console.log("Bonjour le monde!");`}
          language="javascript"
          copyLabel="Copier"
          copiedLabel="Copie!"
        />
      </DemoSection>

      <DemoSection
        title="Supported Languages"
        description="CodeBlock uses PrismJS for syntax highlighting. Common supported languages include:"
        card={false}
      >
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
          {[
            'javascript',
            'typescript',
            'jsx',
            'tsx',
            'json',
            'yaml',
            'xml',
            'html',
            'css',
            'scss',
            'python',
            'ruby',
            'go',
            'rust',
            'java',
            'c',
            'cpp',
            'csharp',
            'php',
            'sql',
            'bash',
            'shell',
            'markdown',
            'diff',
          ].map((lang) => (
            <Card class="px-3 py-2 text-center">
              <code class="text-xs font-mono text-surface-700 dark:text-surface-300">
                {lang}
              </code>
            </Card>
          ))}
        </div>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'code',
              type: 'string',
              default: 'required',
              description: 'The code to display',
            },
            {
              name: 'language',
              type: 'string',
              default: "'json'",
              description: 'Programming language for syntax highlighting',
            },
            {
              name: 'maxHeight',
              type: 'string',
              default: "'31.25rem'",
              description: 'Maximum height of the code block',
            },
            {
              name: 'wrap',
              type: 'boolean',
              default: 'false',
              description: 'Whether to wrap long lines',
            },
            {
              name: 'hideCopyButton',
              type: 'boolean',
              default: 'false',
              description: 'Hide the copy button',
            },
            {
              name: 'copyLabel',
              type: 'string',
              default: "'Copy'",
              description: 'Label for the copy button',
            },
            {
              name: 'copiedLabel',
              type: 'string',
              default: "'Copied'",
              description: 'Label shown after copying',
            },
            {
              name: 'class',
              type: 'string',
              default: '-',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
