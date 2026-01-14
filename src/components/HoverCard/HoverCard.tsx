import type { JSX } from 'solid-js';
import { type Component, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { PortalWithDarkMode } from '../shared/PortalWithDarkMode';
import { POPOVER_ENTER } from '../../constants/animations';
import type { HoverCardProps, HoverCardPlacement } from './types';

/** Position style properties for hover card placement */
type PositionStyles = Pick<JSX.CSSProperties, 'top' | 'bottom' | 'left' | 'right' | 'transform'>;

/** Minimum space required between hover card and viewport edge */
const VIEWPORT_PADDING = 8;
/** Default offset between trigger and hover card */
const DEFAULT_OFFSET = 8;
/** Arrow size in pixels */
const ARROW_SIZE = 8;

/**
 * Get arrow position styles based on hover card placement
 */
const getArrowStyles = (placement: HoverCardPlacement): JSX.CSSProperties => {
  const baseStyles: JSX.CSSProperties = {
    position: 'absolute',
    width: `${ARROW_SIZE}px`,
    height: `${ARROW_SIZE}px`,
    transform: 'rotate(45deg)',
  };

  switch (placement) {
    case 'top':
      return {
        ...baseStyles,
        bottom: `-${ARROW_SIZE / 2}px`,
        left: '50%',
        'margin-left': `-${ARROW_SIZE / 2}px`,
      };
    case 'bottom':
      return {
        ...baseStyles,
        top: `-${ARROW_SIZE / 2}px`,
        left: '50%',
        'margin-left': `-${ARROW_SIZE / 2}px`,
      };
    case 'left':
      return {
        ...baseStyles,
        right: `-${ARROW_SIZE / 2}px`,
        top: '50%',
        'margin-top': `-${ARROW_SIZE / 2}px`,
      };
    case 'right':
      return {
        ...baseStyles,
        left: `-${ARROW_SIZE / 2}px`,
        top: '50%',
        'margin-top': `-${ARROW_SIZE / 2}px`,
      };
  }
};

export const HoverCard: Component<HoverCardProps> = (props) => {
  let triggerRef: HTMLDivElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const [isOpen, setIsOpen] = createSignal(false);
  const [isHoveringTrigger, setIsHoveringTrigger] = createSignal(false);
  const [isHoveringContent, setIsHoveringContent] = createSignal(false);

  const placement = () => props.placement ?? 'bottom';
  const openDelay = () => props.openDelay ?? 200;
  const closeDelay = () => props.closeDelay ?? 300;
  const showArrow = () => props.showArrow ?? false;
  const disabled = () => props.disabled ?? false;

  // Handle delayed open with proper cleanup
  createEffect(() => {
    if (disabled()) {
      setIsOpen(false);
      return;
    }

    const shouldBeOpen = isHoveringTrigger() || isHoveringContent();

    if (shouldBeOpen && !isOpen()) {
      const timer = setTimeout(() => setIsOpen(true), openDelay());
      onCleanup(() => clearTimeout(timer));
    } else if (!shouldBeOpen && isOpen()) {
      const timer = setTimeout(() => setIsOpen(false), closeDelay());
      onCleanup(() => clearTimeout(timer));
    }
  });

  // Calculate position styles with viewport boundary checking
  const getPositionStyles = (): PositionStyles => {
    if (!triggerRef) {
      return {};
    }
    const rect = triggerRef.getBoundingClientRect();
    const requestedPlacement = placement();
    const offset = DEFAULT_OFFSET;

    // Get actual content dimensions if available
    const contentHeight = contentRef?.offsetHeight || 200;
    const contentWidth = contentRef?.offsetWidth || 200;

    // Calculate available space in each direction
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;
    const spaceRight = window.innerWidth - rect.right - VIEWPORT_PADDING;
    const spaceLeft = rect.left - VIEWPORT_PADDING;

    // Determine actual direction (with auto-flip if needed)
    let actualPlacement = requestedPlacement;
    if (requestedPlacement === 'bottom' && spaceBelow < contentHeight && spaceAbove > spaceBelow) {
      actualPlacement = 'top';
    } else if (requestedPlacement === 'top' && spaceAbove < contentHeight && spaceBelow > spaceAbove) {
      actualPlacement = 'bottom';
    } else if (requestedPlacement === 'right' && spaceRight < contentWidth && spaceLeft > spaceRight) {
      actualPlacement = 'left';
    } else if (requestedPlacement === 'left' && spaceLeft < contentWidth && spaceRight > spaceLeft) {
      actualPlacement = 'right';
    }

    const styles: PositionStyles = {};

    switch (actualPlacement) {
      case 'bottom':
        styles.top = `${rect.bottom + offset}px`;
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
        break;
      case 'top':
        styles.bottom = `${window.innerHeight - rect.top + offset}px`;
        styles.left = `${rect.left + rect.width / 2}px`;
        styles.transform = 'translateX(-50%)';
        break;
      case 'right':
        styles.left = `${rect.right + offset}px`;
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
        break;
      case 'left':
        styles.right = `${window.innerWidth - rect.left + offset}px`;
        styles.top = `${rect.top + rect.height / 2}px`;
        styles.transform = 'translateY(-50%)';
        break;
    }

    return styles;
  };

  const handleTriggerMouseEnter = () => {
    if (!disabled()) {
      setIsHoveringTrigger(true);
    }
  };

  const handleTriggerMouseLeave = () => {
    setIsHoveringTrigger(false);
  };

  const handleContentMouseEnter = () => {
    if (!disabled()) {
      setIsHoveringContent(true);
    }
  };

  const handleContentMouseLeave = () => {
    setIsHoveringContent(false);
  };

  return (
    <div
      ref={triggerRef}
      class={`relative inline-block ${props.class ?? ''}`}
      style={props.style}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
    >
      {props.trigger}
      <Show when={isOpen()}>
        <PortalWithDarkMode>
          <div
            ref={contentRef}
            class={`fixed z-50 glass-card rounded-xl shadow-lg ${POPOVER_ENTER} ${props.contentClass ?? ''}`}
            style={getPositionStyles()}
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
            role="tooltip"
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
