import { Card, CodeBlock, Button } from 'glass-ui-solid';

export default function CardPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Card</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Container with glass effect and optional header/footer.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Card } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        <div class="space-y-6">
          {/* Basic */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Basic</h3>
            <Card>
              <p class="text-surface-700 dark:text-surface-300">Card content goes here.</p>
            </Card>
          </div>

          {/* With Header and Footer */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">With Header and Footer</h3>
            <Card
              header={<h3 class="font-bold text-surface-900 dark:text-white">Card Title</h3>}
              footer={
                <div class="flex justify-end">
                  <Button size="sm">Action</Button>
                </div>
              }
            >
              <p class="text-surface-700 dark:text-surface-300">Card body content.</p>
            </Card>
          </div>

          {/* Variants */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Variants</h3>
            <div class="grid gap-4 md:grid-cols-3">
              <Card variant="default">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-1">default</p>
                <p class="text-surface-700 dark:text-surface-300">Default card with subtle glass effect</p>
              </Card>

              <Card variant="elevated">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-1">elevated</p>
                <p class="text-surface-700 dark:text-surface-300">Elevated card with more prominent shadow</p>
              </Card>

              <Card variant="outlined">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-1">outlined</p>
                <p class="text-surface-700 dark:text-surface-300">Outlined card with border, no glass fill</p>
              </Card>
            </div>
          </div>

          {/* Stats Card Example */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Stats Card</h3>
            <Card variant="elevated" class="max-w-xs">
              <div class="text-sm text-surface-500 dark:text-surface-400">Total Users</div>
              <div class="text-3xl font-bold text-surface-900 dark:text-white">12,345</div>
              <div class="text-sm text-green-600 dark:text-green-400">+12% from last month</div>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">children</td>
                <td class="py-2 px-3 font-mono text-xs">JSX.Element</td>
                <td class="py-2 px-3">required</td>
                <td class="py-2 px-3">Card body content</td>
              </tr>
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">header</td>
                <td class="py-2 px-3 font-mono text-xs">JSX.Element</td>
                <td class="py-2 px-3">-</td>
                <td class="py-2 px-3">Header content</td>
              </tr>
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">footer</td>
                <td class="py-2 px-3 font-mono text-xs">JSX.Element</td>
                <td class="py-2 px-3">-</td>
                <td class="py-2 px-3">Footer content</td>
              </tr>
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">variant</td>
                <td class="py-2 px-3 font-mono text-xs">'default' | 'elevated' | 'outlined'</td>
                <td class="py-2 px-3">'default'</td>
                <td class="py-2 px-3">Visual variant</td>
              </tr>
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">class</td>
                <td class="py-2 px-3 font-mono text-xs">string</td>
                <td class="py-2 px-3">-</td>
                <td class="py-2 px-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
