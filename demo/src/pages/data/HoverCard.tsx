import { HoverCard, CodeBlock, Button, Avatar, Badge, Card } from 'glass-ui-solid';

export default function HoverCardPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">HoverCard</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Rich content preview cards that appear on hover. Useful for displaying additional information
          without navigating away or cluttering the UI.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { HoverCard } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <HoverCard
            trigger={<Button variant="outline">Hover me</Button>}
          >
            <div class="p-4 max-w-xs">
              <p class="text-surface-700 dark:text-surface-300">
                This is a hover card with rich content that appears when you hover over the trigger.
              </p>
            </div>
          </HoverCard>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<HoverCard
  trigger={<Button variant="outline">Hover me</Button>}
>
  <div class="p-4 max-w-xs">
    <p class="text-surface-700 dark:text-surface-300">
      This is a hover card with rich content.
    </p>
  </div>
</HoverCard>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Placement Options</h2>
        <Card class="p-6">
          <div class="flex flex-wrap gap-4 justify-center">
            <HoverCard trigger={<Button variant="ghost" size="sm">Top</Button>} placement="top">
              <div class="p-3 text-sm">Appears above</div>
            </HoverCard>
            <HoverCard trigger={<Button variant="ghost" size="sm">Bottom</Button>} placement="bottom">
              <div class="p-3 text-sm">Appears below</div>
            </HoverCard>
            <HoverCard trigger={<Button variant="ghost" size="sm">Left</Button>} placement="left">
              <div class="p-3 text-sm">Appears left</div>
            </HoverCard>
            <HoverCard trigger={<Button variant="ghost" size="sm">Right</Button>} placement="right">
              <div class="p-3 text-sm">Appears right</div>
            </HoverCard>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">User Profile Card</h2>
        <Card class="p-6">
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
                  <h3 class="font-semibold text-surface-900 dark:text-white">John Doe</h3>
                  <p class="text-sm text-surface-500">@johndoe</p>
                </div>
              </div>
              <p class="text-sm text-surface-600 dark:text-surface-400 mb-3">
                Senior Software Engineer at Acme Corp. Building beautiful user interfaces.
              </p>
              <div class="flex gap-2">
                <Badge>TypeScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="outline">SolidJS</Badge>
              </div>
            </div>
          </HoverCard>
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Arrow</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<HoverCard
  trigger={<Button variant="secondary">With Arrow</Button>}
  showArrow
  placement="bottom"
>
  <div class="p-4 max-w-xs">
    <p>This hover card has an arrow pointing to its trigger.</p>
  </div>
</HoverCard>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Delays</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6">
          <HoverCard
            trigger={<Button variant="outline" disabled>Disabled Trigger</Button>}
            disabled
          >
            <div class="p-3 text-sm">This won't show</div>
          </HoverCard>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<HoverCard
  trigger={<Button disabled>Disabled</Button>}
  disabled
>
  <div class="p-3">This won't show</div>
</HoverCard>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">trigger</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Element that triggers the hover card</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">children</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Content displayed in the hover card</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">placement</td>
                <td class="py-3 px-4 font-mono text-xs">'top' | 'bottom' | 'left' | 'right'</td>
                <td class="py-3 px-4">'bottom'</td>
                <td class="py-3 px-4">Placement relative to trigger</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">openDelay</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">200</td>
                <td class="py-3 px-4">Delay before showing (ms)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">closeDelay</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">300</td>
                <td class="py-3 px-4">Delay before hiding (ms)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">showArrow</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Show arrow pointing to trigger</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">disabled</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Disable the hover card</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">contentClass</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Additional CSS classes for content</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-mono text-xs">class</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Additional CSS classes for wrapper</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
