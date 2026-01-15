import { Button, CodeBlock, EmptyState } from 'glass-ui-solid';

export default function EmptyStatePage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">EmptyState</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Placeholder content displayed when there is no data to show, with optional icons and actions.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { EmptyState } from 'glass-ui-solid';`} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl mb-4">
          <EmptyState title="No items found" />
        </div>
        <CodeBlock code={`<EmptyState title="No items found" />`} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Description</h2>
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl mb-4">
          <EmptyState
            title="No messages"
            description="You don't have any messages yet. Start a conversation to see them here."
          />
        </div>
        <CodeBlock
          code={`<EmptyState
  title="No messages"
  description="You don't have any messages yet. Start a conversation to see them here."
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Icon</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add a visual icon to make the empty state more recognizable.
        </p>
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl mb-4">
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
        <CodeBlock
          code={`<EmptyState
  icon={<InboxIcon />}
  title="Inbox is empty"
  description="No new messages to display."
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Action</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Include an action button to guide users toward resolving the empty state.
        </p>
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl mb-4">
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
        <CodeBlock
          code={`<EmptyState
  icon={<DocumentIcon />}
  title="No documents"
  description="Get started by creating your first document."
  action={<Button>Create Document</Button>}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Three size variants are available to fit different contexts.
        </p>
        <div class="space-y-4 mb-4">
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
        <CodeBlock
          code={`<EmptyState size="sm" title="Small" description="Compact size" />
<EmptyState size="md" title="Medium" description="Default size" />
<EmptyState size="lg" title="Large" description="Prominent size" />`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Search Results Example</h2>
        <div class="border border-surface-200 dark:border-surface-700 rounded-xl mb-4">
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
        <CodeBlock
          code={`<EmptyState
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search or filter criteria."
  action={<Button variant="secondary">Clear filters</Button>}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-600 dark:text-surface-400 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-2 pr-4">Prop</th>
                <th class="py-2 pr-4">Type</th>
                <th class="py-2 pr-4">Default</th>
                <th class="py-2">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">title</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Title text displayed prominently</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">description</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Optional description text below the title</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">icon</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Optional icon element displayed at the top</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">action</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Optional action element (e.g., a Button)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Size variant affecting icon and text sizes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">class</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Additional CSS classes</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">style</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.CSSProperties</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Inline styles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
