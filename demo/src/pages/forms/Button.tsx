import { Button, Spinner } from 'glass-ui-solid';
import { For, createSignal } from 'solid-js';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

export default function ButtonPage() {
  const [loading, setLoading] = createSignal(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const variants = [
    'primary',
    'secondary',
    'tertiary',
    'ghost',
    'danger',
  ] as const;
  const sizes = ['sm', 'md', 'lg'] as const;

  return (
    <div class="space-y-8">
      <PageHeader
        title="Button"
        description="Buttons with multiple variants, sizes, and states including loading."
      />

      <DemoSection
        title="Import"
        code="import { Button, Spinner } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`<Button onClick={() => console.log('clicked')}>
  Click me
</Button>`}
      >
        <Button onClick={() => console.log('clicked')}>Click me</Button>
      </DemoSection>

      <DemoSection
        title="Variants"
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      >
        <div class="flex flex-wrap gap-3">
          <For each={variants}>
            {(variant) => (
              <Button variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            )}
          </For>
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div class="flex flex-wrap items-center gap-3">
          <For each={sizes}>
            {(size) => <Button size={size}>{size.toUpperCase()}</Button>}
          </For>
        </div>
      </DemoSection>

      <DemoSection
        title="With Icons"
        code={`<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowIcon />}>Continue</Button>
<Button leftIcon={<SaveIcon />} rightIcon={<CheckIcon />}>
  Save Changes
</Button>`}
      >
        <div class="flex flex-wrap gap-3">
          <Button
            leftIcon={
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Add Item
          </Button>
          <Button
            variant="secondary"
            rightIcon={
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          >
            Continue
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Loading State"
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
      >
        <div class="flex flex-wrap gap-3">
          <Button loading={loading()} onClick={handleLoadingClick}>
            {loading() ? 'Saving...' : 'Click to Load'}
          </Button>
          <Button variant="secondary" loading>
            Loading
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Full Width"
        code={`<Button fullWidth>Full Width Button</Button>`}
      >
        <Button fullWidth>Full Width Button</Button>
      </DemoSection>

      <DemoSection
        title="Disabled"
        code={`<Button disabled>Cannot Click</Button>`}
      >
        <div class="flex flex-wrap gap-3">
          <For each={variants}>
            {(variant) => (
              <Button variant={variant} disabled>
                Disabled
              </Button>
            )}
          </For>
        </div>
      </DemoSection>

      <DemoSection
        title="Spinner Component"
        description="Standalone spinner component used by Button internally."
        code={`import { Spinner } from 'glass-ui-solid';

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
      >
        <div class="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'children',
              type: 'JSX.Element',
              default: 'required',
              description: 'Button content',
            },
            {
              name: 'variant',
              type: "'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'",
              default: "'primary'",
              description: 'Visual variant',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Button size',
            },
            {
              name: 'type',
              type: "'button' | 'submit' | 'reset'",
              default: "'button'",
              description: 'HTML button type',
            },
            {
              name: 'onClick',
              type: '() => void',
              description: 'Click handler',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Disable the button',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description: 'Show loading spinner',
            },
            {
              name: 'fullWidth',
              type: 'boolean',
              default: 'false',
              description: 'Take full width of container',
            },
            {
              name: 'leftIcon',
              type: 'JSX.Element',
              description: 'Icon on the left',
            },
            {
              name: 'rightIcon',
              type: 'JSX.Element',
              description: 'Icon on the right',
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
