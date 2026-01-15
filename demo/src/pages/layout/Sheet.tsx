import { createSignal } from 'solid-js';
import { Sheet, Button, CodeBlock, Card } from 'glass-ui-solid';

export default function SheetPage() {
  const [basicOpen, setBasicOpen] = createSignal(false);
  const [snapOpen, setSnapOpen] = createSignal(false);
  const [noHandleOpen, setNoHandleOpen] = createSignal(false);
  const [nonDismissibleOpen, setNonDismissibleOpen] = createSignal(false);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Sheet</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A mobile-style bottom sheet overlay with snap points and drag-to-dismiss functionality.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Sheet } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Button onClick={() => setBasicOpen(true)}>Open Sheet</Button>
        </Card>
        <Sheet open={basicOpen()} onOpenChange={setBasicOpen}>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">Sheet Content</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This is a basic sheet. Drag the handle to resize or dismiss, or click the backdrop to close.
            </p>
            <Button onClick={() => setBasicOpen(false)}>Close</Button>
          </div>
        </Sheet>
        <div class="mt-4">
          <CodeBlock
            code={`const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Sheet</Button>

<Sheet open={open()} onOpenChange={setOpen}>
  <div class="p-6">
    <h3>Sheet Content</h3>
    <p>Drag the handle to resize or dismiss.</p>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Sheet>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Snap Points</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Define multiple snap points as percentages of viewport height. Users can drag between them.
        </p>
        <Card class="p-6">
          <Button onClick={() => setSnapOpen(true)}>Open with Snap Points</Button>
        </Card>
        <Sheet
          open={snapOpen()}
          onOpenChange={setSnapOpen}
          snapPoints={[0.25, 0.5, 0.9]}
          defaultSnapPoint={1}
        >
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">Multi-Snap Sheet</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This sheet has three snap points: 25%, 50%, and 90% of the viewport height.
              Drag up or down to snap to different heights.
            </p>
            <Button onClick={() => setSnapOpen(false)}>Close</Button>
          </div>
        </Sheet>
        <div class="mt-4">
          <CodeBlock
            code={`<Sheet
  open={open()}
  onOpenChange={setOpen}
  snapPoints={[0.25, 0.5, 0.9]}
  defaultSnapPoint={1}
>
  <div class="p-6">
    <h3>Multi-Snap Sheet</h3>
    <p>Drag to snap between different heights.</p>
  </div>
</Sheet>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Without Handle</h2>
        <Card class="p-6">
          <Button onClick={() => setNoHandleOpen(true)}>Open without Handle</Button>
        </Card>
        <Sheet open={noHandleOpen()} onOpenChange={setNoHandleOpen} showHandle={false}>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">No Handle</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This sheet has no drag handle indicator.
            </p>
            <Button onClick={() => setNoHandleOpen(false)}>Close</Button>
          </div>
        </Sheet>
        <div class="mt-4">
          <CodeBlock
            code={`<Sheet open={open()} onOpenChange={setOpen} showHandle={false}>
  <div class="p-6">
    <h3>No Handle</h3>
  </div>
</Sheet>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Non-Dismissible</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Prevent the sheet from being dismissed by dragging down or clicking the backdrop.
        </p>
        <Card class="p-6">
          <Button onClick={() => setNonDismissibleOpen(true)}>Open Non-Dismissible</Button>
        </Card>
        <Sheet open={nonDismissibleOpen()} onOpenChange={setNonDismissibleOpen} dismissible={false}>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">Non-Dismissible Sheet</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This sheet can only be closed programmatically.
            </p>
            <Button onClick={() => setNonDismissibleOpen(false)}>Close</Button>
          </div>
        </Sheet>
        <div class="mt-4">
          <CodeBlock
            code={`<Sheet open={open()} onOpenChange={setOpen} dismissible={false}>
  <div class="p-6">
    <h3>Non-Dismissible Sheet</h3>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Sheet>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
              <tr>
                <th class="px-4 py-3 rounded-tl-lg">Prop</th>
                <th class="px-4 py-3">Type</th>
                <th class="px-4 py-3">Default</th>
                <th class="px-4 py-3 rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">open</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">required</td>
                <td class="px-4 py-3">Whether the sheet is open</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">onOpenChange</td>
                <td class="px-4 py-3 font-mono text-xs">(open: boolean) =&gt; void</td>
                <td class="px-4 py-3">required</td>
                <td class="px-4 py-3">Callback when the open state changes</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">children</td>
                <td class="px-4 py-3 font-mono text-xs">JSX.Element</td>
                <td class="px-4 py-3">required</td>
                <td class="px-4 py-3">Sheet content</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">snapPoints</td>
                <td class="px-4 py-3 font-mono text-xs">number[]</td>
                <td class="px-4 py-3">[0.5]</td>
                <td class="px-4 py-3">Snap points as percentages (0-1)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">defaultSnapPoint</td>
                <td class="px-4 py-3 font-mono text-xs">number</td>
                <td class="px-4 py-3">last index</td>
                <td class="px-4 py-3">Default snap point index</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">dismissible</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">true</td>
                <td class="px-4 py-3">Whether the sheet can be dragged to close</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">showHandle</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">true</td>
                <td class="px-4 py-3">Whether to show the drag handle indicator</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-xs">class</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
