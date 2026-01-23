import { Card, SegmentedControl } from 'glass-ui-solid';
import { Show, createSignal } from 'solid-js';
import {
  CodePill,
  DemoSection,
  FeatureList,
  PageHeader,
  PropsTable,
  StateDisplay,
} from '../../components/demo';

export default function SegmentedControlPage() {
  const [view, setView] = createSignal<'list' | 'grid' | 'table'>('list');
  const [size, setSize] = createSignal<'sm' | 'md'>('md');
  const [plan, setPlan] = createSignal('pro');
  const [count, setCount] = createSignal(10);
  const [dataView, setDataView] = createSignal<'table' | 'json'>('table');
  const [verticalOption, setVerticalOption] = createSignal<
    'top' | 'middle' | 'bottom'
  >('middle');

  return (
    <div class="space-y-8">
      <PageHeader
        title="SegmentedControl"
        description="A toggle component for switching between exclusive options. Features a sliding indicator animation inspired by iOS 26."
      />

      <DemoSection
        title="Import"
        code={`import { SegmentedControl } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Basic Usage"
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
      >
        <StateDisplay label="Selected" value={view()} />
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
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<SegmentedControl size="sm" options={options} value={value()} onChange={setValue} />
<SegmentedControl size="md" options={options} value={value()} onChange={setValue} />`}
      >
        <div class="space-y-4">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">
              Size: sm
            </p>
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
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">
              Size: md (default)
            </p>
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
        </div>
      </DemoSection>

      <DemoSection
        title="Orientation"
        code={`<SegmentedControl
  orientation="vertical"
  value={position()}
  onChange={setPosition}
  options={[
    { value: 'top', label: 'Top' },
    { value: 'middle', label: 'Middle' },
    { value: 'bottom', label: 'Bottom' },
  ]}
/>`}
      >
        <div class="flex gap-8 items-start">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">
              Horizontal (default)
            </p>
            <SegmentedControl
              value={verticalOption()}
              onChange={setVerticalOption}
              options={[
                { value: 'top', label: 'Top' },
                { value: 'middle', label: 'Middle' },
                { value: 'bottom', label: 'Bottom' },
              ]}
              aria-label="Position selector horizontal"
            />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-2">
              Vertical
            </p>
            <SegmentedControl
              orientation="vertical"
              value={verticalOption()}
              onChange={setVerticalOption}
              options={[
                { value: 'top', label: 'Top' },
                { value: 'middle', label: 'Middle' },
                { value: 'bottom', label: 'Bottom' },
              ]}
              aria-label="Position selector vertical"
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Disabled Options"
        code={`<SegmentedControl
  value={plan()}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
/>`}
      >
        <StateDisplay label="Selected" value={plan()} />
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
      </DemoSection>

      <DemoSection
        title="With Numbers"
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
      >
        <StateDisplay label="Items per page" value={count()} />
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
      </DemoSection>

      <DemoSection
        title="View Toggle Example"
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
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300">
            Data Preview
          </h3>
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
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">
                  ID
                </th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">
                  Name
                </th>
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
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'options',
              type: 'SegmentedControlOption<T>[]',
              default: 'required',
              description: 'Available options',
            },
            {
              name: 'value',
              type: 'T',
              default: 'required',
              description: 'Current selected value',
            },
            {
              name: 'onChange',
              type: '(value: T) => void',
              default: 'required',
              description: 'Value change callback',
            },
            {
              name: 'size',
              type: "'sm' | 'md'",
              default: "'md'",
              description: 'Control size',
            },
            {
              name: 'orientation',
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: 'Control orientation',
            },
            {
              name: 'aria-label',
              type: 'string',
              description: 'Accessible label for the group',
            },
            {
              name: 'class',
              type: 'string',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="SegmentedControlOption">
        <PropsTable
          compact
          props={[
            {
              name: 'value',
              type: 'T',
              description: 'Option value (string or number)',
            },
            {
              name: 'label',
              type: 'string | JSX.Element',
              description: 'Display label (can be an icon)',
            },
            {
              name: 'disabled',
              type: 'boolean',
              description: 'Disable this option',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Accessibility" card={false}>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>
            Uses <CodePill>role="group"</CodePill> for the container
          </li>
          <li>Each option is a button with clear focus states</li>
          <li>
            Disabled options have <CodePill>disabled</CodePill> attribute
          </li>
          <li>
            Always provide <CodePill>aria-label</CodePill> for screen readers
          </li>
        </ul>
      </DemoSection>
    </div>
  );
}
