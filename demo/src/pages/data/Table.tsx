import { Badge, Button, Table } from 'glass-ui-solid';
import type { TableColumn } from 'glass-ui-solid';
import { For, Show, createSignal } from 'solid-js';
import {
  DemoSection,
  PageHeader,
  StateDisplay,
  VariantShowcase,
} from '../../components/demo';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserWithDetails extends User {
  phone?: string;
  address?: string;
  department?: string;
  hireDate?: string;
  projects?: string[];
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'User',
    status: 'active',
  },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    role: 'Editor',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'User',
    status: 'active',
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve@example.com',
    role: 'Moderator',
    status: 'pending',
  },
];

// Expanded data with more details for expandable rows demo
const expandableData: UserWithDetails[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94102',
    department: 'Engineering',
    hireDate: '2021-03-15',
    projects: ['Platform Core', 'API Gateway', 'Auth Service'],
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'User',
    status: 'active',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, New York, NY 10001',
    department: 'Marketing',
    hireDate: '2022-06-01',
    projects: ['Brand Campaign', 'Social Media'],
  },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    role: 'Editor',
    status: 'inactive',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Rd, Austin, TX 78701',
    department: 'Content',
    hireDate: '2020-11-20',
    projects: ['Blog Revamp', 'Documentation'],
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'User',
    status: 'active',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, Seattle, WA 98101',
    department: 'Sales',
    hireDate: '2023-01-10',
    projects: ['Enterprise Deals', 'Partner Program'],
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve@example.com',
    role: 'Moderator',
    status: 'pending',
    phone: '+1 (555) 567-8901',
    address: '654 Birch Ln, Denver, CO 80201',
    department: 'Community',
    hireDate: '2023-09-05',
    projects: ['Forum Moderation', 'User Support'],
  },
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
      const variant =
        status === 'active'
          ? 'success'
          : status === 'pending'
            ? 'warning'
            : 'error';
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
          <StateDisplay
            label="Selected"
            value={`${selectedKeys().size} row(s)`}
          />
          <Table
            columns={basicColumns}
            data={sampleData}
            selectable="multiple"
            selectedKeys={selectedKeys()}
            onSelectionChange={(keys: Set<number | string>) =>
              setSelectedKeys(keys as Set<number>)
            }
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
        <VariantShowcase
          variants={['default', 'bordered', 'striped']}
          label="Variant"
        >
          {(variant) => (
            <Table
              columns={basicColumns}
              data={sampleData.slice(0, 3)}
              variant={variant}
            />
          )}
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
          {(size) => (
            <Table
              columns={basicColumns}
              data={sampleData.slice(0, 2)}
              size={size}
            />
          )}
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
        <Table
          columns={basicColumns}
          data={[]}
          emptyMessage="No users found."
        />
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
        <Table
          columns={basicColumns}
          data={sampleData}
          maxHeight="200px"
          stickyHeader
        />
      </DemoSection>

      {/* Expandable Rows Prototype Demo */}
      <ExpandableRowsDemo />
    </div>
  );
}

// =============================================================================
// EXPANDABLE ROWS PROTOTYPE
// =============================================================================

