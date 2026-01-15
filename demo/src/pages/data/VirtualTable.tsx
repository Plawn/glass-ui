import { createSignal, For } from 'solid-js';
import { VirtualTable, CodeBlock, Badge, Button, Card } from 'glass-ui-solid';
import type { VirtualHandle } from 'glass-ui-solid';

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
    inactive: 'secondary',
    pending: 'warning',
  } as const;

  const roleColors = {
    Admin: 'primary',
    User: 'secondary',
    Moderator: 'info',
  } as const;

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          VirtualTable
        </h1>
        <p class="text-surface-600 dark:text-surface-400">
          Virtualized table component for large datasets with sticky headers and footers.
          Perfect for displaying tabular data with thousands of rows while maintaining
          smooth scrolling performance.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { VirtualTable } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Basic Example
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          A virtualized table with 10,000 rows and a sticky header. The header stays visible
          while scrolling through the data.
        </p>
        <Card class="p-4 mb-4">
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
                  <Badge variant={roleColors[user.role]} size="sm">{user.role}</Badge>
                </td>
                <td class="p-3">
                  <Badge variant={statusColors[user.status]} size="sm">{user.status}</Badge>
                </td>
              </>
            )}
            style={{ height: '400px' }}
          />
        </Card>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Fixed Row Height (Optimized)
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-primary-600">fixedItemHeight</code> when all rows have the same height
          for optimal performance.
        </p>
        <Card class="p-4 mb-4">
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
        </Card>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Header and Footer
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add a sticky footer using <code class="text-primary-600">fixedFooterContent</code>. Both header
          and footer remain visible while scrolling.
        </p>
        <Card class="p-4 mb-4">
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
        </Card>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Scroll to Index
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use the <code class="text-primary-600">ref</code> prop to get a handle for programmatic scrolling.
        </p>
        <Card class="p-4 mb-4">
          <div class="flex items-center gap-4 mb-4">
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
        </Card>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Prop</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Type</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Default</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
                <For each={[
                  ['data', 'readonly D[]', '-', 'Array of data items'],
                  ['totalCount', 'number', '-', 'Total count (alternative to data)'],
                  ['itemContent', '(index, data, context) => JSX.Element', 'required', 'Row cell renderer'],
                  ['fixedHeaderContent', '() => JSX.Element', '-', 'Sticky header content'],
                  ['fixedFooterContent', '() => JSX.Element', '-', 'Sticky footer content'],
                  ['fixedItemHeight', 'number', '-', 'Fixed row height optimization'],
                  ['defaultItemHeight', 'number', '48', 'Estimated row height'],
                  ['overscan', 'number', '5', 'Extra rows to render outside viewport'],
                  ['initialScrollTop', 'number', '-', 'Initial scroll position'],
                  ['initialTopMostItemIndex', 'number', '-', 'Initial row to show'],
                  ['components', 'TableComponents', '-', 'Custom table components'],
                  ['endReached', '(index) => void', '-', 'Called when end is reached'],
                  ['ref', '(handle) => void', '-', 'Get imperative handle'],
                ]}>
                  {(row) => (
                    <tr>
                      <td class="p-3 font-mono text-primary-600 dark:text-primary-400">{row[0]}</td>
                      <td class="p-3 font-mono text-surface-600 dark:text-surface-400">{row[1]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[2]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[3]}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">TableComponents</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Customize table elements using the <code class="text-primary-600">components</code> prop.
        </p>
        <Card class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Component</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
                <For each={[
                  ['Table', 'Custom table element'],
                  ['TableHead', 'Custom thead element'],
                  ['TableBody', 'Custom tbody element'],
                  ['TableFoot', 'Custom tfoot element'],
                  ['TableRow', 'Custom tr element'],
                  ['Scroller', 'Custom scroll container'],
                  ['EmptyPlaceholder', 'Empty state component'],
                  ['FillerRow', 'Spacing row for virtualization'],
                ]}>
                  {(row) => (
                    <tr>
                      <td class="p-3 font-mono text-primary-600 dark:text-primary-400">{row[0]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[1]}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Handle Methods</h2>
        <Card class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Method</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
                <For each={[
                  ['scrollToIndex(location)', 'Scroll to a specific row. Accepts number or { index, align, behavior }'],
                  ['scrollTo({ top, behavior })', 'Scroll to a specific offset'],
                  ['scrollBy({ top, behavior })', 'Scroll by a delta amount'],
                  ['getScrollTop()', 'Get current scroll position'],
                ]}>
                  {(row) => (
                    <tr>
                      <td class="p-3 font-mono text-primary-600 dark:text-primary-400">{row[0]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[1]}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
