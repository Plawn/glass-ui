import { Table, Badge } from 'glass-ui-solid';
import type { TableColumn } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, StateDisplay, VariantShowcase } from '../../components/demo';

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
    render: (value: unknown) => {
      const status = value as string;
      const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'error';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

export default function TablePage() {
  const [selectedKeys, setSelectedKeys] = createSignal<Set<number>>(new Set());

  return (
    <div class="space-y-8">
      <PageHeader
        title="Table"
        description="Data table with sorting, selection, and sticky headers."
      />

      <DemoSection
        title="Import"
        code={`import { Table } from 'glass-ui-solid';
import type { TableColumn, SortState } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Basic Usage"
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
        card={false}
      >
        <Table columns={basicColumns} data={sampleData} />
      </DemoSection>

      <DemoSection
        title="Sortable Columns"
        code={`<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
  ]}
  data={data}
  sortable
/>`}
        card={false}
      >
        <Table columns={sortableColumns} data={sampleData} sortable />
      </DemoSection>

      <DemoSection
        title="Row Selection (Multiple)"
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
        card={false}
      >
        <div class="space-y-4">
          <StateDisplay label="Selected" value={`${selectedKeys().size} row(s)`} />
          <Table
            columns={basicColumns}
            data={sampleData}
            selectable="multiple"
            selectedKeys={selectedKeys()}
            onSelectionChange={(keys: Set<number | string>) => setSelectedKeys(keys as Set<number>)}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Cell Rendering"
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
        card={false}
      >
        <Table columns={columnsWithStatus} data={sampleData} />
      </DemoSection>

      <DemoSection
        title="Variants"
        code={`<Table variant="default" {...props} />
<Table variant="bordered" {...props} />
<Table variant="striped" {...props} />`}
        card={false}
      >
        <VariantShowcase variants={['default', 'bordered', 'striped']} label="Variant">
          {(variant) => <Table columns={basicColumns} data={sampleData.slice(0, 3)} variant={variant} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Table size="sm" {...props} />
<Table size="md" {...props} />
<Table size="lg" {...props} />`}
        card={false}
      >
        <VariantShowcase variants={['sm', 'md', 'lg']} label="Size">
          {(size) => <Table columns={basicColumns} data={sampleData.slice(0, 2)} size={size} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Loading State"
        code={`<Table
  columns={columns}
  data={data}
  loading={isLoading()}
  loadingRows={5}
/>`}
        card={false}
      >
        <Table columns={basicColumns} data={[]} loading loadingRows={3} />
      </DemoSection>

      <DemoSection
        title="Empty State"
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
        card={false}
      >
        <Table columns={basicColumns} data={[]} emptyMessage="No users found." />
      </DemoSection>

      <DemoSection
        title="Sticky Header with Max Height"
        code={`<Table
  columns={columns}
  data={largeDataset}
  maxHeight="400px"
  stickyHeader
/>`}
        card={false}
      >
        <Table columns={basicColumns} data={sampleData} maxHeight="200px" stickyHeader />
      </DemoSection>
    </div>
  );
}
