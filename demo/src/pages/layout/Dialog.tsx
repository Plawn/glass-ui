import { Dialog, Button, useDisclosure, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, CodePill } from '../../components/demo';

const basicExample = `import { Dialog, Button, useDisclosure } from 'glass-ui-solid';

function Example() {
  const dialog = useDisclosure();

  return (
    <>
      <Button onClick={dialog.onOpen}>Delete Item</Button>

      <Dialog
        open={dialog.isOpen()}
        onOpenChange={(open) => !open && dialog.onClose()}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          // Handle delete
          dialog.onClose();
        }}
      />
    </>
  );
}`;

const dangerExample = `<Dialog
  open={dialog.isOpen()}
  onOpenChange={(open) => !open && dialog.onClose()}
  variant="danger"
  title="Delete Account"
  description="This will permanently delete your account and all associated data."
  confirmLabel="Delete Account"
  cancelLabel="Keep Account"
  onConfirm={handleDeleteAccount}
/>`;

const loadingExample = `const [loading, setLoading] = createSignal(false);

<Dialog
  open={dialog.isOpen()}
  onOpenChange={(open) => !open && dialog.onClose()}
  title="Save Changes"
  description="Do you want to save your changes?"
  confirmLabel={loading() ? 'Saving...' : 'Save'}
  onConfirm={async () => {
    setLoading(true);
    await saveChanges();
    setLoading(false);
    dialog.onClose();
  }}
/>`;

export default function DialogPage() {
  const basicDialog = useDisclosure();
  const dangerDialog = useDisclosure();
  const loadingDialog = useDisclosure();
  const [loading, setLoading] = createSignal(false);

  const handleLoadingConfirm = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    loadingDialog.onClose();
  };

  return (
    <div class="space-y-8">
      <PageHeader
        title="Dialog"
        description="Confirmation dialog with predefined action buttons for confirming or canceling actions."
      />

      <DemoSection title="Import" code="import { Dialog, useDisclosure } from 'glass-ui-solid';" />

      <DemoSection title="Basic Example" code={basicExample}>
        <Button onClick={basicDialog.onOpen}>Delete Item</Button>
        <Dialog
          open={basicDialog.isOpen()}
          onOpenChange={(open) => !open && basicDialog.onClose()}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={basicDialog.onClose}
        />
      </DemoSection>

      <DemoSection
        title="Danger Variant"
        description={
          <>
            Use the <CodePill>danger</CodePill> variant for destructive actions like deleting accounts or removing important data.
          </>
        }
        code={dangerExample}
      >
        <Button variant="danger" onClick={dangerDialog.onOpen}>Delete Account</Button>
        <Dialog
          open={dangerDialog.isOpen()}
          onOpenChange={(open) => !open && dangerDialog.onClose()}
          variant="danger"
          title="Delete Account"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          confirmLabel="Delete Account"
          cancelLabel="Keep Account"
          onConfirm={dangerDialog.onClose}
        />
      </DemoSection>

      <DemoSection
        title="Loading State"
        description="Show a loading state while processing the confirm action."
        code={loadingExample}
      >
        <Button onClick={loadingDialog.onOpen}>Save Changes</Button>
        <Dialog
          open={loadingDialog.isOpen()}
          onOpenChange={(open) => !open && !loading() && loadingDialog.onClose()}
          title="Save Changes"
          description="Do you want to save your changes before leaving?"
          confirmLabel={loading() ? 'Saving...' : 'Save'}
          cancelLabel="Discard"
          onConfirm={handleLoadingConfirm}
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          compact
          props={[
            { name: 'open', type: 'boolean', default: 'required', description: 'Whether the dialog is open' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: 'required', description: 'Callback when open state changes' },
            { name: 'title', type: 'string', default: 'required', description: 'Dialog title' },
            { name: 'description', type: 'string', description: 'Description text below title' },
            { name: 'variant', type: "'default' | 'danger'", default: "'default'", description: 'Visual variant' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Dialog size' },
            { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Confirm button text' },
            { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Cancel button text' },
            { name: 'onConfirm', type: '() => void', default: 'required', description: 'Confirm button callback' },
            { name: 'onCancel', type: '() => void', description: 'Cancel button callback' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Variants" card={false}>
        <div class="space-y-4">
          <Card class="p-4">
            <h3 class="font-semibold text-surface-900 dark:text-white mb-2">Default</h3>
            <p class="text-surface-600 dark:text-surface-400 text-sm">
              Primary styled confirm button. Use for general confirmations.
            </p>
          </Card>
          <Card class="p-4">
            <h3 class="font-semibold text-surface-900 dark:text-white mb-2">Danger</h3>
            <p class="text-surface-600 dark:text-surface-400 text-sm">
              Red/danger styled confirm button. Use for destructive actions like delete, remove, etc.
            </p>
          </Card>
        </div>
      </DemoSection>

      <DemoSection title="Accessibility">
        <ul class="space-y-2 text-surface-600 dark:text-surface-400 text-sm">
          <li><CodePill>role="alertdialog"</CodePill> for confirmation dialogs</li>
          <li><CodePill>aria-labelledby</CodePill> pointing to title</li>
          <li><CodePill>aria-describedby</CodePill> pointing to description</li>
          <li>Focus management on open/close</li>
        </ul>
      </DemoSection>
    </div>
  );
}
