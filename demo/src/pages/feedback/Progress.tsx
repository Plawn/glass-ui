import { Progress, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, onMount, onCleanup } from 'solid-js';

export default function ProgressPage() {
  const [dynamicProgress, setDynamicProgress] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setDynamicProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 500);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Progress</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Progress indicators for loading and completion states.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Progress } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Progress value={60} />
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Progress value={60} />`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Variants</h2>
        <Card class="p-6 space-y-6">
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Bar (default)</p>
            <Progress value={60} variant="bar" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Circular</p>
            <Progress value={60} variant="circular" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Progress value={60} variant="bar" />
<Progress value={60} variant="circular" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Colors</h2>
        <Card class="p-6 space-y-4">
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Primary</p>
            <Progress value={60} color="primary" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Success</p>
            <Progress value={60} color="success" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Warning</p>
            <Progress value={60} color="warning" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Error</p>
            <Progress value={60} color="error" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Progress value={60} color="primary" />
<Progress value={60} color="success" />
<Progress value={60} color="warning" />
<Progress value={60} color="error" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6 space-y-4">
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Small</p>
            <Progress value={60} size="sm" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Medium (default)</p>
            <Progress value={60} size="md" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Large</p>
            <Progress value={60} size="lg" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Show Value</h2>
        <Card class="p-6 space-y-6">
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Bar with value</p>
            <Progress value={75} showValue />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Circular with value</p>
            <Progress value={75} variant="circular" size="lg" showValue />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Progress value={75} showValue />
<Progress value={75} variant="circular" size="lg" showValue />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Dynamic Progress</h2>
        <Card class="p-6 space-y-6">
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Animated progress: {dynamicProgress()}%</p>
            <Progress value={dynamicProgress()} color="primary" showValue />
          </div>
          <div class="flex items-center gap-4">
            <Progress value={dynamicProgress()} variant="circular" size="lg" showValue />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`function UploadProgress() {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 500);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <Progress value={progress()} color="primary" showValue />
  );
}`}
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
                <td class="py-2 pr-4 font-mono text-xs">value</td>
                <td class="py-2 pr-4 font-mono text-xs">number</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Progress value (0-100)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">variant</td>
                <td class="py-2 pr-4 font-mono text-xs">'bar' | 'circular'</td>
                <td class="py-2 pr-4">'bar'</td>
                <td class="py-2">Visual variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Size of the indicator</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">color</td>
                <td class="py-2 pr-4 font-mono text-xs">'primary' | 'success' | 'warning' | 'error'</td>
                <td class="py-2 pr-4">'primary'</td>
                <td class="py-2">Color theme</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">showValue</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Show percentage value</td>
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
