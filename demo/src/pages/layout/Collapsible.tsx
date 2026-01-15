import { createSignal } from 'solid-js';
import { Collapsible, CodeBlock, Card, Button } from 'glass-ui-solid';

export default function CollapsiblePage() {
  const [controlled, setControlled] = createSignal(false);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Collapsible</h1>
        <p class="text-surface-600 dark:text-surface-400">
          An interactive component that expands and collapses content. Supports both controlled and uncontrolled modes with smooth CSS grid animations.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Collapsible } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        <div class="space-y-6">
          {/* Basic Collapsible */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Basic Usage</h3>
            <Card class="p-6">
              <Collapsible
                trigger={
                  <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                    <span class="font-medium text-surface-900 dark:text-white">Click to expand</span>
                    <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                }
              >
                <div class="p-4 mt-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                  <p class="text-surface-600 dark:text-surface-400">
                    This is the collapsible content. It smoothly animates in and out using CSS grid transitions.
                  </p>
                </div>
              </Collapsible>
            </Card>
            <CodeBlock
              code={`<Collapsible
  trigger={
    <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100">
      <span>Click to expand</span>
      <ChevronIcon />
    </div>
  }
>
  <div class="p-4 mt-2">
    <p>This is the collapsible content.</p>
  </div>
</Collapsible>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Default Open */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Default Open</h3>
            <Card class="p-6">
              <Collapsible
                defaultOpen={true}
                trigger={
                  <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                    <span class="font-medium text-surface-900 dark:text-white">Already expanded</span>
                    <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                }
              >
                <div class="p-4 mt-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                  <p class="text-surface-600 dark:text-surface-400">
                    This content is visible by default when the component mounts.
                  </p>
                </div>
              </Collapsible>
            </Card>
            <CodeBlock
              code={`<Collapsible defaultOpen={true} trigger={<Trigger />}>
  <Content />
</Collapsible>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Controlled Mode */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Controlled Mode</h3>
            <Card class="p-6 space-y-4">
              <div class="flex gap-2">
                <Button size="sm" onClick={() => setControlled(true)}>Open</Button>
                <Button size="sm" variant="secondary" onClick={() => setControlled(false)}>Close</Button>
              </div>
              <Collapsible
                open={controlled()}
                onOpenChange={setControlled}
                trigger={
                  <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                    <span class="font-medium text-surface-900 dark:text-white">
                      Controlled: {controlled() ? 'Open' : 'Closed'}
                    </span>
                    <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                }
              >
                <div class="p-4 mt-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                  <p class="text-surface-600 dark:text-surface-400">
                    This collapsible is controlled externally via state.
                  </p>
                </div>
              </Collapsible>
            </Card>
            <CodeBlock
              code={`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Button onClick={() => setOpen(false)}>Close</Button>

<Collapsible
  open={open()}
  onOpenChange={setOpen}
  trigger={<Trigger />}
>
  <Content />
</Collapsible>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Disabled State */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Disabled</h3>
            <Card class="p-6">
              <Collapsible
                disabled
                trigger={
                  <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800">
                    <span class="font-medium text-surface-900 dark:text-white">Cannot expand (disabled)</span>
                    <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                }
              >
                <div class="p-4 mt-2">
                  <p>This content will never be shown.</p>
                </div>
              </Collapsible>
            </Card>
            <CodeBlock
              code={`<Collapsible disabled trigger={<Trigger />}>
  <Content />
</Collapsible>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* FAQ Example */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">FAQ Pattern</h3>
            <Card class="p-6 space-y-2">
              <Collapsible
                trigger={
                  <div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                    <span class="font-medium text-surface-900 dark:text-white">What is Glass UI?</span>
                    <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                }
              >
                <div class="px-3 pb-3">
                  <p class="text-surface-600 dark:text-surface-400">
                    Glass UI is an iOS 26-inspired glassmorphism component library for SolidJS.
                  </p>
                </div>
              </Collapsible>
              <Collapsible
                trigger={
                  <div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                    <span class="font-medium text-surface-900 dark:text-white">How do I install it?</span>
                    <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                }
              >
                <div class="px-3 pb-3">
                  <p class="text-surface-600 dark:text-surface-400">
                    Run <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">npm install glass-ui-solid</code> or use your preferred package manager.
                  </p>
                </div>
              </Collapsible>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>trigger</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">required</td>
                <td class="p-3">The element that toggles the collapsible</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>children</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">required</td>
                <td class="p-3">The content to show/hide</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>open</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Controlled open state</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>defaultOpen</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3"><code>false</code></td>
                <td class="p-3">Initial open state (uncontrolled mode)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>onOpenChange</code></td>
                <td class="p-3"><code>(open: boolean) =&gt; void</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Callback when open state changes</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>disabled</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3"><code>false</code></td>
                <td class="p-3">Disable the collapsible interaction</td>
              </tr>
              <tr>
                <td class="p-3"><code>class</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Additional CSS classes for the container</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <Card class="p-6">
          <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
            <li>Trigger has <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">role="button"</code> with proper keyboard support (Enter/Space)</li>
            <li>Uses <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-expanded</code> to indicate open state</li>
            <li>Uses <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-controls</code> to link trigger to content</li>
            <li>Disabled state is communicated via <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-disabled</code></li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
