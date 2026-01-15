import { Button, CodeBlock, snackbar } from 'glass-ui-solid';

export default function SnackbarPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Snackbar</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Brief messages that appear at the bottom of the screen to provide feedback about an operation.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { snackbar, SnackbarContainer } from 'glass-ui-solid';

// Alternative named imports
import { showSnackbar, dismissSnackbar, clearSnackbars } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Setup</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add <code class="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm">SnackbarContainer</code> once at the root of your app:
        </p>
        <CodeBlock
          code={`function App() {
  return (
    <>
      <SnackbarContainer />
      {/* rest of your app */}
    </>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => snackbar.show('This is a simple message')}>
            Show Snackbar
          </Button>
        </div>
        <CodeBlock
          code={`snackbar.show('This is a simple message');

// Or using the named export
showSnackbar('This is a simple message');`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Action</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add an action button to let users respond to the snackbar.
        </p>
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
        <CodeBlock
          code={`snackbar.show('Item deleted', {
  action: 'Undo',
  onAction: () => {
    // Restore the item
    snackbar.show('Item restored');
  },
});`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Duration</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Control how long the snackbar is displayed. Default is 4000ms. Set to 0 for persistent snackbars.
        </p>
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
        <CodeBlock
          code={`// Quick message (2 seconds)
snackbar.show('Quick tip!', { duration: 2000 });

// Longer message (8 seconds)
snackbar.show('Important: Please review your settings', { duration: 8000 });

// Persistent (no auto-dismiss)
const id = snackbar.show('Uploading...', { duration: 0 });

// Dismiss manually later
snackbar.dismiss(id);`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Programmatic Control</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Dismiss snackbars programmatically using the returned ID or clear all at once.
        </p>
        <div class="flex flex-wrap gap-3 mb-4">
          <Button onClick={() => snackbar.show('Snackbar 1')}>Add Snackbar</Button>
          <Button variant="secondary" onClick={() => snackbar.clear()}>
            Clear All
          </Button>
        </div>
        <CodeBlock
          code={`// Dismiss a specific snackbar
const id = snackbar.show('Processing...');
// later...
snackbar.dismiss(id);

// Clear all snackbars
snackbar.clear();`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">API Reference</h2>
        <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">snackbar.show(message, options?)</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-600 dark:text-surface-400 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-2 pr-4">Option</th>
                <th class="py-2 pr-4">Type</th>
                <th class="py-2 pr-4">Default</th>
                <th class="py-2">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">action</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Action button label</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onAction</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Action button callback</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">duration</td>
                <td class="py-2 pr-4 font-mono text-xs">number</td>
                <td class="py-2 pr-4">4000</td>
                <td class="py-2">Auto-dismiss delay in ms (0 = never)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Other Methods</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-600 dark:text-surface-400 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-2 pr-4">Method</th>
                <th class="py-2">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">snackbar.dismiss(id)</td>
                <td class="py-2">Dismiss a specific snackbar by ID</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">snackbar.clear()</td>
                <td class="py-2">Clear all snackbars</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
