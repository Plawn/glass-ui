import { Divider, CodeBlock, Card } from 'glass-ui-solid';

export default function DividerPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Divider</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A visual separator for dividing content. Supports horizontal and vertical orientations, labels, and various line styles.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Divider } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        {/* Basic Horizontal Divider */}
        <div class="space-y-6">
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Basic Horizontal</h3>
            <Card class="p-6">
              <p class="text-surface-600 dark:text-surface-400 mb-4">Content above the divider</p>
              <Divider />
              <p class="text-surface-600 dark:text-surface-400 mt-4">Content below the divider</p>
            </Card>
            <CodeBlock
              code={`<p>Content above the divider</p>
<Divider />
<p>Content below the divider</p>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Divider with Label */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">With Label</h3>
            <Card class="p-6 space-y-4">
              <Divider label="OR" />
              <Divider label="Section Title" labelPosition="start" />
              <Divider label="End Label" labelPosition="end" />
            </Card>
            <CodeBlock
              code={`<Divider label="OR" />
<Divider label="Section Title" labelPosition="start" />
<Divider label="End Label" labelPosition="end" />`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Line Variants */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Line Variants</h3>
            <Card class="p-6 space-y-4">
              <div class="space-y-2">
                <span class="text-sm text-surface-500 dark:text-surface-400">Solid (default)</span>
                <Divider variant="solid" />
              </div>
              <div class="space-y-2">
                <span class="text-sm text-surface-500 dark:text-surface-400">Dashed</span>
                <Divider variant="dashed" />
              </div>
              <div class="space-y-2">
                <span class="text-sm text-surface-500 dark:text-surface-400">Dotted</span>
                <Divider variant="dotted" />
              </div>
            </Card>
            <CodeBlock
              code={`<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Vertical Divider */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Vertical Divider</h3>
            <Card class="p-6">
              <div class="flex items-center h-8 gap-4">
                <span class="text-surface-600 dark:text-surface-400">Item 1</span>
                <Divider orientation="vertical" />
                <span class="text-surface-600 dark:text-surface-400">Item 2</span>
                <Divider orientation="vertical" />
                <span class="text-surface-600 dark:text-surface-400">Item 3</span>
              </div>
            </Card>
            <CodeBlock
              code={`<div class="flex items-center h-8 gap-4">
  <span>Item 1</span>
  <Divider orientation="vertical" />
  <span>Item 2</span>
  <Divider orientation="vertical" />
  <span>Item 3</span>
</div>`}
              language="tsx"
              class="mt-3"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>orientation</code></td>
                <td class="p-3"><code>'horizontal' | 'vertical'</code></td>
                <td class="p-3"><code>'horizontal'</code></td>
                <td class="p-3">Orientation of the divider</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>label</code></td>
                <td class="p-3"><code>string | JSX.Element</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Optional label in the middle of the divider</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>labelPosition</code></td>
                <td class="p-3"><code>'start' | 'center' | 'end'</code></td>
                <td class="p-3"><code>'center'</code></td>
                <td class="p-3">Position of the label</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>variant</code></td>
                <td class="p-3"><code>'solid' | 'dashed' | 'dotted'</code></td>
                <td class="p-3"><code>'solid'</code></td>
                <td class="p-3">Line style variant</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>class</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td class="p-3"><code>style</code></td>
                <td class="p-3"><code>JSX.CSSProperties</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Inline styles</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
