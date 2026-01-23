import type { Component, JSX } from 'solid-js';
import { Show, createEffect, createSignal, on } from 'solid-js';
import { VirtualList } from '../virtual';
import type { VirtualHandle } from '../virtual';
import { ChatMessage } from './ChatMessage';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import type {
  ChatMessageListProps,
  ChatMessage as ChatMessageType,
} from './types';

/**
 * Custom scroller for chat message list (no glass-card styling)
 */
const ChatScroller: Component<{
  ref: (el: HTMLDivElement) => void;
  style: JSX.CSSProperties;
  children: JSX.Element;
}> = (props) => (
  <div
    ref={props.ref}
    style={props.style}
    class="rounded-xl overflow-hidden scrollbar-thin"
    data-virtual-scroller
    tabIndex={0}
  >
    {props.children}
  </div>
);

/**
 * Virtualized message list with auto-scroll to bottom
 */
export const ChatMessageList: Component<ChatMessageListProps> = (props) => {
  const [listHandle, setListHandle] = createSignal<VirtualHandle | undefined>();
  const [isAtBottom, setIsAtBottom] = createSignal(true);
  const [userScrolled, setUserScrolled] = createSignal(false);

  // Auto-scroll to bottom when new messages arrive (if user hasn't scrolled up)
  createEffect(
    on(
      () => props.messages.length,
      () => {
        const handle = listHandle();
        if (handle && (isAtBottom() || !userScrolled())) {
          // Small delay to ensure DOM is updated
          requestAnimationFrame(() => {
            handle.scrollToIndex({
              index: props.messages.length - 1,
              align: 'end',
              behavior: 'smooth',
            });
          });
        }
      },
    ),
  );

  // Also scroll when streaming status changes (for typing indicator)
  createEffect(
    on(
      () => props.isStreaming,
      (streaming) => {
        if (streaming) {
          const handle = listHandle();
          if (handle && isAtBottom()) {
            requestAnimationFrame(() => {
              handle.scrollToIndex({
                index: props.messages.length - 1,
                align: 'end',
                behavior: 'smooth',
              });
            });
          }
        }
      },
    ),
  );

  const handleAtBottomChange = (atBottom: boolean) => {
    setIsAtBottom(atBottom);
    if (atBottom) {
      setUserScrolled(false);
    }
  };

  const handleScrolling = (scrolling: boolean) => {
    if (scrolling && !isAtBottom()) {
      setUserScrolled(true);
    }
  };

  const renderMessage = (_index: number, message: ChatMessageType) => (
    <div class="px-4 py-2">
      <ChatMessage
        message={message}
        userName={props.userName}
        userAvatarUrl={props.userAvatarUrl}
        assistantName={props.assistantName}
        assistantAvatarUrl={props.assistantAvatarUrl}
      />
    </div>
  );

  const EmptyPlaceholder = () => (
    <div class="flex items-center justify-center h-full min-h-[200px]">
      <Show
        when={props.emptyState}
        fallback={
          <p class="text-surface-400 dark:text-surface-500 text-center">
            No messages yet. Start a conversation!
          </p>
        }
      >
        {props.emptyState}
      </Show>
    </div>
  );

  const Footer = () => (
    <Show when={props.showTypingIndicator && props.isStreaming}>
      <div class="px-4 py-2 flex gap-3">
        <div class="shrink-0 pt-1 w-8" /> {/* Spacer for avatar alignment */}
        <div class="glass-card rounded-2xl rounded-bl-md px-4 py-3">
          <ChatTypingIndicator />
        </div>
      </div>
    </Show>
  );

  return (
    <div class="flex-1 min-h-0">
      <VirtualList
        ref={setListHandle}
        data={props.messages}
        itemContent={renderMessage}
        defaultItemHeight={80}
        overscan={5}
        atBottomThreshold={50}
        atBottomStateChange={handleAtBottomChange}
        isScrolling={handleScrolling}
        Scroller={ChatScroller}
        EmptyPlaceholder={EmptyPlaceholder}
        Footer={Footer}
        style={{ height: '100%' }}
      />
    </div>
  );
};
