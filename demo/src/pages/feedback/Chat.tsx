import {
  Chat,
  type ChatMessageType,
  type CodeBlockAction,
} from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

// Copy icon for code block actions
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

// Play icon for code block actions
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

// Helper to generate unique IDs
const generateId = () => crypto.randomUUID();

// Sample thinking steps for demo
const sampleThinking = [
  {
    id: '1',
    title: 'Analyzing the question',
    content:
      'The user is asking about how to use the Chat component. I should explain the basic setup and props.',
  },
  {
    id: '2',
    title: 'Formulating response',
    content:
      'I will provide a clear example with:\n- Basic usage\n- Message structure\n- Event handling',
  },
];

// Initial messages for demo
const initialMessages: ChatMessageType[] = [
  {
    id: generateId(),
    role: 'assistant',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000),
    status: 'complete',
  },
  {
    id: generateId(),
    role: 'user',
    content: 'Can you help me understand how to use this chat component?',
    timestamp: new Date(Date.now() - 30000),
    status: 'complete',
  },
  {
    id: generateId(),
    role: 'assistant',
    content:
      "Of course! The Chat component provides a complete chat interface with:\n\n- **Virtualized message list** for performance with many messages\n- **Auto-scroll** to newest messages\n- **Markdown support** for rich text formatting\n- **Thinking sections** to show AI reasoning\n- **Streaming indicators** for real-time responses\n\nHere's a quick example:\n\n```typescript\nconst handleSendMessage = (content: string) => {\n  setMessages(prev => [...prev, {\n    id: crypto.randomUUID(),\n    role: 'user',\n    content,\n    timestamp: new Date()\n  }]);\n};\n```\n\nWould you like to see an example of the thinking feature?",
    timestamp: new Date(),
    status: 'complete',
    thinking: sampleThinking,
  },
];

