import { DatePicker, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function DatePickerPage() {
  const [basicDate, setBasicDate] = createSignal<Date | null>(null);
  const [labeledDate, setLabeledDate] = createSignal<Date | null>(null);
  const [formatDate, setFormatDate] = createSignal<Date | null>(new Date());
  const [clearableDate, setClearableDate] = createSignal<Date | null>(new Date());
  const [constrainedDate, setConstrainedDate] = createSignal<Date | null>(null);
  const [sizeSmDate, setSizeSmDate] = createSignal<Date | null>(null);
  const [sizeLgDate, setSizeLgDate] = createSignal<Date | null>(null);
  const [errorDate, setErrorDate] = createSignal<Date | null>(null);
  const [mondayDate, setMondayDate] = createSignal<Date | null>(null);

  // Calculate min and max dates for the constrained example
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          DatePicker
        </h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic date picker component with calendar popup, supporting multiple date
          formats, min/max constraints, and configurable week start day.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Import
        </h2>
        <CodeBlock
          code={`import { DatePicker } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Basic Usage
        </h2>
        <Card class="p-6 space-y-4">
          <DatePicker
            value={basicDate()}
            onChange={setBasicDate}
            placeholder="Select a date..."
          />
          <p class="text-sm text-surface-500 dark:text-surface-400">
            Selected: {basicDate()?.toLocaleDateString() || 'None'}
          </p>
        </Card>
        <CodeBlock
          class="mt-4"
          code={`const [date, setDate] = createSignal<Date | null>(null);

<DatePicker
  value={date()}
  onChange={setDate}
  placeholder="Select a date..."
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Label
        </h2>
        <Card class="p-6 space-y-4">
          <DatePicker
            value={labeledDate()}
            onChange={setLabeledDate}
            label="Birth Date"
            placeholder="Choose your birth date..."
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Birth Date"
  placeholder="Choose your birth date..."
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Date Formats
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          The DatePicker supports multiple display formats via the{' '}
          <code class="text-primary-600 dark:text-primary-400">format</code> prop.
        </p>
        <Card class="p-6 space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <DatePicker
              value={formatDate()}
              onChange={setFormatDate}
              label="ISO Format (yyyy-MM-dd)"
              format="yyyy-MM-dd"
            />
            <DatePicker
              value={formatDate()}
              onChange={setFormatDate}
              label="US Format (MM/dd/yyyy)"
              format="MM/dd/yyyy"
            />
            <DatePicker
              value={formatDate()}
              onChange={setFormatDate}
              label="EU Format (dd/MM/yyyy)"
              format="dd/MM/yyyy"
            />
            <DatePicker
              value={formatDate()}
              onChange={setFormatDate}
              label="Dot Format (dd.MM.yyyy)"
              format="dd.MM.yyyy"
            />
            <DatePicker
              value={formatDate()}
              onChange={setFormatDate}
              label="Long Format (MMM dd, yyyy)"
              format="MMM dd, yyyy"
            />
          </div>
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker format="yyyy-MM-dd" ... />  // 2024-01-15
<DatePicker format="MM/dd/yyyy" ... />  // 01/15/2024
<DatePicker format="dd/MM/yyyy" ... />  // 15/01/2024
<DatePicker format="dd.MM.yyyy" ... />  // 15.01.2024
<DatePicker format="MMM dd, yyyy" ... /> // Jan 15, 2024`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Clearable
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Enable the clear button to allow users to reset the selected date.
        </p>
        <Card class="p-6 space-y-4">
          <DatePicker
            value={clearableDate()}
            onChange={setClearableDate}
            label="Clearable Date"
            clearable
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Clearable Date"
  clearable
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Min/Max Date Constraints
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Restrict the selectable date range using{' '}
          <code class="text-primary-600 dark:text-primary-400">min</code> and{' '}
          <code class="text-primary-600 dark:text-primary-400">max</code> props.
          In this example, dates from 7 days ago to 30 days from now are selectable.
        </p>
        <Card class="p-6 space-y-4">
          <DatePicker
            value={constrainedDate()}
            onChange={setConstrainedDate}
            label="Appointment Date"
            placeholder="Select a date (within range)..."
            min={minDate}
            max={maxDate}
            clearable
          />
          <p class="text-xs text-surface-500 dark:text-surface-400">
            Range: {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()}
          </p>
        </Card>
        <CodeBlock
          class="mt-4"
          code={`const today = new Date();
const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

<DatePicker
  value={date()}
  onChange={setDate}
  label="Appointment Date"
  min={minDate}
  max={maxDate}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Week Start Day
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Configure whether the week starts on Sunday (default) or Monday.
        </p>
        <Card class="p-6 space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <DatePicker
              value={basicDate()}
              onChange={setBasicDate}
              label="Week starts Sunday (default)"
              weekStartsOn={0}
            />
            <DatePicker
              value={mondayDate()}
              onChange={setMondayDate}
              label="Week starts Monday"
              weekStartsOn={1}
            />
          </div>
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker weekStartsOn={0} ... /> // Sunday (default)
<DatePicker weekStartsOn={1} ... /> // Monday`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Sizes
        </h2>
        <Card class="p-6 space-y-4">
          <DatePicker
            value={sizeSmDate()}
            onChange={setSizeSmDate}
            label="Small"
            size="sm"
            placeholder="Small size..."
          />
          <DatePicker
            value={basicDate()}
            onChange={setBasicDate}
            label="Medium (default)"
            size="md"
            placeholder="Medium size..."
          />
          <DatePicker
            value={sizeLgDate()}
            onChange={setSizeLgDate}
            label="Large"
            size="lg"
            placeholder="Large size..."
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker size="sm" ... />
<DatePicker size="md" ... />
<DatePicker size="lg" ... />`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Error
        </h2>
        <Card class="p-6 space-y-4">
          <DatePicker
            value={errorDate()}
            onChange={setErrorDate}
            label="Required Field"
            placeholder="Select a date..."
            error={!errorDate() ? 'Please select a date' : undefined}
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Required Field"
  error={!date() ? 'Please select a date' : undefined}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Disabled State
        </h2>
        <Card class="p-6">
          <DatePicker
            value={new Date()}
            onChange={() => {}}
            label="Disabled DatePicker"
            disabled
          />
        </Card>
        <CodeBlock
          class="mt-4"
          code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Disabled DatePicker"
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
                <td class="py-3 px-4 font-mono text-xs">value</td>
                <td class="py-3 px-4 font-mono text-xs">Date | null</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Currently selected date value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">onChange</td>
                <td class="py-3 px-4 font-mono text-xs">(date: Date | null) =&gt; void</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Callback when date selection changes</td>
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
                <td class="py-3 px-4">'Select date'</td>
                <td class="py-3 px-4">Placeholder text when no date is selected</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">format</td>
                <td class="py-3 px-4 font-mono text-xs">DateFormat</td>
                <td class="py-3 px-4">'yyyy-MM-dd'</td>
                <td class="py-3 px-4">Date format string for display</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">min</td>
                <td class="py-3 px-4 font-mono text-xs">Date</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Minimum selectable date</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">max</td>
                <td class="py-3 px-4 font-mono text-xs">Date</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Maximum selectable date</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">size</td>
                <td class="py-3 px-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-3 px-4">'md'</td>
                <td class="py-3 px-4">Size variant of the input</td>
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
                <td class="py-3 px-4 font-mono text-xs">clearable</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether to show the clear button</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">weekStartsOn</td>
                <td class="py-3 px-4 font-mono text-xs">0 | 1</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4">Day of week to start calendar (0=Sunday, 1=Monday)</td>
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
          DateFormat Type
        </h2>
        <CodeBlock
          code={`type DateFormat =
  | 'yyyy-MM-dd'   // 2024-01-15
  | 'MM/dd/yyyy'   // 01/15/2024
  | 'dd/MM/yyyy'   // 15/01/2024
  | 'dd.MM.yyyy'   // 15.01.2024
  | 'MMM dd, yyyy'; // Jan 15, 2024`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Form Example
        </h2>
        <CodeBlock
          code={`import { DatePicker, Button } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

function EventForm() {
  const [startDate, setStartDate] = createSignal<Date | null>(null);
  const [endDate, setEndDate] = createSignal<Date | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Event dates:', startDate(), endDate());
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <DatePicker
        value={startDate()}
        onChange={setStartDate}
        label="Start Date"
        placeholder="Select start date..."
        max={endDate() ?? undefined}
      />
      <DatePicker
        value={endDate()}
        onChange={setEndDate}
        label="End Date"
        placeholder="Select end date..."
        min={startDate() ?? undefined}
      />
      <Button type="submit">Create Event</Button>
    </form>
  );
}`}
          language="tsx"
        />
      </section>
    </div>
  );
}
