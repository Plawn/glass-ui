import { Card, Button } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function CardPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Card"
        description="Container with glass effect and optional header/footer."
      />

      <DemoSection title="Import" code="import { Card } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
        <div class="space-y-6">
          {/* Basic */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Basic</h3>
            <Card>
              <p class="text-surface-700 dark:text-surface-300">Card content goes here.</p>
            </Card>
          </div>

          {/* With Header and Footer */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">With Header and Footer</h3>
            <Card
              header={<h3 class="font-bold text-surface-900 dark:text-white">Card Title</h3>}
              footer={
                <div class="flex justify-end">
                  <Button size="sm">Action</Button>
                </div>
              }
            >
              <p class="text-surface-700 dark:text-surface-300">Card body content.</p>
            </Card>
          </div>

          {/* Variants */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Variants</h3>
            <div class="grid gap-4 md:grid-cols-3">
              <Card variant="default">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-1">default</p>
                <p class="text-surface-700 dark:text-surface-300">Default card with subtle glass effect</p>
              </Card>

              <Card variant="elevated">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-1">elevated</p>
                <p class="text-surface-700 dark:text-surface-300">Elevated card with more prominent shadow</p>
              </Card>

              <Card variant="outlined">
                <p class="text-sm text-surface-500 dark:text-surface-400 mb-1">outlined</p>
                <p class="text-surface-700 dark:text-surface-300">Outlined card with border, no glass fill</p>
              </Card>
            </div>
          </div>

          {/* Stats Card Example */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Stats Card</h3>
            <Card variant="elevated" class="max-w-xs">
              <div class="text-sm text-surface-500 dark:text-surface-400">Total Users</div>
              <div class="text-3xl font-bold text-surface-900 dark:text-white">12,345</div>
              <div class="text-sm text-green-600 dark:text-green-400">+12% from last month</div>
            </Card>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'children', type: 'JSX.Element', default: 'required', description: 'Card body content' },
            { name: 'header', type: 'JSX.Element', description: 'Header content' },
            { name: 'footer', type: 'JSX.Element', description: 'Footer content' },
            { name: 'variant', type: "'default' | 'elevated' | 'outlined'", default: "'default'", description: 'Visual variant' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
