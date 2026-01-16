import { Autocomplete, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, CodePill, StateDisplay, FeatureList } from '../../components/demo';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil', disabled: true },
];

export default function AutocompletePage() {
  const [basicValue, setBasicValue] = createSignal('');
  const [labeledValue, setLabeledValue] = createSignal('');
  const [customValue, setCustomValue] = createSignal('');
  const [sizeSmValue, setSizeSmValue] = createSignal('');
  const [sizeLgValue, setSizeLgValue] = createSignal('');
  const [errorValue, setErrorValue] = createSignal('');
  const [loadingValue, setLoadingValue] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [asyncOptions, setAsyncOptions] = createSignal(fruits);

  // Simulate async loading
  const handleAsyncInputChange = (input: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = fruits.filter((f) =>
        f.label.toLowerCase().includes(input.toLowerCase())
      );
      setAsyncOptions(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div class="space-y-8">
      <PageHeader
        title="Autocomplete"
        description="A combobox component that provides suggestions as users type, with support for keyboard navigation, custom filtering, and async data loading."
      />

      <DemoSection
        title="Import"
        code="import { Autocomplete } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [value, setValue] = createSignal('');

<Autocomplete
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
  value={value()}
  onChange={setValue}
  placeholder="Select a fruit..."
/>`}
      >
        <Autocomplete
          options={fruits}
          value={basicValue()}
          onChange={setBasicValue}
          placeholder="Select a fruit..."
        />
        <StateDisplay label="Selected" value={basicValue() || 'None'} />
      </DemoSection>

      <DemoSection
        title="With Label"
        code={`<Autocomplete
  options={countries}
  value={value()}
  onChange={setValue}
  label="Country"
  placeholder="Search countries..."
/>`}
      >
        <Autocomplete
          options={countries}
          value={labeledValue()}
          onChange={setLabeledValue}
          label="Country"
          placeholder="Search countries..."
        />
      </DemoSection>

      <DemoSection
        title="Allow Custom Values"
        description={<>Enable <CodePill>allowCustomValue</CodePill> to accept values not in the options list.</>}
        code={`<Autocomplete
  options={fruits}
  value={value()}
  onChange={setValue}
  label="Favorite Fruit"
  placeholder="Type or select a fruit..."
  allowCustomValue
/>`}
      >
        <Autocomplete
          options={fruits}
          value={customValue()}
          onChange={setCustomValue}
          label="Favorite Fruit"
          placeholder="Type or select a fruit..."
          allowCustomValue
        />
        <StateDisplay label="Value" value={customValue() || 'None'} />
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Autocomplete size="sm" ... />
<Autocomplete size="md" ... />
<Autocomplete size="lg" ... />`}
      >
        <div class="space-y-4">
          <Autocomplete
            options={fruits}
            value={sizeSmValue()}
            onChange={setSizeSmValue}
            label="Small"
            size="sm"
            placeholder="Small size..."
          />
          <Autocomplete
            options={fruits}
            value={basicValue()}
            onChange={setBasicValue}
            label="Medium (default)"
            size="md"
            placeholder="Medium size..."
          />
          <Autocomplete
            options={fruits}
            value={sizeLgValue()}
            onChange={setSizeLgValue}
            label="Large"
            size="lg"
            placeholder="Large size..."
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Error"
        code={`<Autocomplete
  options={fruits}
  value={value()}
  onChange={setValue}
  label="Required Field"
  error={!value() ? 'Please select a fruit' : undefined}
/>`}
      >
        <Autocomplete
          options={fruits}
          value={errorValue()}
          onChange={setErrorValue}
          label="Required Field"
          placeholder="Select a fruit..."
          error={!errorValue() ? 'Please select a fruit' : undefined}
        />
      </DemoSection>

      <DemoSection
        title="Async Loading"
        description={<>Use <CodePill>onInputChange</CodePill> and <CodePill>loading</CodePill> props for async data fetching.</>}
        code={`const [isLoading, setIsLoading] = createSignal(false);
const [options, setOptions] = createSignal([]);

const handleInputChange = async (input: string) => {
  setIsLoading(true);
  const results = await fetchOptions(input);
  setOptions(results);
  setIsLoading(false);
};

<Autocomplete
  options={options()}
  value={value()}
  onChange={setValue}
  onInputChange={handleInputChange}
  loading={isLoading()}
  label="Async Search"
  placeholder="Type to search..."
/>`}
      >
        <Autocomplete
          options={asyncOptions()}
          value={loadingValue()}
          onChange={setLoadingValue}
          onInputChange={handleAsyncInputChange}
          loading={isLoading()}
          label="Async Search"
          placeholder="Type to search..."
        />
      </DemoSection>

      <DemoSection
        title="Disabled Options"
        description={<>Individual options can be disabled by setting <CodePill>disabled: true</CodePill>.</>}
        code={`const options = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'br', label: 'Brazil', disabled: true },
];

<Autocomplete
  options={options}
  value={value()}
  onChange={setValue}
/>`}
      >
        <Autocomplete
          options={countries}
          value={labeledValue()}
          onChange={setLabeledValue}
          label="Country"
          placeholder="Brazil is disabled..."
        />
      </DemoSection>

      <DemoSection
        title="Custom Filter Function"
        description="Provide a custom filter function for advanced filtering logic."
        card={false}
      >
        <Card class="p-6">
          <CodeBlock
            code={`// Filter by value instead of label
const customFilter = (option, input) =>
  option.value.toLowerCase().includes(input.toLowerCase());

<Autocomplete
  options={options}
  value={value()}
  onChange={setValue}
  filterFn={customFilter}
/>`}
            language="tsx"
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<Autocomplete
  options={fruits}
  value={value()}
  onChange={setValue}
  label="Disabled Autocomplete"
  disabled
/>`}
      >
        <Autocomplete
          options={fruits}
          value="apple"
          onChange={() => {}}
          label="Disabled Autocomplete"
          disabled
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'options', type: 'AutocompleteOption[]', default: 'required', description: 'List of available options' },
            { name: 'value', type: 'string', default: 'required', description: 'Currently selected value' },
            { name: 'onChange', type: '(value: string) => void', default: 'required', description: 'Callback when selection changes' },
            { name: 'onInputChange', type: '(input: string) => void', description: 'Callback when input text changes (for async loading)' },
            { name: 'label', type: 'string', description: 'Label displayed above the input' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text for the input' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the component is disabled' },
            { name: 'error', type: 'string', description: 'Error message displayed below the input' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the component is in loading state' },
            { name: 'emptyText', type: 'string', default: "'No options found'", description: 'Text to display when no options match' },
            { name: 'allowCustomValue', type: 'boolean', default: 'false', description: 'Allow custom values not in options list' },
            { name: 'filterFn', type: '(option, input) => boolean', description: 'Custom filter function for options' },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            { name: 'name', type: 'string', description: 'HTML name attribute' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="AutocompleteOption Interface"
        card={false}
      >
        <Card class="p-6">
          <CodeBlock
            code={`interface AutocompleteOption {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}`}
            language="tsx"
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Keyboard Navigation"
        card={false}
      >
        <Card class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Key</th>
                  <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody class="text-surface-600 dark:text-surface-400">
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">Arrow Down</td>
                  <td class="py-3 px-4">Open dropdown / Move to next option</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">Arrow Up</td>
                  <td class="py-3 px-4">Move to previous option</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">Enter</td>
                  <td class="py-3 px-4">Select focused option</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">Escape</td>
                  <td class="py-3 px-4">Close dropdown and reset input</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">Home</td>
                  <td class="py-3 px-4">Move to first option</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">End</td>
                  <td class="py-3 px-4">Move to last option</td>
                </tr>
                <tr class="border-b border-surface-100 dark:border-surface-800">
                  <td class="py-3 px-4 font-mono text-xs">Tab</td>
                  <td class="py-3 px-4">Close dropdown and move focus</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </DemoSection>
    </div>
  );
}
