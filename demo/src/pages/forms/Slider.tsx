import { Slider, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function SliderPage() {
  const [basicValue, setBasicValue] = createSignal(50);
  const [volume, setVolume] = createSignal(75);
  const [temperature, setTemperature] = createSignal(22);
  const [price, setPrice] = createSignal(500);
  const [opacity, setOpacity] = createSignal(80);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Slider</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A range input slider component with glassmorphism styling for selecting numeric values within a defined range.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Slider } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Slider
            value={basicValue()}
            onChange={setBasicValue}
            label="Value"
            showValue
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [value, setValue] = createSignal(50);

<Slider
  value={value()}
  onChange={setValue}
  label="Value"
  showValue
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Range</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Set custom min, max, and step values to control the slider range.
        </p>
        <Card class="p-6">
          <div class="space-y-6">
            <Slider
              value={temperature()}
              onChange={setTemperature}
              min={16}
              max={30}
              step={0.5}
              label="Temperature"
              showValue
            />
            <p class="text-sm text-surface-600 dark:text-surface-400">
              Range: 16-30, Step: 0.5
            </p>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Slider
  value={temperature()}
  onChange={setTemperature}
  min={16}
  max={30}
  step={0.5}
  label="Temperature"
  showValue
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Slider supports three sizes: sm, md (default), and lg.
        </p>
        <Card class="p-6">
          <div class="space-y-8">
            <Slider
              value={volume()}
              onChange={setVolume}
              label="Small"
              size="sm"
              showValue
            />
            <Slider
              value={volume()}
              onChange={setVolume}
              label="Medium (default)"
              size="md"
              showValue
            />
            <Slider
              value={volume()}
              onChange={setVolume}
              label="Large"
              size="lg"
              showValue
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Slider value={value()} onChange={setValue} size="sm" />
<Slider value={value()} onChange={setValue} size="md" />
<Slider value={value()} onChange={setValue} size="lg" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Marks</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Display marks/ticks on the slider track with optional labels.
        </p>
        <Card class="p-6">
          <div class="space-y-8">
            <Slider
              value={price()}
              onChange={setPrice}
              min={0}
              max={1000}
              step={100}
              label="Price Range"
              showValue
              marks={[
                { value: 0, label: '$0' },
                { value: 250, label: '$250' },
                { value: 500, label: '$500' },
                { value: 750, label: '$750' },
                { value: 1000, label: '$1000' },
              ]}
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Slider
  value={price()}
  onChange={setPrice}
  min={0}
  max={1000}
  step={100}
  label="Price Range"
  showValue
  marks={[
    { value: 0, label: '$0' },
    { value: 250, label: '$250' },
    { value: 500, label: '$500' },
    { value: 750, label: '$750' },
    { value: 1000, label: '$1000' },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Marks Without Labels</h2>
        <Card class="p-6">
          <Slider
            value={opacity()}
            onChange={setOpacity}
            min={0}
            max={100}
            step={25}
            label="Opacity"
            showValue
            marks={[
              { value: 0 },
              { value: 25 },
              { value: 50 },
              { value: 75 },
              { value: 100 },
            ]}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Slider
  value={opacity()}
  onChange={setOpacity}
  marks={[
    { value: 0 },
    { value: 25 },
    { value: 50 },
    { value: 75 },
    { value: 100 },
  ]}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Without Label</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Slider can be used without a label for compact layouts.
        </p>
        <Card class="p-6">
          <div class="flex items-center gap-4">
            <span class="text-sm text-surface-700 dark:text-surface-300 w-16">Volume:</span>
            <div class="flex-1">
              <Slider
                value={volume()}
                onChange={setVolume}
              />
            </div>
            <span class="text-sm text-surface-600 dark:text-surface-400 w-12 text-right">
              {volume()}%
            </span>
          </div>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6">
          <Slider
            value={50}
            onChange={() => {}}
            label="Disabled slider"
            showValue
            disabled
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Slider value={50} onChange={() => {}} label="Disabled" disabled />`}
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
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Current value of the slider</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(value: number) =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Callback when the value changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">min</td>
                <td class="py-2 pr-4 font-mono text-xs">number</td>
                <td class="py-2 pr-4">0</td>
                <td class="py-2">Minimum value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">max</td>
                <td class="py-2 pr-4 font-mono text-xs">number</td>
                <td class="py-2 pr-4">100</td>
                <td class="py-2">Maximum value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">step</td>
                <td class="py-2 pr-4 font-mono text-xs">number</td>
                <td class="py-2 pr-4">1</td>
                <td class="py-2">Step increment</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Label text displayed above the slider</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">showValue</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether to show the current value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Size variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">marks</td>
                <td class="py-2 pr-4 font-mono text-xs">SliderMark[]</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Marks/ticks to display on the track</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the slider is disabled</td>
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
                <td class="py-2">HTML name attribute for form submission</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">SliderMark Type</h2>
        <Card class="p-6">
          <CodeBlock
            code={`interface SliderMark {
  /** Value where the mark should appear */
  value: number;
  /** Optional label to display at the mark */
  label?: string;
}`}
            language="tsx"
          />
        </Card>
      </section>
    </div>
  );
}
