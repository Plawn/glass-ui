import { Divider, Card } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

const basicCode = `<p>Content above the divider</p>
<Divider />
<p>Content below the divider</p>`;

const labelCode = `<Divider label="OR" />
<Divider label="Section Title" labelPosition="start" />
<Divider label="End Label" labelPosition="end" />`;

const variantCode = `<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />`;

const verticalCode = `<div class="flex items-center h-8 gap-4">
  <span>Item 1</span>
  <Divider orientation="vertical" />
  <span>Item 2</span>
  <Divider orientation="vertical" />
  <span>Item 3</span>
</div>`;

export default function DividerPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Divider"
        description="A visual separator for dividing content. Supports horizontal and vertical orientations, labels, and various line styles."
      />

      <DemoSection title="Import" code="import { Divider } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
        {/* Basic Horizontal Divider */}
        <div class="space-y-6">
          <DemoSection title="Basic Horizontal" subsection code={basicCode}>
            <p class="text-surface-600 dark:text-surface-400 mb-4">Content above the divider</p>
            <Divider />
            <p class="text-surface-600 dark:text-surface-400 mt-4">Content below the divider</p>
          </DemoSection>

          {/* Divider with Label */}
          <DemoSection title="With Label" subsection code={labelCode} cardClass="p-6 space-y-4">
            <Divider label="OR" />
            <Divider label="Section Title" labelPosition="start" />
            <Divider label="End Label" labelPosition="end" />
          </DemoSection>

          {/* Line Variants */}
          <DemoSection title="Line Variants" subsection code={variantCode} cardClass="p-6 space-y-4">
            <div class="space-y-2">
              <span class="text-sm text-surface-500 dark:text-surface-400">Solid (default)</span>
              <Divider variant="solid" />
            </div>
            <div class="space-y-2">
              <span class="text-sm text-surface-500 dark:text-surface-400">Dashed</span>
              <Divider variant="dashed" />
            </div>
            <div class="space-y-2">
              <span class="text-sm text-surface-500 dark:text-surface-400">Dotted</span>
              <Divider variant="dotted" />
            </div>
          </DemoSection>

          {/* Vertical Divider */}
          <DemoSection title="Vertical Divider" subsection code={verticalCode}>
            <div class="flex items-center h-8 gap-4">
              <span class="text-surface-600 dark:text-surface-400">Item 1</span>
              <Divider orientation="vertical" />
              <span class="text-surface-600 dark:text-surface-400">Item 2</span>
              <Divider orientation="vertical" />
              <span class="text-surface-600 dark:text-surface-400">Item 3</span>
            </div>
          </DemoSection>
        </div>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation of the divider' },
            { name: 'label', type: 'string | JSX.Element', description: 'Optional label in the middle of the divider' },
            { name: 'labelPosition', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Position of the label' },
            { name: 'variant', type: "'solid' | 'dashed' | 'dotted'", default: "'solid'", description: 'Line style variant' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
            { name: 'style', type: 'JSX.CSSProperties', description: 'Inline styles' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
