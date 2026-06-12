import type { JSX } from 'solid-js';
import type { CodeBlockAction } from '../Markdown/types';

// Re-export code block action types for convenience
export type {
  CodeBlockAction,
  CodeBlockActionContext,
} from '../Markdown/types';

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
  /** Unique identifier for the thinking step */
  id: string;
  /** Reasoning text content */
  content: string;
  /** Optional display title for the step */
  title?: string;
}

/**
 * Status of a tool call
 */
export type ToolCallStatus = 'pending' | 'running' | 'complete' | 'error';

/**
 * A tool call made by the assistant
 */
export interface ToolCall {
  /** Unique identifier for the tool call */
  id: string;
  /** Name of the tool being called */
  name: string;
  /** Arguments passed to the tool */
  arguments?: Record<string, unknown>;
  /** Result returned by the tool */
  result?: unknown;
  /** Current execution status */
  status: ToolCallStatus;
  /** Error message if the tool call failed */
  error?: string;
  /** Execution duration in milliseconds */
  duration?: number;
}

/**
 * A message in the chat
 */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  /** Role of the message author */
  role: MessageRole;
  /** Text content of the message */
  content: string;
  /** When the message was created */
  timestamp?: Date;
  /** Current delivery or streaming status */
  status?: MessageStatus;
  /** Reasoning steps shown in the thinking panel */
  thinking?: ThinkingStep[];
  /** Tool calls made during this message */
  toolCalls?: ToolCall[];
  /** Error message if the message failed */
  error?: string;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Props for the main Chat component
 */
export interface ChatProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
  /** Custom actions to display on code blocks */
  codeBlockActions?: CodeBlockAction[];
}

/**
 * Props for the ChatMessageList component
 */
export interface ChatMessageListProps {
  /** Array of messages to render */
  messages: ChatMessage[];
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
  /** Whether the assistant is currently streaming */
  isStreaming?: boolean;
  /** Element to render when the message list is empty */
  emptyState?: JSX.Element;
  /** Custom actions to display on code blocks */
  codeBlockActions?: CodeBlockAction[];
}

/**
 * Props for the ChatMessage component
 */
export interface ChatMessageProps {
  /** The message data to render */
  message: ChatMessage;
  /** User display name for avatar fallback */
  userName?: string;
  /** User avatar URL */
  userAvatarUrl?: string;
  /** Assistant display name for avatar fallback */
  assistantName?: string;
  /** Assistant avatar URL */
  assistantAvatarUrl?: string;
  /** Custom actions to display on code blocks */
  codeBlockActions?: CodeBlockAction[];
}

/**
 * Props for the ChatThinking component
 */
export interface ChatThinkingProps {
  /** Thinking steps to display */
  steps: ThinkingStep[];
  /** Whether the panel is expanded by default */
  defaultOpen?: boolean;
}

/**
 * Props for the ChatToolCall component
 */
export interface ChatToolCallProps {
  /** Tool calls to display */
  toolCalls: ToolCall[];
  /** Whether the panel is expanded by default */
  defaultOpen?: boolean;
}

/**
 * Props for the ChatInput component
 */
export interface ChatInputProps {
  /** Callback when the user submits a message */
  onSendMessage: (content: string) => void;
  /** Callback to cancel an in-progress stream */
  onCancelStream?: () => void;
  /** Whether the assistant is currently streaming */
  isStreaming?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text for the textarea */
  placeholder?: string;
}

/**
 * Props for the ChatTypingIndicator component
 */
export interface ChatTypingIndicatorProps {
  /** Additional CSS class */
  class?: string;
}
