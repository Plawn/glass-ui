import { Tooltip, CodeBlock, Card, Button } from 'glass-ui-solid';

export default function TooltipPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Tooltip</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Hover tooltips for displaying additional context or helpful information.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Tooltip } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="flex items-center justify-center">
            <Tooltip content="This is a helpful tip">
              <Button>Hover me</Button>
            </Tooltip>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tooltip content="This is a helpful tip">
  <Button>Hover me</Button>
</Tooltip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Positions</h2>
        <Card class="p-6">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <Tooltip content="Tooltip on top" position="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tooltip content="Tooltip on top" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Tooltip on bottom" position="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Tooltip on left" position="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Tooltip on right" position="right">
  <Button>Right</Button>
</Tooltip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Delay</h2>
        <Card class="p-6">
          <div class="flex items-center justify-center gap-4">
            <Tooltip content="Appears instantly" delay={0}>
              <Button variant="outline">No delay</Button>
            </Tooltip>
            <Tooltip content="Appears after 500ms" delay={500}>
              <Button variant="outline">500ms delay</Button>
            </Tooltip>
            <Tooltip content="Appears after 1 second" delay={1000}>
              <Button variant="outline">1s delay</Button>
            </Tooltip>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tooltip content="Appears instantly" delay={0}>
  <Button>No delay</Button>
</Tooltip>
<Tooltip content="Appears after 500ms" delay={500}>
  <Button>500ms delay</Button>
</Tooltip>
<Tooltip content="Appears after 1 second" delay={1000}>
  <Button>1s delay</Button>
</Tooltip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With JSX Content</h2>
        <Card class="p-6">
          <div class="flex items-center justify-center">
            <Tooltip
              content={
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Rich content tooltip</span>
                </div>
              }
            >
              <Button>Rich tooltip</Button>
            </Tooltip>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tooltip
  content={
    <div class="flex items-center gap-2">
      <InfoIcon class="w-4 h-4" />
      <span>Rich content tooltip</span>
    </div>
  }
>
  <Button>Rich tooltip</Button>
</Tooltip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">On Icon Buttons</h2>
        <Card class="p-6">
          <div class="flex items-center justify-center gap-4">
            <Tooltip content="Edit">
              <button class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip content="Delete">
              <button class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip content="Share">
              <button class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </Tooltip>
            <Tooltip content="Download">
              <button class="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </Tooltip>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Tooltip content="Edit">
  <button class="p-2 hover:bg-surface-100 rounded">
    <EditIcon class="w-5 h-5" />
  </button>
</Tooltip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <Card class="p-6">
          <ul class="space-y-2 text-surface-600 dark:text-surface-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Uses <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm">role="tooltip"</code> for screen readers</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Shows on focus for keyboard users</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Automatically hides when focus leaves the trigger element</span>
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
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">content</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string | JSX.Element</td>
                <td class="p-3 text-surface-500">required</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Tooltip content</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">children</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">JSX.Element</td>
                <td class="p-3 text-surface-500">required</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Trigger element</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">position</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">'top' | 'bottom' | 'left' | 'right'</td>
                <td class="p-3 text-surface-500">'top'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Position relative to trigger</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">delay</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">number</td>
                <td class="p-3 text-surface-500">200</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Delay before showing (ms)</td>
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
