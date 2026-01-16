import { Checkbox } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, StateDisplay } from '../../components/demo';

export default function CheckboxPage() {
  const [checked, setChecked] = createSignal(false);
  const [terms, setTerms] = createSignal(false);
  const [newsletter, setNewsletter] = createSignal(true);
  const [marketing, setMarketing] = createSignal(false);
  const [updates, setUpdates] = createSignal(true);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Checkbox"
        description="A glassmorphic checkbox component with an animated check icon and optional label."
      />

      <DemoSection
        title="Import"
        code="import { Checkbox } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [checked, setChecked] = createSignal(false);

<Checkbox
  checked={checked()}
  onChange={setChecked}
/>`}
      >
        <div class="space-y-4">
          <Checkbox
            checked={checked()}
            onChange={setChecked}
          />
          <StateDisplay label="Checked" value={checked()} />
        </div>
      </DemoSection>

      <DemoSection
        title="With Label"
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
      >
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
      </DemoSection>

      <DemoSection
        title="Checkbox Group"
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
      >
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
      </DemoSection>

      <DemoSection
        title="Disabled State"
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
      >
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
      </DemoSection>

      <DemoSection
        title="Form Example"
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
      >
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
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked (required)' },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Callback when checked state changes' },
            { name: 'label', type: 'string', description: 'Label text displayed next to the checkbox' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Whether the checkbox is required' },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            { name: 'name', type: 'string', description: 'HTML name attribute' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
