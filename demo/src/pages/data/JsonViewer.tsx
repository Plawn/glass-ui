import { JsonViewer, CodeBlock, Card } from 'glass-ui-solid';

const basicData = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  address: {
    city: "New York",
    country: "USA"
  }
};

const complexData = {
  string: "Hello World",
  number: 42,
  float: 3.14159,
  boolean: true,
  nullValue: null,
  array: [1, 2, 3, "four", { nested: true }],
  object: {
    deep: {
      deeper: {
        value: "found!"
      }
    }
  }
};

const apiResponse = {
  status: "success",
  data: {
    users: [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
      { id: 3, name: "Charlie", role: "user" }
    ],
    pagination: {
      page: 1,
      perPage: 10,
      total: 3
    }
  },
  meta: {
    timestamp: "2024-01-15T10:30:00Z",
    version: "v1"
  }
};

export default function JsonViewerPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">JsonViewer</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Interactive collapsible JSON viewer with syntax highlighting, copy functionality, and expand/collapse controls.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { JsonViewer } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-4">
          <JsonViewer data={basicData} />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const data = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  address: {
    city: "New York",
    country: "USA"
  }
};

<JsonViewer data={data} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Expand Depth</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Control how many levels are expanded by default with <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">initialExpandDepth</code>.
        </p>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">Depth: 0 (collapsed)</p>
            <Card class="p-4">
              <JsonViewer data={complexData} initialExpandDepth={0} />
            </Card>
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">Depth: 1</p>
            <Card class="p-4">
              <JsonViewer data={complexData} initialExpandDepth={1} />
            </Card>
          </div>
        </div>
        <div class="mt-4">
          <CodeBlock
            code={`<JsonViewer data={data} initialExpandDepth={0} /> // All collapsed
<JsonViewer data={data} initialExpandDepth={1} /> // First level expanded
<JsonViewer data={data} initialExpandDepth={3} /> // Three levels expanded`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Complex Data Types</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          JsonViewer supports all JSON data types with syntax highlighting for each type.
        </p>
        <Card class="p-4">
          <JsonViewer data={complexData} initialExpandDepth={3} />
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">API Response Viewer</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Ideal for displaying API responses with nested data structures.
        </p>
        <Card class="p-4">
          <JsonViewer data={apiResponse} initialExpandDepth={2} maxHeight="400px" />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<JsonViewer
  data={apiResponse}
  initialExpandDepth={2}
  maxHeight="400px"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Labels</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Customize button labels for internationalization.
        </p>
        <Card class="p-4">
          <JsonViewer
            data={basicData}
            copyLabel="Copier"
            copiedLabel="Copie!"
            expandAllLabel="Tout ouvrir"
            collapseAllLabel="Tout fermer"
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<JsonViewer
  data={data}
  copyLabel="Copier"
  copiedLabel="Copie!"
  expandAllLabel="Tout ouvrir"
  collapseAllLabel="Tout fermer"
/>`}
            language="tsx"
          />
        </div>
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
                <td class="py-2 px-4 font-mono text-xs">data</td>
                <td class="py-2 px-4 font-mono text-xs">unknown</td>
                <td class="py-2 px-4">required</td>
                <td class="py-2 px-4">JSON data to display</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">maxHeight</td>
                <td class="py-2 px-4 font-mono text-xs">string</td>
                <td class="py-2 px-4">'31.25rem'</td>
                <td class="py-2 px-4">Maximum height of the viewer</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">initialExpandDepth</td>
                <td class="py-2 px-4 font-mono text-xs">number</td>
                <td class="py-2 px-4">2</td>
                <td class="py-2 px-4">Initial expand depth</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">copyLabel</td>
                <td class="py-2 px-4 font-mono text-xs">string</td>
                <td class="py-2 px-4">'Copy'</td>
                <td class="py-2 px-4">Copy button label</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">copiedLabel</td>
                <td class="py-2 px-4 font-mono text-xs">string</td>
                <td class="py-2 px-4">'Copied'</td>
                <td class="py-2 px-4">Copied state label</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">expandAllLabel</td>
                <td class="py-2 px-4 font-mono text-xs">string</td>
                <td class="py-2 px-4">'Expand all'</td>
                <td class="py-2 px-4">Expand all tooltip</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 px-4 font-mono text-xs">collapseAllLabel</td>
                <td class="py-2 px-4 font-mono text-xs">string</td>
                <td class="py-2 px-4">'Collapse all'</td>
                <td class="py-2 px-4">Collapse all tooltip</td>
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
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Features</h2>
        <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
          <li>Collapsible objects and arrays</li>
          <li>Syntax coloring for different data types</li>
          <li>Copy to clipboard functionality</li>
          <li>Expand/collapse all buttons</li>
          <li>Shows item counts for arrays and objects</li>
        </ul>
      </section>
    </div>
  );
}
