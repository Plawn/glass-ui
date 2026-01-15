import { Modal, Button, useDisclosure, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';

const basicExample = `import { Modal, Button, useDisclosure } from 'glass-ui-solid';

function Example() {
  const modal = useDisclosure();

  return (
    <>
      <Button onClick={modal.onOpen}>Open Modal</Button>

      <Modal
        open={modal.isOpen()}
        onClose={modal.onClose}
        title="Modal Title"
      >
        <p>Modal content goes here.</p>
      </Modal>
    </>
  );
}`;

const withFooterExample = `<Modal
  open={modal.isOpen()}
  onClose={modal.onClose}
  title="Confirm Action"
  footer={
    <div class="flex justify-end gap-2">
      <Button variant="secondary" onClick={modal.onClose}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>`;

const sizesExample = `<Modal size="sm" {...props}>Small modal</Modal>
<Modal size="md" {...props}>Medium modal (default)</Modal>
<Modal size="lg" {...props}>Large modal</Modal>
<Modal size="xl" {...props}>Extra large modal</Modal>
<Modal size="full" {...props}>Full screen modal</Modal>`;

const preventCloseExample = `<Modal
  open={modal.isOpen()}
  onClose={modal.onClose}
  closeOnBackdrop={false}
  closeOnEscape={false}
  title="Locked Modal"
>
  <p>This modal can only be closed with the close button.</p>
</Modal>`;

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

export default function ModalPage() {
  const basicModal = useDisclosure();
  const footerModal = useDisclosure();
  const lockedModal = useDisclosure();
  const [selectedSize, setSelectedSize] = createSignal<ModalSize>('md');
  const sizeModal = useDisclosure();

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Modal</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Centered dialog with backdrop, escape key handling, and body scroll lock.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Modal, useDisclosure } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Example</h2>
        <Card class="p-6 mb-4">
          <Button onClick={basicModal.onOpen}>Open Modal</Button>
          <Modal
            open={basicModal.isOpen()}
            onClose={basicModal.onClose}
            title="Modal Title"
          >
            <p class="text-surface-600 dark:text-surface-400">
              This is a basic modal with a title and some content. Click outside or press Escape to close.
            </p>
          </Modal>
        </Card>
        <CodeBlock code={basicExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6 mb-4">
          <div class="flex flex-wrap gap-2">
            <For each={sizes}>
              {(size) => (
                <Button
                  variant={selectedSize() === size ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    setSelectedSize(size);
                    sizeModal.onOpen();
                  }}
                >
                  {size.toUpperCase()}
                </Button>
              )}
            </For>
          </div>
          <Modal
            open={sizeModal.isOpen()}
            onClose={sizeModal.onClose}
            title={`${selectedSize().toUpperCase()} Modal`}
            size={selectedSize()}
          >
            <p class="text-surface-600 dark:text-surface-400">
              This is a {selectedSize()} size modal. The modal width changes based on the size prop.
            </p>
          </Modal>
        </Card>
        <CodeBlock code={sizesExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Footer</h2>
        <Card class="p-6 mb-4">
          <Button onClick={footerModal.onOpen}>Open Modal with Footer</Button>
          <Modal
            open={footerModal.isOpen()}
            onClose={footerModal.onClose}
            title="Confirm Action"
            footer={
              <div class="flex justify-end gap-2">
                <Button variant="secondary" onClick={footerModal.onClose}>
                  Cancel
                </Button>
                <Button onClick={footerModal.onClose}>
                  Confirm
                </Button>
              </div>
            }
          >
            <p class="text-surface-600 dark:text-surface-400">
              Are you sure you want to proceed? This action may have consequences.
            </p>
          </Modal>
        </Card>
        <CodeBlock code={withFooterExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Prevent Close</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">closeOnBackdrop</code> and{' '}
          <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">closeOnEscape</code> to control close behavior.
        </p>
        <Card class="p-6 mb-4">
          <Button onClick={lockedModal.onOpen}>Open Locked Modal</Button>
          <Modal
            open={lockedModal.isOpen()}
            onClose={lockedModal.onClose}
            closeOnBackdrop={false}
            closeOnEscape={false}
            title="Locked Modal"
          >
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This modal can only be closed using the close button. Clicking outside or pressing Escape won't close it.
            </p>
            <Button onClick={lockedModal.onClose}>Close Modal</Button>
          </Modal>
        </Card>
        <CodeBlock code={preventCloseExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">open</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Whether the modal is open</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onClose</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Callback when modal should close</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">title</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Modal title in header</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">children</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Modal content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Modal size</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">footer</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Footer content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">showClose</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Show close button in header</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">closeOnBackdrop</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Close when clicking backdrop</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">closeOnEscape</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Close when pressing Escape</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
