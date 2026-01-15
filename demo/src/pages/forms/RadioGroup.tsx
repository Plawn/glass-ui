import { RadioGroup, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function RadioGroupPage() {
  const [selectedFruit, setSelectedFruit] = createSignal('apple');
  const [selectedSize, setSelectedSize] = createSignal('md');
  const [selectedPlan, setSelectedPlan] = createSignal('pro');
  const [selectedTheme, setSelectedTheme] = createSignal('system');

  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

  const sizeOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ];

  const planOptions = [
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">RadioGroup</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic radio group component for selecting a single option from a list of choices.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { RadioGroup } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <RadioGroup
            options={fruitOptions}
            value={selectedFruit()}
            onChange={setSelectedFruit}
            label="Select a fruit"
          />
          <p class="mt-4 text-sm text-surface-600 dark:text-surface-400">
            Selected: {selectedFruit()}
          </p>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [selected, setSelected] = createSignal('apple');

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

<RadioGroup
  options={options}
  value={selected()}
  onChange={setSelected}
  label="Select a fruit"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          RadioGroup supports three sizes: sm, md (default), and lg.
        </p>
        <div class="space-y-6">
          <Card class="p-6">
            <div class="space-y-6">
              <RadioGroup
                options={sizeOptions}
                value={selectedSize()}
                onChange={setSelectedSize}
                label="Small"
                size="sm"
              />
              <RadioGroup
                options={sizeOptions}
                value={selectedSize()}
                onChange={setSelectedSize}
                label="Medium (default)"
                size="md"
              />
              <RadioGroup
                options={sizeOptions}
                value={selectedSize()}
                onChange={setSelectedSize}
                label="Large"
                size="lg"
              />
            </div>
          </Card>
        </div>
        <div class="mt-4">
          <CodeBlock
            code={`<RadioGroup options={options} value={value()} onChange={setValue} size="sm" />
<RadioGroup options={options} value={value()} onChange={setValue} size="md" />
<RadioGroup options={options} value={value()} onChange={setValue} size="lg" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Orientation</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Options can be displayed vertically (default) or horizontally.
        </p>
        <Card class="p-6">
          <div class="space-y-6">
            <RadioGroup
              options={themeOptions}
              value={selectedTheme()}
              onChange={setSelectedTheme}
              label="Vertical (default)"
              orientation="vertical"
            />
            <RadioGroup
              options={themeOptions}
              value={selectedTheme()}
              onChange={setSelectedTheme}
              label="Horizontal"
              orientation="horizontal"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<RadioGroup
  options={options}
  value={value()}
  onChange={setValue}
  orientation="horizontal"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled Options</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Individual options or the entire group can be disabled.
        </p>
        <Card class="p-6">
          <div class="space-y-6">
            <RadioGroup
              options={planOptions}
              value={selectedPlan()}
              onChange={setSelectedPlan}
              label="Select a plan (Enterprise is disabled)"
            />
            <RadioGroup
              options={fruitOptions}
              value={selectedFruit()}
              onChange={setSelectedFruit}
              label="Entire group disabled"
              disabled
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`// Disable individual options
const options = [
  { value: 'free', label: 'Free Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

// Disable entire group
<RadioGroup options={options} value={value()} onChange={setValue} disabled />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Error</h2>
        <Card class="p-6">
          <RadioGroup
            options={fruitOptions}
            value=""
            onChange={() => {}}
            label="Select a fruit"
            error="Please select an option"
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<RadioGroup
  options={options}
  value={value()}
  onChange={setValue}
  label="Select a fruit"
  error="Please select an option"
/>`}
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
                <td class="py-2 pr-4 font-mono text-xs">options</td>
                <td class="py-2 pr-4 font-mono text-xs">RadioOption[]</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Available options to choose from</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">value</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Current selected value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Callback when selection changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Label for the entire group</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">orientation</td>
                <td class="py-2 pr-4 font-mono text-xs">'horizontal' | 'vertical'</td>
                <td class="py-2 pr-4">'vertical'</td>
                <td class="py-2">Layout orientation of options</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Size variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Disable entire group</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">error</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Error message to display</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">name</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">auto</td>
                <td class="py-2">HTML name attribute for form submission</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
