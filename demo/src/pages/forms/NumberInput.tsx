import { NumberInput, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function NumberInputPage() {
  const [basicValue, setBasicValue] = createSignal(5);
  const [minMaxValue, setMinMaxValue] = createSignal(50);
  const [stepValue, setStepValue] = createSignal(0);
  const [smallValue, setSmallValue] = createSignal(10);
  const [mediumValue, setMediumValue] = createSignal(10);
  const [largeValue, setLargeValue] = createSignal(10);
  const [disabledValue] = createSignal(42);
  const [errorValue, setErrorValue] = createSignal(-5);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">NumberInput</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic number input component with increment/decrement buttons. Supports min/max constraints, custom step values, and keyboard navigation.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { NumberInput } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6 mb-4">
          <div class="max-w-xs">
            <NumberInput
              value={basicValue()}
              onChange={setBasicValue}
              label="Quantity"
              placeholder="Enter a number"
            />
          </div>
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Current value: {basicValue()}
          </p>
        </Card>
        <CodeBlock
          code={`const [value, setValue] = createSignal(5);

<NumberInput
  value={value()}
  onChange={setValue}
  label="Quantity"
  placeholder="Enter a number"
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Min and Max Constraints</h2>
        <Card class="p-6 mb-4">
          <div class="max-w-xs">
            <NumberInput
              value={minMaxValue()}
              onChange={setMinMaxValue}
              label="Percentage (0-100)"
              min={0}
              max={100}
            />
          </div>
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Value is clamped between 0 and 100
          </p>
        </Card>
        <CodeBlock
          code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Percentage (0-100)"
  min={0}
  max={100}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Step</h2>
        <Card class="p-6 mb-4">
          <div class="max-w-xs">
            <NumberInput
              value={stepValue()}
              onChange={setStepValue}
              label="Price"
              step={0.25}
              min={0}
            />
          </div>
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Step: 0.25 | Current value: {stepValue().toFixed(2)}
          </p>
        </Card>
        <CodeBlock
          code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Price"
  step={0.25}
  min={0}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6 mb-4">
          <div class="space-y-4 max-w-xs">
            <NumberInput
              value={smallValue()}
              onChange={setSmallValue}
              label="Small"
              size="sm"
            />
            <NumberInput
              value={mediumValue()}
              onChange={setMediumValue}
              label="Medium"
              size="md"
            />
            <NumberInput
              value={largeValue()}
              onChange={setLargeValue}
              label="Large"
              size="lg"
            />
          </div>
        </Card>
        <CodeBlock
          code={`<NumberInput size="sm" label="Small" {...props} />
<NumberInput size="md" label="Medium" {...props} />
<NumberInput size="lg" label="Large" {...props} />`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6 mb-4">
          <div class="max-w-xs">
            <NumberInput
              value={disabledValue()}
              onChange={() => {}}
              label="Locked Value"
              disabled
            />
          </div>
        </Card>
        <CodeBlock
          code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Locked Value"
  disabled
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Error State</h2>
        <Card class="p-6 mb-4">
          <div class="max-w-xs">
            <NumberInput
              value={errorValue()}
              onChange={setErrorValue}
              label="Age"
              min={0}
              error={errorValue() < 0 ? 'Value must be positive' : undefined}
            />
          </div>
        </Card>
        <CodeBlock
          code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Age"
  min={0}
  error={value() < 0 ? 'Value must be positive' : undefined}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-700 dark:text-surface-300 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-3 px-4 font-semibold">Prop</th>
                <th class="py-3 px-4 font-semibold">Type</th>
                <th class="py-3 px-4 font-semibold">Default</th>
                <th class="py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">value</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Current numeric value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">onChange</td>
                <td class="py-3 px-4 font-mono text-xs">(value: number) =&gt; void</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Callback when value changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">min</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Minimum allowed value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">max</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Maximum allowed value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">step</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">1</td>
                <td class="py-3 px-4">Step increment/decrement value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">label</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Label text displayed above the input</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">placeholder</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Placeholder text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">size</td>
                <td class="py-3 px-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-3 px-4">'md'</td>
                <td class="py-3 px-4">Size variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">disabled</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether the input is disabled</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">error</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Error message displayed below the input</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">id</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">HTML id attribute</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">name</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">HTML name attribute</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-mono text-xs">class</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Keyboard Navigation</h2>
        <Card class="p-6">
          <ul class="space-y-2 text-surface-600 dark:text-surface-400">
            <li><span class="font-mono text-xs bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded">Arrow Up</span> - Increment value by step</li>
            <li><span class="font-mono text-xs bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded">Arrow Down</span> - Decrement value by step</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
