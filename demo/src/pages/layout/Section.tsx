import { Section, Card, Input, Checkbox, Button } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function SectionPage() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [notifications, setNotifications] = createSignal(true);
  const [marketing, setMarketing] = createSignal(false);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Section"
        description="Content section with title for organizing page content."
      />

      <DemoSection title="Import" code="import { Section } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
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
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'title', type: 'string', default: 'required', description: 'Section title' },
            { name: 'children', type: 'JSX.Element', default: 'required', description: 'Section content' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
