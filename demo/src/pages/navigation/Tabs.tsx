import { Tabs, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';
import type { TabItem } from 'glass-ui-solid';

export default function TabsPage() {
  const [controlledTab, setControlledTab] = createSignal('tab1');

  const basicItems: TabItem[] = [
    { id: 'tab1', label: 'Overview', content: <div class="p-4">Overview content goes here. This is the first tab panel.</div> },
    { id: 'tab2', label: 'Details', content: <div class="p-4">Details content with more specific information.</div> },
    { id: 'tab3', label: 'Settings', content: <div class="p-4">Settings panel for configuration options.</div> },
  ];

  const itemsWithBadges: TabItem[] = [
    { id: 'all', label: 'All', content: <div class="p-4">All items displayed here.</div> },
    { id: 'unread', label: 'Unread', badge: 5, content: <div class="p-4">5 unread items.</div> },
    { id: 'flagged', label: 'Flagged', badge: 2, content: <div class="p-4">2 flagged items.</div> },
  ];

  const itemsWithDisabled: TabItem[] = [
    { id: 'active1', label: 'Active', content: <div class="p-4">This tab is active and clickable.</div> },
    { id: 'disabled', label: 'Disabled', disabled: true, content: <div class="p-4">This content is hidden.</div> },
    { id: 'active2', label: 'Another Active', content: <div class="p-4">Another active tab panel.</div> },
  ];

  const verticalItems: TabItem[] = [
    { id: 'general', label: 'General', content: <div class="p-4">General settings and preferences.</div> },
    { id: 'account', label: 'Account', content: <div class="p-4">Account information and security.</div> },
    { id: 'notifications', label: 'Notifications', content: <div class="p-4">Notification preferences.</div> },
    { id: 'privacy', label: 'Privacy', content: <div class="p-4">Privacy and data settings.</div> },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Tabs</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Tab navigation component with multiple variants, sizes, and orientations. Supports controlled and uncontrolled modes, lazy loading, and state preservation.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { Tabs } from 'glass-ui-solid';
import type { TabItem } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Tabs items={basicItems} />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tabs
  items={[
    { id: 'tab1', label: 'Overview', content: <Overview /> },
    { id: 'tab2', label: 'Details', content: <Details /> },
    { id: 'tab3', label: 'Settings', content: <Settings /> },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <div class="space-y-6">
          <For each={['sm', 'md', 'lg'] as const}>
            {(size) => (
              <Card class="p-6">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">Size: {size}</p>
                <Tabs size={size} items={basicItems} />
              </Card>
            )}
          </For>
        </div>
        <div class="mt-4">
          <CodeBlock
            code={`<Tabs size="sm" items={items} />
<Tabs size="md" items={items} />
<Tabs size="lg" items={items} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Full Width</h2>
        <Card class="p-6">
          <Tabs fullWidth items={basicItems} />
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Tabs fullWidth items={items} />`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Vertical Orientation</h2>
        <Card class="p-6">
          <Tabs orientation="vertical" items={verticalItems} />
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Tabs orientation="vertical" items={items} />`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Badges</h2>
        <Card class="p-6">
          <Tabs items={itemsWithBadges} />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tabs
  items={[
    { id: 'all', label: 'All', content: <All /> },
    { id: 'unread', label: 'Unread', badge: 5, content: <Unread /> },
    { id: 'flagged', label: 'Flagged', badge: 2, content: <Flagged /> },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled Tabs</h2>
        <Card class="p-6">
          <Tabs items={itemsWithDisabled} />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tabs
  items={[
    { id: 'tab1', label: 'Active', content: <p>Active tab</p> },
    { id: 'tab2', label: 'Disabled', disabled: true, content: <p>Hidden</p> },
    { id: 'tab3', label: 'Also Active', content: <p>Another tab</p> },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Controlled Mode</h2>
        <Card class="p-6">
          <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
            Active tab: <span class="font-mono">{controlledTab()}</span>
          </p>
          <Tabs
            activeTab={controlledTab()}
            onTabChange={setControlledTab}
            items={basicItems}
          />
          <div class="flex gap-2 mt-4">
            <For each={basicItems}>
              {(item) => (
                <button
                  class="px-3 py-1.5 text-sm rounded-lg bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                  onClick={() => setControlledTab(item.id)}
                >
                  Go to {item.label}
                </button>
              )}
            </For>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [activeTab, setActiveTab] = createSignal('tab1');

<Tabs
  activeTab={activeTab()}
  onTabChange={setActiveTab}
  items={items}
/>

// External controls
<Button onClick={() => setActiveTab('tab1')}>Go to Tab 1</Button>
<Button onClick={() => setActiveTab('tab2')}>Go to Tab 2</Button>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Lazy Loading</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use the <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">lazy</code> prop to only render tab content when active.
          Combine with <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">keepMounted</code> to preserve state after switching away.
        </p>
        <CodeBlock
          code={`// Only render when active (default: lazy={true})
<Tabs lazy items={items} />

// Keep content mounted after visiting (preserves state)
<Tabs lazy keepMounted items={items} />`}
          language="tsx"
        />
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
                <td class="py-2 pr-4 font-mono text-xs">TabItem[]</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Tab items array</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">defaultTab</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">first item</td>
                <td class="py-2">Initial active tab (uncontrolled)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">activeTab</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Active tab (controlled)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">onTabChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(tabId: string) =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Tab change callback</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Tab size</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">fullWidth</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Stretch tabs to fill width</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">orientation</td>
                <td class="py-2 pr-4 font-mono text-xs">'horizontal' | 'vertical'</td>
                <td class="py-2 pr-4">'horizontal'</td>
                <td class="py-2">Tab orientation</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">lazy</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Only render active tab content</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">keepMounted</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Keep inactive content mounted</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">tabListClass</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Tab list container class</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">contentClass</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Content panel class</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">TabItem</h2>
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
                <td class="py-2 pr-4 font-mono text-xs">id</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2">Unique identifier</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2">Tab label text</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">content</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2">Tab content</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">icon</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2">Icon before label</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">badge</td>
                <td class="py-2 pr-4 font-mono text-xs">number | string</td>
                <td class="py-2">Badge count or text</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2">Disable the tab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
