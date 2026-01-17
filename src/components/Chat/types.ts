import type { JSX } from 'solid-js';

// =============================================================================
// MESSAGE TYPES
// =============================================================================

/**
 * Role of a message in the chat
 */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * Status of a message
 */
export type MessageStatus = 'pending' | 'streaming' | 'complete' | 'error';

/**
 * A thinking step for assistant reasoning
 */
export interface ThinkingStep {
  id: string;
  content: string;
  title?: string;
}

/**
 * A message in the chat
 */
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  thinking?: ThinkingStep[];
  error?: string;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Props for the main Chat component
 */
export interface ChatProps {
  /** Array of messages to display */
  messages: ChatMessage[];
  /** Callback when user sends a message */
  onSendMessage: (content: string) => void;
  /** Callback to cancel streaming */
  onCancelStream?: () => void;
  /** Whether the assistant is currently streaming a response */
  isStreaming?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text for the input */
  placeholder?: string;
  /** User display name for avatar fallback */
  userName?: string;
  /** User avatar URL */
  userAvatarUrl?: string;
  /** Assistant display name for avatar fallback */
  assistantName?: string;
  /** Assistant avatar URL */
  assistantAvatarUrl?: string;
  /** Show typing indicator when streaming */
  showTypingIndicator?: boolean;
  /** Optional header element */
  header?: JSX.Element;
  /** Optional empty state element */
  emptyState?: JSX.Element;
  /** Additional CSS class */
  class?: string;
}

/**
 * Props for the ChatMessageList component
 */
export interface ChatMessageListProps {
  messages: ChatMessage[];
  userName?: string;
  userAvatarUrl?: string;
  assistantName?: string;
  assistantAvatarUrl?: string;
  showTypingIndicator?: boolean;
  isStreaming?: boolean;
  emptyState?: JSX.Element;
}

/**
 * Props for the ChatMessage component
 */
export interface ChatMessageProps {
  message: ChatMessage;
  userName?: string;
  userAvatarUrl?: string;
  assistantName?: string;
  assistantAvatarUrl?: string;
}

/**
 * Props for the ChatThinking component
 */
export interface ChatThinkingProps {
  steps: ThinkingStep[];
  defaultOpen?: boolean;
}

/**
 * Props for the ChatInput component
 */
export interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onCancelStream?: () => void;
  isStreaming?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Props for the ChatTypingIndicator component
 */
export interface ChatTypingIndicatorProps {
  class?: string;
}
