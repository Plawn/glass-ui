import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import type { ChatProps } from './types';

/**
 * A complete chat interface with message list and input.
 *
 * @example
 * ```tsx
 * const [messages, setMessages] = createSignal<ChatMessage[]>([]);
 * const [isStreaming, setIsStreaming] = createSignal(false);
 *
 * const handleSend = (content: string) => {
 *   // Add user message
 *   setMessages(prev => [...prev, {
 *     id: crypto.randomUUID(),
 *     role: 'user',
 *     content,
 *     timestamp: new Date(),
 *     status: 'complete'
 *   }]);
 *   // Start streaming response...
 *   setIsStreaming(true);
 * };
 *
 * <Chat
 *   messages={messages()}
 *   onSendMessage={handleSend}
 *   isStreaming={isStreaming()}
 *   showTypingIndicator
 *   userName="You"
 *   assistantName="Claude"
 * />
 * ```
 */
export const Chat: Component<ChatProps> = (props) => {
  return (
    <div class={`flex flex-col h-full bg-white/30 dark:bg-surface-900/30 backdrop-blur-sm rounded-2xl overflow-hidden ${props.class ?? ''}`}>
      {/* Optional header */}
      <Show when={props.header}>
        <div class="border-b border-surface-200 dark:border-surface-700">
          {props.header}
        </div>
      </Show>

      {/* Message list */}
      <ChatMessageList
        messages={props.messages}
        userName={props.userName}
        userAvatarUrl={props.userAvatarUrl}
        assistantName={props.assistantName}
        assistantAvatarUrl={props.assistantAvatarUrl}
        showTypingIndicator={props.showTypingIndicator}
        isStreaming={props.isStreaming}
        emptyState={props.emptyState}
      />

      {/* Input area */}
      <ChatInput
        onSendMessage={props.onSendMessage}
        onCancelStream={props.onCancelStream}
        isStreaming={props.isStreaming}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
    </div>
  );
};
