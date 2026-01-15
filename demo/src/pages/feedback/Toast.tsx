import { Button, CodeBlock, toast, clearToasts } from 'glass-ui-solid';

export default function ToastPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Toast</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Toast notifications that appear temporarily in the corner of the screen to provide feedback.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { toast, ToastContainer, dismissToast, clearToasts } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Setup</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add <code class="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm">ToastContainer</code> once at the root of your app:
        </p>
        <CodeBlock
          code={`function App() {
  return (
    <>
      <ToastContainer />
      {/* rest of your app */}
    </>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Toast Types</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Four toast types are available for different feedback scenarios.
        </p>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast.success('Changes saved successfully!')}>
            Success
          </Button>
          <Button onClick={() => toast.error('Failed to save changes.')}>
            Error
          </Button>
          <Button onClick={() => toast.warning('Your session will expire soon.')}>
            Warning
          </Button>
          <Button onClick={() => toast.info('New updates are available.')}>
            Info
          </Button>
        </div>
        <CodeBlock
          code={`toast.success('Changes saved successfully!');
toast.error('Failed to save changes.');
toast.warning('Your session will expire soon.');
toast.info('New updates are available.');`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          The default toast function accepts a message and optional type.
        </p>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast('This is a message')}>
            Default Toast
          </Button>
        </div>
        <CodeBlock
          code={`// Default type is 'info'
toast('This is a message');

// With explicit type
toast('Message', 'success');
toast('Message', 'error', 5000);`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Duration</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Control how long the toast is displayed. Default is 4000ms.
        </p>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast.success('Quick!', 2000)}>
            Quick (2s)
          </Button>
          <Button onClick={() => toast.info('This stays longer...', 8000)}>
            Long (8s)
          </Button>
        </div>
        <CodeBlock
          code={`// Quick message (2 seconds)
toast.success('Saved!', 2000);

// Longer message (8 seconds)
toast.error('Error occurred', 8000);`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Programmatic Control</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Dismiss toasts programmatically using the returned ID or clear all at once.
        </p>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => toast.info('Toast ' + Math.floor(Math.random() * 100))}>
            Add Toast
          </Button>
          <Button variant="secondary" onClick={() => clearToasts()}>
            Clear All
          </Button>
        </div>
        <CodeBlock
          code={`import { toast, dismissToast, clearToasts } from 'glass-ui-solid';

// Dismiss a specific toast
const id = toast.info('Processing...');
// later...
dismissToast(id);

// Clear all toasts
clearToasts();`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Common Patterns</h2>
        <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">In Event Handlers</h3>
        <CodeBlock
          code={`async function handleSave() {
  try {
    await saveData();
    toast.success('Data saved successfully!');
  } catch (error) {
    toast.error('Failed to save data. Please try again.');
  }
}`}
          language="tsx"
        />

        <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3 mt-6">With Async Operations</h3>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">API Reference</h2>
        <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Toast Methods</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-600 dark:text-surface-400 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-2 pr-4">Method</th>
                <th class="py-2 pr-4">Arguments</th>
                <th class="py-2">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">toast(message, type?, duration?)</td>
                <td class="py-2 pr-4 font-mono text-xs">string, ToastType, number</td>
                <td class="py-2">Show a toast with custom type</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">toast.success(message, duration?)</td>
                <td class="py-2 pr-4 font-mono text-xs">string, number</td>
                <td class="py-2">Show a success toast</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">toast.error(message, duration?)</td>
                <td class="py-2 pr-4 font-mono text-xs">string, number</td>
                <td class="py-2">Show an error toast</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">toast.warning(message, duration?)</td>
                <td class="py-2 pr-4 font-mono text-xs">string, number</td>
                <td class="py-2">Show a warning toast</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">toast.info(message, duration?)</td>
                <td class="py-2 pr-4 font-mono text-xs">string, number</td>
                <td class="py-2">Show an info toast</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">dismissToast(id)</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2">Dismiss a specific toast</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">clearToasts()</td>
                <td class="py-2 pr-4 font-mono text-xs">-</td>
                <td class="py-2">Clear all toasts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Toast Types</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-600 dark:text-surface-400 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-2 pr-4">Type</th>
                <th class="py-2 pr-4">Color</th>
                <th class="py-2">Use Case</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">success</td>
                <td class="py-2 pr-4">Green</td>
                <td class="py-2">Successful operations</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">error</td>
                <td class="py-2 pr-4">Red</td>
                <td class="py-2">Errors, failures</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">warning</td>
                <td class="py-2 pr-4">Amber</td>
                <td class="py-2">Cautions, confirmations needed</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">info</td>
                <td class="py-2 pr-4">Blue</td>
                <td class="py-2">General information</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
