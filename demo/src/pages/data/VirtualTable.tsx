import { createSignal, For } from 'solid-js';
import { VirtualTable, Badge, Button } from 'glass-ui-solid';
import type { VirtualHandle } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill } from '../../components/demo';

// Sample data generator
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Moderator';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
}

const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support', 'HR', 'Finance'];
const roles: User['role'][] = ['Admin', 'User', 'Moderator'];
const statuses: User['status'][] = ['active', 'inactive', 'pending'];

const generateUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    department: departments[i % departments.length],
    joinDate: new Date(2020 + Math.floor(i / 365), i % 12, (i % 28) + 1).toLocaleDateString(),
  }));


export default function VirtualTablePage() {
  const users = generateUsers(10000);
  let tableRef: VirtualHandle | undefined;
  const [scrollIndex, setScrollIndex] = createSignal(500);

  const statusColors = {
    active: 'success',
    inactive: 'default',
    pending: 'warning',
  } as const;

  const roleColors = {
    Admin: 'info',
    User: 'default',
    Moderator: 'warning',
  } as const;

  return (
    <div class="space-y-8">
      <PageHeader
        title="VirtualTable"
        description="Virtualized table component for large datasets with sticky headers and footers. Perfect for displaying tabular data with thousands of rows while maintaining smooth scrolling performance."
      />

      <DemoSection title="Import" code="import { VirtualTable } from 'glass-ui-solid';" />

      <DemoSection
        title="Basic Example"
        description="A virtualized table with 10,000 rows and a sticky header. The header stays visible while scrolling through the data."
        code={`const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  email: \`user\${i + 1}@example.com\`,
  role: i % 2 === 0 ? 'Admin' : 'User',
  status: 'active',
}));

<VirtualTable
  data={users}
  fixedHeaderContent={() => (
    <tr>
      <th class="p-3 text-left">ID</th>
      <th class="p-3 text-left">Name</th>
      <th class="p-3 text-left">Email</th>
      <th class="p-3 text-left">Role</th>
      <th class="p-3 text-left">Status</th>
    </tr>
  )}
  itemContent={(index, user) => (
    <>
      <td class="p-3">{user.id}</td>
      <td class="p-3">{user.name}</td>
      <td class="p-3">{user.email}</td>
      <td class="p-3"><Badge>{user.role}</Badge></td>
      <td class="p-3"><Badge>{user.status}</Badge></td>
    </>
  )}
  style={{ height: '400px' }}
/>`}
      >
        <VirtualTable
          data={users}
          fixedHeaderContent={() => (
            <tr class="text-left">
              <th class="p-3 w-20 text-surface-600 dark:text-surface-400 font-semibold">ID</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Name</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Email</th>
              <th class="p-3 w-28 text-surface-600 dark:text-surface-400 font-semibold">Role</th>
              <th class="p-3 w-28 text-surface-600 dark:text-surface-400 font-semibold">Status</th>
            </tr>
          )}
          itemContent={(index, user) => (
            <>
              <td class="p-3 text-surface-500 dark:text-surface-400">{user.id}</td>
              <td class="p-3 font-medium text-surface-900 dark:text-white">{user.name}</td>
              <td class="p-3 text-surface-600 dark:text-surface-400">{user.email}</td>
              <td class="p-3">
                <Badge size="sm">{user.role}</Badge>
              </td>
              <td class="p-3">
                <Badge size="sm">{user.status}</Badge>
              </td>
            </>
          )}
          style={{ height: '400px' }}
        />
      </DemoSection>

      <DemoSection
        title="Fixed Row Height (Optimized)"
        description={<>Use <CodePill>fixedItemHeight</CodePill> when all rows have the same height for optimal performance.</>}
        code={`<VirtualTable
  data={users}
  fixedItemHeight={48}
  fixedHeaderContent={() => (
    <tr>
      <th class="p-3">ID</th>
      <th class="p-3">Name</th>
      <th class="p-3">Department</th>
      <th class="p-3">Join Date</th>
    </tr>
  )}
  itemContent={(index, user) => (
    <>
      <td class="p-3">{user.id}</td>
      <td class="p-3">{user.name}</td>
      <td class="p-3">{user.department}</td>
      <td class="p-3">{user.joinDate}</td>
    </>
  )}
  style={{ height: '350px' }}
/>`}
      >
        <VirtualTable
          data={users}
          fixedItemHeight={48}
          fixedHeaderContent={() => (
            <tr class="text-left">
              <th class="p-3 w-20 text-surface-600 dark:text-surface-400 font-semibold">ID</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Name</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Department</th>
              <th class="p-3 w-32 text-surface-600 dark:text-surface-400 font-semibold">Join Date</th>
            </tr>
          )}
          itemContent={(index, user) => (
            <>
              <td class="p-3 text-surface-500 dark:text-surface-400">{user.id}</td>
              <td class="p-3 font-medium text-surface-900 dark:text-white">{user.name}</td>
              <td class="p-3 text-surface-600 dark:text-surface-400">{user.department}</td>
              <td class="p-3 text-surface-500 dark:text-surface-400">{user.joinDate}</td>
            </>
          )}
          style={{ height: '350px' }}
        />
      </DemoSection>

      <DemoSection
        title="With Header and Footer"
        description={<>Add a sticky footer using <CodePill>fixedFooterContent</CodePill>. Both header and footer remain visible while scrolling.</>}
        code={`<VirtualTable
  data={users}
  fixedHeaderContent={() => (
    <tr>
      <th class="p-3">ID</th>
      <th class="p-3">Name</th>
      <th class="p-3">Email</th>
      <th class="p-3">Status</th>
    </tr>
  )}
  itemContent={(index, user) => (
    <>
      <td class="p-3">{user.id}</td>
      <td class="p-3">{user.name}</td>
      <td class="p-3">{user.email}</td>
      <td class="p-3"><Badge>{user.status}</Badge></td>
    </>
  )}
  fixedFooterContent={() => (
    <tr class="bg-surface-100">
      <td class="p-3 font-semibold" colspan={3}>Total Users</td>
      <td class="p-3 font-semibold">{users.length}</td>
    </tr>
  )}
  style={{ height: '350px' }}
/>`}
      >
        <VirtualTable
          data={users.slice(0, 100)}
          fixedItemHeight={48}
          fixedHeaderContent={() => (
            <tr class="text-left">
              <th class="p-3 w-20 text-surface-600 dark:text-surface-400 font-semibold">ID</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Name</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Email</th>
              <th class="p-3 w-28 text-surface-600 dark:text-surface-400 font-semibold">Status</th>
            </tr>
          )}
          itemContent={(index, user) => (
            <>
              <td class="p-3 text-surface-500 dark:text-surface-400">{user.id}</td>
              <td class="p-3 font-medium text-surface-900 dark:text-white">{user.name}</td>
              <td class="p-3 text-surface-600 dark:text-surface-400">{user.email}</td>
              <td class="p-3">
                <Badge variant={statusColors[user.status]} size="sm">{user.status}</Badge>
              </td>
            </>
          )}
          fixedFooterContent={() => (
            <tr class="bg-surface-100 dark:bg-surface-800">
              <td class="p-3 font-semibold text-surface-900 dark:text-white" colspan={3}>
                Total Users
              </td>
              <td class="p-3 font-semibold text-surface-900 dark:text-white">
                100
              </td>
            </tr>
          )}
          style={{ height: '350px' }}
        />
      </DemoSection>

      <DemoSection
        title="Scroll to Index"
        description={<>Use the <CodePill>ref</CodePill> prop to get a handle for programmatic scrolling.</>}
        code={`let tableRef: VirtualHandle;

<Button onClick={() => tableRef.scrollToIndex(500)}>
  Go to row 500
</Button>

<Button onClick={() => tableRef.scrollToIndex({
  index: 500,
  align: 'center',
  behavior: 'smooth'
})}>
  Smooth Scroll (Center)
</Button>

<VirtualTable
  ref={(handle) => (tableRef = handle)}
  data={users}
  fixedHeaderContent={() => <tr>...</tr>}
  itemContent={(index, user) => <Cells user={user} />}
  style={{ height: '300px' }}
/>`}
      >
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <input
              type="number"
              value={scrollIndex()}
              onInput={(e) => setScrollIndex(parseInt(e.currentTarget.value) || 0)}
              class="w-24 px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-white"
              min={0}
              max={9999}
            />
            <Button onClick={() => tableRef?.scrollToIndex(scrollIndex())}>
              Scroll to Row
            </Button>
            <Button variant="secondary" onClick={() => tableRef?.scrollToIndex({ index: scrollIndex(), align: 'center', behavior: 'smooth' })}>
              Smooth Scroll (Center)
            </Button>
          </div>
          <VirtualTable
            ref={(handle) => (tableRef = handle)}
            data={users}
            fixedItemHeight={48}
            fixedHeaderContent={() => (
              <tr class="text-left">
                <th class="p-3 w-20 text-surface-600 dark:text-surface-400 font-semibold">Row</th>
                <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Name</th>
                <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Email</th>
              </tr>
            )}
            itemContent={(index, user) => (
              <>
                <td class="p-3 text-surface-500 dark:text-surface-400">{index}</td>
                <td class="p-3 font-medium text-surface-900 dark:text-white">{user.name}</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">{user.email}</td>
              </>
            )}
            style={{ height: '300px' }}
          />
        </div>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'data', type: 'readonly D[]', default: '-', description: 'Array of data items' },
            { name: 'totalCount', type: 'number', default: '-', description: 'Total count (alternative to data)' },
            { name: 'itemContent', type: '(index, data, context) => JSX.Element', default: 'required', description: 'Row cell renderer' },
            { name: 'fixedHeaderContent', type: '() => JSX.Element', default: '-', description: 'Sticky header content' },
            { name: 'fixedFooterContent', type: '() => JSX.Element', default: '-', description: 'Sticky footer content' },
            { name: 'fixedItemHeight', type: 'number', default: '-', description: 'Fixed row height optimization' },
            { name: 'defaultItemHeight', type: 'number', default: '48', description: 'Estimated row height' },
            { name: 'overscan', type: 'number', default: '5', description: 'Extra rows to render outside viewport' },
            { name: 'initialScrollTop', type: 'number', default: '-', description: 'Initial scroll position' },
            { name: 'initialTopMostItemIndex', type: 'number', default: '-', description: 'Initial row to show' },
            { name: 'components', type: 'TableComponents', default: '-', description: 'Custom table components' },
            { name: 'endReached', type: '(index) => void', default: '-', description: 'Called when end is reached' },
            { name: 'ref', type: '(handle) => void', default: '-', description: 'Get imperative handle' },
          ]}
        />
      </DemoSection>

      <DemoSection title="TableComponents" description={<>Customize table elements using the <CodePill>components</CodePill> prop.</>} card={false}>
        <PropsTable
          compact
          props={[
            { name: 'Table', type: '', description: 'Custom table element' },
            { name: 'TableHead', type: '', description: 'Custom thead element' },
            { name: 'TableBody', type: '', description: 'Custom tbody element' },
            { name: 'TableFoot', type: '', description: 'Custom tfoot element' },
            { name: 'TableRow', type: '', description: 'Custom tr element' },
            { name: 'Scroller', type: '', description: 'Custom scroll container' },
            { name: 'EmptyPlaceholder', type: '', description: 'Empty state component' },
            { name: 'FillerRow', type: '', description: 'Spacing row for virtualization' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Handle Methods" card={false}>
        <PropsTable
          compact
          props={[
            { name: 'scrollToIndex(location)', type: '', description: 'Scroll to a specific row. Accepts number or { index, align, behavior }' },
            { name: 'scrollTo({ top, behavior })', type: '', description: 'Scroll to a specific offset' },
            { name: 'scrollBy({ top, behavior })', type: '', description: 'Scroll by a delta amount' },
            { name: 'getScrollTop()', type: '', description: 'Get current scroll position' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
