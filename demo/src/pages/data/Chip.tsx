import { Chip } from 'glass-ui-solid';
import { For, createSignal } from 'solid-js';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

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
      <PageHeader
        title="Chip"
        description="Compact elements for tags, filters, and selections."
      />

      <DemoSection
        title="Import"
        code="import { Chip } from 'glass-ui-solid';"
      />

      <DemoSection title="Basic Usage" code="<Chip>Label</Chip>">
        <div class="flex flex-wrap items-center gap-2">
          <Chip>Label</Chip>
        </div>
      </DemoSection>

      <DemoSection
        title="Variants"
        code={`<Chip variant="filled">Filled</Chip>
<Chip variant="outlined">Outlined</Chip>`}
      >
        <div class="flex flex-wrap items-center gap-2">
          <Chip variant="filled">Filled</Chip>
          <Chip variant="outlined">Outlined</Chip>
        </div>
      </DemoSection>

      <DemoSection
        title="Colors"
        code={`<Chip color="default">Default</Chip>
<Chip color="primary">Primary</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="error">Error</Chip>`}
      >
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Filled Variant
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <Chip color="default" variant="filled">
                Default
              </Chip>
              <Chip color="primary" variant="filled">
                Primary
              </Chip>
              <Chip color="success" variant="filled">
                Success
              </Chip>
              <Chip color="warning" variant="filled">
                Warning
              </Chip>
              <Chip color="error" variant="filled">
                Error
              </Chip>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Outlined Variant
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <Chip color="default" variant="outlined">
                Default
              </Chip>
              <Chip color="primary" variant="outlined">
                Primary
              </Chip>
              <Chip color="success" variant="outlined">
                Success
              </Chip>
              <Chip color="warning" variant="outlined">
                Warning
              </Chip>
              <Chip color="error" variant="outlined">
                Error
              </Chip>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`}
      >
        <div class="flex flex-wrap items-center gap-2">
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
        </div>
      </DemoSection>

      <DemoSection
        title="Removable"
        code={`const [tags, setTags] = createSignal(['React', 'Solid', 'Vue']);

<For each={tags()}>
  {(tag) => (
    <Chip onRemove={() => setTags(tags().filter((t) => t !== tag))}>
      {tag}
    </Chip>
  )}
</For>`}
      >
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
      </DemoSection>

      <DemoSection title="Disabled" code="<Chip disabled>Disabled</Chip>">
        <div class="flex flex-wrap items-center gap-2">
          <Chip disabled>Disabled</Chip>
          <Chip disabled variant="outlined">
            Disabled Outlined
          </Chip>
          <Chip disabled onRemove={() => {}}>
            Disabled Removable
          </Chip>
        </div>
      </DemoSection>

      <DemoSection
        title="As Filter Tags"
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
      >
        <div class="space-y-2">
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
          <button
            class="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      </DemoSection>

      <DemoSection
        title="Combining Options"
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
      >
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
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            onRemove={() => {}}
          >
            Removable Primary
          </Chip>
        </div>
      </DemoSection>

      <DemoSection title="Props Reference" card={false}>
        <PropsTable
          props={[
            {
              name: 'children',
              type: 'JSX.Element',
              default: 'required',
              description: 'Chip content',
            },
            {
              name: 'variant',
              type: "'filled' | 'outlined'",
              default: "'filled'",
              description: 'Visual variant',
            },
            {
              name: 'color',
              type: "'default' | 'primary' | 'success' | 'warning' | 'error'",
              default: "'default'",
              description: 'Color theme',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Chip size',
            },
            {
              name: 'onRemove',
              type: '() => void',
              default: '-',
              description: 'Show remove button and handle click',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disable the chip',
            },
            {
              name: 'class',
              type: 'string',
              default: '-',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
