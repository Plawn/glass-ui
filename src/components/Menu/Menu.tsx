import {
  type Component,
  For,
  Show,
  createEffect,
  createSignal,
  on,
  splitProps,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Popover } from '../Popover';
import type { MenuItem, MenuProps } from './types';

type MenuActionItem = Extract<MenuItem, { divider?: false }>;

export const Menu: Component<MenuProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'trigger',
    'items',
    'placement',
    'class',
    'style',
  ]);
  const [isOpen, setIsOpen] = createSignal(false);
  const [focusedIndex, setFocusedIndex] = createSignal(-1);
  let menuRef: HTMLDivElement | undefined;

  const placement = () => local.placement ?? 'bottom-start';

  // Get focusable items (non-divider, non-disabled)
  const focusableItems = () =>
    local.items
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

  // Focus first menu item when menu opens
  createEffect(
    on(isOpen, (open) => {
      if (open && menuRef) {
        requestAnimationFrame(() => {
          const firstItem = menuRef?.querySelector<HTMLElement>(
            '[role="menuitem"]:not([disabled])',
          );
          if (firstItem) {
            firstItem.focus();
            setFocusedIndex(0);
          }
        });
      }
    }),
  );

  // Handle keyboard navigation on the trigger
  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (!isOpen()) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleOpen();
      }
    }
  };

  // Focus menu item by index
  const focusItem = (index: number) => {
    setFocusedIndex(index);
    if (menuRef) {
      const items = menuRef.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([disabled])',
      );
      items[index]?.focus();
    }
  };

  // Handle keyboard navigation within the menu
  const handleMenuKeyDown = (e: KeyboardEvent) => {
    const items = focusableItems();

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (items.length === 0) {
          return;
        }
        const nextIndex =
          focusedIndex() === -1
            ? 0
            : Math.min(focusedIndex() + 1, items.length - 1);
        focusItem(nextIndex);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (items.length === 0) {
          return;
        }
        const prevIndex =
          focusedIndex() === -1
            ? items.length - 1
            : Math.max(focusedIndex() - 1, 0);
        focusItem(prevIndex);
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
          focusItem(0);
        }
        break;
      case 'End':
        e.preventDefault();
        if (items.length > 0) {
          focusItem(items.length - 1);
        }
        break;
    }
  };

  return (
    <Popover
      {...rest}
      trigger={local.trigger}
      placement={placement()}
      open={isOpen()}
      onOpenChange={handleOpenChange}
      class={local.class}
      style={local.style}
      contentClass="min-w-[180px] py-1.5"
      triggerProps={{
        onKeyDown: handleTriggerKeyDown,
        'aria-haspopup': 'menu',
      }}
    >
      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        onKeyDown={handleMenuKeyDown}
      >
        <For each={local.items}>
          {(item, index) => {
            const menuItem = item as MenuActionItem;
            const tag = () => menuItem.as ?? 'button';
            const isItemButton = () => tag() === 'button';
            const [, forwarded] = splitProps(menuItem, [
              'label',
              'onClick',
              'divider',
              'icon',
              'disabled',
              'as',
            ]);
            return (
              <Show
                when={!item.divider}
                fallback={
                  <hr class="my-1.5 border-t border-surface-200 dark:border-white/10" />
                }
              >
                <Dynamic
                  component={tag()}
                  {...forwarded}
                  type={isItemButton() ? 'button' : undefined}
                  class={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors
                  ${
                    menuItem.disabled
                      ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed pointer-events-none'
                      : 'text-surface-700 dark:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }
                  ${getActualIndex(focusedIndex()) === index() ? 'bg-black/5 dark:bg-white/5' : ''}`}
                  onClick={() => handleItemClick(item)}
                  disabled={isItemButton() ? menuItem.disabled : undefined}
                  aria-disabled={
                    !isItemButton() && menuItem.disabled ? 'true' : undefined
                  }
                  role="menuitem"
                  tabIndex={-1}
                >
                  <Show when={menuItem.icon}>
                    <span
                      class="w-4 h-4 flex items-center justify-center opacity-70"
                      aria-hidden="true"
                    >
                      {menuItem.icon}
                    </span>
                  </Show>
                  <span>{menuItem.label}</span>
                </Dynamic>
              </Show>
            );
          }}
        </For>
      </div>
    </Popover>
  );
};
