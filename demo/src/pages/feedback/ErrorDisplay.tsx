import { ErrorDisplay, CodeBlock, Card } from 'glass-ui-solid';

export default function ErrorDisplayPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">ErrorDisplay</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A styled error message component for displaying errors with a title and message.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { ErrorDisplay } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <ErrorDisplay message="An unexpected error occurred while processing your request." />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<ErrorDisplay message="An unexpected error occurred while processing your request." />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Title</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Override the default "Request Failed" title with a custom message.
        </p>
        <Card class="p-6">
          <ErrorDisplay
            title="Connection Failed"
            message="Unable to connect to the server. Please check your internet connection and try again."
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<ErrorDisplay
  title="Connection Failed"
  message="Unable to connect to the server. Please check your internet connection and try again."
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Common Use Cases</h2>
        <div class="space-y-4">
          <Card class="p-6">
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">API Error</h3>
            <ErrorDisplay
              title="Failed to Load Data"
              message="The server returned an error (500). Please try again later."
            />
          </Card>
          <Card class="p-6">
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Validation Error</h3>
            <ErrorDisplay
              title="Validation Failed"
              message="Please ensure all required fields are filled out correctly."
            />
          </Card>
          <Card class="p-6">
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Authentication Error</h3>
            <ErrorDisplay
              title="Session Expired"
              message="Your session has expired. Please log in again to continue."
            />
          </Card>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Error Boundary</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use ErrorDisplay as a fallback in SolidJS error boundaries.
        </p>
        <CodeBlock
          code={`import { ErrorBoundary } from 'solid-js';
import { ErrorDisplay } from 'glass-ui-solid';

function App() {
  return (
    <ErrorBoundary
      fallback={(err) => (
        <ErrorDisplay
          title="Something went wrong"
          message={err.message}
        />
      )}
    >
      <MainContent />
    </ErrorBoundary>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Conditional Rendering</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Show errors conditionally using SolidJS Show component.
        </p>
        <CodeBlock
          code={`import { Show, createSignal } from 'solid-js';
import { ErrorDisplay, Button } from 'glass-ui-solid';

function Form() {
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async () => {
    try {
      await submitData();
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Show when={error()}>
        <ErrorDisplay message={error()!} />
      </Show>
      {/* Form fields */}
    </form>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="p-0 overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-surface-100 dark:bg-surface-800">
              <tr>
                <th class="text-left p-3 font-medium text-surface-700 dark:text-surface-300">Prop</th>
                <th class="text-left p-3 font-medium text-surface-700 dark:text-surface-300">Type</th>
                <th class="text-left p-3 font-medium text-surface-700 dark:text-surface-300">Default</th>
                <th class="text-left p-3 font-medium text-surface-700 dark:text-surface-300">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
              <tr>
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">message</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 font-mono text-xs text-surface-500">required</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">The error message to display</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">title</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 font-mono text-xs text-surface-500">'Request Failed'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">The error title</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">class</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 font-mono text-xs text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
