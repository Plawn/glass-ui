import { NumberInput, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, StateDisplay, FeatureList } from '../../components/demo';

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
      <PageHeader
        title="NumberInput"
        description="A glassmorphic number input component with increment/decrement buttons. Supports min/max constraints, custom step values, and keyboard navigation."
      />

      <DemoSection
        title="Import"
        code="import { NumberInput } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [value, setValue] = createSignal(5);

<NumberInput
  value={value()}
  onChange={setValue}
  label="Quantity"
  placeholder="Enter a number"
/>`}
      >
        <div class="max-w-xs">
          <NumberInput
            value={basicValue()}
            onChange={setBasicValue}
            label="Quantity"
            placeholder="Enter a number"
          />
        </div>
        <StateDisplay label="Current value" value={basicValue()} />
      </DemoSection>

      <DemoSection
        title="Min and Max Constraints"
        code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Percentage (0-100)"
  min={0}
  max={100}
/>`}
      >
        <div class="max-w-xs">
          <NumberInput
            value={minMaxValue()}
            onChange={setMinMaxValue}
            label="Percentage (0-100)"
            min={0}
            max={100}
          />
        </div>
        <StateDisplay label="Info" value="Value is clamped between 0 and 100" />
      </DemoSection>

      <DemoSection
        title="Custom Step"
        code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Price"
  step={0.25}
  min={0}
/>`}
      >
        <div class="max-w-xs">
          <NumberInput
            value={stepValue()}
            onChange={setStepValue}
            label="Price"
            step={0.25}
            min={0}
          />
        </div>
        <StateDisplay label="Step: 0.25 | Current value" value={stepValue().toFixed(2)} />
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<NumberInput size="sm" label="Small" {...props} />
<NumberInput size="md" label="Medium" {...props} />
<NumberInput size="lg" label="Large" {...props} />`}
      >
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
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Locked Value"
  disabled
/>`}
      >
        <div class="max-w-xs">
          <NumberInput
            value={disabledValue()}
            onChange={() => {}}
            label="Locked Value"
            disabled
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Error State"
        code={`<NumberInput
  value={value()}
  onChange={setValue}
  label="Age"
  min={0}
  error={value() < 0 ? 'Value must be positive' : undefined}
/>`}
      >
        <div class="max-w-xs">
          <NumberInput
            value={errorValue()}
            onChange={setErrorValue}
            label="Age"
            min={0}
            error={errorValue() < 0 ? 'Value must be positive' : undefined}
          />
        </div>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'number', default: 'required', description: 'Current numeric value' },
            { name: 'onChange', type: '(value: number) => void', default: 'required', description: 'Callback when value changes' },
            { name: 'min', type: 'number', description: 'Minimum allowed value' },
            { name: 'max', type: 'number', description: 'Maximum allowed value' },
            { name: 'step', type: 'number', default: '1', description: 'Step increment/decrement value' },
            { name: 'label', type: 'string', description: 'Label text displayed above the input' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' },
            { name: 'error', type: 'string', description: 'Error message displayed below the input' },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            { name: 'name', type: 'string', description: 'HTML name attribute' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Keyboard Navigation"
        card={false}
      >
        <Card class="p-6">
          <FeatureList
            items={[
              'Arrow Up - Increment value by step',
              'Arrow Down - Decrement value by step',
            ]}
          />
        </Card>
      </DemoSection>
    </div>
  );
}
