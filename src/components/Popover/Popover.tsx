import type { JSX } from 'solid-js';
import { type Component, Show, createEffect, onCleanup } from 'solid-js';
import { useDisclosure } from '../../hooks';
import { PortalWithDarkMode } from '../shared/PortalWithDarkMode';
import { POPOVER_ENTER } from '../../constants/animations';
import type { PopoverProps, PopoverPlacement } from './types';

/** Position style properties for popover placement */
type PositionStyles = Pick<JSX.CSSProperties, 'top' | 'bottom' | 'left' | 'right' | 'transform'>;

/** Minimum space required between popover and viewport edge */
const VIEWPORT_PADDING = 8;
/** Default offset between trigger and popover */
const DEFAULT_OFFSET = 8;
/** Default estimated popover dimensions for viewport calculations */
const ESTIMATED_POPOVER_SIZE = 200;

/** Arrow size in pixels */
const ARROW_SIZE = 8;

/**
 * Get the primary direction from a placement string
 */
const getPrimaryDirection = (placement: PopoverPlacement): 'top' | 'bottom' | 'left' | 'right' => {
  if (placement.startsWith('top')) return 'top';
  if (placement.startsWith('bottom')) return 'bottom';
  if (placement.startsWith('left')) return 'left';
  return 'right';
};

/**
 * Get the alignment from a placement string
 */
const getAlignment = (placement: PopoverPlacement): 'start' | 'end' | 'center' => {
  if (placement.includes('start')) return 'start';
  if (placement.includes('end')) return 'end';
  return 'center';
};

/**
 * Arrow position styles based on popover placement
 */
const getArrowStyles = (placement: PopoverPlacement): JSX.CSSProperties => {
  const direction = getPrimaryDirection(placement);
  const alignment = getAlignment(placement);

  const baseStyles: JSX.CSSProperties = {
    position: 'absolute',
    width: `${ARROW_SIZE}px`,
    height: `${ARROW_SIZE}px`,
    transform: 'rotate(45deg)',
  };

  // Position arrow opposite to the popover direction
  switch (direction) {
    case 'top':
      // Arrow points down (at bottom of popover)
      return {
        ...baseStyles,
        bottom: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start' ? { left: '16px' } : alignment === 'end' ? { right: '16px' } : { left: '50%', 'margin-left': `-${ARROW_SIZE / 2}px` }),
      };
    case 'bottom':
      // Arrow points up (at top of popover)
      return {
        ...baseStyles,
        top: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start' ? { left: '16px' } : alignment === 'end' ? { right: '16px' } : { left: '50%', 'margin-left': `-${ARROW_SIZE / 2}px` }),
      };
    case 'left':
      // Arrow points right (at right of popover)
      return {
        ...baseStyles,
        right: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start' ? { top: '16px' } : alignment === 'end' ? { bottom: '16px' } : { top: '50%', 'margin-top': `-${ARROW_SIZE / 2}px` }),
      };
    case 'right':
      // Arrow points left (at left of popover)
      return {
        ...baseStyles,
        left: `-${ARROW_SIZE / 2}px`,
        ...(alignment === 'start' ? { top: '16px' } : alignment === 'end' ? { bottom: '16px' } : { top: '50%', 'margin-top': `-${ARROW_SIZE / 2}px` }),
      };
  }
};

export const Popover: Component<PopoverProps> = (props) => {
  // Use internal state if not controlled
  const disclosure = useDisclosure(false);
  let triggerRef: HTMLButtonElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const placement = () => props.placement ?? 'bottom';
  const offset = () => props.offset ?? DEFAULT_OFFSET;
  const showArrow = () => props.showArrow ?? false;

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
    }
  };

  // Close on Escape (global listener)
  createEffect(() => {
    if (!isOpen()) {
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        triggerRef?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    onCleanup(() => document.removeEventListener('keydown', handleEscape));
  });

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
    const currentOffset = offset();

    // Get actual popover dimensions if available, otherwise use estimate
    const popoverHeight = contentRef?.offsetHeight || ESTIMATED_POPOVER_SIZE;
    const popoverWidth = contentRef?.offsetWidth || ESTIMATED_POPOVER_SIZE;

    // Calculate available space in each direction
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;
    const spaceRight = window.innerWidth - rect.right - VIEWPORT_PADDING;
    const spaceLeft = rect.left - VIEWPORT_PADDING;

    const primaryDirection = getPrimaryDirection(requestedPlacement);
    const alignment = getAlignment(requestedPlacement);

    // Determine actual direction (with auto-flip if needed)
    let actualDirection = primaryDirection;
    if (primaryDirection === 'bottom' && spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
      actualDirection = 'top';
    } else if (primaryDirection === 'top' && spaceAbove < popoverHeight && spaceBelow > spaceAbove) {
      actualDirection = 'bottom';
    } else if (primaryDirection === 'right' && spaceRight < popoverWidth && spaceLeft > spaceRight) {
      actualDirection = 'left';
    } else if (primaryDirection === 'left' && spaceLeft < popoverWidth && spaceRight > spaceLeft) {
      actualDirection = 'right';
    }

    const styles: PositionStyles = {};

    // Apply positioning based on direction
    if (actualDirection === 'bottom') {
      styles.top = `${rect.bottom + currentOffset}px`;
      // Horizontal alignment
      if (alignment === 'start') {
        styles.left = `${Math.max(VIEWPORT_PADDING, rect.left)}px`;
      } else if (alignment === 'end') {
        styles.right = `${Math.max(VIEWPORT_PADDING, window.innerWidth - rect.right)}px`;
      } else {
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
      }
    } else if (actualDirection === 'top') {
      styles.bottom = `${window.innerHeight - rect.top + currentOffset}px`;
      // Horizontal alignment
      if (alignment === 'start') {
        styles.left = `${Math.max(VIEWPORT_PADDING, rect.left)}px`;
      } else if (alignment === 'end') {
        styles.right = `${Math.max(VIEWPORT_PADDING, window.innerWidth - rect.right)}px`;
      } else {
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
      }
    } else if (actualDirection === 'right') {
      styles.left = `${rect.right + currentOffset}px`;
      // Vertical alignment
      if (alignment === 'start') {
        styles.top = `${Math.max(VIEWPORT_PADDING, rect.top)}px`;
      } else if (alignment === 'end') {
        styles.bottom = `${Math.max(VIEWPORT_PADDING, window.innerHeight - rect.bottom)}px`;
      } else {
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
      }
    } else if (actualDirection === 'left') {
      styles.right = `${window.innerWidth - rect.left + currentOffset}px`;
      // Vertical alignment
      if (alignment === 'start') {
        styles.top = `${Math.max(VIEWPORT_PADDING, rect.top)}px`;
      } else if (alignment === 'end') {
        styles.bottom = `${Math.max(VIEWPORT_PADDING, window.innerHeight - rect.bottom)}px`;
      } else {
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
      }
    }

    return styles;
  };

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
      <Show when={isOpen()}>
        <PortalWithDarkMode>
          <div
            ref={contentRef}
            class={`fixed z-50 glass-card rounded-xl shadow-lg ${POPOVER_ENTER} ${props.contentClass ?? ''}`}
            style={getPositionStyles()}
            role="dialog"
            aria-modal="false"
          >
            {props.children}
            <Show when={showArrow()}>
              <div
                class="glass-card"
                style={getArrowStyles(placement())}
                aria-hidden="true"
              />
            </Show>
          </div>
        </PortalWithDarkMode>
      </Show>
    </div>
  );
};
