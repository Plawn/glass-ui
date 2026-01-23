import { Alert } from 'glass-ui-solid';
import { Show, createSignal } from 'solid-js';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

export default function AlertPage() {
  const [dismissibleVisible, setDismissibleVisible] = createSignal(true);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Alert"
        description="Inline alert messages for feedback and notifications."
      />

      <DemoSection
        title="Import"
        code="import { Alert } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`<Alert type="info">
  This is an informational message.
</Alert>`}
      >
        <Alert type="info">This is an informational message.</Alert>
      </DemoSection>

      <DemoSection
        title="Alert Types"
        code={`<Alert type="info" title="Information">
  Your session will expire in 5 minutes.
</Alert>

<Alert type="success" title="Success">
  Your changes have been saved.
</Alert>

<Alert type="warning" title="Warning">
  Please review before continuing.
</Alert>

<Alert type="error" title="Error">
  Failed to save changes. Please try again.
</Alert>`}
        cardClass="p-6 space-y-4"
      >
        <Alert type="info" title="Information">
          Your session will expire in 5 minutes.
        </Alert>
        <Alert type="success" title="Success">
          Your changes have been saved.
        </Alert>
        <Alert type="warning" title="Warning">
          Please review before continuing.
        </Alert>
        <Alert type="error" title="Error">
          Failed to save changes. Please try again.
        </Alert>
      </DemoSection>

      <DemoSection
        title="With Title"
        code={`<Alert type="success" title="Payment Successful">
  Your order #12345 has been confirmed.
</Alert>`}
        cardClass="p-6 space-y-4"
      >
        <Alert type="success" title="Payment Successful">
          Your order #12345 has been confirmed.
        </Alert>
      </DemoSection>

      <DemoSection
        title="Dismissible"
        code={`const [visible, setVisible] = createSignal(true);

<Show when={visible()}>
  <Alert
    type="info"
    title="New Feature"
    onClose={() => setVisible(false)}
  >
    Check out our new dashboard!
  </Alert>
</Show>`}
        cardClass="p-6 space-y-4"
      >
        <Show
          when={dismissibleVisible()}
          fallback={
            <button
              class="text-primary-500 hover:underline"
              onClick={() => setDismissibleVisible(true)}
            >
              Show alert again
            </button>
          }
        >
          <Alert
            type="info"
            title="New Feature"
            onClose={() => setDismissibleVisible(false)}
          >
            Check out our new dashboard!
          </Alert>
        </Show>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'type',
              type: "'info' | 'success' | 'warning' | 'error'",
              description: 'Alert type',
            },
            { name: 'title', type: 'string', description: 'Alert title' },
            {
              name: 'children',
              type: 'JSX.Element',
              description: 'Alert content',
            },
            {
              name: 'icon',
              type: 'JSX.Element',
              description: 'Custom icon (overrides default)',
            },
            {
              name: 'onClose',
              type: '() => void',
              description: 'Close callback (shows close button when provided)',
            },
            {
              name: 'class',
              type: 'string',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
