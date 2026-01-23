import { Card, Spinner } from 'glass-ui-solid';
import {
  DemoSection,
  PageHeader,
  PropsTable,
  VariantShowcase,
} from '../../components/demo';

export default function SpinnerPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Spinner"
        description="A loading indicator component with multiple sizes, colors, and optional label support."
      />

      <DemoSection
        title="Import"
        code="import { Spinner } from 'glass-ui-solid';"
      />

      <DemoSection title="Basic Usage">
        <Spinner />
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Available sizes: sm, md (default), lg, xl"
        code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
      >
        <div class="flex items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span class="text-xs text-surface-500">sm</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span class="text-xs text-surface-500">md</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span class="text-xs text-surface-500">lg</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span class="text-xs text-surface-500">xl</span>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="With Label"
        description="Add a text label next to the spinner to provide context."
        code={`<Spinner label="Loading..." />
<Spinner size="lg" label="Please wait..." />`}
      >
        <div class="flex flex-col gap-4">
          <Spinner label="Loading..." />
          <Spinner size="lg" label="Please wait..." />
        </div>
      </DemoSection>

      <DemoSection
        title="Color Variants"
        description='Use the "white" color variant for dark backgrounds.'
        code={`<Spinner color="default" label="Loading..." />
<Spinner color="white" label="Loading..." />`}
        card={false}
      >
        <div class="grid gap-4 md:grid-cols-2">
          <Card class="p-6">
            <p class="text-sm text-surface-500 mb-3">Default</p>
            <Spinner color="default" label="Loading..." />
          </Card>
          <Card class="p-6 bg-surface-800">
            <p class="text-sm text-surface-400 mb-3">
              White (for dark backgrounds)
            </p>
            <Spinner color="white" label="Loading..." />
          </Card>
        </div>
      </DemoSection>

      <DemoSection
        title="Centered"
        description="Center the spinner within its parent container."
        code={`<div class="h-32">
  <Spinner centered label="Loading content..." />
</div>`}
        cardClass="p-6 h-32"
      >
        <Spinner centered label="Loading content..." />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg' | 'xl'",
              default: "'md'",
              description: 'Spinner size',
            },
            {
              name: 'color',
              type: "'default' | 'white'",
              default: "'default'",
              description: 'Color variant',
            },
            {
              name: 'label',
              type: 'string',
              description: 'Optional label text',
            },
            {
              name: 'centered',
              type: 'boolean',
              default: 'false',
              description: 'Center in parent container',
            },
            {
              name: 'class',
              type: 'string',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
