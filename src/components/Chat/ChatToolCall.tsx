import type { Component } from 'solid-js';
import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createSignal,
} from 'solid-js';
import { Badge } from '../Badge';
import { JsonViewer } from '../JsonViewer';
import { Spinner } from '../Spinner';
import { CheckCircleIcon, ErrorIcon } from '../shared/icons';
import { ChevronDownIcon, ToolCallIcon } from './icons';
import type { ChatToolCallProps, ToolCall } from './types';

/**
 * Status icon for a tool call
 */
const ToolCallStatusIcon: Component<{ status: ToolCall['status'] }> = (
  props,
) => {
  return (
    <Switch
      fallback={
        <ToolCallIcon
          size={14}
          class="text-surface-400 dark:text-surface-500"
        />
      }
    >
      <Match when={props.status === 'running'}>
        <Spinner size="sm" />
      </Match>
      <Match when={props.status === 'complete'}>
        <CheckCircleIcon
          size={14}
          class="text-success-500 dark:text-success-400"
        />
      </Match>
      <Match when={props.status === 'error'}>
        <ErrorIcon size={14} class="text-error-500 dark:text-error-400" />
      </Match>
    </Switch>
  );
};

/**
 * Badge variant for a tool call status
 */
const statusBadgeVariant = (
  status: ToolCall['status'],
): 'default' | 'success' | 'error' | 'warning' => {
  switch (status) {
    case 'complete':
      return 'success';
    case 'error':
      return 'error';
    case 'running':
      return 'warning';
    default:
      return 'default';
  }
};

/**
 * Badge label for a tool call status
 */
const statusLabel = (tool: ToolCall): string => {
  if (tool.status === 'complete' && tool.duration != null) {
    return `${(tool.duration / 1000).toFixed(1)}s`;
  }
  if (tool.status === 'error') {
    return 'error';
  }
  if (tool.status === 'running') {
    return 'running';
  }
  return 'pending';
};

/**
 * A single expandable tool call item
 */
const ToolCallItem: Component<{ tool: ToolCall }> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const contentStyle = createMemo(() => ({
    'grid-template-rows': isOpen() ? '1fr' : '0fr',
  }));

  const isStringResult = createMemo(
    () => typeof props.tool.result === 'string',
  );

  return (
    <div class="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
      {/* Item header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        class="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors cursor-pointer"
        aria-expanded={isOpen()}
      >
        <ToolCallStatusIcon status={props.tool.status} />
        <span class="font-mono text-xs text-surface-700 dark:text-surface-300">
          {props.tool.name}
        </span>
        <Badge variant={statusBadgeVariant(props.tool.status)} size="sm">
          {statusLabel(props.tool)}
        </Badge>
        <ChevronDownIcon
          size={12}
          class={`ml-auto transition-transform duration-200 text-surface-400 ${isOpen() ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable details */}
      <div class="grid transition-grid-rows" style={contentStyle()}>
        <div class="overflow-hidden">
          <div class="px-3 pb-3 space-y-3">
            {/* Arguments */}
            <Show
              when={
                props.tool.arguments &&
                Object.keys(props.tool.arguments).length > 0
              }
            >
              <div>
                <p class="text-xs font-medium text-surface-500 dark:text-surface-400 mb-1">
                  Arguments
                </p>
                <JsonViewer
                  data={props.tool.arguments as Record<string, unknown>}
                  maxHeight="12rem"
                  initialExpandDepth={1}
                />
              </div>
            </Show>

            {/* Result */}
            <Show when={props.tool.result != null}>
              <div>
                <p class="text-xs font-medium text-surface-500 dark:text-surface-400 mb-1">
                  Result
                </p>
                <Show
                  when={!isStringResult()}
                  fallback={
                    <pre class="text-xs font-mono bg-surface-50 dark:bg-surface-800 rounded-md p-2 max-h-48 overflow-auto whitespace-pre-wrap text-surface-700 dark:text-surface-300">
                      {String(props.tool.result)}
                    </pre>
                  }
                >
                  <JsonViewer
                    data={props.tool.result as Record<string, unknown>}
                    maxHeight="12rem"
                    initialExpandDepth={1}
                  />
                </Show>
              </div>
            </Show>

            {/* Error */}
            <Show when={props.tool.error}>
              <div>
                <p class="text-xs font-medium text-error-500 dark:text-error-400 mb-1">
                  Error
                </p>
                <pre class="text-xs font-mono bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 rounded-md p-2 whitespace-pre-wrap">
                  {props.tool.error}
                </pre>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Collapsible tool call section for assistant messages
 */
export const ChatToolCall: Component<ChatToolCallProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? false);

  const totalCalls = createMemo(() => props.toolCalls.length);

  // Auto-open when any tool call is running
  createEffect(() => {
    if (props.toolCalls.some((tc) => tc.status === 'running')) {
      setIsOpen(true);
    }
  });

  const handleToggle = () => {
    setIsOpen(!isOpen());
  };

  const contentStyle = createMemo(() => ({
    'grid-template-rows': isOpen() ? '1fr' : '0fr',
  }));

  const hasRunning = createMemo(() =>
    props.toolCalls.some((tc) => tc.status === 'running'),
  );

  const summaryIcon = createMemo(() => {
    if (hasRunning()) {
      return 'running';
    }
    if (props.toolCalls.some((tc) => tc.status === 'error')) {
      return 'error';
    }
    return 'done';
  });

  return (
    <div class="mt-2">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        class="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300 transition-colors cursor-pointer"
        aria-expanded={isOpen()}
      >
        <Switch
          fallback={
            <ToolCallIcon
              size={14}
              class="text-surface-400 dark:text-surface-500"
            />
          }
        >
          <Match when={summaryIcon() === 'running'}>
            <Spinner size="sm" />
          </Match>
          <Match when={summaryIcon() === 'error'}>
            <ErrorIcon size={14} class="text-error-500 dark:text-error-400" />
          </Match>
        </Switch>
        <span>
          {totalCalls()} tool {totalCalls() === 1 ? 'call' : 'calls'}
        </span>
        <ChevronDownIcon
          size={14}
          class={`transition-transform duration-200 ${isOpen() ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content with CSS grid animation */}
      <div class="grid transition-grid-rows" style={contentStyle()}>
        <div class="overflow-hidden">
          <div class="mt-2 space-y-2">
            <For each={props.toolCalls}>
              {(tool) => <ToolCallItem tool={tool} />}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};
