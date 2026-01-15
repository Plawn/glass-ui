import { SegmentedControl, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, Show } from 'solid-js';

export default function SegmentedControlPage() {
  const [view, setView] = createSignal<'list' | 'grid' | 'table'>('list');
  const [size, setSize] = createSignal<'sm' | 'md'>('md');
  const [plan, setPlan] = createSignal('pro');
  const [count, setCount] = createSignal(10);
  const [dataView, setDataView] = createSignal<'table' | 'json'>('table');

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">SegmentedControl</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A toggle component for switching between exclusive options. Features a sliding indicator animation inspired by iOS 26.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { SegmentedControl } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
            Selected: <span class="font-mono">{view()}</span>
          </p>
          <SegmentedControl
            value={view()}
            onChange={setView}
            options={[
              { value: 'list', label: 'List' },
              { value: 'grid', label: 'Grid' },
              { value: 'table', label: 'Table' },
            ]}
            aria-label="View mode"
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [view, setView] = createSignal('list');

<SegmentedControl
  value={view()}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'table', label: 'Table' },
  ]}
  aria-label="View mode"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6 space-y-4">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">Size: sm</p>
            <SegmentedControl
              size="sm"
              value={size()}
              onChange={setSize}
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
              ]}
              aria-label="Size selector"
            />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">Size: md (default)</p>
            <SegmentedControl
              size="md"
              value={size()}
              onChange={setSize}
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
              ]}
              aria-label="Size selector"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<SegmentedControl size="sm" options={options} value={value()} onChange={setValue} />
<SegmentedControl size="md" options={options} value={value()} onChange={setValue} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled Options</h2>
        <Card class="p-6">
          <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
            Selected: <span class="font-mono">{plan()}</span>
          </p>
          <SegmentedControl
            value={plan()}
            onChange={setPlan}
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
              { value: 'enterprise', label: 'Enterprise', disabled: true },
            ]}
            aria-label="Plan selection"
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<SegmentedControl
  value={plan()}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Numbers</h2>
        <Card class="p-6">
          <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
            Items per page: <span class="font-mono">{count()}</span>
          </p>
          <SegmentedControl<number>
            value={count()}
            onChange={setCount}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
            ]}
            aria-label="Items per page"
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [count, setCount] = createSignal(10);

<SegmentedControl<number>
  value={count()}
  onChange={setCount}
  options={[
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">View Toggle Example</h2>
        <Card class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300">Data Preview</h3>
            <SegmentedControl
              value={dataView()}
              onChange={setDataView}
              options={[
                { value: 'table', label: 'Table' },
                { value: 'json', label: 'JSON' },
              ]}
              aria-label="Data view format"
            />
          </div>
          <Show
            when={dataView() === 'table'}
            fallback={
              <pre class="p-4 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm font-mono overflow-x-auto">
{`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`}
              </pre>
            }
          >
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">ID</th>
                  <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Name</th>
                </tr>
              </thead>
              <tbody class="text-surface-600 dark:text-surface-400">
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <td class="py-2 pr-4">1</td>
                  <td class="py-2">Alice</td>
                </tr>
                <tr>
                  <td class="py-2 pr-4">2</td>
                  <td class="py-2">Bob</td>
                </tr>
              </tbody>
            </table>
          </Show>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`function DataViewer() {
  const [view, setView] = createSignal<'table' | 'json'>('table');

  return (
    <div>
      <div class="flex justify-end mb-4">
        <SegmentedControl
          value={view()}
          onChange={setView}
          options={[
            { value: 'table', label: 'Table' },
            { value: 'json', label: 'JSON' },
          ]}
        />
      </div>
      <Show when={view() === 'table'} fallback={<JsonViewer data={data} />}>
        <Table data={data} columns={columns} />
      </Show>
    </div>
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
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
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">options</td>
                <td class="py-2 pr-4 font-mono text-xs">SegmentedControlOption&lt;T&gt;[]</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Available options</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">value</td>
                <td class="py-2 pr-4 font-mono text-xs">T</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Current selected value</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">onChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(value: T) =&gt; void</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Value change callback</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Control size</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">aria-label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Accessible label for the group</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">class</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">SegmentedControlOption</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">value</td>
                <td class="py-2 pr-4 font-mono text-xs">T</td>
                <td class="py-2">Option value (string or number)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string | JSX.Element</td>
                <td class="py-2">Display label (can be an icon)</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2">Disable this option</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>Uses <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">role="group"</code> for the container</li>
          <li>Each option is a button with clear focus states</li>
          <li>Disabled options have <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">disabled</code> attribute</li>
          <li>Always provide <code class="px-1.5 py-0.5 bg-surface-200 dark:bg-surface-700 rounded text-sm">aria-label</code> for screen readers</li>
        </ul>
      </section>
    </div>
  );
}
