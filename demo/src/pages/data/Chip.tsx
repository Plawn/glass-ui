import { Chip, CodeBlock } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';

export default function ChipPage() {
  const [tags, setTags] = createSignal(['React', 'Solid', 'Vue', 'Angular']);
  const [filters, setFilters] = createSignal([
    { id: '1', label: 'Status: Active' },
    { id: '2', label: 'Type: User' },
    { id: '3', label: 'Role: Admin' },
  ]);

  const removeTag = (tag: string) => {
    setTags(tags().filter((t) => t !== tag));
  };

  const removeFilter = (id: string) => {
    setFilters(filters().filter((f) => f.id !== id));
  };

  const resetTags = () => {
    setTags(['React', 'Solid', 'Vue', 'Angular']);
  };

  const resetFilters = () => {
    setFilters([
      { id: '1', label: 'Status: Active' },
      { id: '2', label: 'Type: User' },
      { id: '3', label: 'Role: Admin' },
    ]);
  };

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Chip</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Compact elements for tags, filters, and selections.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Chip } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <Chip>Label</Chip>
          </div>
          <CodeBlock code="<Chip>Label</Chip>" language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Variants</h2>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <Chip variant="filled">Filled</Chip>
            <Chip variant="outlined">Outlined</Chip>
          </div>
          <CodeBlock
            code={`<Chip variant="filled">Filled</Chip>
<Chip variant="outlined">Outlined</Chip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Colors</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Filled Variant
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <Chip color="default" variant="filled">Default</Chip>
              <Chip color="primary" variant="filled">Primary</Chip>
              <Chip color="success" variant="filled">Success</Chip>
              <Chip color="warning" variant="filled">Warning</Chip>
              <Chip color="error" variant="filled">Error</Chip>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Outlined Variant
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <Chip color="default" variant="outlined">Default</Chip>
              <Chip color="primary" variant="outlined">Primary</Chip>
              <Chip color="success" variant="outlined">Success</Chip>
              <Chip color="warning" variant="outlined">Warning</Chip>
              <Chip color="error" variant="outlined">Error</Chip>
            </div>
          </div>
          <CodeBlock
            code={`<Chip color="default">Default</Chip>
<Chip color="primary">Primary</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="error">Error</Chip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
          <CodeBlock
            code={`<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Removable</h2>
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <For each={tags()}>
                {(tag) => <Chip onRemove={() => removeTag(tag)}>{tag}</Chip>}
              </For>
            </div>
            <button
              class="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={resetTags}
            >
              Reset tags
            </button>
          </div>
          <CodeBlock
            code={`const [tags, setTags] = createSignal(['React', 'Solid', 'Vue']);

<For each={tags()}>
  {(tag) => (
    <Chip onRemove={() => setTags(tags().filter((t) => t !== tag))}>
      {tag}
    </Chip>
  )}
</For>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled</h2>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <Chip disabled>Disabled</Chip>
            <Chip disabled variant="outlined">Disabled Outlined</Chip>
            <Chip disabled onRemove={() => {}}>
              Disabled Removable
            </Chip>
          </div>
          <CodeBlock code="<Chip disabled>Disabled</Chip>" language="tsx" />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">As Filter Tags</h2>
        <div class="space-y-4">
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <For each={filters()}>
                {(filter) => (
                  <Chip variant="outlined" size="sm" onRemove={() => removeFilter(filter.id)}>
                    {filter.label}
                  </Chip>
                )}
              </For>
            </div>
            <button
              class="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
          <CodeBlock
            code={`function FilterTags() {
  const [filters, setFilters] = createSignal([
    { id: '1', label: 'Status: Active' },
    { id: '2', label: 'Type: User' },
  ]);

  const removeFilter = (id: string) => {
    setFilters(filters().filter((f) => f.id !== id));
  };

  return (
    <div class="flex flex-wrap gap-2">
      <For each={filters()}>
        {(filter) => (
          <Chip
            variant="outlined"
            size="sm"
            onRemove={() => removeFilter(filter.id)}
          >
            {filter.label}
          </Chip>
        )}
      </For>
    </div>
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Combining Options
        </h2>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <Chip variant="filled" color="success" size="sm">
              Small Success
            </Chip>
            <Chip variant="outlined" color="warning" size="md">
              Medium Warning
            </Chip>
            <Chip variant="filled" color="error" size="lg">
              Large Error
            </Chip>
            <Chip variant="outlined" color="primary" size="sm" onRemove={() => {}}>
              Removable Primary
            </Chip>
          </div>
          <CodeBlock
            code={`<Chip variant="filled" color="success" size="sm">
  Small Success
</Chip>
<Chip variant="outlined" color="warning" size="md">
  Medium Warning
</Chip>
<Chip variant="filled" color="error" size="lg">
  Large Error
</Chip>
<Chip variant="outlined" color="primary" size="sm" onRemove={() => {}}>
  Removable Primary
</Chip>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Props Reference
        </h2>
        <div class="overflow-x-auto">
          <table class="text-sm w-full">
            <thead>
              <tr class="text-left text-surface-600 dark:text-surface-400 border-b border-surface-200 dark:border-surface-700">
                <th class="pr-4 pb-2">Prop</th>
                <th class="pr-4 pb-2">Type</th>
                <th class="pr-4 pb-2">Default</th>
                <th class="pb-2">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-800 dark:text-surface-200">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="pr-4 py-2 font-mono text-xs">children</td>
                <td class="pr-4 py-2 font-mono text-xs">JSX.Element</td>
                <td class="pr-4 py-2">required</td>
                <td class="py-2">Chip content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="pr-4 py-2 font-mono text-xs">variant</td>
                <td class="pr-4 py-2 font-mono text-xs">'filled' | 'outlined'</td>
                <td class="pr-4 py-2">'filled'</td>
                <td class="py-2">Visual variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="pr-4 py-2 font-mono text-xs">color</td>
                <td class="pr-4 py-2 font-mono text-xs">'default' | 'primary' | 'success' | 'warning' | 'error'</td>
                <td class="pr-4 py-2">'default'</td>
                <td class="py-2">Color theme</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="pr-4 py-2 font-mono text-xs">size</td>
                <td class="pr-4 py-2 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="pr-4 py-2">'md'</td>
                <td class="py-2">Chip size</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="pr-4 py-2 font-mono text-xs">onRemove</td>
                <td class="pr-4 py-2 font-mono text-xs">() =&gt; void</td>
                <td class="pr-4 py-2">-</td>
                <td class="py-2">Show remove button and handle click</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="pr-4 py-2 font-mono text-xs">disabled</td>
                <td class="pr-4 py-2 font-mono text-xs">boolean</td>
                <td class="pr-4 py-2">false</td>
                <td class="py-2">Disable the chip</td>
              </tr>
              <tr>
                <td class="pr-4 py-2 font-mono text-xs">class</td>
                <td class="pr-4 py-2 font-mono text-xs">string</td>
                <td class="pr-4 py-2">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
