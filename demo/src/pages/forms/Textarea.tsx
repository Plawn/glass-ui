import { Textarea } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import {
  DemoSection,
  PageHeader,
  PropsTable,
  StateDisplay,
} from '../../components/demo';

export default function TextareaPage() {
  const [value, setValue] = createSignal('');
  const [bioValue, setBioValue] = createSignal('');
  const [feedbackValue, setFeedbackValue] = createSignal('Too short');

  return (
    <div class="space-y-8">
      <PageHeader
        title="Textarea"
        description="A glassmorphic multi-line text input component with support for labels, validation, and size variants."
      />

      <DemoSection
        title="Import"
        code="import { Textarea } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [value, setValue] = createSignal('');

<Textarea
  value={value()}
  onInput={setValue}
  placeholder="Enter your message..."
  rows={4}
/>`}
      >
        <div class="space-y-4">
          <Textarea
            value={value()}
            onInput={setValue}
            placeholder="Enter your message..."
            rows={4}
          />
          <StateDisplay label="Current value" value={value() || '(empty)'} />
        </div>
      </DemoSection>

      <DemoSection
        title="With Label"
        code={`<Textarea
  value={bio()}
  onInput={setBio}
  label="Bio"
  placeholder="Tell us about yourself..."
  rows={3}
/>`}
      >
        <Textarea
          value={bioValue()}
          onInput={setBioValue}
          label="Bio"
          placeholder="Tell us about yourself..."
          rows={3}
        />
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Textarea size="sm" placeholder="Small textarea" ... />
<Textarea size="md" placeholder="Medium textarea (default)" ... />
<Textarea size="lg" placeholder="Large textarea" ... />`}
      >
        <div class="space-y-4">
          <Textarea
            value=""
            onInput={() => {}}
            placeholder="Small textarea"
            size="sm"
            rows={2}
          />
          <Textarea
            value=""
            onInput={() => {}}
            placeholder="Medium textarea (default)"
            size="md"
            rows={2}
          />
          <Textarea
            value=""
            onInput={() => {}}
            placeholder="Large textarea"
            size="lg"
            rows={2}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Error"
        code={`<Textarea
  value={feedback()}
  onInput={setFeedback}
  label="Feedback"
  placeholder="Please provide your feedback..."
  rows={3}
  error={feedback().length < 10 ? 'Feedback must be at least 10 characters' : undefined}
/>`}
      >
        <Textarea
          value={feedbackValue()}
          onInput={setFeedbackValue}
          label="Feedback"
          placeholder="Please provide your feedback..."
          rows={3}
          error={
            feedbackValue().length > 0 && feedbackValue().length < 10
              ? 'Feedback must be at least 10 characters'
              : undefined
          }
        />
      </DemoSection>

      <DemoSection
        title="Required Field"
        code={`<Textarea
  value={description()}
  onInput={setDescription}
  label="Description"
  required
  rows={3}
/>`}
      >
        <Textarea
          value=""
          onInput={() => {}}
          label="Required Description"
          placeholder="This field is required..."
          required
          rows={3}
        />
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<Textarea
  value="This textarea is disabled"
  onInput={() => {}}
  label="Disabled"
  disabled
  rows={2}
/>`}
      >
        <Textarea
          value="This textarea is disabled"
          onInput={() => {}}
          label="Disabled"
          disabled
          rows={2}
        />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'value',
              type: 'string',
              description: 'Current textarea value (required)',
            },
            {
              name: 'onInput',
              type: '(value: string) => void',
              description: 'Callback when value changes (required)',
            },
            {
              name: 'label',
              type: 'string',
              description: 'Label text displayed above the textarea',
            },
            {
              name: 'placeholder',
              type: 'string',
              description: 'Placeholder text',
            },
            {
              name: 'rows',
              type: 'number',
              description: 'Number of visible text rows',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Size variant',
            },
            {
              name: 'error',
              type: 'string',
              description: 'Error message displayed below the textarea',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Whether the textarea is disabled',
            },
            {
              name: 'readonly',
              type: 'boolean',
              default: 'false',
              description: 'Whether the textarea is readonly',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Whether the textarea is required',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
