import { ErrorDisplay, Card } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function ErrorDisplayPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="ErrorDisplay"
        description="A styled error message component for displaying errors with a title and message."
      />

      <DemoSection title="Import" code="import { ErrorDisplay } from 'glass-ui-solid';" />

      <DemoSection
        title="Basic Usage"
        code={`<ErrorDisplay message="An unexpected error occurred while processing your request." />`}
      >
        <ErrorDisplay message="An unexpected error occurred while processing your request." />
      </DemoSection>

      <DemoSection
        title="Custom Title"
        description='Override the default "Request Failed" title with a custom message.'
        code={`<ErrorDisplay
  title="Connection Failed"
  message="Unable to connect to the server. Please check your internet connection and try again."
/>`}
      >
        <ErrorDisplay
          title="Connection Failed"
          message="Unable to connect to the server. Please check your internet connection and try again."
        />
      </DemoSection>

      <DemoSection title="Common Use Cases" card={false}>
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
      </DemoSection>

      <DemoSection
        title="With Error Boundary"
        description="Use ErrorDisplay as a fallback in SolidJS error boundaries."
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
      />

      <DemoSection
        title="Conditional Rendering"
        description="Show errors conditionally using SolidJS Show component."
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
      />

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'message', type: 'string', description: 'The error message to display' },
            { name: 'title', type: 'string', default: "'Request Failed'", description: 'The error title' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
