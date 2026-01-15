import { Alert, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, Show } from 'solid-js';

export default function AlertPage() {
  const [dismissibleVisible, setDismissibleVisible] = createSignal(true);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Alert</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Inline alert messages for feedback and notifications.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Alert } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6 space-y-4">
          <Alert type="info">This is an informational message.</Alert>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Alert type="info">
  This is an informational message.
</Alert>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Alert Types</h2>
        <Card class="p-6 space-y-4">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Title</h2>
        <Card class="p-6 space-y-4">
          <Alert type="success" title="Payment Successful">
            Your order #12345 has been confirmed.
          </Alert>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Alert type="success" title="Payment Successful">
  Your order #12345 has been confirmed.
</Alert>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Dismissible</h2>
        <Card class="p-6 space-y-4">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="p-6 overflow-x-auto">
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
                <td class="py-2 pr-4 font-mono text-xs">type</td>
                <td class="py-2 pr-4 font-mono text-xs">'info' | 'success' | 'warning' | 'error'</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Alert type</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">title</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Alert title</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">children</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Alert content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">icon</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Custom icon (overrides default)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onClose</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Close callback (shows close button when provided)</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">class</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
