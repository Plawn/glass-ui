import { Select, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function SelectPage() {
  const [fruit, setFruit] = createSignal('');
  const [country, setCountry] = createSignal('');
  const [priority, setPriority] = createSignal('');

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Select</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic select dropdown component with custom styling and a chevron indicator.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Select } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="space-y-4 max-w-xs">
            <Select value={fruit()} onChange={setFruit}>
              <option value="">Select a fruit...</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
              <option value="grape">Grape</option>
            </Select>
            <p class="text-sm text-surface-500">
              Selected: {fruit() || '(none)'}
            </p>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [fruit, setFruit] = createSignal('');

<Select value={fruit()} onChange={setFruit}>
  <option value="">Select a fruit...</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
  <option value="grape">Grape</option>
</Select>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Label</h2>
        <Card class="p-6">
          <div class="max-w-xs">
            <Select
              value={country()}
              onChange={setCountry}
              label="Country"
            >
              <option value="">Select your country...</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
            </Select>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Select
  value={country()}
  onChange={setCountry}
  label="Country"
>
  <option value="">Select your country...</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  ...
</Select>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Option Groups</h2>
        <Card class="p-6">
          <div class="max-w-xs">
            <Select
              value={priority()}
              onChange={setPriority}
              label="Priority"
            >
              <option value="">Select priority...</option>
              <optgroup label="High Priority">
                <option value="critical">Critical</option>
                <option value="urgent">Urgent</option>
              </optgroup>
              <optgroup label="Normal Priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </optgroup>
            </Select>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Select value={priority()} onChange={setPriority} label="Priority">
  <option value="">Select priority...</option>
  <optgroup label="High Priority">
    <option value="critical">Critical</option>
    <option value="urgent">Urgent</option>
  </optgroup>
  <optgroup label="Normal Priority">
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </optgroup>
</Select>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Error</h2>
        <Card class="p-6">
          <div class="max-w-xs">
            <Select
              value=""
              onChange={() => {}}
              label="Category"
              error="Please select a category"
            >
              <option value="">Select a category...</option>
              <option value="tech">Technology</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </Select>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Select
  value=""
  onChange={() => {}}
  label="Category"
  error="Please select a category"
>
  <option value="">Select a category...</option>
  <option value="tech">Technology</option>
  ...
</Select>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Required Field</h2>
        <Card class="p-6">
          <div class="max-w-xs">
            <Select
              value=""
              onChange={() => {}}
              label="Required Category"
              required
            >
              <option value="">Select a category...</option>
              <option value="tech">Technology</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </Select>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Select
  value={category()}
  onChange={setCategory}
  label="Category"
  required
>
  <option value="">Select a category...</option>
  ...
</Select>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6">
          <div class="max-w-xs">
            <Select
              value="option1"
              onChange={() => {}}
              label="Disabled Select"
              disabled
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </Select>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Select
  value="option1"
  onChange={() => {}}
  label="Disabled Select"
  disabled
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>`}
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
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Current selected value (required)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Callback when selection changes (required)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">children</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Option elements (required)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Label text displayed above the select</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">error</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Error message displayed below the select</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the select is disabled</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">required</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the select is required</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">id</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">HTML id attribute</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">name</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">HTML name attribute</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
