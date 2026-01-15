import { Skeleton, CodeBlock, Card } from 'glass-ui-solid';

export default function SkeletonPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Skeleton</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Loading placeholder with pulse animation.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Skeleton } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Skeleton width="200px" height="20px" />
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Skeleton width="200px" height="20px" />`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Variants</h2>
        <Card class="p-6 space-y-6">
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Text</p>
            <Skeleton variant="text" width="100%" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Rectangular</p>
            <Skeleton variant="rectangular" width="200px" height="100px" />
          </div>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">Circular</p>
            <Skeleton variant="circular" width="48px" height="48px" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Skeleton variant="text" width="100%" />
<Skeleton variant="rectangular" width="200px" height="100px" />
<Skeleton variant="circular" width="48px" height="48px" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Text Lines</h2>
        <Card class="p-6">
          <div class="space-y-2">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="80%" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<div class="space-y-2">
  <Skeleton variant="text" width="100%" />
  <Skeleton variant="text" width="90%" />
  <Skeleton variant="text" width="80%" />
</div>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Card Skeleton</h2>
        <Card class="p-6">
          <div class="flex gap-4">
            <Skeleton variant="circular" width="48px" height="48px" />
            <div class="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Card>
  <div class="flex gap-4">
    <Skeleton variant="circular" width="48px" height="48px" />
    <div class="flex-1 space-y-2">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
</Card>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Rounded Corners</h2>
        <Card class="p-6">
          <Skeleton width="100px" height="100px" rounded />
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Skeleton width="100px" height="100px" rounded />`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Avatar Skeleton</h2>
        <Card class="p-6">
          <div class="flex gap-4">
            <Skeleton variant="circular" width="32px" height="32px" />
            <Skeleton variant="circular" width="40px" height="40px" />
            <Skeleton variant="circular" width="48px" height="48px" />
            <Skeleton variant="circular" width="56px" height="56px" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Skeleton variant="circular" width="40px" height="40px" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Table Row Skeleton</h2>
        <Card class="p-6 space-y-4">
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
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<div class="flex gap-4 items-center">
  <Skeleton width="40px" height="40px" rounded />
  <Skeleton variant="text" width="200px" />
  <Skeleton variant="text" width="100px" />
  <Skeleton variant="text" width="80px" />
</div>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="p-6 overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">width</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Width (CSS value)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">height</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Height (CSS value)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">variant</td>
                <td class="py-2 pr-4 font-mono text-xs">'text' | 'rectangular' | 'circular'</td>
                <td class="py-2 pr-4">'rectangular'</td>
                <td class="py-2">Shape variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">rounded</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Apply rounded corners</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">class</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
