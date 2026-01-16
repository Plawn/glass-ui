import { createSignal } from 'solid-js';
import { Sidebar, Card, Button } from 'glass-ui-solid';
import type { SidebarItem } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, FeatureList } from '../../components/demo';

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

const basicCode = `const items = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'users', label: 'Users', icon: <UsersIcon />, badge: 5 },
  { id: 'analytics', label: 'Analytics', icon: <ChartIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

<Sidebar
  items={items}
  activeId={activeId()}
  onActiveChange={setActiveId}
/>`;

const collapsibleCode = `const [collapsed, setCollapsed] = createSignal(false);

<Sidebar
  items={items}
  activeId={activeId()}
  collapsed={collapsed()}
  onCollapsedChange={setCollapsed}
/>`;

const nestedCode = `const items = [
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

<Sidebar items={items} activeId={activeId()} onActiveChange={setActiveId} />`;

const headerFooterCode = `<Sidebar
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
/>`;

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
      <PageHeader
        title="Sidebar"
        description="A navigation sidebar with glassmorphism styling. Supports collapsible mode, nested navigation items, badges, and mobile drawer behavior."
      />

      <DemoSection title="Import" code="import { Sidebar } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
        <div class="space-y-6">
          {/* Basic Sidebar */}
          <DemoSection title="Basic Usage" subsection code={basicCode} cardClass="p-0 overflow-hidden">
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
          </DemoSection>

          {/* Collapsible Sidebar */}
          <DemoSection title="Collapsible Mode" subsection code={collapsibleCode} cardClass="p-0 overflow-hidden">
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
          </DemoSection>

          {/* Nested Navigation */}
          <DemoSection title="Nested Navigation" subsection code={nestedCode} cardClass="p-0 overflow-hidden">
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
          </DemoSection>

          {/* With Header and Footer */}
          <DemoSection title="With Header and Footer" subsection code={headerFooterCode} cardClass="p-0 overflow-hidden">
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
          </DemoSection>
        </div>
      </DemoSection>

      <DemoSection title="SidebarItem Interface" card={false}>
        <PropsTable
          compact
          props={[
            { name: 'id', type: 'string', description: 'Unique identifier' },
            { name: 'label', type: 'string', description: 'Display label' },
            { name: 'icon', type: 'JSX.Element', description: 'Optional icon element' },
            { name: 'href', type: 'string', description: 'Optional href for navigation links' },
            { name: 'onClick', type: '() => void', description: 'Click handler' },
            { name: 'children', type: 'SidebarItem[]', description: 'Nested child items for groups' },
            { name: 'badge', type: 'string | number', description: 'Optional badge content' },
            { name: 'disabled', type: 'boolean', description: 'Whether the item is disabled' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'items', type: 'SidebarItem[]', default: 'required', description: 'Navigation items' },
            { name: 'activeId', type: 'string', description: 'Currently active item ID' },
            { name: 'onActiveChange', type: '(id: string) => void', description: 'Callback when active item changes' },
            { name: 'collapsed', type: 'boolean', default: 'false', description: 'Whether sidebar is collapsed (icon-only)' },
            { name: 'onCollapsedChange', type: '(collapsed: boolean) => void', description: 'Callback when collapsed state changes' },
            { name: 'header', type: 'JSX.Element', description: 'Header content slot' },
            { name: 'footer', type: 'JSX.Element', description: 'Footer content slot' },
            { name: 'width', type: 'string', default: "'240px'", description: 'Sidebar width when expanded' },
            { name: 'collapsedWidth', type: 'string', default: "'64px'", description: 'Sidebar width when collapsed' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
            { name: 'style', type: 'JSX.CSSProperties', description: 'Inline styles' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Features">
        <FeatureList
          checkmarks
          items={[
            'Automatic mobile drawer behavior below 768px viewport width',
            'Escape key closes mobile drawer',
            'Body scroll lock when mobile drawer is open',
            'Nested navigation with expand/collapse animations',
            'Badge support for notification counts',
            'Smooth width transitions when collapsing',
            'Tooltips on collapsed items showing full labels',
          ]}
        />
      </DemoSection>
    </div>
  );
}
