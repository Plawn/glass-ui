import { CodeBlock as CB, Card } from 'glass-ui-solid';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">CodeBlock</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Syntax-highlighted code display with copy functionality. Uses PrismJS for syntax highlighting
          and includes a built-in copy button.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CB code="import { CodeBlock } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6 space-y-4">
          <CB
            code={`function hello() {
  console.log("Hello, World!");
}`}
            language="javascript"
          />
        </Card>
        <div class="mt-4">
          <CB
            code={`<CodeBlock
  code={\`function hello() {
  console.log("Hello, World!");
}\`}
  language="javascript"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Different Languages</h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">JavaScript</h3>
            <CB code={jsCode} language="javascript" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">TypeScript</h3>
            <CB code={tsCode} language="typescript" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">JSON</h3>
            <CB code={jsonCode} language="json" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Bash</h3>
            <CB code={bashCode} language="bash" />
          </div>
        </div>

        <div class="mt-4">
          <CB
            code={`<CodeBlock code={jsonData} language="json" />
<CodeBlock code={pythonCode} language="python" />
<CodeBlock code={bashScript} language="bash" />
<CodeBlock code={htmlMarkup} language="html" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Line Wrapping</h2>
        <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
          Enable line wrapping for long lines that would otherwise require horizontal scrolling.
        </p>

        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Without wrapping (default)</h3>
            <CB code={longLineCode} language="json" />
          </div>

          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">With wrapping enabled</h3>
            <CB code={longLineCode} language="json" wrap />
          </div>
        </div>

        <div class="mt-4">
          <CB
            code={`<CodeBlock
  code={longLineCode}
  language="json"
  wrap
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Max Height</h2>
        <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
          Control the maximum height of the code block. Content exceeding this height will be scrollable.
        </p>
        <CB code={tsCode} language="typescript" maxHeight="150px" />
        <div class="mt-4">
          <CB
            code={`<CodeBlock
  code={longCode}
  language="typescript"
  maxHeight="150px"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Hide Copy Button</h2>
        <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
          Hide the copy button for read-only displays or when copying is not desired.
        </p>
        <CB code={`const message = "No copy button here";`} language="javascript" hideCopyButton />
        <div class="mt-4">
          <CB
            code={`<CodeBlock
  code={code}
  language="javascript"
  hideCopyButton
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Labels</h2>
        <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
          Customize the copy and copied button labels for internationalization.
        </p>
        <CB
          code={`console.log("Bonjour le monde!");`}
          language="javascript"
          copyLabel="Copier"
          copiedLabel="Copie!"
        />
        <div class="mt-4">
          <CB
            code={`<CodeBlock
  code={code}
  language="javascript"
  copyLabel="Copier"
  copiedLabel="Copie!"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Supported Languages</h2>
        <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
          CodeBlock uses PrismJS for syntax highlighting. Common supported languages include:
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
          {[
            'javascript', 'typescript', 'jsx', 'tsx',
            'json', 'yaml', 'xml', 'html',
            'css', 'scss', 'python', 'ruby',
            'go', 'rust', 'java', 'c',
            'cpp', 'csharp', 'php', 'sql',
            'bash', 'shell', 'markdown', 'diff'
          ].map((lang) => (
            <Card class="px-3 py-2 text-center">
              <code class="text-xs font-mono text-surface-700 dark:text-surface-300">{lang}</code>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">code</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">The code to display</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">language</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'json'</td>
                <td class="py-3 px-4">Programming language for syntax highlighting</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">maxHeight</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'31.25rem'</td>
                <td class="py-3 px-4">Maximum height of the code block</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">wrap</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether to wrap long lines</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">hideCopyButton</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Hide the copy button</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">copyLabel</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'Copy'</td>
                <td class="py-3 px-4">Label for the copy button</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">copiedLabel</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'Copied'</td>
                <td class="py-3 px-4">Label shown after copying</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-mono text-xs">class</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
