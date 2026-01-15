import { Spinner, CodeBlock, Card } from 'glass-ui-solid';

export default function SpinnerPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Spinner</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A loading indicator component with multiple sizes, colors, and optional label support.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Spinner } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Spinner />
        </Card>
        <div class="mt-4">
          <CodeBlock code="<Spinner />" language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Available sizes: sm, md (default), lg, xl
        </p>
        <Card class="p-6">
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span class="text-xs text-surface-500">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span class="text-xs text-surface-500">md</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span class="text-xs text-surface-500">lg</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Spinner size="xl" />
              <span class="text-xs text-surface-500">xl</span>
            </div>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Label</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add a text label next to the spinner to provide context.
        </p>
        <Card class="p-6">
          <div class="flex flex-col gap-4">
            <Spinner label="Loading..." />
            <Spinner size="lg" label="Please wait..." />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Spinner label="Loading..." />
<Spinner size="lg" label="Please wait..." />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Color Variants</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use the "white" color variant for dark backgrounds.
        </p>
        <div class="grid gap-4 md:grid-cols-2">
          <Card class="p-6">
            <p class="text-sm text-surface-500 mb-3">Default</p>
            <Spinner color="default" label="Loading..." />
          </Card>
          <Card class="p-6 bg-surface-800">
            <p class="text-sm text-surface-400 mb-3">White (for dark backgrounds)</p>
            <Spinner color="white" label="Loading..." />
          </Card>
        </div>
        <div class="mt-4">
          <CodeBlock
            code={`<Spinner color="default" label="Loading..." />
<Spinner color="white" label="Loading..." />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Centered</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Center the spinner within its parent container.
        </p>
        <Card class="p-6 h-32">
          <Spinner centered label="Loading content..." />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<div class="h-32">
  <Spinner centered label="Loading content..." />
</div>`}
            language="tsx"
          />
        </div>
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
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">size</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="p-3 font-mono text-xs text-surface-500">'md'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Spinner size</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">color</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">'default' | 'white'</td>
                <td class="p-3 font-mono text-xs text-surface-500">'default'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Color variant</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">label</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 font-mono text-xs text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Optional label text</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-accent-600 dark:text-accent-400">centered</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">boolean</td>
                <td class="p-3 font-mono text-xs text-surface-500">false</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Center in parent container</td>
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
