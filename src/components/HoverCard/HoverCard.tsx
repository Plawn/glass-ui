import { type Component, createEffect, createSignal, onCleanup } from 'solid-js';
import { useFloatingContent } from '../../hooks/useFloatingContent';
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
  const offset = () => DEFAULT_OFFSET;
  const openDelay = () => props.openDelay ?? 200;
  const closeDelay = () => props.closeDelay ?? 300;
  const showArrow = () => props.showArrow ?? false;
  const disabled = () => props.disabled ?? false;

  // Event handlers - defined before use to avoid hoisting issues
  const handleContentMouseEnter = () => {
    if (!disabled()) {
      setIsHoveringContent(true);
    }
  };

  const handleContentMouseLeave = () => {
    setIsHoveringContent(false);
  };

  // Use the shared floating content hook
  const { FloatingContent } = useFloatingContent({
    triggerRef: () => triggerRef,
    contentRef: () => contentRef,
    isOpen,
    direction: placement,
    offset,
    showArrow,
    contentClass: () => props.contentClass,
    role: 'tooltip',
    onMouseEnter: handleContentMouseEnter,
    onMouseLeave: handleContentMouseLeave,
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

  return (
    <div
      ref={triggerRef}
      class={`relative inline-block ${props.class ?? ''}`}
      style={props.style}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
    >
      {props.trigger}
      <FloatingContent ref={(el) => (contentRef = el)}>
        {props.children}
      </FloatingContent>
    </div>
  );
};
