import { Section, CodeBlock, Card, Input, Checkbox, Button } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function SectionPage() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [notifications, setNotifications] = createSignal(true);
  const [marketing, setMarketing] = createSignal(false);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Section</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Content section with title for organizing page content.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Section } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        <div class="space-y-6">
          {/* Basic */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Basic</h3>
            <Card>
              <Section title="User Information">
                <p class="text-surface-700 dark:text-surface-300">Section content goes here.</p>
              </Section>
            </Card>
          </div>

          {/* Multiple Sections */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Multiple Sections</h3>
            <Card>
              <div class="space-y-4">
                <Section title="Personal Details">
                  <div class="space-y-3">
                    <Input
                      label="Name"
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                      placeholder="Enter your name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email()}
                      onInput={(e) => setEmail(e.currentTarget.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </Section>

                <Section title="Preferences">
                  <div class="space-y-2">
                    <Checkbox
                      label="Email notifications"
                      checked={notifications()}
                      onChange={setNotifications}
                    />
                    <Checkbox
                      label="Marketing emails"
                      checked={marketing()}
                      onChange={setMarketing}
                    />
                  </div>
                </Section>

                <Section title="Security">
                  <Button variant="secondary">Change Password</Button>
                </Section>
              </div>
            </Card>
          </div>

          {/* Settings Page Layout */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Settings Page Layout</h3>
            <div class="space-y-4">
              <Section title="Account">
                <Card>
                  <div class="space-y-3">
                    <Input label="Username" placeholder="johndoe" />
                    <Input label="Email" type="email" placeholder="john@example.com" />
                  </div>
                </Card>
              </Section>

              <Section title="Danger Zone">
                <Card class="border border-red-200 dark:border-red-900/50">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-surface-900 dark:text-white">Delete Account</p>
                      <p class="text-sm text-surface-500 dark:text-surface-400">
                        Permanently delete your account and all data.
                      </p>
                    </div>
                    <Button variant="danger">Delete</Button>
                  </div>
                </Card>
              </Section>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">title</td>
                <td class="py-2 px-3 font-mono text-xs">string</td>
                <td class="py-2 px-3">required</td>
                <td class="py-2 px-3">Section title</td>
              </tr>
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">children</td>
                <td class="py-2 px-3 font-mono text-xs">JSX.Element</td>
                <td class="py-2 px-3">required</td>
                <td class="py-2 px-3">Section content</td>
              </tr>
              <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                <td class="py-2 px-3 font-mono text-xs">class</td>
                <td class="py-2 px-3 font-mono text-xs">string</td>
                <td class="py-2 px-3">-</td>
                <td class="py-2 px-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
