import { Button, EmptyState } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function EmptyStatePage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="EmptyState"
        description="Placeholder content displayed when there is no data to show, with optional icons and actions."
      />

      <DemoSection title="Import" code={`import { EmptyState } from 'glass-ui-solid';`} />

      <DemoSection
        title="Basic Usage"
        code={`<EmptyState title="No items found" />`}
        card={false}
      >
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
          <EmptyState title="No items found" />
        </div>
      </DemoSection>

      <DemoSection
        title="With Description"
        code={`<EmptyState
  title="No messages"
  description="You don't have any messages yet. Start a conversation to see them here."
/>`}
        card={false}
      >
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
          <EmptyState
            title="No messages"
            description="You don't have any messages yet. Start a conversation to see them here."
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Icon"
        description="Add a visual icon to make the empty state more recognizable."
        code={`<EmptyState
  icon={<InboxIcon />}
  title="Inbox is empty"
  description="No new messages to display."
/>`}
        card={false}
      >
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
          <EmptyState
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-full h-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.75a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v6.75m-17.5 0v6a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-6"
                />
              </svg>
            }
            title="Inbox is empty"
            description="No new messages to display."
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Action"
        description="Include an action button to guide users toward resolving the empty state."
        code={`<EmptyState
  icon={<DocumentIcon />}
  title="No documents"
  description="Get started by creating your first document."
  action={<Button>Create Document</Button>}
/>`}
        card={false}
      >
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
          <EmptyState
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-full h-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            }
            title="No documents"
            description="Get started by creating your first document."
            action={<Button>Create Document</Button>}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Three size variants are available to fit different contexts."
        code={`<EmptyState size="sm" title="Small" description="Compact size" />
<EmptyState size="md" title="Medium" description="Default size" />
<EmptyState size="lg" title="Large" description="Prominent size" />`}
        card={false}
      >
        <div class="space-y-4">
          <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
            <EmptyState
              size="sm"
              icon={<span>?</span>}
              title="Small empty state"
              description="Compact size for inline or sidebar use."
            />
          </div>
          <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
            <EmptyState
              size="md"
              icon={<span>?</span>}
              title="Medium empty state"
              description="Default size for most use cases."
            />
          </div>
          <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
            <EmptyState
              size="lg"
              icon={<span>?</span>}
              title="Large empty state"
              description="Prominent size for full-page empty states."
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="Search Results Example"
        code={`<EmptyState
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search or filter criteria."
  action={<Button variant="secondary">Clear filters</Button>}
/>`}
        card={false}
      >
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl">
          <EmptyState
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-full h-full"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            }
            title="No results found"
            description="Try adjusting your search or filter criteria."
            action={<Button variant="secondary">Clear filters</Button>}
          />
        </div>
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Title text displayed prominently' },
            { name: 'description', type: 'string', description: 'Optional description text below the title' },
            { name: 'icon', type: 'JSX.Element', description: 'Optional icon element displayed at the top' },
            { name: 'action', type: 'JSX.Element', description: 'Optional action element (e.g., a Button)' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant affecting icon and text sizes' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
            { name: 'style', type: 'JSX.CSSProperties', description: 'Inline styles' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
