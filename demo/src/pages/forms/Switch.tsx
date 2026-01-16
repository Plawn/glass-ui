import { Switch, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, StateDisplay } from '../../components/demo';

export default function SwitchPage() {
  const [isEnabled, setIsEnabled] = createSignal(false);
  const [notifications, setNotifications] = createSignal(true);
  const [darkMode, setDarkMode] = createSignal(false);
  const [autoSave, setAutoSave] = createSignal(true);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Switch"
        description="An iOS-style toggle switch component with glassmorphism styling for binary on/off states."
      />

      <DemoSection
        title="Import"
        code="import { Switch } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [isEnabled, setIsEnabled] = createSignal(false);

<Switch
  checked={isEnabled()}
  onChange={setIsEnabled}
  label="Enable feature"
/>`}
      >
        <Switch
          checked={isEnabled()}
          onChange={setIsEnabled}
          label="Enable feature"
        />
        <StateDisplay label="Status" value={isEnabled() ? 'Enabled' : 'Disabled'} />
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Switch supports three sizes: sm, md (default), and lg."
        code={`<Switch checked={value()} onChange={setValue} label="Small" size="sm" />
<Switch checked={value()} onChange={setValue} label="Medium" size="md" />
<Switch checked={value()} onChange={setValue} label="Large" size="lg" />`}
      >
        <div class="space-y-4">
          <Switch
            checked={notifications()}
            onChange={setNotifications}
            label="Small"
            size="sm"
          />
          <Switch
            checked={notifications()}
            onChange={setNotifications}
            label="Medium (default)"
            size="md"
          />
          <Switch
            checked={notifications()}
            onChange={setNotifications}
            label="Large"
            size="lg"
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Label Position"
        description="The label can be positioned on the left or right side of the switch."
        code={`<Switch
  checked={value()}
  onChange={setValue}
  label="Label on left"
  labelPosition="left"
/>`}
      >
        <div class="space-y-4">
          <Switch
            checked={darkMode()}
            onChange={setDarkMode}
            label="Label on right (default)"
            labelPosition="right"
          />
          <Switch
            checked={darkMode()}
            onChange={setDarkMode}
            label="Label on left"
            labelPosition="left"
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Without Label"
        description="Switch can be used without a label for compact layouts."
        code={`<Switch checked={autoSave()} onChange={setAutoSave} />`}
      >
        <div class="flex items-center gap-4">
          <Switch
            checked={autoSave()}
            onChange={setAutoSave}
          />
          <span class="text-sm text-surface-700 dark:text-surface-300">
            Auto-save is {autoSave() ? 'on' : 'off'}
          </span>
        </div>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<Switch checked={false} onChange={() => {}} label="Disabled" disabled />
<Switch checked={true} onChange={() => {}} label="Disabled (on)" disabled />`}
      >
        <div class="space-y-4">
          <Switch
            checked={false}
            onChange={() => {}}
            label="Disabled (off)"
            disabled
          />
          <Switch
            checked={true}
            onChange={() => {}}
            label="Disabled (on)"
            disabled
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Settings Example"
        description="A typical settings panel using multiple switches."
        card={false}
      >
        <Card class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-surface-900 dark:text-white">Notifications</p>
                <p class="text-xs text-surface-500 dark:text-surface-400">Receive push notifications</p>
              </div>
              <Switch
                checked={notifications()}
                onChange={setNotifications}
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-surface-900 dark:text-white">Dark Mode</p>
                <p class="text-xs text-surface-500 dark:text-surface-400">Use dark theme</p>
              </div>
              <Switch
                checked={darkMode()}
                onChange={setDarkMode}
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-surface-900 dark:text-white">Auto-save</p>
                <p class="text-xs text-surface-500 dark:text-surface-400">Automatically save changes</p>
              </div>
              <Switch
                checked={autoSave()}
                onChange={setAutoSave}
              />
            </div>
          </div>
        </Card>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'checked', type: 'boolean', description: 'Whether the switch is on' },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Callback when checked state changes' },
            { name: 'label', type: 'string', description: 'Optional label text' },
            { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", description: 'Position of the label' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the switch is disabled' },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            { name: 'name', type: 'string', description: 'HTML name attribute for form submission' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
