import { Breadcrumb } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, CodePill, StateDisplay } from '../../components/demo';

// Simple icon components for demo
const HomeIcon = () => (
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const FolderIcon = () => (
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg class="w-4 h-4 mx-2 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
  </svg>
);

export default function BreadcrumbPage() {
  const [lastClicked, setLastClicked] = createSignal<string | null>(null);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Breadcrumb"
        description="Navigation breadcrumbs showing the current location within a hierarchy. The last item is displayed as the current page."
      />

      <DemoSection
        title="Import"
        code={`import { Breadcrumb } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Basic Usage"
        code={`<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ]}
/>`}
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Laptops' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="With Click Handlers"
        code={`<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Settings', onClick: () => navigate('/settings') },
    { label: 'Profile' },
  ]}
/>`}
      >
        <StateDisplay label="Last clicked" value={lastClicked() ?? 'None'} />
        <Breadcrumb
          items={[
            { label: 'Home', onClick: () => setLastClicked('Home') },
            { label: 'Settings', onClick: () => setLastClicked('Settings') },
            { label: 'Profile' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="With Icons"
        code={`<Breadcrumb
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon class="w-4 h-4" /> },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics' },
  ]}
/>`}
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <HomeIcon /> },
            { label: 'Documents', href: '/documents', icon: <FolderIcon /> },
            { label: 'Project Files' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Custom Separator"
        code={`<Breadcrumb
  items={items}
  separator={<ChevronRightIcon class="w-4 h-4 text-surface-400" />}
/>`}
      >
        <div class="space-y-4">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">Chevron separator:</p>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Details' },
              ]}
              separator={<ChevronRightIcon />}
            />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">Arrow separator:</p>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'Details' },
              ]}
              separator={<span class="mx-2 text-surface-400" aria-hidden="true">-&gt;</span>}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="In Page Header"
        code={`<div class="space-y-2">
  <Breadcrumb
    items={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Users', href: '/dashboard/users' },
      { label: 'Edit User' },
    ]}
  />
  <h1 class="text-2xl font-semibold">Edit User</h1>
</div>`}
      >
        <div class="space-y-2">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Users', href: '/dashboard/users' },
              { label: 'Edit User' },
            ]}
          />
          <h1 class="text-2xl font-semibold text-surface-900 dark:text-white">Edit User</h1>
          <p class="text-surface-600 dark:text-surface-400">Update user information and permissions.</p>
        </div>
      </DemoSection>

      <DemoSection title="Long Path">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documents', href: '/documents' },
            { label: 'Work', href: '/documents/work' },
            { label: 'Projects', href: '/documents/work/projects' },
            { label: '2024', href: '/documents/work/projects/2024' },
            { label: 'Q4 Report' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'items', type: 'BreadcrumbItem[]', default: 'required', description: 'Breadcrumb items to display' },
            { name: 'separator', type: 'JSX.Element', default: '/', description: 'Custom separator element' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection title="BreadcrumbItem">
        <PropsTable
          compact
          props={[
            { name: 'label', type: 'string', description: 'Display label (required)' },
            { name: 'href', type: 'string', description: 'Link URL' },
            { name: 'onClick', type: '() => void', description: 'Click handler for programmatic navigation' },
            { name: 'icon', type: 'JSX.Element', description: 'Optional icon before the label' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Behavior" card={false}>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>The last item is automatically displayed as the current page (non-clickable)</li>
          <li>Previous items are rendered as links (if <CodePill>href</CodePill> is provided) or buttons (if <CodePill>onClick</CodePill> is provided)</li>
          <li>Items with both <CodePill>href</CodePill> and <CodePill>onClick</CodePill> will prevent default link behavior and call the handler</li>
          <li>Icons appear before the label with proper spacing</li>
        </ul>
      </DemoSection>

      <DemoSection title="Accessibility" card={false}>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>Uses semantic <CodePill>&lt;nav&gt;</CodePill> element with <CodePill>aria-label="Breadcrumb"</CodePill></li>
          <li>Ordered list (<CodePill>&lt;ol&gt;</CodePill>) for proper hierarchy</li>
          <li>Current page marked with <CodePill>aria-current="page"</CodePill></li>
          <li>Separator elements are hidden from screen readers with <CodePill>aria-hidden="true"</CodePill></li>
        </ul>
      </DemoSection>
    </div>
  );
}
