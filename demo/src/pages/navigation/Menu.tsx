import { Menu, Button } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function MenuPage() {
  const handleAction = (action: string) => {
    console.log(`Action: ${action}`);
  };

  return (
    <div class="space-y-8">
      <PageHeader
        title="Menu"
        description="Dropdown menu triggered by a button with keyboard navigation support."
      />

      <DemoSection
        title="Import"
        code="import { Menu } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`<Menu
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', onClick: () => console.log('Edit') },
    { label: 'Duplicate', onClick: () => console.log('Duplicate') },
    { divider: true },
    { label: 'Delete', onClick: () => console.log('Delete') },
  ]}
/>`}
      >
        <Menu
          trigger={<Button>Actions</Button>}
          items={[
            { label: 'Edit', onClick: () => handleAction('Edit') },
            { label: 'Duplicate', onClick: () => handleAction('Duplicate') },
            { divider: true },
            { label: 'Delete', onClick: () => handleAction('Delete') },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="With Icons"
        code={`<Menu
  trigger={<Button variant="secondary">Options</Button>}
  items={[
    { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { label: 'Copy', icon: <CopyIcon />, onClick: handleCopy },
    { divider: true },
    { label: 'Delete', icon: <TrashIcon />, onClick: handleDelete },
  ]}
/>`}
      >
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
      </DemoSection>

      <DemoSection
        title="Disabled Items"
        code={`<Menu
  trigger={<Button>With Disabled</Button>}
  items={[
    { label: 'Available', onClick: handleClick },
    { label: 'Unavailable', disabled: true },
    { label: 'Also Available', onClick: handleClick },
  ]}
/>`}
      >
        <Menu
          trigger={<Button>With Disabled</Button>}
          items={[
            { label: 'Available', onClick: () => handleAction('Available') },
            { label: 'Unavailable', disabled: true },
            { label: 'Also Available', onClick: () => handleAction('Also Available') },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Placement"
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
      >
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
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'trigger', type: 'JSX.Element', default: 'required', description: 'Trigger element' },
            { name: 'items', type: 'MenuItem[]', default: 'required', description: 'Menu items array' },
            { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Menu placement relative to trigger' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection title="MenuItem Type">
        <PropsTable
          props={[
            { name: 'label', type: 'string', default: 'required*', description: 'Display label (*required unless divider is true)' },
            { name: 'onClick', type: '() => void', description: 'Click handler' },
            { name: 'icon', type: 'JSX.Element', description: 'Optional icon element' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the item' },
            { name: 'divider', type: 'boolean', default: 'false', description: 'Render as a divider line' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
