import { Dialog, Button, useDisclosure, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Dialog</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Confirmation dialog with predefined action buttons for confirming or canceling actions.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Dialog, useDisclosure } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Example</h2>
        <Card class="p-6 mb-4">
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
        </Card>
        <CodeBlock code={basicExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Danger Variant</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use the <code class="text-sm bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">danger</code> variant for destructive actions like deleting accounts or removing important data.
        </p>
        <Card class="p-6 mb-4">
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
        </Card>
        <CodeBlock code={dangerExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Loading State</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Show a loading state while processing the confirm action.
        </p>
        <Card class="p-6 mb-4">
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
        </Card>
        <CodeBlock code={loadingExample} language="tsx" />
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
                <td class="py-2">Whether the dialog is open</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onOpenChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(open: boolean) =&gt; void</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Callback when open state changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">title</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Dialog title</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">description</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Description text below title</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">variant</td>
                <td class="py-2 pr-4 font-mono text-xs">'default' | 'danger'</td>
                <td class="py-2 pr-4">'default'</td>
                <td class="py-2">Visual variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'sm'</td>
                <td class="py-2">Dialog size</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">confirmLabel</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">'Confirm'</td>
                <td class="py-2">Confirm button text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">cancelLabel</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">'Cancel'</td>
                <td class="py-2">Cancel button text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onConfirm</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Confirm button callback</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">onCancel</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Cancel button callback</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Variants</h2>
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
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <Card class="p-4">
          <ul class="space-y-2 text-surface-600 dark:text-surface-400 text-sm">
            <li><code class="bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">role="alertdialog"</code> for confirmation dialogs</li>
            <li><code class="bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">aria-labelledby</code> pointing to title</li>
            <li><code class="bg-surface-100 dark:bg-surface-800 px-1 py-0.5 rounded">aria-describedby</code> pointing to description</li>
            <li>Focus management on open/close</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
