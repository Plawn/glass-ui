import type { Component } from 'solid-js';
import type { ChatTypingIndicatorProps } from './types';

/**
 * Animated typing indicator with three bouncing dots
 */
export const ChatTypingIndicator: Component<ChatTypingIndicatorProps> = (
  props,
) => {
  return (
    <div class={`flex items-center gap-1 ${props.class ?? ''}`}>
      <span
        class="w-2 h-2 bg-surface-400 dark:bg-surface-500 rounded-full animate-bounce"
        style={{ 'animation-delay': '0ms' }}
      />
      <span
        class="w-2 h-2 bg-surface-400 dark:bg-surface-500 rounded-full animate-bounce"
        style={{ 'animation-delay': '150ms' }}
      />
      <span
        class="w-2 h-2 bg-surface-400 dark:bg-surface-500 rounded-full animate-bounce"
        style={{ 'animation-delay': '300ms' }}
      />
    </div>
  );
};
