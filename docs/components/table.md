# Table

Data table with sorting, selection, and sticky headers.

## Import

```tsx
import { Table } from 'glass-ui-solid';
import type { TableColumn, SortState } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
];

const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
];

<Table columns={columns} data={data} />
```

### Sortable Columns

```tsx
<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'createdAt', header: 'Created', sortable: true },
  ]}
  data={data}
  sortable
/>
```

### Controlled Sorting

```tsx
const [sort, setSort] = createSignal<SortState>({ column: null, direction: null });

<Table
  columns={columns}
  data={sortedData()}
  sort={sort()}
  onSort={setSort}
/>
```

### Row Selection (Multiple)

```tsx
const [selected, setSelected] = createSignal<Set<number>>(new Set());

<Table
  columns={columns}
  data={data}
  selectable="multiple"
  selectedKeys={selected()}
  onSelectionChange={(keys, rows) => {
    setSelected(keys);
    console.log('Selected rows:', rows);
  }}
/>
```

### Row Selection (Single)

```tsx
<Table
  columns={columns}
  data={data}
  selectable="single"
  selectedKeys={selected()}
  onSelectionChange={(keys) => setSelected(keys)}
  clickableRows
/>
```

### Custom Cell Rendering

```tsx
<Table
  columns={[
    {
      key: 'user',
      header: 'User',
      render: (_, row) => (
        <div class="flex items-center gap-2">
          <Avatar name={row.name} size="sm" />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'error'}>
          {value}
        </Badge>
      ),
    },
  ]}
  data={data}
/>
```

### Sticky Header with Max Height

```tsx
<Table
  columns={columns}
  data={largeDataset}
  maxHeight="400px"
  stickyHeader
/>
```

### Variants

```tsx
<Table variant="default" {...props} />
<Table variant="bordered" {...props} />
<Table variant="striped" {...props} />
```

### Sizes

```tsx
<Table size="sm" {...props} />
<Table size="md" {...props} />
<Table size="lg" {...props} />
```

### Loading State

```tsx
<Table
  columns={columns}
  data={data}
  loading={isLoading()}
  loadingRows={5}
/>
```

### Empty State

```tsx
<Table
  columns={columns}
  data={[]}
  emptyMessage="No users found."
  emptyRender={() => (
    <div class="text-center py-8">
      <p>No data available</p>
      <Button onClick={refresh}>Refresh</Button>
    </div>
  )}
/>
```

### Row Click Events

```tsx
<Table
  columns={columns}
  data={data}
  clickableRows
  onRowClick={(row, index) => console.log('Clicked:', row)}
  onRowDoubleClick={(row) => openDetail(row.id)}
/>
```

### Custom Row Styling

```tsx
<Table
  columns={columns}
  data={data}
  rowClass={(row) =>
    row.status === 'inactive' ? 'bg-error-50/30' : ''
  }
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | required | Column definitions |
| `data` | `T[]` | required | Data rows |
| `sortable` | `boolean` | `false` | Enable sorting globally |
| `sort` | `SortState` | - | Controlled sort state |
| `onSort` | `(sort: SortState) => void` | - | Sort change callback |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `variant` | `'default' \| 'bordered' \| 'striped'` | `'default'` | Visual variant |
| `hoverable` | `boolean` | `true` | Show hover effect on rows |
| `selectable` | `boolean \| 'single' \| 'multiple'` | - | Enable selection |
| `selectedKeys` | `Set<RowKey>` | - | Selected row keys |
| `onSelectionChange` | `(keys, rows) => void` | - | Selection change callback |
| `onRowClick` | `(row, index, event) => void` | - | Row click callback |
| `onRowDoubleClick` | `(row, index, event) => void` | - | Row double-click callback |
| `rowClass` | `string \| (row, index) => string` | - | Custom row class |
| `clickableRows` | `boolean` | `false` | Show pointer cursor |
| `stickyHeader` | `boolean` | `false` | Sticky table header |
| `maxHeight` | `string` | - | Max height with scroll |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `loadingRows` | `number` | `3` | Number of skeleton rows |
| `emptyMessage` | `string` | `'No data'` | Empty state message |
| `emptyRender` | `() => JSX.Element` | - | Custom empty render |
| `getRowKey` | `(row, index) => RowKey` | - | Row key accessor |

## TableColumn

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Data key (supports dot notation) |
| `header` | `string` | Column header text |
| `sortable` | `boolean` | Enable sorting for this column |
| `render` | `(value, row, index) => JSX.Element` | Custom cell render |
| `width` | `string` | Column width |
| `minWidth` | `string` | Minimum width |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment |
| `sticky` | `'left' \| 'right'` | Sticky column position |
| `headerRender` | `(column) => JSX.Element` | Custom header render |
| `cellClass` | `string` | Cell CSS class |
| `headerClass` | `string` | Header CSS class |

## Large Datasets

For tables with 100+ rows, consider using [VirtualTable](./virtual-table.md) for better performance.
