import { Progress } from 'glass-ui-solid';
import { createSignal, onMount, onCleanup } from 'solid-js';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

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
        cardClass="p-6 space-y-6"
      >
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Bar (default)</p>
          <Progress value={60} variant="bar" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Circular</p>
          <Progress value={60} variant="circular" />
        </div>
      </DemoSection>

      <DemoSection
        title="Colors"
        code={`<Progress value={60} color="primary" />
<Progress value={60} color="success" />
<Progress value={60} color="warning" />
<Progress value={60} color="error" />`}
        cardClass="p-6 space-y-4"
      >
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Primary</p>
          <Progress value={60} color="primary" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Success</p>
          <Progress value={60} color="success" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Warning</p>
          <Progress value={60} color="warning" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Error</p>
          <Progress value={60} color="error" />
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}
        cardClass="p-6 space-y-4"
      >
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Small</p>
          <Progress value={60} size="sm" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Medium (default)</p>
          <Progress value={60} size="md" />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Large</p>
          <Progress value={60} size="lg" />
        </div>
      </DemoSection>

      <DemoSection
        title="Show Value"
        code={`<Progress value={75} showValue />
<Progress value={75} variant="circular" size="lg" showValue />`}
        cardClass="p-6 space-y-6"
      >
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Bar with value</p>
          <Progress value={75} showValue />
        </div>
        <div class="space-y-2">
          <p class="text-sm text-surface-600 dark:text-surface-400">Circular with value</p>
          <Progress value={75} variant="circular" size="lg" showValue />
        </div>
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
          <p class="text-sm text-surface-600 dark:text-surface-400">Animated progress: {dynamicProgress()}%</p>
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
