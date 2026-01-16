import { Tabs } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';
import type { TabItem } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill, StateDisplay, VariantShowcase } from '../../components/demo';

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
      <PageHeader
        title="Tabs"
        description="Tab navigation component with multiple variants, sizes, and orientations. Supports controlled and uncontrolled modes, lazy loading, and state preservation."
      />

      <DemoSection
        title="Import"
        code={`import { Tabs } from 'glass-ui-solid';
import type { TabItem } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Basic Usage"
        code={`<Tabs
  items={[
    { id: 'tab1', label: 'Overview', content: <Overview /> },
    { id: 'tab2', label: 'Details', content: <Details /> },
    { id: 'tab3', label: 'Settings', content: <Settings /> },
  ]}
/>`}
      >
        <Tabs items={basicItems} />
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Tabs size="sm" items={items} />
<Tabs size="md" items={items} />
<Tabs size="lg" items={items} />`}
        card={false}
      >
        <VariantShowcase variants={['sm', 'md', 'lg']} label="Size">
          {(size) => <Tabs size={size} items={basicItems} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Full Width"
        code={`<Tabs fullWidth items={items} />`}
      >
        <Tabs fullWidth items={basicItems} />
      </DemoSection>

      <DemoSection
        title="Vertical Orientation"
        code={`<Tabs orientation="vertical" items={items} />`}
      >
        <Tabs orientation="vertical" items={verticalItems} />
      </DemoSection>

      <DemoSection
        title="With Badges"
        code={`<Tabs
  items={[
    { id: 'all', label: 'All', content: <All /> },
    { id: 'unread', label: 'Unread', badge: 5, content: <Unread /> },
    { id: 'flagged', label: 'Flagged', badge: 2, content: <Flagged /> },
  ]}
/>`}
      >
        <Tabs items={itemsWithBadges} />
      </DemoSection>

      <DemoSection
        title="Disabled Tabs"
        code={`<Tabs
  items={[
    { id: 'tab1', label: 'Active', content: <p>Active tab</p> },
    { id: 'tab2', label: 'Disabled', disabled: true, content: <p>Hidden</p> },
    { id: 'tab3', label: 'Also Active', content: <p>Another tab</p> },
  ]}
/>`}
      >
        <Tabs items={itemsWithDisabled} />
      </DemoSection>

      <DemoSection
        title="Controlled Mode"
        code={`const [activeTab, setActiveTab] = createSignal('tab1');

<Tabs
  activeTab={activeTab()}
  onTabChange={setActiveTab}
  items={items}
/>

// External controls
<Button onClick={() => setActiveTab('tab1')}>Go to Tab 1</Button>
<Button onClick={() => setActiveTab('tab2')}>Go to Tab 2</Button>`}
      >
        <StateDisplay label="Active tab" value={controlledTab()} />
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
      </DemoSection>

      <DemoSection
        title="Lazy Loading"
        description={
          <>
            Use the <CodePill>lazy</CodePill> prop to only render tab content when active.
            Combine with <CodePill>keepMounted</CodePill> to preserve state after switching away.
          </>
        }
        code={`// Only render when active (default: lazy={true})
<Tabs lazy items={items} />

// Keep content mounted after visiting (preserves state)
<Tabs lazy keepMounted items={items} />`}
      />

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'items', type: 'TabItem[]', default: 'required', description: 'Tab items array' },
            { name: 'defaultTab', type: 'string', default: 'first item', description: 'Initial active tab (uncontrolled)' },
            { name: 'activeTab', type: 'string', description: 'Active tab (controlled)' },
            { name: 'onTabChange', type: '(tabId: string) => void', description: 'Tab change callback' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tab size' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch tabs to fill width' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Tab orientation' },
            { name: 'lazy', type: 'boolean', default: 'true', description: 'Only render active tab content' },
            { name: 'keepMounted', type: 'boolean', default: 'false', description: 'Keep inactive content mounted' },
            { name: 'tabListClass', type: 'string', description: 'Tab list container class' },
            { name: 'contentClass', type: 'string', description: 'Content panel class' },
          ]}
        />
      </DemoSection>

      <DemoSection title="TabItem">
        <PropsTable
          compact
          props={[
            { name: 'id', type: 'string', description: 'Unique identifier' },
            { name: 'label', type: 'string', description: 'Tab label text' },
            { name: 'content', type: 'JSX.Element', description: 'Tab content' },
            { name: 'icon', type: 'JSX.Element', description: 'Icon before label' },
            { name: 'badge', type: 'number | string', description: 'Badge count or text' },
            { name: 'disabled', type: 'boolean', description: 'Disable the tab' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
