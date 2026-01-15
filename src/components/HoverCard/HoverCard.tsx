import { type Component, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { PortalWithDarkMode } from '../shared/PortalWithDarkMode';
import { POPOVER_ENTER } from '../../constants/animations';
import { usePositioning } from '../../hooks';
import type { HoverCardProps } from './types';

/** Default offset between trigger and hover card */
const DEFAULT_OFFSET = 8;

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

  // Use the shared positioning hook
  const { getPositionStyles, getArrowStyles } = usePositioning({
    triggerRef: () => triggerRef,
    contentRef: () => contentRef,
    direction: placement,
    offset: DEFAULT_OFFSET,
  });

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
                style={getArrowStyles()}
                aria-hidden="true"
              />
            </Show>
          </div>
        </PortalWithDarkMode>
      </Show>
    </div>
  );
};
