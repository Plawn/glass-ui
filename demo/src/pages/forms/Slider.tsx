import { Card, CodeBlock, Slider } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import {
  DemoSection,
  PageHeader,
  PropsTable,
  StateDisplay,
} from '../../components/demo';

export default function SliderPage() {
  const [basicValue, setBasicValue] = createSignal(50);
  const [volume, setVolume] = createSignal(75);
  const [temperature, setTemperature] = createSignal(22);
  const [price, setPrice] = createSignal(500);
  const [opacity, setOpacity] = createSignal(80);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Slider"
        description="A range input slider component with glassmorphism styling for selecting numeric values within a defined range."
      />

      <DemoSection
        title="Import"
        code="import { Slider } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [value, setValue] = createSignal(50);

<Slider
  value={value()}
  onChange={setValue}
  label="Value"
  showValue
/>`}
      >
        <Slider
          value={basicValue()}
          onChange={setBasicValue}
          label="Value"
          showValue
        />
      </DemoSection>

      <DemoSection
        title="Custom Range"
        description="Set custom min, max, and step values to control the slider range."
        code={`<Slider
  value={temperature()}
  onChange={setTemperature}
  min={16}
  max={30}
  step={0.5}
  label="Temperature"
  showValue
/>`}
      >
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
          <StateDisplay label="Range" value="16-30, Step: 0.5" />
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Slider supports three sizes: sm, md (default), and lg."
        code={`<Slider value={value()} onChange={setValue} size="sm" />
<Slider value={value()} onChange={setValue} size="md" />
<Slider value={value()} onChange={setValue} size="lg" />`}
      >
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
      </DemoSection>

      <DemoSection
        title="With Marks"
        description="Display marks/ticks on the slider track with optional labels."
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
      >
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
      </DemoSection>

      <DemoSection
        title="Marks Without Labels"
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
      >
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
      </DemoSection>

      <DemoSection
        title="Without Label"
        description="Slider can be used without a label for compact layouts."
        card={false}
      >
        <Card class="p-6">
          <div class="flex items-center gap-4">
            <span class="text-sm text-surface-700 dark:text-surface-300 w-16">
              Volume:
            </span>
            <div class="flex-1">
              <Slider value={volume()} onChange={setVolume} />
            </div>
            <span class="text-sm text-surface-600 dark:text-surface-400 w-12 text-right">
              {volume()}%
            </span>
          </div>
        </Card>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<Slider value={50} onChange={() => {}} label="Disabled" disabled />`}
      >
        <Slider
          value={50}
          onChange={() => {}}
          label="Disabled slider"
          showValue
          disabled
        />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'value',
              type: 'number',
              description: 'Current value of the slider',
            },
            {
              name: 'onChange',
              type: '(value: number) => void',
              description: 'Callback when the value changes',
            },
            {
              name: 'min',
              type: 'number',
              default: '0',
              description: 'Minimum value',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: 'Maximum value',
            },
            {
              name: 'step',
              type: 'number',
              default: '1',
              description: 'Step increment',
            },
            {
              name: 'label',
              type: 'string',
              description: 'Label text displayed above the slider',
            },
            {
              name: 'showValue',
              type: 'boolean',
              default: 'false',
              description: 'Whether to show the current value',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Size variant',
            },
            {
              name: 'marks',
              type: 'SliderMark[]',
              description: 'Marks/ticks to display on the track',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Whether the slider is disabled',
            },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            {
              name: 'name',
              type: 'string',
              description: 'HTML name attribute for form submission',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="SliderMark Type" card={false}>
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
      </DemoSection>
    </div>
  );
}
