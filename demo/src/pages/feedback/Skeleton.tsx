import { Skeleton } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, VariantShowcase } from '../../components/demo';

export default function SkeletonPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Skeleton"
        description="Loading placeholder with pulse animation."
      />

      <DemoSection title="Import" code="import { Skeleton } from 'glass-ui-solid';" />

      <DemoSection title="Basic Usage">
        <Skeleton width="200px" height="20px" />
      </DemoSection>

      <DemoSection
        title="Variants"
        code={`<Skeleton variant="text" width="100%" />
<Skeleton variant="rectangular" width="200px" height="100px" />
<Skeleton variant="circular" width="48px" height="48px" />`}
        card={false}
      >
        <VariantShowcase variants={['text', 'rectangular', 'circular'] as const} label="Variant" columns={3}>
          {(variant) => (
            <Skeleton
              variant={variant}
              width={variant === 'text' ? '100%' : variant === 'rectangular' ? '200px' : '48px'}
              height={variant === 'text' ? undefined : variant === 'rectangular' ? '100px' : '48px'}
            />
          )}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Text Lines"
        code={`<div class="space-y-2">
  <Skeleton variant="text" width="100%" />
  <Skeleton variant="text" width="90%" />
  <Skeleton variant="text" width="80%" />
</div>`}
      >
        <div class="space-y-2">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
        </div>
      </DemoSection>

      <DemoSection
        title="Card Skeleton"
        code={`<Card>
  <div class="flex gap-4">
    <Skeleton variant="circular" width="48px" height="48px" />
    <div class="flex-1 space-y-2">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
</Card>`}
      >
        <div class="flex gap-4">
          <Skeleton variant="circular" width="48px" height="48px" />
          <div class="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="With Rounded Corners">
        <Skeleton width="100px" height="100px" rounded />
      </DemoSection>

      <DemoSection
        title="Avatar Skeleton"
        code={`<Skeleton variant="circular" width="40px" height="40px" />`}
      >
        <div class="flex gap-4">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="circular" width="40px" height="40px" />
          <Skeleton variant="circular" width="48px" height="48px" />
          <Skeleton variant="circular" width="56px" height="56px" />
        </div>
      </DemoSection>

      <DemoSection
        title="Table Row Skeleton"
        code={`<div class="flex gap-4 items-center">
  <Skeleton width="40px" height="40px" rounded />
  <Skeleton variant="text" width="200px" />
  <Skeleton variant="text" width="100px" />
  <Skeleton variant="text" width="80px" />
</div>`}
        cardClass="p-6 space-y-4"
      >
        <div class="flex gap-4 items-center">
          <Skeleton width="40px" height="40px" rounded />
          <Skeleton variant="text" width="200px" />
          <Skeleton variant="text" width="100px" />
          <Skeleton variant="text" width="80px" />
        </div>
        <div class="flex gap-4 items-center">
          <Skeleton width="40px" height="40px" rounded />
          <Skeleton variant="text" width="200px" />
          <Skeleton variant="text" width="100px" />
          <Skeleton variant="text" width="80px" />
        </div>
        <div class="flex gap-4 items-center">
          <Skeleton width="40px" height="40px" rounded />
          <Skeleton variant="text" width="200px" />
          <Skeleton variant="text" width="100px" />
          <Skeleton variant="text" width="80px" />
        </div>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'width', type: 'string', description: 'Width (CSS value)' },
            { name: 'height', type: 'string', description: 'Height (CSS value)' },
            { name: 'variant', type: "'text' | 'rectangular' | 'circular'", default: "'rectangular'", description: 'Shape variant' },
            { name: 'rounded', type: 'boolean', default: 'false', description: 'Apply rounded corners' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
