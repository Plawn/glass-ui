import { Checkbox, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function CheckboxPage() {
  const [checked, setChecked] = createSignal(false);
  const [terms, setTerms] = createSignal(false);
  const [newsletter, setNewsletter] = createSignal(true);
  const [marketing, setMarketing] = createSignal(false);
  const [updates, setUpdates] = createSignal(true);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Checkbox</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic checkbox component with an animated check icon and optional label.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Checkbox } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="space-y-4">
            <Checkbox
              checked={checked()}
              onChange={setChecked}
            />
            <p class="text-sm text-surface-500">
              Checked: {checked() ? 'true' : 'false'}
            </p>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [checked, setChecked] = createSignal(false);

<Checkbox
  checked={checked()}
  onChange={setChecked}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Label</h2>
        <Card class="p-6">
          <div class="space-y-4">
            <Checkbox
              checked={terms()}
              onChange={setTerms}
              label="I accept the terms and conditions"
            />
            <Checkbox
              checked={newsletter()}
              onChange={setNewsletter}
              label="Subscribe to newsletter"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Checkbox
  checked={terms()}
  onChange={setTerms}
  label="I accept the terms and conditions"
/>

<Checkbox
  checked={newsletter()}
  onChange={setNewsletter}
  label="Subscribe to newsletter"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Checkbox Group</h2>
        <Card class="p-6">
          <div class="space-y-3">
            <p class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Email Preferences
            </p>
            <Checkbox
              checked={newsletter()}
              onChange={setNewsletter}
              label="Product newsletter"
            />
            <Checkbox
              checked={marketing()}
              onChange={setMarketing}
              label="Marketing emails"
            />
            <Checkbox
              checked={updates()}
              onChange={setUpdates}
              label="Product updates"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [newsletter, setNewsletter] = createSignal(true);
const [marketing, setMarketing] = createSignal(false);
const [updates, setUpdates] = createSignal(true);

<div class="space-y-3">
  <p class="text-sm font-medium">Email Preferences</p>
  <Checkbox
    checked={newsletter()}
    onChange={setNewsletter}
    label="Product newsletter"
  />
  <Checkbox
    checked={marketing()}
    onChange={setMarketing}
    label="Marketing emails"
  />
  <Checkbox
    checked={updates()}
    onChange={setUpdates}
    label="Product updates"
  />
</div>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6">
          <div class="space-y-3">
            <Checkbox
              checked={false}
              onChange={() => {}}
              label="Unchecked and disabled"
              disabled
            />
            <Checkbox
              checked={true}
              onChange={() => {}}
              label="Checked and disabled"
              disabled
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Checkbox
  checked={false}
  onChange={() => {}}
  label="Unchecked and disabled"
  disabled
/>

<Checkbox
  checked={true}
  onChange={() => {}}
  label="Checked and disabled"
  disabled
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Form Example</h2>
        <Card class="p-6">
          <form
            class="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Terms accepted: ${terms()}`);
            }}
          >
            <Checkbox
              checked={terms()}
              onChange={setTerms}
              label="I have read and agree to the Terms of Service and Privacy Policy"
              required
            />
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!terms()}
            >
              Submit
            </button>
          </form>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<form onSubmit={handleSubmit}>
  <Checkbox
    checked={terms()}
    onChange={setTerms}
    label="I have read and agree to the Terms of Service..."
    required
  />
  <button type="submit" disabled={!terms()}>
    Submit
  </button>
</form>`}
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
                <td class="py-2 pr-4 font-mono text-xs">checked</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Whether the checkbox is checked (required)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onChange</td>
                <td class="py-2 pr-4 font-mono text-xs">(checked: boolean) =&gt; void</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Callback when checked state changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">label</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Label text displayed next to the checkbox</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the checkbox is disabled</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">required</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the checkbox is required</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">id</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">HTML id attribute</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">name</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">HTML name attribute</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">class</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
