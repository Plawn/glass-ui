import { createSignal } from 'solid-js';
import { Popover, Button, Avatar } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill } from '../../components/demo';

export default function PopoverPage() {
  const [controlled, setControlled] = createSignal(false);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Popover"
        description="Click-triggered floating content panels for displaying rich interactive content."
      />

      <DemoSection title="Import" code="import { Popover } from 'glass-ui-solid';" />

      <DemoSection
        title="Basic Usage"
        code={`<Popover
  trigger={<Button>Open Popover</Button>}
>
  <div class="p-4">
    <p>This is the popover content!</p>
  </div>
</Popover>`}
      >
        <div class="flex items-center justify-center">
          <Popover
            trigger={<Button>Open Popover</Button>}
          >
            <div class="p-4">
              <p class="text-surface-700 dark:text-surface-300">This is the popover content!</p>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection
        title="Placement"
        code={`<Popover
  trigger={<Button>Bottom</Button>}
  placement="bottom"
>
  <div class="p-4">Content</div>
</Popover>

<Popover
  trigger={<Button>Top</Button>}
  placement="top"
>
  <div class="p-4">Content</div>
</Popover>`}
      >
        <div class="flex flex-wrap items-center justify-center gap-4">
          <Popover
            trigger={<Button variant="outline">Bottom</Button>}
            placement="bottom"
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">Placed at the bottom (default)</p>
            </div>
          </Popover>
          <Popover
            trigger={<Button variant="outline">Top</Button>}
            placement="top"
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">Placed at the top</p>
            </div>
          </Popover>
          <Popover
            trigger={<Button variant="outline">Left</Button>}
            placement="left"
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">Placed on the left</p>
            </div>
          </Popover>
          <Popover
            trigger={<Button variant="outline">Right</Button>}
            placement="right"
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">Placed on the right</p>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection
        title="With Arrow"
        code={`<Popover
  trigger={<Button>With Arrow</Button>}
  showArrow
>
  <div class="p-4">Content with arrow</div>
</Popover>`}
      >
        <div class="flex items-center justify-center gap-4">
          <Popover
            trigger={<Button>With Arrow</Button>}
            showArrow
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">This popover has an arrow pointing to the trigger</p>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection
        title="Controlled State"
        code={`const [open, setOpen] = createSignal(false);

<Popover
  trigger={<Button>Controlled</Button>}
  open={open()}
  onOpenChange={setOpen}
>
  <div class="p-4">
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Popover>`}
      >
        <div class="flex items-center justify-center gap-4">
          <Popover
            trigger={<Button>Controlled Popover</Button>}
            open={controlled()}
            onOpenChange={setControlled}
          >
            <div class="p-4 w-64">
              <p class="text-sm text-surface-600 dark:text-surface-400 mb-4">
                This popover is controlled externally.
              </p>
              <Button size="sm" onClick={() => setControlled(false)}>
                Close
              </Button>
            </div>
          </Popover>
          <Button variant="outline" onClick={() => setControlled(!controlled())}>
            Toggle: {controlled() ? 'Open' : 'Closed'}
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="User Profile Example"
        code={`<Popover
  trigger={
    <div class="flex items-center gap-2">
      <Avatar name="Sarah Wilson" size="sm" />
      <span>Sarah Wilson</span>
    </div>
  }
  contentClass="w-72"
>
  <div class="p-4">
    <div class="flex items-center gap-3 mb-4">
      <Avatar name="Sarah Wilson" size="lg" />
      <div>
        <p class="font-semibold">Sarah Wilson</p>
        <p class="text-sm text-surface-500">sarah@example.com</p>
      </div>
    </div>
    <div class="space-y-1 border-t pt-3">
      <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100">
        View Profile
      </button>
      <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100">
        Settings
      </button>
      <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100 text-red-600">
        Sign Out
      </button>
    </div>
  </div>
</Popover>`}
      >
        <div class="flex items-center justify-center">
          <Popover
            trigger={
              <div class="flex items-center gap-2 cursor-pointer">
                <Avatar name="Sarah Wilson" size="sm" />
                <span class="text-surface-900 dark:text-white font-medium">Sarah Wilson</span>
                <svg class="w-4 h-4 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            }
            contentClass="w-72"
          >
            <div class="p-4">
              <div class="flex items-center gap-3 mb-4">
                <Avatar name="Sarah Wilson" size="lg" />
                <div>
                  <p class="font-semibold text-surface-900 dark:text-white">Sarah Wilson</p>
                  <p class="text-sm text-surface-500">sarah@example.com</p>
                </div>
              </div>
              <div class="space-y-1 border-t border-surface-200 dark:border-surface-700 pt-3">
                <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm">
                  View Profile
                </button>
                <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm">
                  Settings
                </button>
                <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-red-600 dark:text-red-400 text-sm">
                  Sign Out
                </button>
              </div>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection
        title="Scroll Behavior"
        code={`{/* Closes on scroll (default) */}
<Popover
  trigger={<Button>Close on scroll</Button>}
  scrollBehavior="close"
>
  <div class="p-4">Content</div>
</Popover>

{/* Stays open during scroll */}
<Popover
  trigger={<Button>Stay open</Button>}
  scrollBehavior="none"
>
  <div class="p-4">Content</div>
</Popover>`}
      >
        <div class="flex flex-wrap items-center justify-center gap-4">
          <Popover
            trigger={<Button variant="outline">Close on scroll</Button>}
            scrollBehavior="close"
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">Closes when you scroll (default)</p>
            </div>
          </Popover>
          <Popover
            trigger={<Button variant="outline">Stay open</Button>}
            scrollBehavior="none"
          >
            <div class="p-4 w-48">
              <p class="text-sm text-surface-600 dark:text-surface-400">Stays open when scrolling</p>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection title="Behavior">
        <ul class="space-y-2 text-surface-600 dark:text-surface-400">
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Closes on click outside the popover</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Closes on Escape key press</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Positions with viewport boundary detection</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Uses <CodePill>aria-expanded</CodePill> and <CodePill>aria-haspopup</CodePill> for accessibility</span>
          </li>
        </ul>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'trigger', type: 'JSX.Element', default: 'required', description: 'Trigger element' },
            { name: 'children', type: 'JSX.Element', default: 'required', description: 'Popover content' },
            { name: 'placement', type: 'Placement', default: "'bottom'", description: 'Position relative to trigger' },
            { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Open state change callback' },
            { name: 'showArrow', type: 'boolean', default: 'false', description: 'Show arrow pointing to trigger' },
            { name: 'offset', type: 'number', default: '8', description: 'Distance from trigger (px)' },
            { name: 'contentClass', type: 'string', default: '-', description: 'CSS classes for content' },
            { name: 'scrollBehavior', type: "'close' | 'lock' | 'none'", default: "'close'", description: 'Behavior on scroll' },
            { name: 'class', type: 'string', default: '-', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
