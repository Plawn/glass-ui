import { Breadcrumb, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Breadcrumb</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Navigation breadcrumbs showing the current location within a hierarchy. The last item is displayed as the current page.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Breadcrumb } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Electronics', href: '/products/electronics' },
              { label: 'Laptops' },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops' },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Click Handlers</h2>
        <Card class="p-6">
          <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
            Last clicked: <span class="font-mono">{lastClicked() ?? 'None'}</span>
          </p>
          <Breadcrumb
            items={[
              { label: 'Home', onClick: () => setLastClicked('Home') },
              { label: 'Settings', onClick: () => setLastClicked('Settings') },
              { label: 'Profile' },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Settings', onClick: () => navigate('/settings') },
    { label: 'Profile' },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Icons</h2>
        <Card class="p-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/', icon: <HomeIcon /> },
              { label: 'Documents', href: '/documents', icon: <FolderIcon /> },
              { label: 'Project Files' },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Breadcrumb
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon class="w-4 h-4" /> },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics' },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Separator</h2>
        <Card class="p-6 space-y-4">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Breadcrumb
  items={items}
  separator={<ChevronRightIcon class="w-4 h-4 text-surface-400" />}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">In Page Header</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Long Path</h2>
        <Card class="p-6">
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
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">items</td>
                <td class="py-2 pr-4 font-mono text-xs">BreadcrumbItem[]</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Breadcrumb items to display</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">separator</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">/</td>
                <td class="py-2">Custom separator element</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">class</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">BreadcrumbItem</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2">Display label (required)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">href</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2">Link URL</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">onClick</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2">Click handler for programmatic navigation</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">icon</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2">Optional icon before the label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Behavior</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>The last item is automatically displayed as the current page (non-clickable)</li>
          <li>Previous items are rendered as links (if <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">href</code> is provided) or buttons (if <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">onClick</code> is provided)</li>
          <li>Items with both <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">href</code> and <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">onClick</code> will prevent default link behavior and call the handler</li>
          <li>Icons appear before the label with proper spacing</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>Uses semantic <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">&lt;nav&gt;</code> element with <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">aria-label="Breadcrumb"</code></li>
          <li>Ordered list (<code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">&lt;ol&gt;</code>) for proper hierarchy</li>
          <li>Current page marked with <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">aria-current="page"</code></li>
          <li>Separator elements are hidden from screen readers with <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">aria-hidden="true"</code></li>
        </ul>
      </section>
    </div>
  );
}
