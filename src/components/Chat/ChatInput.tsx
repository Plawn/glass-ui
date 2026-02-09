import type { Component } from 'solid-js';
import { Show, createEffect, createSignal, onMount } from 'solid-js';
import { SendIcon, StopIcon } from './icons';
import type { ChatInputProps } from './types';

/**
 * Chat input with textarea and send/stop button
 */
export const ChatInput: Component<ChatInputProps> = (props) => {
  const [value, setValue] = createSignal('');
  let textareaRef: HTMLTextAreaElement | undefined;

  const placeholder = () => props.placeholder ?? 'Type a message...';
  const isDisabled = () => props.disabled ?? false;
  const canSend = () =>
    value().trim().length > 0 && !isDisabled() && !props.isStreaming;

  // Auto-resize textarea based on content
  const adjustHeight = () => {
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      const scrollHeight = textareaRef.scrollHeight;
      // Max height of ~6 lines
      const maxHeight = 150;
      const newHeight = Math.min(scrollHeight, maxHeight);
      textareaRef.style.height = `${newHeight}px`;
      textareaRef.style.overflowY =
        scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  };

  createEffect(() => {
    // Trigger resize when value changes
    value();
    adjustHeight();
  });

  onMount(() => {
    adjustHeight();
  });

  const handleSend = () => {
    const content = value().trim();
    if (content && !isDisabled() && !props.isStreaming) {
      props.onSendMessage(content);
      setValue('');
      // Reset textarea height
      if (textareaRef) {
        textareaRef.style.height = 'auto';
      }
    }
  };

  const handleCancel = () => {
    if (props.onCancelStream) {
      props.onCancelStream();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend()) {
        handleSend();
      }
    } else if (e.key === 'Escape' && props.isStreaming) {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setValue(target.value);
  };

  return (
    <div class="flex items-end gap-2 p-4 border-t border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
      {/* Textarea */}
      <div class="flex-1">
        <textarea
          ref={textareaRef}
          value={value()}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder()}
          disabled={isDisabled()}
          rows={1}
          class="flex w-full glass-input text-surface-800 dark:text-surface-200 resize-none overflow-hidden focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-4 min-h-10.5"
        />
      </div>

      {/* Send/Stop button */}
      <Show
        when={props.isStreaming}
        fallback={
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend()}
            class="shrink-0 w-10.5 h-10.5 flex items-center justify-center rounded-xl bg-accent-500 text-white hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-500 transition-colors"
            aria-label="Send message"
          >
            <SendIcon size={18} />
          </button>
        }
      >
        <button
          type="button"
          onClick={handleCancel}
          disabled={!props.onCancelStream}
          class="shrink-0 w-[42px] h-[42px] flex items-center justify-center rounded-xl bg-error-500 text-white hover:bg-error-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Stop generation"
        >
          <StopIcon size={18} />
        </button>
      </Show>
    </div>
  );
};
