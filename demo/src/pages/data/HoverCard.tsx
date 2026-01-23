import { Avatar, Badge, Button, HoverCard } from 'glass-ui-solid';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

export default function HoverCardPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="HoverCard"
        description="Rich content preview cards that appear on hover. Useful for displaying additional information without navigating away or cluttering the UI."
      />

      <DemoSection
        title="Import"
        code="import { HoverCard } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`<HoverCard
  trigger={<Button variant="outline">Hover me</Button>}
>
  <div class="p-4 max-w-xs">
    <p class="text-surface-700 dark:text-surface-300">
      This is a hover card with rich content.
    </p>
  </div>
</HoverCard>`}
      >
        <HoverCard trigger={<Button variant="outline">Hover me</Button>}>
          <div class="p-4 max-w-xs">
            <p class="text-surface-700 dark:text-surface-300">
              This is a hover card with rich content that appears when you hover
              over the trigger.
            </p>
          </div>
        </HoverCard>
      </DemoSection>

      <DemoSection
        title="Placement Options"
        code={`<HoverCard trigger={<Button>Top</Button>} placement="top">
  <div class="p-3">Appears above</div>
</HoverCard>

<HoverCard trigger={<Button>Bottom</Button>} placement="bottom">
  <div class="p-3">Appears below</div>
</HoverCard>

<HoverCard trigger={<Button>Left</Button>} placement="left">
  <div class="p-3">Appears left</div>
</HoverCard>

<HoverCard trigger={<Button>Right</Button>} placement="right">
  <div class="p-3">Appears right</div>
</HoverCard>`}
      >
        <div class="flex flex-wrap gap-4 justify-center">
          <HoverCard
            trigger={
              <Button variant="ghost" size="sm">
                Top
              </Button>
            }
            placement="top"
          >
            <div class="p-3 text-sm">Appears above</div>
          </HoverCard>
          <HoverCard
            trigger={
              <Button variant="ghost" size="sm">
                Bottom
              </Button>
            }
            placement="bottom"
          >
            <div class="p-3 text-sm">Appears below</div>
          </HoverCard>
          <HoverCard
            trigger={
              <Button variant="ghost" size="sm">
                Left
              </Button>
            }
            placement="left"
          >
            <div class="p-3 text-sm">Appears left</div>
          </HoverCard>
          <HoverCard
            trigger={
              <Button variant="ghost" size="sm">
                Right
              </Button>
            }
            placement="right"
          >
            <div class="p-3 text-sm">Appears right</div>
          </HoverCard>
        </div>
      </DemoSection>

      <DemoSection
        title="User Profile Card"
        code={`<HoverCard
  trigger={
    <span class="text-blue-600 hover:underline cursor-pointer">
      @johndoe
    </span>
  }
  placement="bottom"
>
  <div class="p-4 w-72">
    <div class="flex items-start gap-3 mb-3">
      <Avatar name="John Doe" size="lg" />
      <div>
        <h3 class="font-semibold">John Doe</h3>
        <p class="text-sm text-surface-500">@johndoe</p>
      </div>
    </div>
    <p class="text-sm text-surface-600 mb-3">
      Senior Software Engineer at Acme Corp.
    </p>
    <div class="flex gap-2">
      <Badge>TypeScript</Badge>
      <Badge variant="secondary">React</Badge>
    </div>
  </div>
</HoverCard>`}
      >
        <HoverCard
          trigger={
            <span class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium">
              @johndoe
            </span>
          }
          placement="bottom"
        >
          <div class="p-4 w-72">
            <div class="flex items-start gap-3 mb-3">
              <Avatar name="John Doe" size="lg" />
              <div>
                <h3 class="font-semibold text-surface-900 dark:text-white">
                  John Doe
                </h3>
                <p class="text-sm text-surface-500">@johndoe</p>
              </div>
            </div>
            <p class="text-sm text-surface-600 dark:text-surface-400 mb-3">
              Senior Software Engineer at Acme Corp. Building beautiful user
              interfaces.
            </p>
            <div class="flex gap-2">
              <Badge>TypeScript</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="outline">SolidJS</Badge>
            </div>
          </div>
        </HoverCard>
      </DemoSection>

      <DemoSection
        title="With Arrow"
        code={`<HoverCard
  trigger={<Button variant="secondary">With Arrow</Button>}
  showArrow
  placement="bottom"
>
  <div class="p-4 max-w-xs">
    <p>This hover card has an arrow pointing to its trigger.</p>
  </div>
</HoverCard>`}
      >
        <HoverCard
          trigger={<Button variant="secondary">With Arrow</Button>}
          showArrow
          placement="bottom"
        >
          <div class="p-4 max-w-xs">
            <p class="text-sm text-surface-700 dark:text-surface-300">
              This hover card has an arrow pointing to its trigger element.
            </p>
          </div>
        </HoverCard>
      </DemoSection>

      <DemoSection
        title="Custom Delays"
        code={`<HoverCard
  trigger={<Button>Slow Open</Button>}
  openDelay={500}
>
  <div class="p-3">Takes longer to appear</div>
</HoverCard>

<HoverCard
  trigger={<Button>Fast Close</Button>}
  closeDelay={100}
>
  <div class="p-3">Disappears quickly</div>
</HoverCard>`}
      >
        <div class="flex flex-wrap gap-4">
          <HoverCard
            trigger={<Button variant="ghost">Slow Open (500ms)</Button>}
            openDelay={500}
          >
            <div class="p-3 text-sm">Takes longer to appear</div>
          </HoverCard>
          <HoverCard
            trigger={<Button variant="ghost">Fast Close (100ms)</Button>}
            closeDelay={100}
          >
            <div class="p-3 text-sm">Disappears quickly</div>
          </HoverCard>
        </div>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<HoverCard
  trigger={<Button disabled>Disabled</Button>}
  disabled
>
  <div class="p-3">This won't show</div>
</HoverCard>`}
      >
        <HoverCard
          trigger={
            <Button variant="outline" disabled>
              Disabled Trigger
            </Button>
          }
          disabled
        >
          <div class="p-3 text-sm">This won't show</div>
        </HoverCard>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'trigger',
              type: 'JSX.Element',
              default: 'required',
              description: 'Element that triggers the hover card',
            },
            {
              name: 'children',
              type: 'JSX.Element',
              default: 'required',
              description: 'Content displayed in the hover card',
            },
            {
              name: 'placement',
              type: "'top' | 'bottom' | 'left' | 'right'",
              default: "'bottom'",
              description: 'Placement relative to trigger',
            },
            {
              name: 'openDelay',
              type: 'number',
              default: '200',
              description: 'Delay before showing (ms)',
            },
            {
              name: 'closeDelay',
              type: 'number',
              default: '300',
              description: 'Delay before hiding (ms)',
            },
            {
              name: 'showArrow',
              type: 'boolean',
              default: 'false',
              description: 'Show arrow pointing to trigger',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disable the hover card',
            },
            {
              name: 'contentClass',
              type: 'string',
              default: '-',
              description: 'Additional CSS classes for content',
            },
            {
              name: 'class',
              type: 'string',
              default: '-',
              description: 'Additional CSS classes for wrapper',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
