import { Table, CodeBlock, Badge } from 'glass-ui-solid';
import type { TableColumn } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Moderator', status: 'pending' },
];

const basicColumns: TableColumn<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const sortableColumns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
];

const columnsWithStatus: TableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <Badge
        variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'error'}
      >
        {String(value)}
      </Badge>
    ),
  },
];

export default function TablePage() {
  const [selectedKeys, setSelectedKeys] = createSignal<Set<number>>(new Set());

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Table</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Data table with sorting, selection, and sticky headers.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Table } from 'glass-ui-solid';
import type { TableColumn, SortState } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <div class="space-y-4">
          <Table columns={basicColumns} data={sampleData} />
          <CodeBlock
            code={`const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
];

<Table columns={columns} data={data} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Sortable Columns
        </h2>
        <div class="space-y-4">
          <Table columns={sortableColumns} data={sampleData} sortable />
          <CodeBlock
            code={`<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
  ]}
  data={data}
  sortable
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Row Selection (Multiple)
        </h2>
        <div class="space-y-4">
          <p class="text-sm text-surface-600 dark:text-surface-400">
            Selected: {selectedKeys().size} row(s)
          </p>
          <Table
            columns={basicColumns}
            data={sampleData}
            selectable="multiple"
            selectedKeys={selectedKeys()}
            onSelectionChange={(keys) => setSelectedKeys(keys as Set<number>)}
          />
          <CodeBlock
            code={`const [selected, setSelected] = createSignal<Set<number>>(new Set());

<Table
  columns={columns}
  data={data}
  selectable="multiple"
  selectedKeys={selected()}
  onSelectionChange={(keys, rows) => {
    setSelected(keys);
    console.log('Selected rows:', rows);
  }}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Custom Cell Rendering
        </h2>
        <div class="space-y-4">
          <Table columns={columnsWithStatus} data={sampleData} />
          <CodeBlock
            code={`<Table
  columns={[
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>
          {value}
        </Badge>
      ),
    },
  ]}
  data={data}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Variants</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Default
            </h3>
            <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="default" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Bordered
            </h3>
            <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="bordered" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Striped
            </h3>
            <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant="striped" />
          </div>
          <CodeBlock
            code={`<Table variant="default" {...props} />
<Table variant="bordered" {...props} />
<Table variant="striped" {...props} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Small</h3>
            <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="sm" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Medium</h3>
            <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="md" />
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Large</h3>
            <Table columns={basicColumns} data={sampleData.slice(0, 2)} size="lg" />
          </div>
          <CodeBlock
            code={`<Table size="sm" {...props} />
<Table size="md" {...props} />
<Table size="lg" {...props} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Loading State</h2>
        <div class="space-y-4">
          <Table columns={basicColumns} data={[]} loading loadingRows={3} />
          <CodeBlock
            code={`<Table
  columns={columns}
  data={data}
  loading={isLoading()}
  loadingRows={5}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Empty State</h2>
        <div class="space-y-4">
          <Table columns={basicColumns} data={[]} emptyMessage="No users found." />
          <CodeBlock
            code={`<Table
  columns={columns}
  data={[]}
  emptyMessage="No users found."
  emptyRender={() => (
    <div class="text-center py-8">
      <p>No data available</p>
      <Button onClick={refresh}>Refresh</Button>
    </div>
  )}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Sticky Header with Max Height
        </h2>
        <div class="space-y-4">
          <Table columns={basicColumns} data={sampleData} maxHeight="200px" stickyHeader />
          <CodeBlock
            code={`<Table
  columns={columns}
  data={largeDataset}
  maxHeight="400px"
  stickyHeader
/>`}
            language="tsx"
          />
        </div>
      </section>
    </div>
  );
}
