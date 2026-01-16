import { Modal, Button, useDisclosure } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

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
      <PageHeader
        title="Modal"
        description="Centered dialog with backdrop, escape key handling, and body scroll lock."
      />

      <DemoSection title="Import" code="import { Modal, useDisclosure } from 'glass-ui-solid';" />

      <DemoSection title="Basic Example" code={basicExample}>
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
      </DemoSection>

      <DemoSection title="Sizes" code={sizesExample}>
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
      </DemoSection>

      <DemoSection title="With Footer" code={withFooterExample}>
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
      </DemoSection>

      <DemoSection
        title="Prevent Close"
        description={
          <>
            Use <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">closeOnBackdrop</code> and{' '}
            <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">closeOnEscape</code> to control close behavior.
          </>
        }
        code={preventCloseExample}
      >
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
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          compact
          props={[
            { name: 'open', type: 'boolean', default: 'required', description: 'Whether the modal is open' },
            { name: 'onClose', type: '() => void', default: 'required', description: 'Callback when modal should close' },
            { name: 'title', type: 'string', description: 'Modal title in header' },
            { name: 'children', type: 'JSX.Element', default: 'required', description: 'Modal content' },
            { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Modal size' },
            { name: 'footer', type: 'JSX.Element', description: 'Footer content' },
            { name: 'showClose', type: 'boolean', default: 'true', description: 'Show close button in header' },
            { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking backdrop' },
            { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close when pressing Escape' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
