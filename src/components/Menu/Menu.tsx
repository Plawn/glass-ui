import { type Component, For, Show, createSignal } from 'solid-js';
import { Popover } from '../Popover';
import type { MenuItem, MenuProps } from './types';

export const Menu: Component<MenuProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [focusedIndex, setFocusedIndex] = createSignal(-1);

  const placement = () => props.placement ?? 'bottom-start';

  // Get focusable items (non-divider, non-disabled)
  const focusableItems = () =>
    props.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.divider && !item.disabled);

  const handleOpen = () => {
    setIsOpen(true);
    setFocusedIndex(-1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled || item.divider) {
      return;
    }
    item.onClick?.();
    handleClose();
  };

  // Get actual index in items array from focusable index
  const getActualIndex = (focusableIdx: number) => {
    const items = focusableItems();
    if (focusableIdx < 0 || focusableIdx >= items.length) {
      return -1;
    }
    return items[focusableIdx].index;
  };

  // Handle keyboard navigation on the trigger
  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (!isOpen()) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleOpen();
      }
    }
  };

  // Handle keyboard navigation within the menu
  const handleMenuKeyDown = (e: KeyboardEvent) => {
    const items = focusableItems();

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (items.length === 0) return;
        const nextIndex =
          focusedIndex() === -1 ? 0 : Math.min(focusedIndex() + 1, items.length - 1);
        setFocusedIndex(nextIndex);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (items.length === 0) return;
        const prevIndex =
          focusedIndex() === -1 ? items.length - 1 : Math.max(focusedIndex() - 1, 0);
        setFocusedIndex(prevIndex);
        break;
      }
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex() >= 0 && focusedIndex() < items.length) {
          handleItemClick(items[focusedIndex()].item);
        }
        break;
      case 'Home':
        e.preventDefault();
        if (items.length > 0) {
          setFocusedIndex(0);
        }
        break;
      case 'End':
        e.preventDefault();
        if (items.length > 0) {
          setFocusedIndex(items.length - 1);
        }
        break;
    }
  };

  return (
    <Popover
      trigger={props.trigger}
      placement={placement()}
      open={isOpen()}
      onOpenChange={handleOpenChange}
      class={props.class}
      style={props.style}
      contentClass="min-w-[180px] py-1.5"
      triggerProps={{
        onKeyDown: handleTriggerKeyDown,
        'aria-haspopup': 'menu',
      }}
    >
      <div role="menu" aria-orientation="vertical" onKeyDown={handleMenuKeyDown}>
        <For each={props.items}>
          {(item, index) => (
            <Show
              when={!item.divider}
              fallback={<hr class="my-1.5 border-t border-surface-200 dark:border-white/10" />}
            >
              <button
                type="button"
                class={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors
                  ${
                    item.disabled
                      ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed'
                      : 'text-surface-700 dark:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }
                  ${getActualIndex(focusedIndex()) === index() ? 'bg-black/5 dark:bg-white/5' : ''}`}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                role="menuitem"
                tabIndex={-1}
              >
                <Show when={item.icon}>
                  <span class="w-4 h-4 flex items-center justify-center opacity-70">
                    {item.icon}
                  </span>
                </Show>
                <span>{item.label}</span>
              </button>
            </Show>
          )}
        </For>
      </div>
    </Popover>
  );
};
