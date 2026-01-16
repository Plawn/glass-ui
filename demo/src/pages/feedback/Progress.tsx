import { Progress } from 'glass-ui-solid';
import { createSignal, onMount, onCleanup } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, StateDisplay, VariantShowcase } from '../../components/demo';

export default function ProgressPage() {
  const [dynamicProgress, setDynamicProgress] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setDynamicProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 500);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="space-y-8">
      <PageHeader
        title="Progress"
        description="Progress indicators for loading and completion states."
      />

      <DemoSection title="Import" code="import { Progress } from 'glass-ui-solid';" />

      <DemoSection title="Basic Usage" code={`<Progress value={60} />`}>
        <Progress value={60} />
      </DemoSection>

      <DemoSection
        title="Variants"
        code={`<Progress value={60} variant="bar" />
<Progress value={60} variant="circular" />`}
        card={false}
      >
        <VariantShowcase variants={['bar', 'circular'] as const} label="Variant" columns={2}>
          {(variant) => <Progress value={60} variant={variant} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Colors"
        code={`<Progress value={60} color="primary" />
<Progress value={60} color="success" />
<Progress value={60} color="warning" />
<Progress value={60} color="error" />`}
        card={false}
      >
        <VariantShowcase variants={['primary', 'success', 'warning', 'error'] as const} label="Color" columns={2}>
          {(color) => <Progress value={60} color={color} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}
        card={false}
      >
        <VariantShowcase variants={['sm', 'md', 'lg'] as const} label="Size" columns={3}>
          {(size) => <Progress value={60} size={size} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Show Value"
        code={`<Progress value={75} showValue />
<Progress value={75} variant="circular" size="lg" showValue />`}
        card={false}
      >
        <VariantShowcase variants={['bar', 'circular'] as const} label="Variant" columns={2}>
          {(variant) => <Progress value={75} variant={variant} size={variant === 'circular' ? 'lg' : 'md'} showValue />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection
        title="Dynamic Progress"
        code={`function UploadProgress() {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 10));
    }, 500);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <Progress value={progress()} color="primary" showValue />
  );
}`}
        cardClass="p-6 space-y-6"
      >
        <div class="space-y-2">
          <StateDisplay label="Animated progress" value={`${dynamicProgress()}%`} />
          <Progress value={dynamicProgress()} color="primary" showValue />
        </div>
        <div class="flex items-center gap-4">
          <Progress value={dynamicProgress()} variant="circular" size="lg" showValue />
        </div>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'number', description: 'Progress value (0-100)' },
            { name: 'variant', type: "'bar' | 'circular'", default: "'bar'", description: 'Visual variant' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the indicator' },
            { name: 'color', type: "'primary' | 'success' | 'warning' | 'error'", default: "'primary'", description: 'Color theme' },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage value' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
