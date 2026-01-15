import { Textarea, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function TextareaPage() {
  const [value, setValue] = createSignal('');
  const [bioValue, setBioValue] = createSignal('');
  const [feedbackValue, setFeedbackValue] = createSignal('');

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Textarea</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic multi-line text input component with support for labels, validation, and size variants.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Textarea } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="space-y-4">
            <Textarea
              value={value()}
              onInput={setValue}
              placeholder="Enter your message..."
              rows={4}
            />
            <p class="text-sm text-surface-500">
              Current value: {value() || '(empty)'}
            </p>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [value, setValue] = createSignal('');

<Textarea
  value={value()}
  onInput={setValue}
  placeholder="Enter your message..."
  rows={4}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Label</h2>
        <Card class="p-6">
          <Textarea
            value={bioValue()}
            onInput={setBioValue}
            label="Bio"
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Textarea
  value={bio()}
  onInput={setBio}
  label="Bio"
  placeholder="Tell us about yourself..."
  rows={3}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Textarea size="sm" placeholder="Small textarea" ... />
<Textarea size="md" placeholder="Medium textarea (default)" ... />
<Textarea size="lg" placeholder="Large textarea" ... />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Error</h2>
        <Card class="p-6">
          <Textarea
            value={feedbackValue()}
            onInput={setFeedbackValue}
            label="Feedback"
            placeholder="Please provide your feedback..."
            rows={3}
            error={feedbackValue().length > 0 && feedbackValue().length < 10 ? 'Feedback must be at least 10 characters' : undefined}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Textarea
  value={feedback()}
  onInput={setFeedback}
  label="Feedback"
  placeholder="Please provide your feedback..."
  rows={3}
  error={feedback().length < 10 ? 'Feedback must be at least 10 characters' : undefined}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6">
          <Textarea
            value="This textarea is disabled"
            onInput={() => {}}
            label="Disabled"
            disabled
            rows={2}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Textarea
  value="This textarea is disabled"
  onInput={() => {}}
  label="Disabled"
  disabled
  rows={2}
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
                <td class="py-2 pr-4 font-mono text-xs">value</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Current textarea value (required)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onInput</td>
                <td class="py-2 pr-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Callback when value changes (required)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Label text displayed above the textarea</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">placeholder</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Placeholder text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">rows</td>
                <td class="py-2 pr-4 font-mono text-xs">number</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Number of visible text rows</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Size variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">error</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Error message displayed below the textarea</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the textarea is disabled</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">readonly</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the textarea is readonly</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">required</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the textarea is required</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