// Chevron icon for expand/collapse
const ChevronIcon = (props: { expanded: boolean; class?: string }) => (
  <svg
    class={`w-4 h-4 transition-transform duration-200 ${props.expanded ? 'rotate-90' : ''} ${props.class ?? ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

function ExpandableRowsDemo() {
  const [expandedKeys, setExpandedKeys] = createSignal<Set<number>>(
    new Set([1]),
  ); // First row expanded by default

  const toggleExpand = (id: number) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedKeys(new Set(expandableData.map((u) => u.id)));
  };

  const collapseAll = () => {
    setExpandedKeys(new Set<number>());
  };

  return (
    <DemoSection
      title="Expandable Rows (Prototype)"
      description="Click on a row or the chevron to expand/collapse details. This demonstrates the proposed API pattern for expandable rows."
      code={`// Proposed API for Table component:
interface ExpandableConfig<T> {
  render: (row: T, index: number) => JSX.Element;
  trigger?: 'row' | 'icon'; // default: 'icon'
}

<Table
  columns={columns}
  data={users}
  expandable={{
    render: (user) => (
      <div class="p-4 bg-surface-50">
        <p>Phone: {user.phone}</p>
        <p>Department: {user.department}</p>
        <p>Projects: {user.projects.join(', ')}</p>
      </div>
    ),
    trigger: 'icon', // or 'row' for click anywhere
  }}
  expandedKeys={expandedKeys()}
  onExpandChange={setExpandedKeys}
  defaultExpandedKeys={new Set([1])} // optional: for uncontrolled
/>`}
      card={false}
    >
      <div class="space-y-4">
        <div class="flex gap-2">
          <Button size="sm" variant="secondary" onClick={expandAll}>
            Expand All
          </Button>
          <Button size="sm" variant="secondary" onClick={collapseAll}>
            Collapse All
          </Button>
          <StateDisplay
            label="Expanded"
            value={`${expandedKeys().size} row(s)`}
          />
        </div>

        {/* Custom expandable table implementation */}
        <div
          class="glass-card rounded-xl overflow-hidden"
          style={{ height: '400px', 'overflow-y': 'auto' }}
        >
          <table class="w-full">
            <thead class="sticky top-0 z-10 bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm">
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <th class="w-10 px-2 py-3 text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400" />
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">
                  Name
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">
                  Email
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">
                  Role
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={expandableData}>
                {(user) => {
                  const isExpanded = () => expandedKeys().has(user.id);
                  return (
                    <>
                      {/* Main row */}
                      <tr
                        class={`
                          border-b border-surface-100/50 dark:border-surface-800/50
                          hover:bg-surface-50/50 dark:hover:bg-surface-800/30
                          cursor-pointer transition-colors
                          ${isExpanded() ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}
                        `}
                        onClick={() => toggleExpand(user.id)}
                      >
                        <td class="px-2 py-3 text-center">
                          <button
                            class="p-1 rounded hover:bg-surface-200/50 dark:hover:bg-surface-700/50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(user.id);
                            }}
                          >
                            <ChevronIcon
                              expanded={isExpanded()}
                              class="text-surface-500"
                            />
                          </button>
                        </td>
                        <td class="px-4 py-3 text-sm font-medium text-surface-900 dark:text-white">
                          {user.name}
                        </td>
                        <td class="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">
                          {user.email}
                        </td>
                        <td class="px-4 py-3 text-sm text-surface-800 dark:text-surface-200">
                          {user.role}
                        </td>
                        <td class="px-4 py-3">
                          <Badge
                            variant={
                              user.status === 'active'
                                ? 'success'
                                : user.status === 'pending'
                                  ? 'warning'
                                  : 'error'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                      </tr>

                      {/* Expanded content row */}
                      <tr>
                        <td colspan={5} class="p-0">
                          <div
                            class="grid transition-[grid-template-rows] duration-200 ease-out"
                            style={{
                              'grid-template-rows': isExpanded()
                                ? '1fr'
                                : '0fr',
                            }}
                          >
                            <div class="overflow-hidden">
                              <div class="px-4 py-4 bg-surface-50/50 dark:bg-surface-800/30 border-b border-surface-200/50 dark:border-surface-700/50">
                                <div class="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  <div>
                                    <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
                                      Phone
                                    </p>
                                    <p class="text-sm text-surface-900 dark:text-white">
                                      {user.phone}
                                    </p>
                                  </div>
                                  <div>
                                    <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
                                      Department
                                    </p>
                                    <p class="text-sm text-surface-900 dark:text-white">
                                      {user.department}
                                    </p>
                                  </div>
                                  <div>
                                    <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
                                      Hire Date
                                    </p>
                                    <p class="text-sm text-surface-900 dark:text-white">
                                      {user.hireDate}
                                    </p>
                                  </div>
                                  <div class="md:col-span-2 lg:col-span-3">
                                    <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
                                      Address
                                    </p>
                                    <p class="text-sm text-surface-900 dark:text-white">
                                      {user.address}
                                    </p>
                                  </div>
                                  <div class="md:col-span-2 lg:col-span-3">
                                    <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
                                      Projects
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                      <For each={user.projects}>
                                        {(project) => (
                                          <Badge variant="info" size="sm">
                                            {project}
                                          </Badge>
                                        )}
                                      </For>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                }}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </DemoSection>
  );
}
