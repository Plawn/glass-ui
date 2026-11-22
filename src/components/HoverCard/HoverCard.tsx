import {
  type Component,
  createEffect,
  createSignal,
  createUniqueId,
  omit,
  untrack,
} from 'solid-js';
import { useFloatingContent } from '../../hooks/useFloatingContent';
import type { HoverCardProps } from './types';

/** Default offset between trigger and hover card */
const DEFAULT_OFFSET = 8;

export const HoverCard: Component<HoverCardProps> = (props) => {
  const rest = omit(
    props,
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
  );

  const hovercardId = createUniqueId();
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
  createEffect(
    () => {
      const hover = isHoveringTrigger() || isHoveringContent();
      return {
        disabled: disabled(),
        hover,
        delay: hover ? openDelay() : closeDelay(),
      };
    },
    ({ disabled, hover, delay }) => {
      if (disabled) {
        setIsOpen(false);
      } else if (hover !== untrack(isOpen)) {
        const timer = setTimeout(() => setIsOpen(hover), delay);
        return () => clearTimeout(timer);
      }
    },
  );

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
      class={`relative inline-block ${props.class ?? ''}`}
      style={props.style}
      aria-describedby={isOpen() ? hovercardId : undefined}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
    >
      {props.trigger}
      <FloatingContent ref={(el) => (contentRef = el)}>
        <div id={hovercardId}>{props.children}</div>
      </FloatingContent>
    </div>
  );
};
