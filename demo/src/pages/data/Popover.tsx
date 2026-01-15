import { createSignal } from 'solid-js';
import { Popover, CodeBlock, Card, Button, Avatar } from 'glass-ui-solid';

export default function PopoverPage() {
  const [controlled, setControlled] = createSignal(false);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Popover</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Click-triggered floating content panels for displaying rich interactive content.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Popover } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="flex items-center justify-center">
            <Popover
              trigger={<Button>Open Popover</Button>}
            >
              <div class="p-4">
                <p class="text-surface-700 dark:text-surface-300">This is the popover content!</p>
              </div>
            </Popover>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Popover
  trigger={<Button>Open Popover</Button>}
>
  <div class="p-4">
    <p>This is the popover content!</p>
  </div>
</Popover>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Placement</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Arrow</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Popover
  trigger={<Button>With Arrow</Button>}
  showArrow
>
  <div class="p-4">Content with arrow</div>
</Popover>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Controlled State</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">User Profile Example</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Scroll Behavior</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Behavior</h2>
        <Card class="p-6">
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
              <span>Uses <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm">aria-expanded</code> and <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm">aria-haspopup</code> for accessibility</span>
            </li>
          </ul>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 dark:bg-surface-800">
              <tr>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">trigger</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">JSX.Element</td>
                <td class="p-3 text-surface-500">required</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Trigger element</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">children</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">JSX.Element</td>
                <td class="p-3 text-surface-500">required</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Popover content</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">placement</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">Placement</td>
                <td class="p-3 text-surface-500">'bottom'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Position relative to trigger</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">open</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">boolean</td>
                <td class="p-3 text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Controlled open state</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">onOpenChange</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">(open: boolean) =&gt; void</td>
                <td class="p-3 text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Open state change callback</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">showArrow</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">boolean</td>
                <td class="p-3 text-surface-500">false</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Show arrow pointing to trigger</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">offset</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">number</td>
                <td class="p-3 text-surface-500">8</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Distance from trigger (px)</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">contentClass</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">CSS classes for content</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">scrollBehavior</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">'close' | 'lock' | 'none'</td>
                <td class="p-3 text-surface-500">'close'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Behavior on scroll</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">class</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
