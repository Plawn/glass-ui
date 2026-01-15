import { Autocomplete, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          Autocomplete
        </h1>
        <p class="text-surface-600 dark:text-surface-400">
          A combobox component that provides suggestions as users type, with support for
          keyboard navigation, custom filtering, and async data loading.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Import
        </h2>
        <CodeBlock
          code={`import { Autocomplete } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Basic Usage
        </h2>
        <Card class="p-6 space-y-4">
          <Autocomplete
            options={fruits}
            value={basicValue()}
            onChange={setBasicValue}
            placeholder="Select a fruit..."
          />
          <p class="text-sm text-surface-500 dark:text-surface-400">
            Selected: {basicValue() || 'None'}
          </p>
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Label
        </h2>
        <Card class="p-6 space-y-4">
          <Autocomplete
            options={countries}
            value={labeledValue()}
            onChange={setLabeledValue}
            label="Country"
            placeholder="Search countries..."
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<Autocomplete
  options={countries}
  value={value()}
  onChange={setValue}
  label="Country"
  placeholder="Search countries..."
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Allow Custom Values
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Enable <code class="text-primary-600 dark:text-primary-400">allowCustomValue</code> to
          accept values not in the options list.
        </p>
        <Card class="p-6 space-y-4">
          <Autocomplete
            options={fruits}
            value={customValue()}
            onChange={setCustomValue}
            label="Favorite Fruit"
            placeholder="Type or select a fruit..."
            allowCustomValue
          />
          <p class="text-sm text-surface-500 dark:text-surface-400">
            Value: {customValue() || 'None'}
          </p>
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<Autocomplete
  options={fruits}
  value={value()}
  onChange={setValue}
  label="Favorite Fruit"
  placeholder="Type or select a fruit..."
  allowCustomValue
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Sizes
        </h2>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<Autocomplete size="sm" ... />
<Autocomplete size="md" ... />
<Autocomplete size="lg" ... />`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Error
        </h2>
        <Card class="p-6 space-y-4">
          <Autocomplete
            options={fruits}
            value={errorValue()}
            onChange={setErrorValue}
            label="Required Field"
            placeholder="Select a fruit..."
            error={!errorValue() ? 'Please select a fruit' : undefined}
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<Autocomplete
  options={fruits}
  value={value()}
  onChange={setValue}
  label="Required Field"
  error={!value() ? 'Please select a fruit' : undefined}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Async Loading
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-primary-600 dark:text-primary-400">onInputChange</code> and{' '}
          <code class="text-primary-600 dark:text-primary-400">loading</code> props for
          async data fetching.
        </p>
        <Card class="p-6 space-y-4">
          <Autocomplete
            options={asyncOptions()}
            value={loadingValue()}
            onChange={setLoadingValue}
            onInputChange={handleAsyncInputChange}
            loading={isLoading()}
            label="Async Search"
            placeholder="Type to search..."
          />
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Disabled Options
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Individual options can be disabled by setting <code class="text-primary-600 dark:text-primary-400">disabled: true</code>.
        </p>
        <Card class="p-6 space-y-4">
          <Autocomplete
            options={countries}
            value={labeledValue()}
            onChange={setLabeledValue}
            label="Country"
            placeholder="Brazil is disabled..."
          />
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Custom Filter Function
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Provide a custom filter function for advanced filtering logic.
        </p>
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
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Disabled State
        </h2>
        <Card class="p-6">
          <Autocomplete
            options={fruits}
            value="apple"
            onChange={() => {}}
            label="Disabled Autocomplete"
            disabled
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<Autocomplete
  options={fruits}
  value={value()}
  onChange={setValue}
  label="Disabled Autocomplete"
  disabled
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Props
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">options</td>
                <td class="py-3 px-4 font-mono text-xs">AutocompleteOption[]</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">List of available options</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">value</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Currently selected value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">onChange</td>
                <td class="py-3 px-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Callback when selection changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">onInputChange</td>
                <td class="py-3 px-4 font-mono text-xs">(input: string) =&gt; void</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Callback when input text changes (for async loading)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">label</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Label displayed above the input</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">placeholder</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Placeholder text for the input</td>
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
                <td class="py-3 px-4">Whether the component is disabled</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">error</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Error message displayed below the input</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">loading</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether the component is in loading state</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">emptyText</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'No options found'</td>
                <td class="py-3 px-4">Text to display when no options match</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">allowCustomValue</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Allow custom values not in options list</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">filterFn</td>
                <td class="py-3 px-4 font-mono text-xs">(option, input) =&gt; boolean</td>
                <td class="py-3 px-4">case-insensitive substring match</td>
                <td class="py-3 px-4">Custom filter function for options</td>
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
              <tr class="border-b border-surface-100 dark:border-surface-800">
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
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          AutocompleteOption Interface
        </h2>
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
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Keyboard Navigation
        </h2>
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
      </section>
    </div>
  );
}
