import { createSignal, For, Show, createMemo, type JSX } from 'solid-js';
import { VirtualTable, Badge, Button } from 'glass-ui-solid';
import type { VirtualHandle } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill, StateDisplay } from '../../components/demo';

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

      {/* Expandable Rows with Virtualization */}
      <ExpandableVirtualTableDemo />

      {/* Expandable Rows with Sub-items in Same Columns */}
      <ExpandableSubItemsDemo />

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

// =============================================================================
// EXPANDABLE ROWS WITH VIRTUALIZATION DEMO
// =============================================================================

interface UserWithDetails {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Moderator';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  phone: string;
  address: string;
  projects: string[];
}

// Generate users with extra details for expansion
const generateUsersWithDetails = (count: number): UserWithDetails[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    department: departments[i % departments.length],
    phone: `+1 (555) ${String(100 + (i % 900)).padStart(3, '0')}-${String(1000 + (i % 9000)).padStart(4, '0')}`,
    address: `${100 + i} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm Blvd', 'Maple Dr'][i % 5]}, ${['San Francisco', 'New York', 'Austin', 'Seattle', 'Denver'][i % 5]}`,
    projects: [
      ['Platform Core', 'API Gateway', 'Auth Service'],
      ['Brand Campaign', 'Social Media', 'Analytics'],
      ['Blog Revamp', 'Documentation', 'Tutorials'],
      ['Enterprise Deals', 'Partner Program'],
      ['Forum Moderation', 'User Support', 'Community Events'],
    ][i % 5],
  }));

// Chevron icon for expand/collapse
const ChevronIcon = (props: { expanded: boolean; class?: string }) => (
  <svg
    class={`w-4 h-4 transition-transform duration-200 ${props.expanded ? 'rotate-90' : ''} ${props.class ?? ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
  </svg>
);

// Expanded content component for a user
const ExpandedUserContent = (props: { user: UserWithDetails }) => (
  <div class="px-4 py-3 bg-surface-50/50 dark:bg-surface-800/30 border-t border-surface-200/50 dark:border-surface-700/50">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
          Phone
        </p>
        <p class="text-sm text-surface-900 dark:text-white">
          {props.user.phone}
        </p>
      </div>
      <div>
        <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
          Department
        </p>
        <p class="text-sm text-surface-900 dark:text-white">
          {props.user.department}
        </p>
      </div>
      <div class="lg:col-span-2">
        <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1">
          Address
        </p>
        <p class="text-sm text-surface-900 dark:text-white">
          {props.user.address}
        </p>
      </div>
      <div class="md:col-span-2 lg:col-span-4">
        <p class="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-2">
          Projects
        </p>
        <div class="flex flex-wrap gap-2">
          <For each={props.user.projects}>
            {(project) => (
              <Badge variant="info" size="sm">{project}</Badge>
            )}
          </For>
        </div>
      </div>
    </div>
  </div>
);

function ExpandableVirtualTableDemo() {
  const usersWithDetails = generateUsersWithDetails(1000);
  const [expandedKeys, setExpandedKeys] = createSignal<Set<number>>(new Set([1, 2])); // First two expanded

  const toggleExpand = (id: number, e?: MouseEvent) => {
    e?.stopPropagation();
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const statusColors = {
    active: 'success',
    inactive: 'default',
    pending: 'warning',
  } as const;

  return (
    <DemoSection
      title="Expandable Rows (Virtualized)"
      description="Expandable rows with virtualization. Click the chevron to expand. The expanded content is rendered inside the row itself, allowing the virtualizer to measure the new height automatically."
      code={`// For VirtualTable, render expanded content inside itemContent
// The virtualizer automatically measures and adjusts to new heights

const [expandedKeys, setExpandedKeys] = createSignal<Set<number>>(new Set());

const toggleExpand = (id: number) => {
  setExpandedKeys(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
};

<VirtualTable
  data={users}
  context={{ expandedKeys: expandedKeys(), toggleExpand }}
  // DON'T use fixedItemHeight - heights are variable!
  defaultItemHeight={48}
  itemContent={(index, user, ctx) => {
    const isExpanded = ctx.expandedKeys.has(user.id);
    return (
      <>
        <td class="p-3" colspan={5}>
          {/* Row content wrapper */}
          <div class="flex items-center gap-4">
            <ChevronIcon expanded={isExpanded} onClick={() => ctx.toggleExpand(user.id)} />
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
          {/* Expanded content - inside same cell */}
          <Show when={isExpanded}>
            <div class="mt-3 p-3 bg-surface-50 rounded">
              <p>Phone: {user.phone}</p>
              <p>Department: {user.department}</p>
            </div>
          </Show>
        </td>
      </>
    );
  }}
  style={{ height: '400px' }}
/>`}
    >
      <div class="space-y-4">
        <div class="flex gap-2 items-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpandedKeys(new Set(usersWithDetails.slice(0, 10).map(u => u.id)))}
          >
            Expand First 10
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpandedKeys(new Set<number>())}
          >
            Collapse All
          </Button>
          <StateDisplay label="Expanded" value={`${expandedKeys().size} row(s)`} />
        </div>

        <VirtualTable
          data={usersWithDetails}
          context={{ expandedKeys: expandedKeys(), toggleExpand }}
          defaultItemHeight={48}
          fixedHeaderContent={() => (
            <tr class="text-left">
              <th class="w-10 p-3 text-surface-600 dark:text-surface-400 font-semibold" />
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Name</th>
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Email</th>
              <th class="p-3 w-28 text-surface-600 dark:text-surface-400 font-semibold">Role</th>
              <th class="p-3 w-28 text-surface-600 dark:text-surface-400 font-semibold">Status</th>
            </tr>
          )}
          itemContent={(index, user, ctx) => {
            const isExpanded = () => ctx.expandedKeys.has(user.id);
            return (
              <td class="p-0 border-b border-surface-100/50 dark:border-surface-800/50" colspan={5}>
                {/* Main row content */}
                <div
                  class={`flex items-center cursor-pointer hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors ${isExpanded() ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
                  onClick={(e) => ctx.toggleExpand(user.id, e)}
                >
                  <div class="w-10 p-3 text-center">
                    <button class="p-1 rounded hover:bg-surface-200/50 dark:hover:bg-surface-700/50 transition-colors">
                      <ChevronIcon expanded={isExpanded()} class="text-surface-500" />
                    </button>
                  </div>
                  <div class="flex-1 p-3 font-medium text-surface-900 dark:text-white">
                    {user.name}
                  </div>
                  <div class="flex-1 p-3 text-surface-600 dark:text-surface-400">
                    {user.email}
                  </div>
                  <div class="w-28 p-3">
                    <Badge size="sm">{user.role}</Badge>
                  </div>
                  <div class="w-28 p-3">
                    <Badge variant={statusColors[user.status]} size="sm">{user.status}</Badge>
                  </div>
                </div>
                {/* Expanded content with CSS Grid animation */}
                <div
                  class="grid transition-[grid-template-rows] duration-150 ease-out"
                  style={{ "grid-template-rows": isExpanded() ? "1fr" : "0fr" }}
                >
                  <div class="overflow-hidden">
                    <ExpandedUserContent user={user} />
                  </div>
                </div>
              </td>
            );
          }}
          style={{ height: '450px' }}
        />
      </div>
    </DemoSection>
  );
}

