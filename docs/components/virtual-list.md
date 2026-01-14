# VirtualList

Virtualized list for efficiently rendering large datasets.

## Import

```tsx
import { VirtualList } from 'glass-ui-solid';
```

## Usage

### Basic with Data Array

```tsx
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

<VirtualList
  data={items}
  itemContent={(index, item) => (
    <div class="p-4 border-b">{item.name}</div>
  )}
  style={{ height: '400px' }}
/>
```

### With Total Count

```tsx
<VirtualList
  totalCount={10000}
  itemContent={(index) => (
    <div class="p-4 border-b">Row {index}</div>
  )}
  style={{ height: '400px' }}
/>
```

### Fixed Item Height (Optimized)

```tsx
<VirtualList
  data={items}
  fixedItemHeight={48}
  itemContent={(index, item) => (
    <div class="h-12 p-3">{item.name}</div>
  )}
  style={{ height: '400px' }}
/>
```

### With Overscan

```tsx
<VirtualList
  data={items}
  overscan={10}
  itemContent={(index, item) => renderItem(item)}
  style={{ height: '400px' }}
/>
```

### Infinite Scroll

```tsx
function InfiniteList() {
  const [items, setItems] = createSignal<Item[]>([]);
  const [loading, setLoading] = createSignal(false);

  const loadMore = async (index: number) => {
    if (loading()) return;
    setLoading(true);
    const newItems = await fetchItems(index);
    setItems([...items(), ...newItems]);
    setLoading(false);
  };

  return (
    <VirtualList
      data={items()}
      itemContent={(index, item) => <ItemRow item={item} />}
      endReached={loadMore}
      Footer={() => loading() ? <Spinner /> : null}
      style={{ height: '100vh' }}
    />
  );
}
```

### With Header and Footer

```tsx
<VirtualList
  data={items}
  itemContent={(index, item) => <ItemRow item={item} />}
  Header={() => <div class="p-4 bg-surface-100 font-bold">List Header</div>}
  Footer={() => <div class="p-4 text-center">End of list</div>}
  style={{ height: '400px' }}
/>
```

### Scroll to Index

```tsx
let listRef: VirtualHandle;

<Button onClick={() => listRef.scrollToIndex(500)}>
  Go to item 500
</Button>

<VirtualList
  ref={(handle) => (listRef = handle)}
  data={items}
  itemContent={(index, item) => <ItemRow item={item} />}
  style={{ height: '400px' }}
/>
```

### Custom Item Keys

```tsx
<VirtualList
  data={items}
  computeItemKey={(index, item) => item.id}
  itemContent={(index, item) => <ItemRow item={item} />}
  style={{ height: '400px' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `readonly D[]` | - | Array of data items |
| `totalCount` | `number` | - | Total count (alternative to data) |
| `itemContent` | `(index, data, context) => JSX.Element` | required | Item renderer |
| `fixedItemHeight` | `number` | - | Fixed height optimization |
| `defaultItemHeight` | `number` | - | Estimated item height |
| `overscan` | `number` | - | Extra items to render |
| `context` | `C` | - | Custom context for renderers |
| `computeItemKey` | `(index, data, context) => string \| number` | - | Custom key function |

### Scroll Props

| Prop | Type | Description |
|------|------|-------------|
| `initialScrollTop` | `number` | Initial scroll position |
| `initialTopMostItemIndex` | `number` | Initial item to show |
| `firstItemIndex` | `number` | First item index (reverse scroll) |
| `useWindowScroll` | `boolean` | Use window as scroller |
| `customScrollParent` | `HTMLElement` | Custom scroll container |

### Component Props

| Prop | Type | Description |
|------|------|-------------|
| `Header` | `() => JSX.Element` | Header component |
| `Footer` | `() => JSX.Element` | Footer component |
| `EmptyPlaceholder` | `() => JSX.Element` | Empty state component |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| `rangeChanged` | `(range) => void` | Visible range changed |
| `isScrolling` | `(scrolling) => void` | Scroll state changed |
| `endReached` | `(index) => void` | End of list reached |
| `startReached` | `(index) => void` | Start of list reached |
| `atBottomStateChange` | `(atBottom) => void` | At bottom state changed |
| `atTopStateChange` | `(atTop) => void` | At top state changed |

### Handle Methods

| Method | Description |
|--------|-------------|
| `scrollToIndex(location)` | Scroll to index |
| `scrollTo({ top, behavior })` | Scroll to offset |
| `scrollBy({ top, behavior })` | Scroll by delta |
| `getScrollTop()` | Get current scroll position |
