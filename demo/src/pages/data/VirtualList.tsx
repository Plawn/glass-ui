import { createSignal, For } from 'solid-js';
import { VirtualList, CodeBlock, Avatar, Badge, Button, Card } from 'glass-ui-solid';
import type { VirtualHandle } from 'glass-ui-solid';

// Sample data generator
interface ListItem {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

const generateItems = (count: number): ListItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
    status: ['online', 'offline', 'away'][i % 3] as ListItem['status'],
  }));

export default function VirtualListPage() {
  const items = generateItems(10000);
  let listRef: VirtualHandle | undefined;
  const [scrollIndex, setScrollIndex] = createSignal(500);

  const statusColors = {
    online: 'success',
    offline: 'secondary',
    away: 'warning',
  } as const;

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          VirtualList
        </h1>
        <p class="text-surface-600 dark:text-surface-400">
          Virtualized list component for efficiently rendering large datasets. Only renders
          visible items, enabling smooth scrolling through thousands of items.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { VirtualList } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Basic Example
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          A simple virtualized list with 10,000 items. Notice how scrolling remains smooth
          because only visible items are rendered.
        </p>
        <Card class="p-4 mb-4">
          <VirtualList
            data={items}
            itemContent={(index, item) => (
              <div class="flex items-center gap-3 p-3 border-b border-surface-200 dark:border-surface-700">
                <Avatar src={item.avatar} name={item.name} size="sm" />
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-surface-900 dark:text-white truncate">
                    {item.name}
                  </div>
                  <div class="text-sm text-surface-500 dark:text-surface-400 truncate">
                    {item.email}
                  </div>
                </div>
                <Badge variant={statusColors[item.status]} size="sm">
                  {item.status}
                </Badge>
              </div>
            )}
            style={{ height: '400px' }}
          />
        </Card>
        <CodeBlock
          code={`const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  email: \`user\${i + 1}@example.com\`,
}));

<VirtualList
  data={items}
  itemContent={(index, item) => (
    <div class="flex items-center gap-3 p-3 border-b">
      <Avatar src={item.avatar} name={item.name} size="sm" />
      <div class="flex-1">
        <div class="font-medium">{item.name}</div>
        <div class="text-sm text-surface-500">{item.email}</div>
      </div>
      <Badge variant="success">{item.status}</Badge>
    </div>
  )}
  style={{ height: '400px' }}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Fixed Item Height (Optimized)
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          When all items have the same height, use <code class="text-primary-600">fixedItemHeight</code> for
          better performance. This avoids measuring each item dynamically.
        </p>
        <Card class="p-4 mb-4">
          <VirtualList
            data={items}
            fixedItemHeight={64}
            itemContent={(index, item) => (
              <div class="flex items-center gap-3 h-16 px-4 border-b border-surface-200 dark:border-surface-700">
                <span class="text-surface-400 w-12 text-right">#{item.id}</span>
                <Avatar src={item.avatar} name={item.name} size="sm" />
                <span class="font-medium text-surface-900 dark:text-white">{item.name}</span>
              </div>
            )}
            style={{ height: '320px' }}
          />
        </Card>
        <CodeBlock
          code={`<VirtualList
  data={items}
  fixedItemHeight={64}
  itemContent={(index, item) => (
    <div class="flex items-center gap-3 h-16 px-4 border-b">
      <span class="text-surface-400 w-12 text-right">#{item.id}</span>
      <Avatar src={item.avatar} name={item.name} size="sm" />
      <span class="font-medium">{item.name}</span>
    </div>
  )}
  style={{ height: '320px' }}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Scroll to Index
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use the <code class="text-primary-600">ref</code> prop to get a handle for programmatic scrolling.
        </p>
        <Card class="p-4 mb-4">
          <div class="flex items-center gap-4 mb-4">
            <input
              type="number"
              value={scrollIndex()}
              onInput={(e) => setScrollIndex(parseInt(e.currentTarget.value) || 0)}
              class="w-24 px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-white"
              min={0}
              max={9999}
            />
            <Button onClick={() => listRef?.scrollToIndex(scrollIndex())}>
              Scroll to Index
            </Button>
            <Button variant="secondary" onClick={() => listRef?.scrollToIndex({ index: scrollIndex(), align: 'center', behavior: 'smooth' })}>
              Smooth Scroll (Center)
            </Button>
          </div>
          <VirtualList
            ref={(handle) => (listRef = handle)}
            data={items}
            fixedItemHeight={48}
            itemContent={(index, item) => (
              <div class="flex items-center gap-3 h-12 px-4 border-b border-surface-200 dark:border-surface-700">
                <span class="text-surface-400 w-16">Row {index}</span>
                <span class="font-medium text-surface-900 dark:text-white">{item.name}</span>
              </div>
            )}
            style={{ height: '300px' }}
          />
        </Card>
        <CodeBlock
          code={`let listRef: VirtualHandle;

<Button onClick={() => listRef.scrollToIndex(500)}>
  Go to item 500
</Button>

<Button onClick={() => listRef.scrollToIndex({
  index: 500,
  align: 'center',
  behavior: 'smooth'
})}>
  Smooth Scroll (Center)
</Button>

<VirtualList
  ref={(handle) => (listRef = handle)}
  data={items}
  itemContent={(index, item) => <ItemRow item={item} />}
  style={{ height: '300px' }}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Header and Footer
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add static header and footer content using the <code class="text-primary-600">Header</code> and{' '}
          <code class="text-primary-600">Footer</code> props.
        </p>
        <Card class="p-4 mb-4">
          <VirtualList
            data={items.slice(0, 100)}
            fixedItemHeight={48}
            Header={() => (
              <div class="p-4 bg-primary-50 dark:bg-primary-900/20 border-b border-primary-200 dark:border-primary-800">
                <span class="font-semibold text-primary-900 dark:text-primary-100">
                  User Directory (100 users)
                </span>
              </div>
            )}
            Footer={() => (
              <div class="p-4 text-center text-surface-500 dark:text-surface-400 border-t border-surface-200 dark:border-surface-700">
                End of list
              </div>
            )}
            itemContent={(index, item) => (
              <div class="flex items-center gap-3 h-12 px-4 border-b border-surface-200 dark:border-surface-700">
                <span class="text-surface-900 dark:text-white">{item.name}</span>
              </div>
            )}
            style={{ height: '350px' }}
          />
        </Card>
        <CodeBlock
          code={`<VirtualList
  data={items}
  Header={() => (
    <div class="p-4 bg-primary-50 font-semibold">
      User Directory
    </div>
  )}
  Footer={() => (
    <div class="p-4 text-center text-surface-500">
      End of list
    </div>
  )}
  itemContent={(index, item) => <ItemRow item={item} />}
  style={{ height: '350px' }}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Total Count
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          When you don't have all data upfront, use <code class="text-primary-600">totalCount</code> instead of{' '}
          <code class="text-primary-600">data</code>. This is useful for infinite scroll scenarios.
        </p>
        <Card class="p-4 mb-4">
          <VirtualList
            totalCount={1000}
            fixedItemHeight={48}
            itemContent={(index) => (
              <div class="flex items-center h-12 px-4 border-b border-surface-200 dark:border-surface-700">
                <span class="text-surface-900 dark:text-white">Row {index + 1}</span>
              </div>
            )}
            style={{ height: '300px' }}
          />
        </Card>
        <CodeBlock
          code={`<VirtualList
  totalCount={10000}
  itemContent={(index) => (
    <div class="p-4 border-b">Row {index + 1}</div>
  )}
  style={{ height: '300px' }}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Prop</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Type</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Default</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
                <For each={[
                  ['data', 'readonly D[]', '-', 'Array of data items'],
                  ['totalCount', 'number', '-', 'Total count (alternative to data)'],
                  ['itemContent', '(index, data, context) => JSX.Element', 'required', 'Item renderer function'],
                  ['fixedItemHeight', 'number', '-', 'Fixed height optimization'],
                  ['defaultItemHeight', 'number', '50', 'Estimated item height'],
                  ['overscan', 'number', '5', 'Extra items to render outside viewport'],
                  ['initialScrollTop', 'number', '-', 'Initial scroll position'],
                  ['initialTopMostItemIndex', 'number', '-', 'Initial item to show'],
                  ['Header', '() => JSX.Element', '-', 'Header component'],
                  ['Footer', '() => JSX.Element', '-', 'Footer component'],
                  ['EmptyPlaceholder', '() => JSX.Element', '-', 'Empty state component'],
                  ['endReached', '(index) => void', '-', 'Called when end is reached'],
                  ['ref', '(handle) => void', '-', 'Get imperative handle'],
                ]}>
                  {(row) => (
                    <tr>
                      <td class="p-3 font-mono text-primary-600 dark:text-primary-400">{row[0]}</td>
                      <td class="p-3 font-mono text-surface-600 dark:text-surface-400">{row[1]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[2]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[3]}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Handle Methods</h2>
        <Card class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Method</th>
                  <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
                <For each={[
                  ['scrollToIndex(location)', 'Scroll to a specific index. Accepts number or { index, align, behavior }'],
                  ['scrollTo({ top, behavior })', 'Scroll to a specific offset'],
                  ['scrollBy({ top, behavior })', 'Scroll by a delta amount'],
                  ['getScrollTop()', 'Get current scroll position'],
                ]}>
                  {(row) => (
                    <tr>
                      <td class="p-3 font-mono text-primary-600 dark:text-primary-400">{row[0]}</td>
                      <td class="p-3 text-surface-600 dark:text-surface-400">{row[1]}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
