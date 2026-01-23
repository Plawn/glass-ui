import { Avatar, Badge, Button, VirtualList } from 'glass-ui-solid';
import type { VirtualHandle } from 'glass-ui-solid';
import { For, createSignal } from 'solid-js';
import {
  CodePill,
  DemoSection,
  PageHeader,
  PropsTable,
} from '../../components/demo';

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

// Variable height items
interface VariableItem {
  id: number;
  type: 'compact' | 'normal' | 'expanded';
  title: string;
  description?: string;
  tags?: string[];
}

const generateVariableItems = (count: number): VariableItem[] =>
  Array.from({ length: count }, (_, i) => {
    const types: VariableItem['type'][] = ['compact', 'normal', 'expanded'];
    const type = types[i % 3];
    return {
      id: i + 1,
      type,
      title: `Item ${i + 1}`,
      description:
        type !== 'compact'
          ? `This is a ${type} item with more content. Lorem ipsum dolor sit amet.`
          : undefined,
      tags:
        type === 'expanded'
          ? ['Tag A', 'Tag B', 'Tag C', 'Important']
          : undefined,
    };
  });

export default function VirtualListPage() {
  const items = generateItems(10000);
  const variableItems = generateVariableItems(5000);
  let listRef: VirtualHandle | undefined;
  const [scrollIndex, setScrollIndex] = createSignal(500);

  const statusColors = {
    online: 'success',
    offline: 'secondary',
    away: 'warning',
  } as const;

  return (
    <div class="space-y-8">
      <PageHeader
        title="VirtualList"
        description="Virtualized list component for efficiently rendering large datasets. Only renders visible items, enabling smooth scrolling through thousands of items."
      />

      <DemoSection
        title="Import"
        code="import { VirtualList } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Example"
        description="A simple virtualized list with 10,000 items. Notice how scrolling remains smooth because only visible items are rendered."
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
      >
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
              <Badge size="sm">{item.status}</Badge>
            </div>
          )}
          style={{ height: '400px' }}
        />
      </DemoSection>

      <DemoSection
        title="Fixed Item Height (Optimized)"
        description={
          <>
            When all items have the same height, use{' '}
            <CodePill>fixedItemHeight</CodePill> for better performance. This
            avoids measuring each item dynamically.
          </>
        }
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
      >
        <VirtualList
          data={items}
          fixedItemHeight={64}
          itemContent={(index, item) => (
            <div class="flex items-center gap-3 h-16 px-4 border-b border-surface-200 dark:border-surface-700">
              <span class="text-surface-400 w-12 text-right">#{item.id}</span>
              <Avatar src={item.avatar} name={item.name} size="sm" />
              <span class="font-medium text-surface-900 dark:text-white">
                {item.name}
              </span>
            </div>
          )}
          style={{ height: '320px' }}
        />
      </DemoSection>

      <DemoSection
        title="Variable Height Items"
        description={
          <>
            Items can have different heights. The virtualizer automatically
            measures each item and adjusts. Use{' '}
            <CodePill>defaultItemHeight</CodePill> to set an estimated height
            for initial render.
          </>
        }
        code={`interface VariableItem {
  id: number;
  type: 'compact' | 'normal' | 'expanded';
  title: string;
  description?: string;
  tags?: string[];
}

// Items have different heights based on content
const variableItems = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  type: ['compact', 'normal', 'expanded'][i % 3],
  title: \`Item \${i + 1}\`,
  description: i % 3 !== 0 ? 'Description text...' : undefined,
  tags: i % 3 === 2 ? ['Tag A', 'Tag B'] : undefined,
}));

<VirtualList
  data={variableItems}
  defaultItemHeight={80}
  itemContent={(index, item) => (
    <div class="p-4 border-b">
      <div class="font-medium">{item.title}</div>
      {item.description && (
        <p class="text-sm text-surface-500 mt-1">{item.description}</p>
      )}
      {item.tags && (
        <div class="flex gap-2 mt-2">
          {item.tags.map(tag => <span class="tag">{tag}</span>)}
        </div>
      )}
    </div>
  )}
  style={{ height: '400px' }}
/>`}
      >
        <VirtualList
          data={variableItems}
          defaultItemHeight={80}
          itemContent={(index, item) => (
            <div
              class={`p-4 border-b border-surface-200 dark:border-surface-700 ${
                item.type === 'compact'
                  ? 'bg-surface-50 dark:bg-surface-800/50'
                  : item.type === 'expanded'
                    ? 'bg-primary-50/30 dark:bg-primary-900/10'
                    : ''
              }`}
            >
              <div class="flex items-center gap-2">
                <span class="text-xs text-surface-400 font-mono w-8">
                  #{item.id}
                </span>
                <span class="font-medium text-surface-900 dark:text-white">
                  {item.title}
                </span>
                <Badge
                  size="sm"
                  variant={item.type === 'expanded' ? 'info' : 'default'}
                >
                  {item.type}
                </Badge>
              </div>
              {item.description && (
                <p class="text-sm text-surface-600 dark:text-surface-400 mt-2 ml-10">
                  {item.description}
                </p>
              )}
              {item.tags && (
                <div class="flex gap-2 mt-3 ml-10">
                  {item.tags.map((tag) => (
                    <span class="px-2 py-0.5 text-xs rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          style={{ height: '400px' }}
        />
      </DemoSection>

      <DemoSection
        title="Scroll to Index"
        description={
          <>
            Use the <CodePill>ref</CodePill> prop to get a handle for
            programmatic scrolling.
          </>
        }
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
      >
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <input
              type="number"
              value={scrollIndex()}
              onInput={(e) =>
                setScrollIndex(Number.parseInt(e.currentTarget.value) || 0)
              }
              class="w-24 px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-800 text-surface-900 dark:text-white"
              min={0}
              max={9999}
            />
            <Button onClick={() => listRef?.scrollToIndex(scrollIndex())}>
              Scroll to Index
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                listRef?.scrollToIndex({
                  index: scrollIndex(),
                  align: 'center',
                  behavior: 'smooth',
                })
              }
            >
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
                <span class="font-medium text-surface-900 dark:text-white">
                  {item.name}
                </span>
              </div>
            )}
            style={{ height: '300px' }}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Header and Footer"
        description={
          <>
            Add static header and footer content using the{' '}
            <CodePill>Header</CodePill> and <CodePill>Footer</CodePill> props.
          </>
        }
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
      >
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
      </DemoSection>

      <DemoSection
        title="With Total Count"
        description={
          <>
            When you don't have all data upfront, use{' '}
            <CodePill>totalCount</CodePill> instead of <CodePill>data</CodePill>
            . This is useful for infinite scroll scenarios.
          </>
        }
        code={`<VirtualList
  totalCount={10000}
  itemContent={(index) => (
    <div class="p-4 border-b">Row {index + 1}</div>
  )}
  style={{ height: '300px' }}
/>`}
      >
        <VirtualList
          totalCount={1000}
          fixedItemHeight={48}
          itemContent={(index) => (
            <div class="flex items-center h-12 px-4 border-b border-surface-200 dark:border-surface-700">
              <span class="text-surface-900 dark:text-white">
                Row {index + 1}
              </span>
            </div>
          )}
          style={{ height: '300px' }}
        />
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'data',
              type: 'readonly D[]',
              default: '-',
              description: 'Array of data items',
            },
            {
              name: 'totalCount',
              type: 'number',
              default: '-',
              description: 'Total count (alternative to data)',
            },
            {
              name: 'itemContent',
              type: '(index, data, context) => JSX.Element',
              default: 'required',
              description: 'Item renderer function',
            },
            {
              name: 'fixedItemHeight',
              type: 'number',
              default: '-',
              description: 'Fixed height optimization',
            },
            {
              name: 'defaultItemHeight',
              type: 'number',
              default: '50',
              description: 'Estimated item height',
            },
            {
              name: 'overscan',
              type: 'number',
              default: '5',
              description: 'Extra items to render outside viewport',
            },
            {
              name: 'initialScrollTop',
              type: 'number',
              default: '-',
              description: 'Initial scroll position',
            },
            {
              name: 'initialTopMostItemIndex',
              type: 'number',
              default: '-',
              description: 'Initial item to show',
            },
            {
              name: 'Header',
              type: '() => JSX.Element',
              default: '-',
              description: 'Header component',
            },
            {
              name: 'Footer',
              type: '() => JSX.Element',
              default: '-',
              description: 'Footer component',
            },
            {
              name: 'EmptyPlaceholder',
              type: '() => JSX.Element',
              default: '-',
              description: 'Empty state component',
            },
            {
              name: 'endReached',
              type: '(index) => void',
              default: '-',
              description: 'Called when end is reached',
            },
            {
              name: 'ref',
              type: '(handle) => void',
              default: '-',
              description: 'Get imperative handle',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Handle Methods" card={false}>
        <PropsTable
          compact
          props={[
            {
              name: 'scrollToIndex(location)',
              type: '',
              description:
                'Scroll to a specific index. Accepts number or { index, align, behavior }',
            },
            {
              name: 'scrollTo({ top, behavior })',
              type: '',
              description: 'Scroll to a specific offset',
            },
            {
              name: 'scrollBy({ top, behavior })',
              type: '',
              description: 'Scroll by a delta amount',
            },
            {
              name: 'getScrollTop()',
              type: '',
              description: 'Get current scroll position',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
