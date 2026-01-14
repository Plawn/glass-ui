# VirtualTable

Virtualized table for large datasets with sticky headers.

## Import

```tsx
import { VirtualTable } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `User ${i}`,
  email: `user${i}@example.com`,
  role: i % 2 === 0 ? 'Admin' : 'User',
}));

<VirtualTable
  data={users}
  fixedHeaderContent={() => (
    <tr>
      <th class="p-3 text-left">ID</th>
      <th class="p-3 text-left">Name</th>
      <th class="p-3 text-left">Email</th>
      <th class="p-3 text-left">Role</th>
    </tr>
  )}
  itemContent={(index, user) => (
    <>
      <td class="p-3">{user.id}</td>
      <td class="p-3">{user.name}</td>
      <td class="p-3">{user.email}</td>
      <td class="p-3">{user.role}</td>
    </>
  )}
  style={{ height: '500px' }}
/>
```

### Fixed Row Height (Optimized)

```tsx
<VirtualTable
  data={users}
  fixedItemHeight={48}
  fixedHeaderContent={() => (
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  )}
  itemContent={(index, user) => (
    <>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </>
  )}
  style={{ height: '500px' }}
/>
```

### With Footer

```tsx
<VirtualTable
  data={users}
  fixedHeaderContent={() => (
    <tr>
      <th>Name</th>
      <th>Amount</th>
    </tr>
  )}
  itemContent={(index, item) => (
    <>
      <td>{item.name}</td>
      <td>{item.amount}</td>
    </>
  )}
  fixedFooterContent={() => (
    <tr>
      <td class="font-bold">Total</td>
      <td class="font-bold">{total()}</td>
    </tr>
  )}
  style={{ height: '500px' }}
/>
```

### Infinite Loading

```tsx
function InfiniteTable() {
  const [data, setData] = createSignal<Row[]>([]);

  const loadMore = async () => {
    const newRows = await fetchRows(data().length);
    setData([...data(), ...newRows]);
  };

  return (
    <VirtualTable
      data={data()}
      fixedHeaderContent={() => <tr>...</tr>}
      itemContent={(index, row) => <RowCells row={row} />}
      endReached={loadMore}
      style={{ height: '100vh' }}
    />
  );
}
```

### Custom Components

```tsx
<VirtualTable
  data={data}
  components={{
    Table: (props) => (
      <table {...props} class="w-full border-collapse" />
    ),
    TableRow: (props) => (
      <tr
        {...props}
        class={clsx('hover:bg-surface-50', props['data-index'] % 2 && 'bg-surface-25')}
      />
    ),
  }}
  fixedHeaderContent={() => <tr>...</tr>}
  itemContent={(index, item) => <Cells item={item} />}
  style={{ height: '500px' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `readonly D[]` | - | Array of data items |
| `totalCount` | `number` | - | Total count (alternative to data) |
| `itemContent` | `(index, data, context) => JSX.Element` | required | Row cell renderer |
| `fixedHeaderContent` | `() => JSX.Element` | - | Sticky header content |
| `fixedFooterContent` | `() => JSX.Element` | - | Sticky footer content |
| `fixedItemHeight` | `number` | - | Fixed row height optimization |
| `defaultItemHeight` | `number` | - | Estimated row height |
| `overscan` | `number` | - | Extra rows to render |
| `context` | `C` | - | Custom context for renderers |
| `components` | `TableComponents` | - | Custom table components |
| `computeItemKey` | `(index, data, context) => string \| number` | - | Custom key function |

### Scroll Props

| Prop | Type | Description |
|------|------|-------------|
| `initialScrollTop` | `number` | Initial scroll position |
| `initialTopMostItemIndex` | `number` | Initial row to show |
| `useWindowScroll` | `boolean` | Use window as scroller |
| `customScrollParent` | `HTMLElement` | Custom scroll container |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `rangeChanged` | `(range) => void` | Visible range changed |
| `isScrolling` | `(scrolling) => void` | Scroll state changed |
| `endReached` | `(index) => void` | End of table reached |
| `startReached` | `(index) => void` | Start of table reached |

### TableComponents

| Component | Description |
|-----------|-------------|
| `Table` | Custom table element |
| `TableHead` | Custom thead element |
| `TableBody` | Custom tbody element |
| `TableFoot` | Custom tfoot element |
| `TableRow` | Custom tr element |
| `Scroller` | Custom scroll container |
| `EmptyPlaceholder` | Empty state |
| `FillerRow` | Spacing row |
