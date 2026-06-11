import type { Component } from 'solid-js';
import { Show, splitProps } from 'solid-js';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
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
  const [local, rest] = splitProps(props, [
    'messages',
    'onSendMessage',
    'onCancelStream',
    'isStreaming',
    'disabled',
    'placeholder',
    'userName',
    'userAvatarUrl',
    'assistantName',
    'assistantAvatarUrl',
    'showTypingIndicator',
    'header',
    'emptyState',
    'class',
    'codeBlockActions',
  ]);
  return (
    <div
      {...rest}
      class={`flex flex-col h-full bg-white/30 dark:bg-surface-900/30 backdrop-blur-sm rounded-2xl overflow-hidden ${local.class ?? ''}`}
    >
      {/* Optional header */}
      <Show when={local.header}>
        <div class="border-b border-surface-200 dark:border-surface-700">
          {local.header}
        </div>
      </Show>

      {/* Message list */}
      <ChatMessageList
        messages={local.messages}
        userName={local.userName}
        userAvatarUrl={local.userAvatarUrl}
        assistantName={local.assistantName}
        assistantAvatarUrl={local.assistantAvatarUrl}
        showTypingIndicator={local.showTypingIndicator}
        isStreaming={local.isStreaming}
        emptyState={local.emptyState}
        codeBlockActions={local.codeBlockActions}
      />

      {/* Input area */}
      <ChatInput
        onSendMessage={local.onSendMessage}
        onCancelStream={local.onCancelStream}
        isStreaming={local.isStreaming}
        disabled={local.disabled}
        placeholder={local.placeholder}
      />
    </div>
  );
};
