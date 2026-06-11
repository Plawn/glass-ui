import { GlassBackground } from 'glass-ui-solid';
import { DemoSection, PageHeader } from '../../components/demo';

export default function GlassBackgroundPage() {
  return (
    <div class="space-y-8 p-8">
      <PageHeader
        title="GlassBackground"
        description="Animated glassmorphism background with configurable gradient blobs. Render any content on top of it."
      />

      <DemoSection
        title="Import"
        code="import { GlassBackground } from 'glass-ui-solid';"
      />

      <DemoSection title="Default blobs">
        <GlassBackground class="rounded-2xl h-64 flex items-center justify-center">
          <p class="text-surface-700 dark:text-surface-200 font-medium">
            Content on top of the default animated background
          </p>
        </GlassBackground>
      </DemoSection>

      <DemoSection title="Static (no animation)">
        <GlassBackground
          animated={false}
          class="rounded-2xl h-64 flex items-center justify-center"
        >
          <p class="text-surface-700 dark:text-surface-200 font-medium">
            animated={'{false}'}
          </p>
        </GlassBackground>
      </DemoSection>

      <DemoSection title="Custom blobs & gradient">
        <GlassBackground
          class="rounded-2xl h-64 flex items-center justify-center"
          gradient={{ from: '#e0f2fe', to: '#ede9fe' }}
          darkGradient={{ from: '#0c4a6e', to: '#1e1b4b' }}
          blobs={[
            {
              top: '-4rem',
              left: '-4rem',
              size: '16rem',
              colors: ['rgb(56, 189, 248)', 'rgb(59, 130, 246)'],
              opacity: 0.4,
              duration: 18,
            },
            {
              bottom: '-4rem',
              right: '-4rem',
              size: '18rem',
              colors: ['rgb(244, 114, 182)', 'rgb(168, 85, 247)'],
              opacity: 0.35,
              duration: 24,
              delay: -6,
            },
          ]}
        >
          <p class="text-surface-700 dark:text-surface-200 font-medium">
            Custom two-blob configuration
          </p>
        </GlassBackground>
      </DemoSection>
    </div>
  );
}
