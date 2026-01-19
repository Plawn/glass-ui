import { type Component } from 'solid-js';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useControlled } from '../../hooks/useControlled';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFloatingContent } from '../../hooks/useFloatingContent';
import { useScrollBehavior } from '../../hooks/useScrollBehavior';
import type { PopoverProps } from './types';

/** Default offset between trigger and popover */
const DEFAULT_OFFSET = 8;

export const Popover: Component<PopoverProps> = (props) => {
  let triggerRef: HTMLButtonElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const placement = () => props.placement ?? 'bottom';
  const offset = () => props.offset ?? DEFAULT_OFFSET;
  const showArrow = () => props.showArrow ?? false;
  const scrollBehavior = () => props.scrollBehavior ?? 'close';

  // Controlled/uncontrolled state management
  const [isOpen, setOpen] = useControlled({
    value: () => props.open,
    defaultValue: false,
    onChange: props.onOpenChange,
  });

  // Use the shared floating content hook
  const { FloatingContent } = useFloatingContent({
    triggerRef: () => triggerRef,
    contentRef: () => contentRef,
    isOpen,
    placement,
    offset,
    showArrow,
    contentClass: () => props.contentClass,
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
    <div class={`relative inline-block ${props.class ?? ''}`} style={props.style}>
      <button
        type="button"
        {...props.triggerProps}
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (typeof props.triggerProps?.onKeyDown === 'function') {
            props.triggerProps.onKeyDown(e);
          }
        }}
        aria-haspopup={props.triggerProps?.['aria-haspopup'] ?? 'true'}
        aria-expanded={isOpen()}
        class={`appearance-none bg-transparent border-none p-0 m-0 cursor-pointer ${props.triggerProps?.class ?? ''}`}
      >
        {props.trigger}
      </button>
      <FloatingContent ref={(el) => (contentRef = el)}>
        {props.children}
      </FloatingContent>
    </div>
  );
};
