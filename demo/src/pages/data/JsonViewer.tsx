import { JsonViewer } from 'glass-ui-solid';
import {
  DemoSection,
  FeatureList,
  PageHeader,
  PropsTable,
} from '../../components/demo';

const basicData = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  address: {
    city: 'New York',
    country: 'USA',
  },
};

const complexData = {
  string: 'Hello World',
  number: 42,
  float: 3.14159,
  boolean: true,
  nullValue: null,
  array: [1, 2, 3, 'four', { nested: true }],
  object: {
    deep: {
      deeper: {
        value: 'found!',
      },
    },
  },
};

const apiResponse = {
  status: 'success',
  data: {
    users: [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
      { id: 3, name: 'Charlie', role: 'user' },
    ],
    pagination: {
      page: 1,
      perPage: 10,
      total: 3,
    },
  },
  meta: {
    timestamp: '2024-01-15T10:30:00Z',
    version: 'v1',
  },
};

export default function JsonViewerPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="JsonViewer"
        description="Interactive collapsible JSON viewer with syntax highlighting, copy functionality, and expand/collapse controls."
      />

      <DemoSection
        title="Import"
        code="import { JsonViewer } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
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
      >
        <JsonViewer data={basicData} />
      </DemoSection>

      <DemoSection
        title="Custom Expand Depth"
        description={
          <>
            Control how many levels are expanded by default with{' '}
            <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">
              initialExpandDepth
            </code>
            .
          </>
        }
        code={`<JsonViewer data={data} initialExpandDepth={0} /> // All collapsed
<JsonViewer data={data} initialExpandDepth={1} /> // First level expanded
<JsonViewer data={data} initialExpandDepth={3} /> // Three levels expanded`}
        card={false}
      >
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">
              Depth: 0 (collapsed)
            </p>
            <div class="p-4 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
              <JsonViewer data={complexData} initialExpandDepth={0} />
            </div>
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">
              Depth: 1
            </p>
            <div class="p-4 bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
              <JsonViewer data={complexData} initialExpandDepth={1} />
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Complex Data Types"
        description="JsonViewer supports all JSON data types with syntax highlighting for each type."
      >
        <JsonViewer data={complexData} initialExpandDepth={3} />
      </DemoSection>

      <DemoSection
        title="API Response Viewer"
        description="Ideal for displaying API responses with nested data structures."
        code={`<JsonViewer
  data={apiResponse}
  initialExpandDepth={2}
  maxHeight="400px"
/>`}
      >
        <JsonViewer
          data={apiResponse}
          initialExpandDepth={2}
          maxHeight="400px"
        />
      </DemoSection>

      <DemoSection
        title="Custom Labels"
        description="Customize button labels for internationalization."
        code={`<JsonViewer
  data={data}
  copyLabel="Copier"
  copiedLabel="Copie!"
  expandAllLabel="Tout ouvrir"
  collapseAllLabel="Tout fermer"
/>`}
      >
        <JsonViewer
          data={basicData}
          copyLabel="Copier"
          copiedLabel="Copie!"
          expandAllLabel="Tout ouvrir"
          collapseAllLabel="Tout fermer"
        />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'data',
              type: 'unknown',
              default: 'required',
              description: 'JSON data to display',
            },
            {
              name: 'maxHeight',
              type: 'string',
              default: "'31.25rem'",
              description: 'Maximum height of the viewer',
            },
            {
              name: 'initialExpandDepth',
              type: 'number',
              default: '2',
              description: 'Initial expand depth',
            },
            {
              name: 'copyLabel',
              type: 'string',
              default: "'Copy'",
              description: 'Copy button label',
            },
            {
              name: 'copiedLabel',
              type: 'string',
              default: "'Copied'",
              description: 'Copied state label',
            },
            {
              name: 'expandAllLabel',
              type: 'string',
              default: "'Expand all'",
              description: 'Expand all tooltip',
            },
            {
              name: 'collapseAllLabel',
              type: 'string',
              default: "'Collapse all'",
              description: 'Collapse all tooltip',
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

      <DemoSection title="Features" card={false}>
        <FeatureList
          items={[
            'Collapsible objects and arrays',
            'Syntax coloring for different data types',
            'Copy to clipboard functionality',
            'Expand/collapse all buttons',
            'Shows item counts for arrays and objects',
          ]}
        />
      </DemoSection>
    </div>
  );
}