export default function ChatPage() {
  const [messages, setMessages] =
    createSignal<ChatMessageType[]>(initialMessages);
  const [isStreaming, setIsStreaming] = createSignal(false);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'complete',
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate streaming response
    setIsStreaming(true);
    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: generateId(),
        role: 'assistant',
        content: `Thanks for your message! You said: "${content}"\n\nThis is a simulated response. In a real application, you would connect this to your AI backend.`,
        timestamp: new Date(),
        status: 'complete',
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsStreaming(false);
    }, 1500);
  };

  const handleCancelStream = () => {
    setIsStreaming(false);
  };

  // Custom code block actions
  const codeBlockActions: CodeBlockAction[] = [
    {
      id: 'copy',
      label: 'Copy code',
      icon: <CopyIcon />,
      onClick: ({ code }) => {
        navigator.clipboard.writeText(code);
      },
    },
    {
      id: 'run',
      label: 'Run code',
      icon: <PlayIcon />,
      onClick: ({ code, language }) => {
        alert(`Running ${language ?? 'code'}:\n\n${code.slice(0, 100)}...`);
      },
    },
  ];

  return (
    <div class="space-y-8">
      <PageHeader
        title="Chat"
        description="A complete chat interface with virtualized message list, markdown support, thinking sections, and streaming indicators."
      />

      <DemoSection
        title="Import"
        code={`import { Chat, type ChatMessageType } from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Interactive Demo"
        description="Try sending messages to see the component in action. The assistant will respond with a simulated message."
        card={false}
      >
        <div class="h-[500px] border border-surface-200 dark:border-surface-700 rounded-2xl overflow-hidden">
          <Chat
            messages={messages()}
            onSendMessage={handleSendMessage}
            onCancelStream={handleCancelStream}
            isStreaming={isStreaming()}
            showTypingIndicator
            userName="You"
            assistantName="Claude"
            placeholder="Type a message..."
            codeBlockActions={codeBlockActions}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Basic Usage"
        code={`const [messages, setMessages] = createSignal<ChatMessageType[]>([]);
const [isStreaming, setIsStreaming] = createSignal(false);

const handleSendMessage = (content: string) => {
  // Add user message
  setMessages(prev => [...prev, {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    timestamp: new Date(),
    status: 'complete'
  }]);

  // Start streaming response from your AI backend
  setIsStreaming(true);
  // ... fetch from API
};

<Chat
  messages={messages()}
  onSendMessage={handleSendMessage}
  isStreaming={isStreaming()}
  showTypingIndicator
/>`}
      />

      <DemoSection
        title="Message Structure"
        description="Messages have a specific structure with role, content, status, and optional thinking steps."
        code={`interface ChatMessageType {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;  // Supports markdown
  timestamp: Date;
  status?: 'pending' | 'streaming' | 'complete' | 'error';
  thinking?: ThinkingStep[];  // For assistant messages
  error?: string;
}

interface ThinkingStep {
  id: string;
  content: string;  // Supports markdown
  title?: string;
}`}
      />

      <DemoSection
        title="With Header"
        description="Add a custom header to the chat interface."
        code={`<Chat
  messages={messages()}
  onSendMessage={handleSendMessage}
  header={
    <div class="p-4 flex items-center gap-3">
      <Avatar name="Claude" size="sm" />
      <div>
        <h3 class="font-semibold">Claude</h3>
        <p class="text-xs text-surface-500">Online</p>
      </div>
    </div>
  }
/>`}
      />

      <DemoSection
        title="Custom Empty State"
        description="Show a custom message when there are no messages."
        code={`<Chat
  messages={[]}
  onSendMessage={handleSendMessage}
  emptyState={
    <div class="text-center">
      <p class="text-lg font-semibold mb-2">Welcome!</p>
      <p class="text-surface-500">Start a conversation by sending a message.</p>
    </div>
  }
/>`}
      />

      <DemoSection
        title="Code Block Actions"
        description="Add custom action buttons to code blocks in messages. Actions appear on hover."
        code={`import { Chat, type CodeBlockAction } from 'glass-ui-solid';

const codeBlockActions: CodeBlockAction[] = [
  {
    id: 'copy',
    label: 'Copy code',
    icon: <CopyIcon />,
    onClick: ({ code }) => {
      navigator.clipboard.writeText(code);
    },
  },
  {
    id: 'run',
    label: 'Run code',
    icon: <PlayIcon />,
    onClick: ({ code, language }) => {
      console.log(\`Running \${language} code:\`, code);
    },
  },
];

<Chat
  messages={messages()}
  onSendMessage={handleSendMessage}
  codeBlockActions={codeBlockActions}
/>`}
      />

      <DemoSection
        title="Keyboard Shortcuts"
        description="The chat input supports keyboard shortcuts for common actions."
        code={`// Keyboard shortcuts:
// Enter         → Send message
// Shift+Enter   → New line
// Escape        → Cancel streaming (if in progress)`}
      />

      <DemoSection title="API Reference">
        <DemoSection title="ChatProps" subsection>
          <PropsTable
            props={[
              {
                name: 'messages',
                type: 'ChatMessageType[]',
                required: true,
                description: 'Array of messages to display',
              },
              {
                name: 'onSendMessage',
                type: '(content: string) => void',
                required: true,
                description: 'Callback when user sends a message',
              },
              {
                name: 'onCancelStream',
                type: '() => void',
                description: 'Callback to cancel streaming',
              },
              {
                name: 'isStreaming',
                type: 'boolean',
                default: 'false',
                description: 'Whether the assistant is currently streaming',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Disable the input',
              },
              {
                name: 'placeholder',
                type: 'string',
                default: '"Type a message..."',
                description: 'Input placeholder text',
              },
              {
                name: 'userName',
                type: 'string',
                default: '"User"',
                description: 'User display name for avatar',
              },
              {
                name: 'userAvatarUrl',
                type: 'string',
                description: 'User avatar URL',
              },
              {
                name: 'assistantName',
                type: 'string',
                default: '"Assistant"',
                description: 'Assistant display name for avatar',
              },
              {
                name: 'assistantAvatarUrl',
                type: 'string',
                description: 'Assistant avatar URL',
              },
              {
                name: 'showTypingIndicator',
                type: 'boolean',
                default: 'false',
                description: 'Show typing indicator when streaming',
              },
              {
                name: 'header',
                type: 'JSX.Element',
                description: 'Optional header element',
              },
              {
                name: 'emptyState',
                type: 'JSX.Element',
                description: 'Custom empty state element',
              },
              {
                name: 'codeBlockActions',
                type: 'CodeBlockAction[]',
                description:
                  'Custom actions to display on code blocks in messages',
              },
              {
                name: 'class',
                type: 'string',
                description: 'Additional CSS classes',
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="ChatMessageType" subsection>
          <PropsTable
            props={[
              {
                name: 'id',
                type: 'string',
                required: true,
                description: 'Unique message identifier',
              },
              {
                name: 'role',
                type: "'user' | 'assistant' | 'system'",
                required: true,
                description: 'Message role',
              },
              {
                name: 'content',
                type: 'string',
                required: true,
                description: 'Message content (markdown supported)',
              },
              {
                name: 'timestamp',
                type: 'Date',
                required: true,
                description: 'Message timestamp',
              },
              {
                name: 'status',
                type: "'pending' | 'streaming' | 'complete' | 'error'",
                default: "'complete'",
                description: 'Message status',
              },
              {
                name: 'thinking',
                type: 'ThinkingStep[]',
                description: 'Thinking steps (assistant only)',
              },
              {
                name: 'error',
                type: 'string',
                description: 'Error message if status is error',
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="ThinkingStep" subsection>
          <PropsTable
            props={[
              {
                name: 'id',
                type: 'string',
                required: true,
                description: 'Unique step identifier',
              },
              {
                name: 'content',
                type: 'string',
                required: true,
                description: 'Step content (markdown supported)',
              },
              {
                name: 'title',
                type: 'string',
                description: 'Optional step title',
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="CodeBlockAction" subsection>
          <PropsTable
            props={[
              {
                name: 'id',
                type: 'string',
                required: true,
                description: 'Unique action identifier',
              },
              {
                name: 'label',
                type: 'string',
                required: true,
                description: 'Button label for accessibility',
              },
              {
                name: 'icon',
                type: 'JSX.Element',
                required: true,
                description: 'Icon to display in the button',
              },
              {
                name: 'onClick',
                type: '(context: CodeBlockActionContext) => void | Promise<void>',
                required: true,
                description: 'Callback when the action is triggered',
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="CodeBlockActionContext" subsection>
          <PropsTable
            props={[
              {
                name: 'code',
                type: 'string',
                required: true,
                description: 'The code content of the block',
              },
              {
                name: 'language',
                type: 'string | undefined',
                description:
                  'The language identifier (e.g., "typescript", "python")',
              },
            ]}
          />
        </DemoSection>
      </DemoSection>
    </div>
  );
}
