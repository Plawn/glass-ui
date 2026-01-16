import { createSignal } from 'solid-js';
import { Sheet, Button } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

const basicCode = `const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open Sheet</Button>

<Sheet open={open()} onOpenChange={setOpen}>
  <div class="p-6">
    <h3>Sheet Content</h3>
    <p>Drag the handle to resize or dismiss.</p>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Sheet>`;

const snapPointsCode = `<Sheet
  open={open()}
  onOpenChange={setOpen}
  snapPoints={[0.25, 0.5, 0.9]}
  defaultSnapPoint={1}
>
  <div class="p-6">
    <h3>Multi-Snap Sheet</h3>
    <p>Drag to snap between different heights.</p>
  </div>
</Sheet>`;

const noHandleCode = `<Sheet open={open()} onOpenChange={setOpen} showHandle={false}>
  <div class="p-6">
    <h3>No Handle</h3>
  </div>
</Sheet>`;

const nonDismissibleCode = `<Sheet open={open()} onOpenChange={setOpen} dismissible={false}>
  <div class="p-6">
    <h3>Non-Dismissible Sheet</h3>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Sheet>`;

export default function SheetPage() {
  const [basicOpen, setBasicOpen] = createSignal(false);
  const [snapOpen, setSnapOpen] = createSignal(false);
  const [noHandleOpen, setNoHandleOpen] = createSignal(false);
  const [nonDismissibleOpen, setNonDismissibleOpen] = createSignal(false);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Sheet"
        description="A mobile-style bottom sheet overlay with snap points and drag-to-dismiss functionality."
      />

      <DemoSection title="Import" code="import { Sheet } from 'glass-ui-solid';" />

      <DemoSection title="Basic Usage" code={basicCode}>
        <Button onClick={() => setBasicOpen(true)}>Open Sheet</Button>
        <Sheet open={basicOpen()} onOpenChange={setBasicOpen}>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">Sheet Content</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This is a basic sheet. Drag the handle to resize or dismiss, or click the backdrop to close.
            </p>
            <Button onClick={() => setBasicOpen(false)}>Close</Button>
          </div>
        </Sheet>
      </DemoSection>

      <DemoSection
        title="With Snap Points"
        description="Define multiple snap points as percentages of viewport height. Users can drag between them."
        code={snapPointsCode}
      >
        <Button onClick={() => setSnapOpen(true)}>Open with Snap Points</Button>
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
      </DemoSection>

      <DemoSection title="Without Handle" code={noHandleCode}>
        <Button onClick={() => setNoHandleOpen(true)}>Open without Handle</Button>
        <Sheet open={noHandleOpen()} onOpenChange={setNoHandleOpen} showHandle={false}>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">No Handle</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This sheet has no drag handle indicator.
            </p>
            <Button onClick={() => setNoHandleOpen(false)}>Close</Button>
          </div>
        </Sheet>
      </DemoSection>

      <DemoSection
        title="Non-Dismissible"
        description="Prevent the sheet from being dismissed by dragging down or clicking the backdrop."
        code={nonDismissibleCode}
      >
        <Button onClick={() => setNonDismissibleOpen(true)}>Open Non-Dismissible</Button>
        <Sheet open={nonDismissibleOpen()} onOpenChange={setNonDismissibleOpen} dismissible={false}>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-surface-900 dark:text-white mb-4">Non-Dismissible Sheet</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This sheet can only be closed programmatically.
            </p>
            <Button onClick={() => setNonDismissibleOpen(false)}>Close</Button>
          </div>
        </Sheet>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'open', type: 'boolean', default: 'required', description: 'Whether the sheet is open' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: 'required', description: 'Callback when the open state changes' },
            { name: 'children', type: 'JSX.Element', default: 'required', description: 'Sheet content' },
            { name: 'snapPoints', type: 'number[]', default: '[0.5]', description: 'Snap points as percentages (0-1)' },
            { name: 'defaultSnapPoint', type: 'number', default: 'last index', description: 'Default snap point index' },
            { name: 'dismissible', type: 'boolean', default: 'true', description: 'Whether the sheet can be dragged to close' },
            { name: 'showHandle', type: 'boolean', default: 'true', description: 'Whether to show the drag handle indicator' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