// =============================================================================
// EXPANDABLE SUB-ITEMS IN SAME COLUMNS DEMO
// =============================================================================

interface Task {
  id: string;
  name: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface UserWithTasks {
  id: number;
  name: string;
  role: 'Admin' | 'User' | 'Moderator';
  tasksCount: number;
  tasks: Task[];
}

const taskStatusColors = {
  todo: 'default',
  in_progress: 'warning',
  done: 'success',
} as const;

const taskPriorityColors = {
  low: 'default',
  high: 'error',
  medium: 'warning',
} as const;

// Generate users with tasks
const generateUsersWithTasks = (count: number): UserWithTasks[] =>
  Array.from({ length: count }, (_, i) => {
    const taskCount = 2 + (i % 4); // 2-5 tasks per user
    return {
      id: i + 1,
      name: `User ${i + 1}`,
      role: roles[i % roles.length],
      tasksCount: taskCount,
      tasks: Array.from({ length: taskCount }, (_, j) => ({
        id: `${i + 1}-${j + 1}`,
        name: [
          'Review PR #' + (100 + j),
          'Update documentation',
          'Fix bug in auth',
          'Implement feature X',
          'Write unit tests',
        ][j % 5],
        status: (['todo', 'in_progress', 'done'] as const)[j % 3],
        priority: (['low', 'medium', 'high'] as const)[j % 3],
        dueDate: new Date(2024, 0, 15 + j).toLocaleDateString(),
      })),
    };
  });

function ExpandableSubItemsDemo() {
  const usersWithTasks = generateUsersWithTasks(500);
  const [expandedKeys, setExpandedKeys] = createSignal<Set<number>>(new Set([1]));

  const toggleExpand = (id: number, e?: MouseEvent) => {
    e?.stopPropagation();
    setExpandedKeys(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <DemoSection
      title="Sub-Items in Same Columns"
      description="Expanded content shows sub-items (tasks) aligned with the same column structure as the parent row. This creates a tree-like table view."
      code={`// Sub-items use the same column layout as parent rows
<VirtualTable
  data={usersWithTasks}
  context={{ expandedKeys: expandedKeys(), toggleExpand }}
  itemContent={(index, user, ctx) => {
    const isExpanded = ctx.expandedKeys.has(user.id);
    return (
      <td colspan={4} class="p-0">
        {/* Parent row */}
        <div class="flex items-center" onClick={() => ctx.toggleExpand(user.id)}>
          <div class="w-10"><ChevronIcon expanded={isExpanded} /></div>
          <div class="flex-1">{user.name}</div>
          <div class="w-24">{user.role}</div>
          <div class="w-20">{user.tasksCount} tasks</div>
        </div>
        {/* Sub-items with same column alignment */}
        <div class="grid" style={{ "grid-template-rows": isExpanded ? "1fr" : "0fr" }}>
          <div class="overflow-hidden">
            <For each={user.tasks}>
              {(task) => (
                <div class="flex items-center pl-10 bg-surface-50">
                  <div class="w-10" /> {/* Indent spacer */}
                  <div class="flex-1">{task.name}</div>
                  <div class="w-24"><Badge>{task.status}</Badge></div>
                  <div class="w-20">{task.dueDate}</div>
                </div>
              )}
            </For>
          </div>
        </div>
      </td>
    );
  }}
/>`}
    >
      <div class="space-y-4">
        <div class="flex gap-2 items-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpandedKeys(new Set(usersWithTasks.slice(0, 5).map(u => u.id)))}
          >
            Expand First 5
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpandedKeys(new Set<number>())}
          >
            Collapse All
          </Button>
          <StateDisplay label="Expanded" value={`${expandedKeys().size} row(s)`} />
        </div>

        <VirtualTable
          data={usersWithTasks}
          context={{ expandedKeys: expandedKeys(), toggleExpand }}
          defaultItemHeight={48}
          fixedHeaderContent={() => (
            <tr class="text-left">
              <th class="w-10 p-3 text-surface-600 dark:text-surface-400 font-semibold" />
              <th class="p-3 text-surface-600 dark:text-surface-400 font-semibold">Name / Task</th>
              <th class="p-3 w-32 text-surface-600 dark:text-surface-400 font-semibold">Role / Status</th>
              <th class="p-3 w-32 text-surface-600 dark:text-surface-400 font-semibold">Tasks / Priority</th>
              <th class="p-3 w-28 text-surface-600 dark:text-surface-400 font-semibold">Due Date</th>
            </tr>
          )}
          itemContent={(_, user, ctx) => {
            const isExpanded = () => ctx.expandedKeys.has(user.id);
            return (
              <td class="p-0 border-b border-surface-100/50 dark:border-surface-800/50" colspan={5}>
                {/* Parent row */}
                <div
                  class={`flex items-center cursor-pointer hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors ${isExpanded() ? 'bg-primary-50/30 dark:bg-primary-900/10 font-medium' : ''}`}
                  onClick={(e) => ctx.toggleExpand(user.id, e)}
                >
                  <div class="w-10 p-3 text-center">
                    <button class="p-1 rounded hover:bg-surface-200/50 dark:hover:bg-surface-700/50 transition-colors">
                      <ChevronIcon expanded={isExpanded()} class="text-surface-500" />
                    </button>
                  </div>
                  <div class="flex-1 p-3 text-surface-900 dark:text-white">
                    {user.name}
                  </div>
                  <div class="w-32 p-3">
                    <Badge size="sm">{user.role}</Badge>
                  </div>
                  <div class="w-32 p-3 text-surface-600 dark:text-surface-400">
                    {user.tasksCount} tasks
                  </div>
                  <div class="w-28 p-3 text-surface-400">
                    —
                  </div>
                </div>

                {/* Sub-items (tasks) with same column alignment */}
                <div
                  class="grid transition-[grid-template-rows] duration-150 ease-out"
                  style={{ "grid-template-rows": isExpanded() ? "1fr" : "0fr" }}
                >
                  <div class="overflow-hidden">
                    <For each={user.tasks}>
                      {(task, taskIndex) => (
                        <div
                          class={`flex items-center bg-surface-50/50 dark:bg-surface-800/20 hover:bg-surface-100/50 dark:hover:bg-surface-700/30 transition-colors ${taskIndex() === user.tasks.length - 1 ? '' : 'border-b border-surface-100/50 dark:border-surface-800/50'}`}
                        >
                          <div class="w-10 p-3 text-center">
                            {/* Empty spacer for alignment */}
                          </div>
                          <div class="flex-1 p-3 pl-6 text-sm text-surface-700 dark:text-surface-300">
                            <span class="text-surface-400 dark:text-surface-500 mr-2">↳</span>
                            {task.name}
                          </div>
                          <div class="w-32 p-3">
                            <Badge size="sm" variant={taskStatusColors[task.status]}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div class="w-32 p-3">
                            <Badge size="sm" variant={taskPriorityColors[task.priority]}>
                              {task.priority}
                            </Badge>
                          </div>
                          <div class="w-28 p-3 text-sm text-surface-500 dark:text-surface-400">
                            {task.dueDate}
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </td>
            );
          }}
          style={{ height: '450px' }}
        />
      </div>
    </DemoSection>
  );
}
