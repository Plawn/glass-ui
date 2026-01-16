import { RadioGroup } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, StateDisplay } from '../../components/demo';

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
      <PageHeader
        title="RadioGroup"
        description="A glassmorphic radio group component for selecting a single option from a list of choices."
      />

      <DemoSection
        title="Import"
        code="import { RadioGroup } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
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
      >
        <RadioGroup
          options={fruitOptions}
          value={selectedFruit()}
          onChange={setSelectedFruit}
          label="Select a fruit"
        />
        <StateDisplay label="Selected" value={selectedFruit()} />
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="RadioGroup supports three sizes: sm, md (default), and lg."
        code={`<RadioGroup options={options} value={value()} onChange={setValue} size="sm" />
<RadioGroup options={options} value={value()} onChange={setValue} size="md" />
<RadioGroup options={options} value={value()} onChange={setValue} size="lg" />`}
      >
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
      </DemoSection>

      <DemoSection
        title="Orientation"
        description="Options can be displayed vertically (default) or horizontally."
        code={`<RadioGroup
  options={options}
  value={value()}
  onChange={setValue}
  orientation="horizontal"
/>`}
      >
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
      </DemoSection>

      <DemoSection
        title="Disabled Options"
        description="Individual options or the entire group can be disabled."
        code={`// Disable individual options
const options = [
  { value: 'free', label: 'Free Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
];

// Disable entire group
<RadioGroup options={options} value={value()} onChange={setValue} disabled />`}
      >
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
      </DemoSection>

      <DemoSection
        title="With Error"
        code={`<RadioGroup
  options={options}
  value={value()}
  onChange={setValue}
  label="Select a fruit"
  error="Please select an option"
/>`}
      >
        <RadioGroup
          options={fruitOptions}
          value=""
          onChange={() => {}}
          label="Select a fruit"
          error="Please select an option"
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'options', type: 'RadioOption[]', description: 'Available options to choose from' },
            { name: 'value', type: 'string', description: 'Current selected value' },
            { name: 'onChange', type: '(value: string) => void', description: 'Callback when selection changes' },
            { name: 'label', type: 'string', description: 'Label for the entire group' },
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Layout orientation of options' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable entire group' },
            { name: 'error', type: 'string', description: 'Error message to display' },
            { name: 'name', type: 'string', default: 'auto', description: 'HTML name attribute for form submission' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
