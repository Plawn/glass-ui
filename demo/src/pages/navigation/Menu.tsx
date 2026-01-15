import { Menu, Button, CodeBlock, Card } from 'glass-ui-solid';

export default function MenuPage() {
  const handleAction = (action: string) => {
    console.log(`Action: ${action}`);
  };

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Menu</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Dropdown menu triggered by a button with keyboard navigation support.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Menu } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Menu
            trigger={<Button>Actions</Button>}
            items={[
              { label: 'Edit', onClick: () => handleAction('Edit') },
              { label: 'Duplicate', onClick: () => handleAction('Duplicate') },
              { divider: true },
              { label: 'Delete', onClick: () => handleAction('Delete') },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Menu
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', onClick: () => console.log('Edit') },
    { label: 'Duplicate', onClick: () => console.log('Duplicate') },
    { divider: true },
    { label: 'Delete', onClick: () => console.log('Delete') },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Icons</h2>
        <Card class="p-6">
          <Menu
            trigger={<Button variant="secondary">Options</Button>}
            items={[
              {
                label: 'Edit',
                icon: (
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
                onClick: () => handleAction('Edit'),
              },
              {
                label: 'Copy',
                icon: (
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                onClick: () => handleAction('Copy'),
              },
              { divider: true },
              {
                label: 'Delete',
                icon: (
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                ),
                onClick: () => handleAction('Delete'),
              },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Menu
  trigger={<Button variant="secondary">Options</Button>}
  items={[
    { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { label: 'Copy', icon: <CopyIcon />, onClick: handleCopy },
    { divider: true },
    { label: 'Delete', icon: <TrashIcon />, onClick: handleDelete },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled Items</h2>
        <Card class="p-6">
          <Menu
            trigger={<Button>With Disabled</Button>}
            items={[
              { label: 'Available', onClick: () => handleAction('Available') },
              { label: 'Unavailable', disabled: true },
              { label: 'Also Available', onClick: () => handleAction('Also Available') },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Menu
  trigger={<Button>With Disabled</Button>}
  items={[
    { label: 'Available', onClick: handleClick },
    { label: 'Unavailable', disabled: true },
    { label: 'Also Available', onClick: handleClick },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Placement</h2>
        <Card class="p-6">
          <div class="flex flex-wrap gap-4">
            <Menu
              trigger={<Button variant="ghost">Bottom Start</Button>}
              placement="bottom-start"
              items={[
                { label: 'Option 1', onClick: () => {} },
                { label: 'Option 2', onClick: () => {} },
              ]}
            />
            <Menu
              trigger={<Button variant="ghost">Bottom End</Button>}
              placement="bottom-end"
              items={[
                { label: 'Option 1', onClick: () => {} },
                { label: 'Option 2', onClick: () => {} },
              ]}
            />
            <Menu
              trigger={<Button variant="ghost">Top Start</Button>}
              placement="top-start"
              items={[
                { label: 'Option 1', onClick: () => {} },
                { label: 'Option 2', onClick: () => {} },
              ]}
            />
            <Menu
              trigger={<Button variant="ghost">Top End</Button>}
              placement="top-end"
              items={[
                { label: 'Option 1', onClick: () => {} },
                { label: 'Option 2', onClick: () => {} },
              ]}
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Menu
  trigger={<Button>Bottom Start</Button>}
  placement="bottom-start"
  items={items}
/>
<Menu
  trigger={<Button>Bottom End</Button>}
  placement="bottom-end"
  items={items}
/>
<Menu
  trigger={<Button>Top Start</Button>}
  placement="top-start"
  items={items}
/>
<Menu
  trigger={<Button>Top End</Button>}
  placement="top-end"
  items={items}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">trigger</td>
                <td class="p-3 font-mono text-xs">JSX.Element</td>
                <td class="p-3">required</td>
                <td class="p-3">Trigger element</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">items</td>
                <td class="p-3 font-mono text-xs">MenuItem[]</td>
                <td class="p-3">required</td>
                <td class="p-3">Menu items array</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">placement</td>
                <td class="p-3 font-mono text-xs">'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'</td>
                <td class="p-3">'bottom-start'</td>
                <td class="p-3">Menu placement relative to trigger</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs">class</td>
                <td class="p-3 font-mono text-xs">string</td>
                <td class="p-3">-</td>
                <td class="p-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">MenuItem Type</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Property</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">label</td>
                <td class="p-3 font-mono text-xs">string</td>
                <td class="p-3">required*</td>
                <td class="p-3">Display label (*required unless divider is true)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">onClick</td>
                <td class="p-3 font-mono text-xs">() =&gt; void</td>
                <td class="p-3">-</td>
                <td class="p-3">Click handler</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">icon</td>
                <td class="p-3 font-mono text-xs">JSX.Element</td>
                <td class="p-3">-</td>
                <td class="p-3">Optional icon element</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">disabled</td>
                <td class="p-3 font-mono text-xs">boolean</td>
                <td class="p-3">false</td>
                <td class="p-3">Disable the item</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs">divider</td>
                <td class="p-3 font-mono text-xs">boolean</td>
                <td class="p-3">false</td>
                <td class="p-3">Render as a divider line</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
