# Pagination

Page navigation for large datasets.

## Import

```tsx
import { Pagination } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const [page, setPage] = createSignal(1);

<Pagination
  total={100}
  page={page()}
  pageSize={10}
  onChange={setPage}
/>
```

### With Page Size Selector

```tsx
const [page, setPage] = createSignal(1);
const [pageSize, setPageSize] = createSignal(10);

<Pagination
  total={500}
  page={page()}
  pageSize={pageSize()}
  onChange={setPage}
  showPageSize
  pageSizeOptions={[10, 25, 50, 100]}
  onPageSizeChange={setPageSize}
/>
```

### In Table

```tsx
function UsersTable() {
  const [page, setPage] = createSignal(1);
  const [pageSize, setPageSize] = createSignal(10);
  const [users] = createResource(() => fetchUsers(page(), pageSize()));

  return (
    <>
      <Table columns={columns} data={users()} />
      <Pagination
        total={users.total}
        page={page()}
        pageSize={pageSize()}
        onChange={setPage}
        showPageSize
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1); // Reset to first page
        }}
      />
    </>
  );
}
```

### Custom Page Size Options

```tsx
<Pagination
  total={1000}
  page={page()}
  pageSize={pageSize()}
  onChange={setPage}
  showPageSize
  pageSizeOptions={[5, 10, 20, 50]}
  onPageSizeChange={setPageSize}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | required | Total number of items |
| `page` | `number` | required | Current page (1-indexed) |
| `pageSize` | `number` | required | Items per page |
| `onChange` | `(page: number) => void` | required | Page change callback |
| `showPageSize` | `boolean` | `false` | Show page size selector |
| `pageSizeOptions` | `number[]` | `[10, 25, 50]` | Available page sizes |
| `onPageSizeChange` | `(pageSize: number) => void` | - | Page size change callback |
| `class` | `string` | - | Additional CSS classes |

## Features

- First/Last page buttons
- Previous/Next navigation
- Page number display
- Optional page size selector
