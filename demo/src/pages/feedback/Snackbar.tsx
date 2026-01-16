import { Button, snackbar } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill } from '../../components/demo';

export default function SnackbarPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Snackbar"
        description="Brief messages that appear at the bottom of the screen to provide feedback about an operation."
      />

      <DemoSection
        title="Import"
        code={`import { snackbar, SnackbarContainer } from 'glass-ui-solid';

// Alternative named imports
import { showSnackbar, dismissSnackbar, clearSnackbars } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Setup"
        description={<>Add <CodePill>SnackbarContainer</CodePill> once at the root of your app:</>}
        code={`function App() {
  return (
    <>
      <SnackbarContainer />
      {/* rest of your app */}
    </>
  );
}`}
      />

      <DemoSection
        title="Basic Usage"
        code={`snackbar.show('This is a simple message');

// Or using the named export
showSnackbar('This is a simple message');`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => snackbar.show('This is a simple message')}>
            Show Snackbar
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="With Action"
        description="Add an action button to let users respond to the snackbar."
        code={`snackbar.show('Item deleted', {
  action: 'Undo',
  onAction: () => {
    // Restore the item
    snackbar.show('Item restored');
  },
});`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button
            onClick={() =>
              snackbar.show('Item deleted', {
                action: 'Undo',
                onAction: () => snackbar.show('Item restored'),
              })
            }
          >
            Delete Item
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Duration"
        description="Control how long the snackbar is displayed. Default is 4000ms. Set to 0 for persistent snackbars."
        code={`// Quick message (2 seconds)
snackbar.show('Quick tip!', { duration: 2000 });

// Longer message (8 seconds)
snackbar.show('Important: Please review your settings', { duration: 8000 });

// Persistent (no auto-dismiss)
const id = snackbar.show('Uploading...', { duration: 0 });

// Dismiss manually later
snackbar.dismiss(id);`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => snackbar.show('Quick message!', { duration: 2000 })}>
            Quick (2s)
          </Button>
          <Button onClick={() => snackbar.show('This stays longer', { duration: 8000 })}>
            Long (8s)
          </Button>
          <Button
            onClick={() => {
              const id = snackbar.show('This stays until dismissed', { duration: 0 });
              setTimeout(() => snackbar.dismiss(id), 5000);
            }}
          >
            Persistent
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Programmatic Control"
        description="Dismiss snackbars programmatically using the returned ID or clear all at once."
        code={`// Dismiss a specific snackbar
const id = snackbar.show('Processing...');
// later...
snackbar.dismiss(id);

// Clear all snackbars
snackbar.clear();`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => snackbar.show('Snackbar 1')}>Add Snackbar</Button>
          <Button variant="secondary" onClick={() => snackbar.clear()}>
            Clear All
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="API Reference">
        <DemoSection title="snackbar.show(message, options?)" subsection>
          <PropsTable
            compact
            props={[
              { name: 'action', type: 'string', description: 'Action button label' },
              { name: 'onAction', type: '() => void', description: 'Action button callback' },
              { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in ms (0 = never)' },
            ]}
          />
        </DemoSection>

        <DemoSection title="Other Methods" subsection>
          <PropsTable
            compact
            props={[
              { name: 'snackbar.dismiss(id)', type: '', description: 'Dismiss a specific snackbar by ID' },
              { name: 'snackbar.clear()', type: '', description: 'Clear all snackbars' },
            ]}
          />
        </DemoSection>
      </DemoSection>
    </div>
  );
}
