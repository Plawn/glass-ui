import { createSignal } from 'solid-js';
import { Collapsible, Card, Button } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill, FeatureList } from '../../components/demo';

const basicCode = `<Collapsible
  trigger={
    <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100">
      <span>Click to expand</span>
      <ChevronIcon />
    </div>
  }
>
  <div class="p-4 mt-2">
    <p>This is the collapsible content.</p>
  </div>
</Collapsible>`;

const defaultOpenCode = `<Collapsible defaultOpen={true} trigger={<Trigger />}>
  <Content />
</Collapsible>`;

const controlledCode = `const [open, setOpen] = createSignal(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Button onClick={() => setOpen(false)}>Close</Button>

<Collapsible
  open={open()}
  onOpenChange={setOpen}
  trigger={<Trigger />}
>
  <Content />
</Collapsible>`;

const disabledCode = `<Collapsible disabled trigger={<Trigger />}>
  <Content />
</Collapsible>`;

export default function CollapsiblePage() {
  const [controlled, setControlled] = createSignal(false);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Collapsible"
        description="An interactive component that expands and collapses content. Supports both controlled and uncontrolled modes with smooth CSS grid animations."
      />

      <DemoSection title="Import" code="import { Collapsible } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
        <div class="space-y-6">
          {/* Basic Collapsible */}
          <DemoSection title="Basic Usage" subsection code={basicCode}>
            <Collapsible
              trigger={
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                  <span class="font-medium text-surface-900 dark:text-white">Click to expand</span>
                  <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              }
            >
              <div class="p-4 mt-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                <p class="text-surface-600 dark:text-surface-400">
                  This is the collapsible content. It smoothly animates in and out using CSS grid transitions.
                </p>
              </div>
            </Collapsible>
          </DemoSection>

          {/* Default Open */}
          <DemoSection title="Default Open" subsection code={defaultOpenCode}>
            <Collapsible
              defaultOpen={true}
              trigger={
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                  <span class="font-medium text-surface-900 dark:text-white">Already expanded</span>
                  <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              }
            >
              <div class="p-4 mt-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                <p class="text-surface-600 dark:text-surface-400">
                  This content is visible by default when the component mounts.
                </p>
              </div>
            </Collapsible>
          </DemoSection>

          {/* Controlled Mode */}
          <DemoSection title="Controlled Mode" subsection code={controlledCode} cardClass="p-6 space-y-4">
            <div class="flex gap-2">
              <Button size="sm" onClick={() => setControlled(true)}>Open</Button>
              <Button size="sm" variant="secondary" onClick={() => setControlled(false)}>Close</Button>
            </div>
            <Collapsible
              open={controlled()}
              onOpenChange={setControlled}
              trigger={
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                  <span class="font-medium text-surface-900 dark:text-white">
                    Controlled: {controlled() ? 'Open' : 'Closed'}
                  </span>
                  <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              }
            >
              <div class="p-4 mt-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                <p class="text-surface-600 dark:text-surface-400">
                  This collapsible is controlled externally via state.
                </p>
              </div>
            </Collapsible>
          </DemoSection>

          {/* Disabled State */}
          <DemoSection title="Disabled" subsection code={disabledCode}>
            <Collapsible
              disabled
              trigger={
                <div class="flex items-center justify-between p-3 rounded-lg bg-surface-100 dark:bg-surface-800">
                  <span class="font-medium text-surface-900 dark:text-white">Cannot expand (disabled)</span>
                  <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              }
            >
              <div class="p-4 mt-2">
                <p>This content will never be shown.</p>
              </div>
            </Collapsible>
          </DemoSection>

          {/* FAQ Example */}
          <DemoSection title="FAQ Pattern" subsection cardClass="p-6 space-y-2">
            <Collapsible
              trigger={
                <div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                  <span class="font-medium text-surface-900 dark:text-white">What is Glass UI?</span>
                  <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              }
            >
              <div class="px-3 pb-3">
                <p class="text-surface-600 dark:text-surface-400">
                  Glass UI is an iOS 26-inspired glassmorphism component library for SolidJS.
                </p>
              </div>
            </Collapsible>
            <Collapsible
              trigger={
                <div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                  <span class="font-medium text-surface-900 dark:text-white">How do I install it?</span>
                  <svg class="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              }
            >
              <div class="px-3 pb-3">
                <p class="text-surface-600 dark:text-surface-400">
                  Run <CodePill>npm install glass-ui-solid</CodePill> or use your preferred package manager.
                </p>
              </div>
            </Collapsible>
          </DemoSection>
        </div>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'trigger', type: 'JSX.Element', default: 'required', description: 'The element that toggles the collapsible' },
            { name: 'children', type: 'JSX.Element', default: 'required', description: 'The content to show/hide' },
            { name: 'open', type: 'boolean', description: 'Controlled open state' },
            { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state (uncontrolled mode)' },
            { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when open state changes' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the collapsible interaction' },
            { name: 'class', type: 'string', description: 'Additional CSS classes for the container' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Accessibility">
        <FeatureList
          checkmarks
          items={[
            <>Trigger has <CodePill>role="button"</CodePill> with proper keyboard support (Enter/Space)</>,
            <>Uses <CodePill>aria-expanded</CodePill> to indicate open state</>,
            <>Uses <CodePill>aria-controls</CodePill> to link trigger to content</>,
            <>Disabled state is communicated via <CodePill>aria-disabled</CodePill></>,
          ]}
        />
      </DemoSection>
    </div>
  );
}
