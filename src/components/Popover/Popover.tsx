import { type Component, splitProps } from 'solid-js';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useControlled } from '../../hooks/useControlled';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFloatingContent } from '../../hooks/useFloatingContent';
import { useScrollBehavior } from '../../hooks/useScrollBehavior';
import type { PopoverProps } from './types';

/** Default offset between trigger and popover */
const DEFAULT_OFFSET = 8;

export const Popover: Component<PopoverProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'children',
    'trigger',
    'placement',
    'open',
    'onOpenChange',
    'showArrow',
    'offset',
    'contentClass',
    'triggerProps',
    'scrollBehavior',
  ]);

  let triggerRef: HTMLButtonElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const placement = () => local.placement ?? 'bottom';
  const offset = () => local.offset ?? DEFAULT_OFFSET;
  const showArrow = () => local.showArrow ?? false;
  const scrollBehavior = () => local.scrollBehavior ?? 'close';

  // Controlled/uncontrolled state management
  const [isOpen, setOpen] = useControlled({
    value: () => local.open,
    defaultValue: false,
    onChange: local.onOpenChange,
  });

  // Use the shared floating content hook
  const { FloatingContent } = useFloatingContent({
    triggerRef: () => triggerRef,
    contentRef: () => contentRef,
    isOpen,
    placement,
    offset,
    showArrow,
    contentClass: () => local.contentClass,
    role: 'dialog',
    ariaModal: false,
  });

  const handleToggle = () => {
    setOpen(!isOpen());
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle keyboard on trigger element
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      handleClose();
      triggerRef?.focus();
    }
  };

  // Close on Escape (global listener)
  useEscapeKey({
    onEscape: () => {
      handleClose();
      triggerRef?.focus();
    },
    enabled: isOpen,
  });

  // Handle scroll behavior (close, lock, or none)
  useScrollBehavior({
    enabled: isOpen,
    behavior: scrollBehavior,
    onClose: handleClose,
    ignoreRef: () => contentRef,
  });

  // Close on click outside
  useClickOutside({
    refs: () => [contentRef, triggerRef],
    onClickOutside: handleClose,
    enabled: isOpen,
  });

  return (
    <div
      {...rest}
      class={`relative inline-block ${local.class ?? ''}`}
      style={local.style}
    >
      <button
        type="button"
        {...local.triggerProps}
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (typeof local.triggerProps?.onKeyDown === 'function') {
            local.triggerProps.onKeyDown(e);
          }
        }}
        aria-haspopup={local.triggerProps?.['aria-haspopup'] ?? 'true'}
        aria-expanded={isOpen()}
        class={`appearance-none bg-transparent border-none p-0 m-0 cursor-pointer ${local.triggerProps?.class ?? ''}`}
      >
        {local.trigger}
      </button>
      <FloatingContent ref={(el) => (contentRef = el)}>
        {local.children}
      </FloatingContent>
    </div>
  );
};
