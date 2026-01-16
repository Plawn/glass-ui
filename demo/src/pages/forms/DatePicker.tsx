import { DatePicker, DateRangePicker, CodeBlock, Card, type DateRange } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, CodePill, StateDisplay } from '../../components/demo';

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

  // DateRangePicker signals
  const [basicRange, setBasicRange] = createSignal<DateRange>({ start: null, end: null });
  const [labeledRange, setLabeledRange] = createSignal<DateRange>({ start: null, end: null });
  const [formatRange, setFormatRange] = createSignal<DateRange>({
    start: new Date(),
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
  const [clearableRange, setClearableRange] = createSignal<DateRange>({
    start: new Date(),
    end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  });
  const [constrainedRange, setConstrainedRange] = createSignal<DateRange>({ start: null, end: null });

  // Calculate min and max dates for the constrained example
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  return (
    <div class="space-y-8">
      <PageHeader
        title="DatePicker"
        description="A glassmorphic date picker component with calendar popup, supporting multiple date formats, min/max constraints, and configurable week start day."
      />

      <DemoSection
        title="Import"
        code="import { DatePicker } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [date, setDate] = createSignal<Date | null>(null);

<DatePicker
  value={date()}
  onChange={setDate}
  placeholder="Select a date..."
/>`}
      >
        <DatePicker
          value={basicDate()}
          onChange={setBasicDate}
          placeholder="Select a date..."
        />
        <StateDisplay label="Selected" value={basicDate()?.toLocaleDateString() || 'None'} />
      </DemoSection>

      <DemoSection
        title="With Label"
        code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Birth Date"
  placeholder="Choose your birth date..."
/>`}
      >
        <DatePicker
          value={labeledDate()}
          onChange={setLabeledDate}
          label="Birth Date"
          placeholder="Choose your birth date..."
        />
      </DemoSection>

      <DemoSection
        title="Date Formats"
        description={<>The DatePicker supports multiple display formats via the <CodePill>format</CodePill> prop.</>}
        code={`<DatePicker format="yyyy-MM-dd" ... />  // 2024-01-15
<DatePicker format="MM/dd/yyyy" ... />  // 01/15/2024
<DatePicker format="dd/MM/yyyy" ... />  // 15/01/2024
<DatePicker format="dd.MM.yyyy" ... />  // 15.01.2024
<DatePicker format="MMM dd, yyyy" ... /> // Jan 15, 2024`}
      >
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
      </DemoSection>

      <DemoSection
        title="Clearable"
        description="Enable the clear button to allow users to reset the selected date."
        code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Clearable Date"
  clearable
/>`}
      >
        <DatePicker
          value={clearableDate()}
          onChange={setClearableDate}
          label="Clearable Date"
          clearable
        />
      </DemoSection>

      <DemoSection
        title="Min/Max Date Constraints"
        description={<>Restrict the selectable date range using <CodePill>min</CodePill> and <CodePill>max</CodePill> props. In this example, dates from 7 days ago to 30 days from now are selectable.</>}
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
      >
        <DatePicker
          value={constrainedDate()}
          onChange={setConstrainedDate}
          label="Appointment Date"
          placeholder="Select a date (within range)..."
          min={minDate}
          max={maxDate}
          clearable
        />
        <StateDisplay label="Range" value={`${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`} />
      </DemoSection>

      <DemoSection
        title="Week Start Day"
        description="Configure whether the week starts on Sunday (default) or Monday."
        code={`<DatePicker weekStartsOn={0} ... /> // Sunday (default)
<DatePicker weekStartsOn={1} ... /> // Monday`}
      >
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
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<DatePicker size="sm" ... />
<DatePicker size="md" ... />
<DatePicker size="lg" ... />`}
      >
        <div class="space-y-4">
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
        </div>
      </DemoSection>

      <DemoSection
        title="With Error"
        code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Required Field"
  error={!date() ? 'Please select a date' : undefined}
/>`}
      >
        <DatePicker
          value={errorDate()}
          onChange={setErrorDate}
          label="Required Field"
          placeholder="Select a date..."
          error={!errorDate() ? 'Please select a date' : undefined}
        />
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<DatePicker
  value={date()}
  onChange={setDate}
  label="Disabled DatePicker"
  disabled
/>`}
      >
        <DatePicker
          value={new Date()}
          onChange={() => {}}
          label="Disabled DatePicker"
          disabled
        />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'value', type: 'Date | null', default: 'required', description: 'Currently selected date value' },
            { name: 'onChange', type: '(date: Date | null) => void', default: 'required', description: 'Callback when date selection changes' },
            { name: 'label', type: 'string', description: 'Label text displayed above the input' },
            { name: 'placeholder', type: 'string', default: "'Select date'", description: 'Placeholder text when no date is selected' },
            { name: 'format', type: 'DateFormat', default: "'yyyy-MM-dd'", description: 'Date format string for display' },
            { name: 'min', type: 'Date', description: 'Minimum selectable date' },
            { name: 'max', type: 'Date', description: 'Maximum selectable date' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant of the input' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the component is disabled' },
            { name: 'error', type: 'string', description: 'Error message displayed below the input' },
            { name: 'clearable', type: 'boolean', default: 'false', description: 'Whether to show the clear button' },
            { name: 'weekStartsOn', type: '0 | 1', default: '0', description: 'Day of week to start calendar (0=Sunday, 1=Monday)' },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            { name: 'name', type: 'string', description: 'HTML name attribute' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="DateFormat Type"
        card={false}
      >
        <Card class="p-6">
          <CodeBlock
            code={`type DateFormat =
  | 'yyyy-MM-dd'   // 2024-01-15
  | 'MM/dd/yyyy'   // 01/15/2024
  | 'dd/MM/yyyy'   // 15/01/2024
  | 'dd.MM.yyyy'   // 15.01.2024
  | 'MMM dd, yyyy'; // Jan 15, 2024`}
            language="tsx"
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Form Example"
        card={false}
      >
        <Card class="p-6">
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
        </Card>
      </DemoSection>

      {/* DateRangePicker Section */}
      <div class="border-t border-surface-200 dark:border-surface-700 pt-8 mt-8">
        <PageHeader
          title="DateRangePicker"
          description="A date range picker component for selecting a start and end date. Click once to set the start date, then click again to set the end date. Hover to preview the range."
        />
      </div>

      <DemoSection
        title="Import"
        code="import { DateRangePicker, type DateRange } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [range, setRange] = createSignal<DateRange>({ start: null, end: null });

<DateRangePicker
  value={range()}
  onChange={setRange}
  placeholder="Select date range..."
/>`}
      >
        <DateRangePicker
          value={basicRange()}
          onChange={setBasicRange}
          placeholder="Select date range..."
        />
        <StateDisplay label="Selected" value={`${basicRange().start?.toLocaleDateString() || 'None'} - ${basicRange().end?.toLocaleDateString() || 'None'}`} />
      </DemoSection>

      <DemoSection
        title="With Label"
        code={`<DateRangePicker
  value={range()}
  onChange={setRange}
  label="Vacation Period"
  placeholder="Choose your vacation dates..."
/>`}
      >
        <DateRangePicker
          value={labeledRange()}
          onChange={setLabeledRange}
          label="Vacation Period"
          placeholder="Choose your vacation dates..."
        />
      </DemoSection>

      <DemoSection
        title="Date Formats"
        code={`<DateRangePicker format="yyyy-MM-dd" ... />
<DateRangePicker format="dd/MM/yyyy" ... />
<DateRangePicker format="MMM dd, yyyy" ... />
<DateRangePicker separator=" → " ... />`}
      >
        <div class="grid gap-4 md:grid-cols-2">
          <DateRangePicker
            value={formatRange()}
            onChange={setFormatRange}
            label="ISO Format"
            format="yyyy-MM-dd"
          />
          <DateRangePicker
            value={formatRange()}
            onChange={setFormatRange}
            label="EU Format"
            format="dd/MM/yyyy"
          />
          <DateRangePicker
            value={formatRange()}
            onChange={setFormatRange}
            label="Long Format"
            format="MMM dd, yyyy"
          />
          <DateRangePicker
            value={formatRange()}
            onChange={setFormatRange}
            label="Custom Separator"
            format="dd/MM/yyyy"
            separator=" -> "
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Clearable"
        code={`<DateRangePicker
  value={range()}
  onChange={setRange}
  label="Clearable Range"
  clearable
/>`}
      >
        <DateRangePicker
          value={clearableRange()}
          onChange={setClearableRange}
          label="Clearable Range"
          clearable
        />
      </DemoSection>

      <DemoSection
        title="Min/Max Constraints"
        description="Restrict the selectable date range. In this example, dates from 7 days ago to 30 days from now are selectable."
        code={`<DateRangePicker
  value={range()}
  onChange={setRange}
  label="Booking Period"
  min={minDate}
  max={maxDate}
/>`}
      >
        <DateRangePicker
          value={constrainedRange()}
          onChange={setConstrainedRange}
          label="Booking Period"
          placeholder="Select available dates..."
          min={minDate}
          max={maxDate}
          clearable
        />
        <StateDisplay label="Available" value={`${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`} />
      </DemoSection>

      <DemoSection title="DateRangePicker Props">
        <PropsTable
          props={[
            { name: 'value', type: 'DateRange', default: 'required', description: 'Currently selected date range' },
            { name: 'onChange', type: '(range: DateRange) => void', default: 'required', description: 'Callback when range selection changes' },
            { name: 'separator', type: 'string', default: "' - '", description: 'Separator text between start and end dates' },
            { name: 'startPlaceholder', type: 'string', default: "'Start date'", description: 'Placeholder for start date' },
            { name: 'endPlaceholder', type: 'string', default: "'End date'", description: 'Placeholder for end date' },
          ]}
        />
        <p class="mt-2 text-sm text-surface-500 dark:text-surface-400 italic">
          + All props from DatePicker (label, format, min, max, size, disabled, error, clearable, weekStartsOn)
        </p>
      </DemoSection>

      <DemoSection
        title="DateRange Type"
        card={false}
      >
        <Card class="p-6">
          <CodeBlock
            code={`interface DateRange {
  start: Date | null;
  end: Date | null;
}`}
            language="tsx"
          />
        </Card>
      </DemoSection>
    </div>
  );
}
