import { createSignal, For } from 'solid-js';
import { Button, Spinner, CodeBlock, Card } from 'glass-ui-solid';

export default function ButtonPage() {
  const [loading, setLoading] = createSignal(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const variants = ['primary', 'secondary', 'tertiary', 'ghost', 'danger'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Button</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Buttons with multiple variants, sizes, and states including loading.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Button, Spinner } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Button onClick={() => console.log('clicked')}>Click me</Button>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Button onClick={() => console.log('clicked')}>
  Click me
</Button>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Variants</h2>
        <Card class="p-6">
          <div class="flex flex-wrap gap-3">
            <For each={variants}>
              {(variant) => (
                <Button variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              )}
            </For>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6">
          <div class="flex flex-wrap items-center gap-3">
            <For each={sizes}>
              {(size) => (
                <Button size={size}>
                  {size.toUpperCase()}
                </Button>
              )}
            </For>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Icons</h2>
        <Card class="p-6">
          <div class="flex flex-wrap gap-3">
            <Button
              leftIcon={
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Item
            </Button>
            <Button
              variant="secondary"
              rightIcon={
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              Continue
            </Button>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowIcon />}>Continue</Button>
<Button leftIcon={<SaveIcon />} rightIcon={<CheckIcon />}>
  Save Changes
</Button>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Loading State</h2>
        <Card class="p-6">
          <div class="flex flex-wrap gap-3">
            <Button loading={loading()} onClick={handleLoadingClick}>
              {loading() ? 'Saving...' : 'Click to Load'}
            </Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [loading, setLoading] = createSignal(false);

<Button
  loading={loading()}
  onClick={() => {
    setLoading(true);
    // async operation...
  }}
>
  {loading() ? 'Saving...' : 'Save'}
</Button>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Full Width</h2>
        <Card class="p-6">
          <Button fullWidth>Full Width Button</Button>
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Button fullWidth>Full Width Button</Button>`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled</h2>
        <Card class="p-6">
          <div class="flex flex-wrap gap-3">
            <For each={variants}>
              {(variant) => (
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              )}
            </For>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock code={`<Button disabled>Cannot Click</Button>`} language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Spinner Component</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Standalone spinner component used by Button internally.
        </p>
        <Card class="p-6">
          <div class="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`import { Spinner } from 'glass-ui-solid';

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
              <tr>
                <th class="px-4 py-3 rounded-tl-lg">Prop</th>
                <th class="px-4 py-3">Type</th>
                <th class="px-4 py-3">Default</th>
                <th class="px-4 py-3 rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">children</td>
                <td class="px-4 py-3 font-mono text-xs">JSX.Element</td>
                <td class="px-4 py-3">required</td>
                <td class="px-4 py-3">Button content</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">variant</td>
                <td class="px-4 py-3 font-mono text-xs">'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'</td>
                <td class="px-4 py-3">'primary'</td>
                <td class="px-4 py-3">Visual variant</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">size</td>
                <td class="px-4 py-3 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="px-4 py-3">'md'</td>
                <td class="px-4 py-3">Button size</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">type</td>
                <td class="px-4 py-3 font-mono text-xs">'button' | 'submit' | 'reset'</td>
                <td class="px-4 py-3">'button'</td>
                <td class="px-4 py-3">HTML button type</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">onClick</td>
                <td class="px-4 py-3 font-mono text-xs">() =&gt; void</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Click handler</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">disabled</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">false</td>
                <td class="px-4 py-3">Disable the button</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">loading</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">false</td>
                <td class="px-4 py-3">Show loading spinner</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">fullWidth</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">false</td>
                <td class="px-4 py-3">Take full width of container</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">leftIcon</td>
                <td class="px-4 py-3 font-mono text-xs">JSX.Element</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Icon on the left</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">rightIcon</td>
                <td class="px-4 py-3 font-mono text-xs">JSX.Element</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Icon on the right</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-xs">class</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
