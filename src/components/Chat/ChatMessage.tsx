import type { Component } from 'solid-js';
import { Show, createMemo } from 'solid-js';
import { Avatar } from '../Avatar';
import { Markdown } from '../Markdown';
import { ChatThinking } from './ChatThinking';
import type { ChatMessageProps } from './types';

/**
 * A single chat message bubble with avatar and content
 */
export const ChatMessage: Component<ChatMessageProps> = (props) => {
  const isUser = createMemo(() => props.message.role === 'user');
  const isAssistant = createMemo(() => props.message.role === 'assistant');
  const isSystem = createMemo(() => props.message.role === 'system');

  const displayName = createMemo(() => {
    if (isUser()) return props.userName ?? 'User';
    if (isAssistant()) return props.assistantName ?? 'Assistant';
    return 'System';
  });

  const avatarUrl = createMemo(() => {
    if (isUser()) return props.userAvatarUrl;
    if (isAssistant()) return props.assistantAvatarUrl;
    return undefined;
  });

  const hasThinking = createMemo(
    () =>
      isAssistant() &&
      props.message.thinking &&
      props.message.thinking.length > 0,
  );

  const isError = createMemo(() => props.message.status === 'error');
  const isStreaming = createMemo(() => props.message.status === 'streaming');

  const bubbleStyleClass = createMemo(() => {
    if (isUser()) return 'bg-accent-500 text-white rounded-br-md';
    if (isSystem())
      return 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-center text-sm italic';
    return 'glass-card rounded-bl-md';
  });

  return (
    <div
      class={`flex gap-3 ${isUser() ? 'flex-row-reverse' : ''} ${isSystem() ? 'justify-center' : ''}`}
    >
      {/* Avatar */}
      <Show when={!isSystem()}>
        <div class="shrink-0 pt-1">
          <Avatar name={displayName()} src={avatarUrl()} size="sm" />
        </div>
      </Show>

      {/* Message bubble */}
      <div class={`max-w-[80%] ${isSystem() ? 'max-w-[90%]' : ''}`}>
        {/* Message content */}
        <div
          class={`rounded-2xl px-4 py-2.5 ${bubbleStyleClass()} ${isError() ? 'border border-red-500/50' : ''} ${
            isStreaming() ? 'animate-pulse' : ''
          }`}
        >
          <Show
            when={isUser()}
            fallback={
              <div class="text-surface-800 dark:text-surface-200">
                <Markdown content={props.message.content} />
              </div>
            }
          >
            <p class="whitespace-pre-wrap">{props.message.content}</p>
          </Show>

          {/* Error message */}
          <Show when={isError() && props.message.error}>
            <p class="mt-2 text-sm text-red-500 dark:text-red-400">
              {props.message.error}
            </p>
          </Show>
        </div>

        {/* Thinking section (for assistant messages) */}
        <Show when={hasThinking()}>
          <ChatThinking steps={props.message.thinking!} />
        </Show>

        {/* Timestamp */}
        <p
          class={`mt-1 text-xs text-surface-400 dark:text-surface-500 ${
            isUser() ? 'text-right' : ''
          }`}
        >
          {props.message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
