import { Button, Checkbox, Dropdown } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import {
  CodePill,
  DemoSection,
  FeatureList,
  PageHeader,
  PropsTable,
} from '../../components/demo';

export default function DropdownPage() {
  const [open, setOpen] = createSignal(false);
  const [darkMode, setDarkMode] = createSignal(false);
  const [notifications, setNotifications] = createSignal(true);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Dropdown"
        description="Generic dropdown container for custom content. A simplified wrapper around Popover for common dropdown use cases."
      />

      <DemoSection
        title="Import"
        code="import { Dropdown } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        description="The Dropdown component accepts a trigger element and renders custom content when clicked."
        code={`<Dropdown trigger={<Button>Open Dropdown</Button>}>
  <div class="p-4">
    <p>Custom dropdown content</p>
  </div>
</Dropdown>`}
        cardClass="p-6"
      >
        <Dropdown trigger={<Button>Open Dropdown</Button>}>
          <div class="p-4 w-48">
            <p class="text-sm text-surface-700 dark:text-surface-200">
              This is custom dropdown content. You can put anything here!
            </p>
          </div>
        </Dropdown>
      </DemoSection>

      <DemoSection
        title="Controlled State"
        description={
          <>
            Control the dropdown's open state externally using{' '}
            <CodePill>open</CodePill> and <CodePill>onOpenChange</CodePill>{' '}
            props.
          </>
        }
        code={`const [open, setOpen] = createSignal(false);

<Dropdown
  trigger={<Button>Toggle</Button>}
  open={open()}
  onOpenChange={setOpen}
>
  <div class="p-4">
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Dropdown>`}
        cardClass="p-6"
      >
        <div class="flex items-center gap-4">
          <Dropdown
            trigger={<Button>Controlled Dropdown</Button>}
            open={open()}
            onOpenChange={setOpen}
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-700 dark:text-surface-200 mb-3">
                This dropdown is controlled externally.
              </p>
              <Button size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </Dropdown>
          <span class="text-sm text-surface-500 dark:text-surface-400">
            State: {open() ? 'Open' : 'Closed'}
          </span>
        </div>
      </DemoSection>

      <DemoSection
        title="Placement Options"
        description={
          <>
            Position the dropdown relative to its trigger using the{' '}
            <CodePill>placement</CodePill> prop.
          </>
        }
        code={`<Dropdown trigger={trigger} placement="bottom">
  Bottom centered
</Dropdown>
<Dropdown trigger={trigger} placement="bottom-start">
  Bottom left aligned
</Dropdown>
<Dropdown trigger={trigger} placement="bottom-end">
  Bottom right aligned
</Dropdown>
<Dropdown trigger={trigger} placement="top">
  Top centered
</Dropdown>`}
        cardClass="p-6"
      >
        <div class="flex flex-wrap gap-3">
          <Dropdown
            trigger={<Button variant="secondary">Bottom Start</Button>}
            placement="bottom-start"
          >
            <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">
              Bottom start aligned
            </div>
          </Dropdown>
          <Dropdown
            trigger={<Button variant="secondary">Bottom</Button>}
            placement="bottom"
          >
            <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">
              Bottom centered
            </div>
          </Dropdown>
          <Dropdown
            trigger={<Button variant="secondary">Bottom End</Button>}
            placement="bottom-end"
          >
            <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">
              Bottom end aligned
            </div>
          </Dropdown>
          <Dropdown
            trigger={<Button variant="secondary">Top</Button>}
            placement="top"
          >
            <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">
              Top centered
            </div>
          </Dropdown>
        </div>
      </DemoSection>

      <DemoSection
        title="Settings Panel"
        description={
          <>
            Use <CodePill>contentClass</CodePill> to control the width of the
            dropdown content.
          </>
        }
        code={`<Dropdown
  trigger={<Button>Settings</Button>}
  contentClass="w-80"
>
  <div class="p-4 space-y-4">
    <h3 class="font-semibold">Quick Settings</h3>
    <Checkbox label="Dark mode" checked={dark()} onChange={setDark} />
    <Checkbox label="Notifications" checked={notifs()} onChange={setNotifs} />
  </div>
</Dropdown>`}
        cardClass="p-6"
      >
        <Dropdown trigger={<Button>Settings</Button>} contentClass="w-72">
          <div class="p-4 space-y-4">
            <h3 class="font-semibold text-surface-900 dark:text-white">
              Quick Settings
            </h3>
            <Checkbox
              label="Dark mode"
              checked={darkMode()}
              onChange={setDarkMode}
            />
            <Checkbox
              label="Notifications"
              checked={notifications()}
              onChange={setNotifications}
            />
          </div>
        </Dropdown>
      </DemoSection>

      <DemoSection
        title="User Menu Example"
        description="Dropdowns work great for user menus and navigation."
        code={`<Dropdown
  trigger={
    <button class="flex items-center gap-2">
      <Avatar name={user.name} size="sm" />
      <span>{user.name}</span>
    </button>
  }
>
  <div class="py-2">
    <a href="/profile" class="block px-4 py-2 hover:bg-surface-100">
      Profile
    </a>
    <a href="/settings" class="block px-4 py-2 hover:bg-surface-100">
      Settings
    </a>
    <div class="border-t my-2" />
    <button onClick={logout} class="w-full text-left px-4 py-2 hover:bg-surface-100">
      Sign out
    </button>
  </div>
</Dropdown>`}
        cardClass="p-6"
      >
        <Dropdown
          trigger={
            <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-white/10 transition-colors">
              <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <span class="text-surface-700 dark:text-surface-200">
                John Doe
              </span>
            </button>
          }
        >
          <div class="py-2 w-48">
            <button class="w-full text-left px-4 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-white/10">
              Profile
            </button>
            <button class="w-full text-left px-4 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-white/10">
              Settings
            </button>
            <div class="border-t border-surface-200 dark:border-white/10 my-2" />
            <button class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
              Sign out
            </button>
          </div>
        </Dropdown>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'trigger',
              type: 'JSX.Element',
              default: 'required',
              description: 'Trigger element that opens the dropdown',
            },
            {
              name: 'children',
              type: 'JSX.Element',
              default: 'required',
              description: 'Dropdown content',
            },
            {
              name: 'open',
              type: 'boolean',
              description: 'Controlled open state',
            },
            {
              name: 'onOpenChange',
              type: '(open: boolean) => void',
              description: 'Open state callback',
            },
            {
              name: 'placement',
              type: "'bottom' | 'bottom-start' | ...",
              default: "'bottom-start'",
              description: 'Dropdown placement relative to trigger',
            },
            {
              name: 'contentClass',
              type: 'string',
              description: 'CSS classes for content container',
            },
            {
              name: 'scrollBehavior',
              type: "'close' | 'lock' | 'none'",
              default: "'close'",
              description: 'How to handle scroll when open',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Behavior" card={false}>
        <FeatureList
          items={[
            'Closes on click outside',
            'Closes on Escape key',
            'Positions with viewport boundary detection',
            'Uses Portal to render outside component tree',
          ]}
        />
      </DemoSection>
    </div>
  );
}
