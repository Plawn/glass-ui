import { createSignal, For } from 'solid-js';
import { Sidebar, CodeBlock, Card, Button } from 'glass-ui-solid';
import type { SidebarItem } from 'glass-ui-solid';

// Icon components for demo
const HomeIcon = () => (
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon = () => (
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const FolderIcon = () => (
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default function SidebarPage() {
  const [activeId, setActiveId] = createSignal('home');
  const [collapsed, setCollapsed] = createSignal(false);

  const basicItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'users', label: 'Users', icon: <UsersIcon />, badge: 5 },
    { id: 'analytics', label: 'Analytics', icon: <ChartIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  const nestedItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderIcon />,
      children: [
        { id: 'project-1', label: 'Project Alpha' },
        { id: 'project-2', label: 'Project Beta' },
        { id: 'project-3', label: 'Project Gamma' },
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      children: [
        { id: 'profile', label: 'Profile' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
      ]
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Sidebar</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A navigation sidebar with glassmorphism styling. Supports collapsible mode, nested navigation items, badges, and mobile drawer behavior.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Sidebar } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        <div class="space-y-6">
          {/* Basic Sidebar */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Basic Usage</h3>
            <Card class="p-0 overflow-hidden">
              <div class="flex h-80">
                <Sidebar
                  items={basicItems}
                  activeId={activeId()}
                  onActiveChange={setActiveId}
                />
                <div class="flex-1 p-6 flex items-center justify-center">
                  <p class="text-surface-600 dark:text-surface-400">
                    Active: <span class="font-semibold text-surface-900 dark:text-white">{activeId()}</span>
                  </p>
                </div>
              </div>
            </Card>
            <CodeBlock
              code={`const items = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'users', label: 'Users', icon: <UsersIcon />, badge: 5 },
  { id: 'analytics', label: 'Analytics', icon: <ChartIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

<Sidebar
  items={items}
  activeId={activeId()}
  onActiveChange={setActiveId}
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Collapsible Sidebar */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Collapsible Mode</h3>
            <Card class="p-0 overflow-hidden">
              <div class="flex h-80">
                <Sidebar
                  items={basicItems}
                  activeId={activeId()}
                  onActiveChange={setActiveId}
                  collapsed={collapsed()}
                  onCollapsedChange={setCollapsed}
                />
                <div class="flex-1 p-6 flex flex-col items-center justify-center gap-4">
                  <p class="text-surface-600 dark:text-surface-400">
                    Collapsed: <span class="font-semibold text-surface-900 dark:text-white">{collapsed() ? 'Yes' : 'No'}</span>
                  </p>
                  <Button size="sm" onClick={() => setCollapsed(!collapsed())}>
                    Toggle Collapse
                  </Button>
                </div>
              </div>
            </Card>
            <CodeBlock
              code={`const [collapsed, setCollapsed] = createSignal(false);

<Sidebar
  items={items}
  activeId={activeId()}
  collapsed={collapsed()}
  onCollapsedChange={setCollapsed}
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Nested Navigation */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Nested Navigation</h3>
            <Card class="p-0 overflow-hidden">
              <div class="flex h-96">
                <Sidebar
                  items={nestedItems}
                  activeId={activeId()}
                  onActiveChange={setActiveId}
                />
                <div class="flex-1 p-6 flex items-center justify-center">
                  <p class="text-surface-600 dark:text-surface-400">
                    Active: <span class="font-semibold text-surface-900 dark:text-white">{activeId()}</span>
                  </p>
                </div>
              </div>
            </Card>
            <CodeBlock
              code={`const items = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FolderIcon />,
    children: [
      { id: 'project-1', label: 'Project Alpha' },
      { id: 'project-2', label: 'Project Beta' },
      { id: 'project-3', label: 'Project Gamma' },
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      { id: 'profile', label: 'Profile' },
      { id: 'security', label: 'Security' },
    ]
  },
];

<Sidebar items={items} activeId={activeId()} onActiveChange={setActiveId} />`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* With Header and Footer */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">With Header and Footer</h3>
            <Card class="p-0 overflow-hidden">
              <div class="flex h-96">
                <Sidebar
                  items={basicItems}
                  activeId={activeId()}
                  onActiveChange={setActiveId}
                  header={
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">
                        G
                      </div>
                      <span class="font-semibold text-surface-900 dark:text-white">Glass UI</span>
                    </div>
                  }
                  footer={
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700" />
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-surface-900 dark:text-white truncate">John Doe</p>
                        <p class="text-xs text-surface-500 dark:text-surface-400 truncate">john@example.com</p>
                      </div>
                    </div>
                  }
                />
                <div class="flex-1 p-6 flex items-center justify-center">
                  <p class="text-surface-600 dark:text-surface-400">Main content area</p>
                </div>
              </div>
            </Card>
            <CodeBlock
              code={`<Sidebar
  items={items}
  activeId={activeId()}
  onActiveChange={setActiveId}
  header={
    <div class="flex items-center gap-2">
      <Logo />
      <span class="font-semibold">Glass UI</span>
    </div>
  }
  footer={
    <div class="flex items-center gap-2">
      <Avatar />
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-xs text-surface-500">john@example.com</p>
      </div>
    </div>
  }
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">SidebarItem Interface</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Property</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>id</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">Unique identifier</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>label</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">Display label</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>icon</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">Optional icon element</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>href</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">Optional href for navigation links</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>onClick</code></td>
                <td class="p-3"><code>() =&gt; void</code></td>
                <td class="p-3">Click handler</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>children</code></td>
                <td class="p-3"><code>SidebarItem[]</code></td>
                <td class="p-3">Nested child items for groups</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>badge</code></td>
                <td class="p-3"><code>string | number</code></td>
                <td class="p-3">Optional badge content</td>
              </tr>
              <tr>
                <td class="p-3"><code>disabled</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3">Whether the item is disabled</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>items</code></td>
                <td class="p-3"><code>SidebarItem[]</code></td>
                <td class="p-3">required</td>
                <td class="p-3">Navigation items</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>activeId</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Currently active item ID</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>onActiveChange</code></td>
                <td class="p-3"><code>(id: string) =&gt; void</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Callback when active item changes</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>collapsed</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3"><code>false</code></td>
                <td class="p-3">Whether sidebar is collapsed (icon-only)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>onCollapsedChange</code></td>
                <td class="p-3"><code>(collapsed: boolean) =&gt; void</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Callback when collapsed state changes</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>header</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Header content slot</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>footer</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Footer content slot</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>width</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3"><code>'240px'</code></td>
                <td class="p-3">Sidebar width when expanded</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>collapsedWidth</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3"><code>'64px'</code></td>
                <td class="p-3">Sidebar width when collapsed</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>class</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td class="p-3"><code>style</code></td>
                <td class="p-3"><code>JSX.CSSProperties</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Inline styles</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Features</h2>
        <Card class="p-6">
          <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
            <li>Automatic mobile drawer behavior below 768px viewport width</li>
            <li>Escape key closes mobile drawer</li>
            <li>Body scroll lock when mobile drawer is open</li>
            <li>Nested navigation with expand/collapse animations</li>
            <li>Badge support for notification counts</li>
            <li>Smooth width transitions when collapsing</li>
            <li>Tooltips on collapsed items showing full labels</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
