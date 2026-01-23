import { Button, clearToasts, toast } from 'glass-ui-solid';
import {
  CodePill,
  DemoSection,
  PageHeader,
  PropsTable,
} from '../../components/demo';

export default function ToastPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Toast"
        description="Toast notifications that appear temporarily in the corner of the screen to provide feedback."
      />

      <DemoSection
        title="Import"
        code={`import { toast, ToastContainer, dismissToast, clearToasts } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Setup"
        description={
          <>
            Add <CodePill>ToastContainer</CodePill> once at the root of your
            app:
          </>
        }
        code={`function App() {
  return (
    <>
      <ToastContainer />
      {/* rest of your app */}
    </>
  );
}`}
      />

      <DemoSection
        title="Toast Types"
        description="Four toast types are available for different feedback scenarios."
        code={`toast.success('Changes saved successfully!');
toast.error('Failed to save changes.');
toast.warning('Your session will expire soon.');
toast.info('New updates are available.');`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast.success('Changes saved successfully!')}>
            Success
          </Button>
          <Button onClick={() => toast.error('Failed to save changes.')}>
            Error
          </Button>
          <Button
            onClick={() => toast.warning('Your session will expire soon.')}
          >
            Warning
          </Button>
          <Button onClick={() => toast.info('New updates are available.')}>
            Info
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Basic Usage"
        description="The default toast function accepts a message and optional type."
        code={`// Default type is 'info'
toast('This is a message');

// With explicit type
toast('Message', 'success');
toast('Message', 'error', 5000);`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast('This is a message')}>
            Default Toast
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Duration"
        description="Control how long the toast is displayed. Default is 4000ms."
        code={`// Quick message (2 seconds)
toast.success('Saved!', 2000);

// Longer message (8 seconds)
toast.error('Error occurred', 8000);`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast.success('Quick!', 2000)}>
            Quick (2s)
          </Button>
          <Button onClick={() => toast.info('This stays longer...', 8000)}>
            Long (8s)
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Programmatic Control"
        description="Dismiss toasts programmatically using the returned ID or clear all at once."
        code={`import { toast, dismissToast, clearToasts } from 'glass-ui-solid';

// Dismiss a specific toast
const id = toast.info('Processing...');
// later...
dismissToast(id);

// Clear all toasts
clearToasts();`}
        card={false}
      >
        <div class="flex flex-wrap gap-3 mb-4">
          <Button
            onClick={() =>
              toast.info('Toast ' + Math.floor(Math.random() * 100))
            }
          >
            Add Toast
          </Button>
          <Button variant="secondary" onClick={() => clearToasts()}>
            Clear All
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Common Patterns" card={false}>
        <DemoSection
          title="In Event Handlers"
          subsection
          code={`async function handleSave() {
  try {
    await saveData();
    toast.success('Data saved successfully!');
  } catch (error) {
    toast.error('Failed to save data. Please try again.');
  }
}`}
        />

        <DemoSection
          title="With Async Operations"
          subsection
          code={`async function handleSubmit() {
  const loadingId = toast.info('Submitting...');

  try {
    await submitForm();
    dismissToast(loadingId);
    toast.success('Form submitted!');
  } catch (error) {
    dismissToast(loadingId);
    toast.error('Submission failed.');
  }
}`}
        />
      </DemoSection>

      <DemoSection title="API Reference">
        <DemoSection title="Toast Methods" subsection>
          <PropsTable
            compact
            props={[
              {
                name: 'toast(message, type?, duration?)',
                type: 'string, ToastType, number',
                description: 'Show a toast with custom type',
              },
              {
                name: 'toast.success(message, duration?)',
                type: 'string, number',
                description: 'Show a success toast',
              },
              {
                name: 'toast.error(message, duration?)',
                type: 'string, number',
                description: 'Show an error toast',
              },
              {
                name: 'toast.warning(message, duration?)',
                type: 'string, number',
                description: 'Show a warning toast',
              },
              {
                name: 'toast.info(message, duration?)',
                type: 'string, number',
                description: 'Show an info toast',
              },
              {
                name: 'dismissToast(id)',
                type: 'string',
                description: 'Dismiss a specific toast',
              },
              {
                name: 'clearToasts()',
                type: '-',
                description: 'Clear all toasts',
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="Toast Types" subsection>
          <PropsTable
            compact
            props={[
              {
                name: 'success',
                type: 'Green',
                description: 'Successful operations',
              },
              { name: 'error', type: 'Red', description: 'Errors, failures' },
              {
                name: 'warning',
                type: 'Amber',
                description: 'Cautions, confirmations needed',
              },
              {
                name: 'info',
                type: 'Blue',
                description: 'General information',
              },
            ]}
          />
        </DemoSection>
      </DemoSection>
    </div>
  );
}
