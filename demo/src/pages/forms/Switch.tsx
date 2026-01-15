import { Switch, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function SwitchPage() {
  const [isEnabled, setIsEnabled] = createSignal(false);
  const [notifications, setNotifications] = createSignal(true);
  const [darkMode, setDarkMode] = createSignal(false);
  const [autoSave, setAutoSave] = createSignal(true);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Switch</h1>
        <p class="text-surface-600 dark:text-surface-400">
          An iOS-style toggle switch component with glassmorphism styling for binary on/off states.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Switch } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Switch
            checked={isEnabled()}
            onChange={setIsEnabled}
            label="Enable feature"
          />
          <p class="mt-4 text-sm text-surface-600 dark:text-surface-400">
            Status: {isEnabled() ? 'Enabled' : 'Disabled'}
          </p>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [isEnabled, setIsEnabled] = createSignal(false);

<Switch
  checked={isEnabled()}
  onChange={setIsEnabled}
  label="Enable feature"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Switch supports three sizes: sm, md (default), and lg.
        </p>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Switch checked={value()} onChange={setValue} label="Small" size="sm" />
<Switch checked={value()} onChange={setValue} label="Medium" size="md" />
<Switch checked={value()} onChange={setValue} label="Large" size="lg" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Label Position</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          The label can be positioned on the left or right side of the switch.
        </p>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Switch
  checked={value()}
  onChange={setValue}
  label="Label on left"
  labelPosition="left"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Without Label</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Switch can be used without a label for compact layouts.
        </p>
        <Card class="p-6">
          <div class="flex items-center gap-4">
            <Switch
              checked={autoSave()}
              onChange={setAutoSave}
            />
            <span class="text-sm text-surface-700 dark:text-surface-300">
              Auto-save is {autoSave() ? 'on' : 'off'}
            </span>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Switch checked={autoSave()} onChange={setAutoSave} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Switch checked={false} onChange={() => {}} label="Disabled" disabled />
<Switch checked={true} onChange={() => {}} label="Disabled (on)" disabled />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Settings Example</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          A typical settings panel using multiple switches.
        </p>
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
                <td class="py-2">Whether the switch is on</td>
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
                <td class="py-2">Optional label text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">labelPosition</td>
                <td class="py-2 pr-4 font-mono text-xs">'left' | 'right'</td>
                <td class="py-2 pr-4">'right'</td>
                <td class="py-2">Position of the label</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Size variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">disabled</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Whether the switch is disabled</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">id</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">HTML id attribute</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">name</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">HTML name attribute for form submission</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
