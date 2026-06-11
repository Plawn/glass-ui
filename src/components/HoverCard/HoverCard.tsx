import {
  type Component,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  splitProps,
} from 'solid-js';
import { useFloatingContent } from '../../hooks/useFloatingContent';
import type { HoverCardProps } from './types';

/** Default offset between trigger and hover card */
const DEFAULT_OFFSET = 8;

export const HoverCard: Component<HoverCardProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'children',
    'trigger',
    'placement',
    'openDelay',
    'closeDelay',
    'showArrow',
    'disabled',
    'contentClass',
  ]);

  const hovercardId = createUniqueId();
  let triggerRef: HTMLDivElement | undefined;
  let contentRef: HTMLDivElement | undefined;

  const [isOpen, setIsOpen] = createSignal(false);
  const [isHoveringTrigger, setIsHoveringTrigger] = createSignal(false);
  const [isHoveringContent, setIsHoveringContent] = createSignal(false);

  const placement = () => local.placement ?? 'bottom';
  const offset = () => DEFAULT_OFFSET;
  const openDelay = () => local.openDelay ?? 200;
  const closeDelay = () => local.closeDelay ?? 300;
  const showArrow = () => local.showArrow ?? false;
  const disabled = () => local.disabled ?? false;

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
    contentClass: () => local.contentClass,
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
      {...rest}
      ref={triggerRef}
      class={`relative inline-block ${local.class ?? ''}`}
      style={local.style}
      aria-describedby={isOpen() ? hovercardId : undefined}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
    >
      {local.trigger}
      <FloatingContent ref={(el) => (contentRef = el)}>
        <div id={hovercardId}>{local.children}</div>
      </FloatingContent>
    </div>
  );
};
