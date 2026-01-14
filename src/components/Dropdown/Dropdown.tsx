import type { JSX } from 'solid-js';
import { type Component, Show, createEffect, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useDisclosure, useIsDark } from '../../hooks';
import type { DropdownProps } from './types';

/** Position style properties for dropdown placement */
type PositionStyles = Pick<JSX.CSSProperties, 'top' | 'bottom' | 'left' | 'right' | 'transform'>;

/** Minimum space required between dropdown and viewport edge */
const VIEWPORT_PADDING = 8;
/** Default estimated dropdown height for viewport calculations */
const ESTIMATED_DROPDOWN_HEIGHT = 200;
/** Gap between trigger and dropdown */
const DROPDOWN_GAP = 4;

export const Dropdown: Component<DropdownProps> = (props) => {
  // Use internal state if not controlled
  const disclosure = useDisclosure(false);
  let triggerRef: HTMLButtonElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const isDark = useIsDark();
  const placement = () => props.placement ?? 'bottom-start';

  // Determine if controlled or uncontrolled
  const isControlled = () => props.open !== undefined;
  const isOpen = () => (isControlled() ? !!props.open : disclosure.isOpen());

  const setOpen = (value: boolean) => {
    if (isControlled()) {
      props.onOpenChange?.(value);
    } else {
      if (value) {
        disclosure.onOpen();
      } else {
        disclosure.onClose();
      }
      props.onOpenChange?.(value);
    }
  };

  const handleToggle = () => {
    setOpen(!isOpen());
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle keyboard
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      handleClose();
      triggerRef?.focus();
    } else if ((e.key === 'Enter' || e.key === ' ') && !isOpen()) {
      e.preventDefault();
      setOpen(true);
    }
  };

  // Close on click outside
  createEffect(() => {
    if (!isOpen()) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef &&
        !contentRef.contains(target) &&
        triggerRef &&
        !triggerRef.contains(target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    onCleanup(() => document.removeEventListener('mousedown', handleClickOutside));
  });

  // Calculate position styles with viewport boundary checking
  const getPositionStyles = (): PositionStyles => {
    if (!triggerRef) {
      return {};
    }
    const rect = triggerRef.getBoundingClientRect();
    const requestedPlacement = placement();

    // Calculate available space
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;
    const spaceRight = window.innerWidth - rect.left - VIEWPORT_PADDING;
    const spaceLeft = rect.right - VIEWPORT_PADDING;

    // Get actual dropdown height if available, otherwise use estimate
    const dropdownHeight = contentRef?.offsetHeight || ESTIMATED_DROPDOWN_HEIGHT;
    const dropdownWidth = contentRef?.offsetWidth || 200;

    // Determine actual vertical placement (with auto-flip if needed)
    let verticalPlacement: 'top' | 'bottom';
    if (requestedPlacement.startsWith('bottom')) {
      verticalPlacement = spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top';
    } else {
      verticalPlacement = spaceAbove >= dropdownHeight || spaceAbove >= spaceBelow ? 'top' : 'bottom';
    }

    // Determine horizontal alignment
    let horizontalAlignment: 'start' | 'end' | 'center';
    if (requestedPlacement.includes('start')) {
      // Check if dropdown would overflow right edge
      horizontalAlignment = spaceRight >= dropdownWidth ? 'start' : 'end';
    } else if (requestedPlacement.includes('end')) {
      // Check if dropdown would overflow left edge
      horizontalAlignment = spaceLeft >= dropdownWidth ? 'end' : 'start';
    } else {
      horizontalAlignment = 'center';
    }

    const styles: PositionStyles = {};

    // Apply vertical positioning
    if (verticalPlacement === 'bottom') {
      styles.top = `${rect.bottom + DROPDOWN_GAP}px`;
    } else {
      styles.bottom = `${window.innerHeight - rect.top + DROPDOWN_GAP}px`;
    }

    // Apply horizontal positioning
    if (horizontalAlignment === 'start') {
      styles.left = `${Math.max(VIEWPORT_PADDING, rect.left)}px`;
    } else if (horizontalAlignment === 'end') {
      styles.right = `${Math.max(VIEWPORT_PADDING, window.innerWidth - rect.right)}px`;
    } else {
      // Center alignment
      styles.left = `${rect.left + rect.width / 2}px`;
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  };

  return (
    <div class={`relative inline-block ${props.class ?? ''}`}>
      <button
        type="button"
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen()}
        class="appearance-none bg-transparent border-none p-0 m-0 cursor-pointer"
      >
        {props.trigger}
      </button>
      <Show when={isOpen()}>
        <Portal>
          <div
            ref={contentRef}
            class={`fixed z-50 glass-card rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150 ${isDark() ? 'dark' : ''} ${props.contentClass ?? ''}`}
            style={getPositionStyles()}
          >
            {props.children}
          </div>
        </Portal>
      </Show>
    </div>
  );
};
