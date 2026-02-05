import DOMPurify from 'dompurify';
import { Renderer, marked } from 'marked';
import {
  type Component,
  For,
  Show,
  createEffect,
  createMemo,
  onCleanup,
} from 'solid-js';
import { render } from 'solid-js/web';
import type { CodeBlockAction, MarkdownProps } from './types';

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer that wraps code blocks with a container for action injection
const createCustomRenderer = (hasActions: boolean) => {
  const renderer = new Renderer();

  if (hasActions) {
    renderer.code = ({ text, lang }) => {
      const escapedCode = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
      const langClass = lang ? `language-${lang}` : '';
      const langAttr = lang ? `data-language="${lang}"` : '';

      return `<div class="code-block-wrapper relative group" ${langAttr}>
        <div class="code-block-actions absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <pre><code class="${langClass}">${escapedCode}</code></pre>
      </div>`;
    };
  }

  return renderer;
};

// Configure DOMPurify to allow our custom wrapper elements and attributes
DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
  if (data.attrName === 'data-language') {
    data.forceKeepAttr = true;
  }
});

// Component for rendering action buttons
const CodeBlockActionButton: Component<{
  action: CodeBlockAction;
  code: string;
  language: string | undefined;
}> = (props) => {
  const handleClick = () => {
    props.action.onClick({
      code: props.code,
      language: props.language,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      class="p-1.5 rounded-md bg-surface-700/80 hover:bg-surface-600 text-surface-300 hover:text-surface-100 transition-colors"
      title={props.action.label}
      aria-label={props.action.label}
    >
      {props.action.icon}
    </button>
  );
};

export const Markdown: Component<MarkdownProps> = (props) => {
  let containerRef: HTMLDivElement | undefined;
  const disposeCallbacks: (() => void)[] = [];

  const hasActions = createMemo(
    () => props.codeBlockActions && props.codeBlockActions.length > 0,
  );

  const html = createMemo(() => {
    if (!props.content) {
      return '';
    }
    try {
      const renderer = createCustomRenderer(hasActions() ?? false);
      const rawHtml = marked.parse(props.content, {
        async: false,
        renderer,
      }) as string;
      return DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['data-language'],
      });
    } catch {
      return DOMPurify.sanitize(props.content);
    }
  });

  // Inject action buttons into code block wrappers
  createEffect(() => {
    const actions = props.codeBlockActions;
    if (!containerRef || !actions || actions.length === 0) {
      return;
    }

    // Clean up previous renders
    for (const dispose of disposeCallbacks) {
      dispose();
    }
    disposeCallbacks.length = 0;

    // Find all code block wrappers and inject action buttons
    const wrappers = containerRef.querySelectorAll('.code-block-wrapper');
    for (const wrapper of wrappers) {
      const actionsContainer = wrapper.querySelector('.code-block-actions');
      const codeElement = wrapper.querySelector('code');
      if (!actionsContainer || !codeElement) {
        continue;
      }

      const code = codeElement.textContent ?? '';
      const language = (wrapper as HTMLElement).dataset.language ?? undefined;

      // Render action buttons into the container
      const dispose = render(
        () => (
          <For each={actions}>
            {(action) => (
              <CodeBlockActionButton
                action={action}
                code={code}
                language={language}
              />
            )}
          </For>
        ),
        actionsContainer,
      );
      disposeCallbacks.push(dispose);
    }
  });

  onCleanup(() => {
    for (const dispose of disposeCallbacks) {
      dispose();
    }
  });

  return (
    <Show when={props.content}>
      {/* innerHTML is the correct SolidJS pattern for sanitized HTML - content is sanitized via DOMPurify above */}
      <div
        ref={containerRef}
        class={`markdown-content prose prose-sm max-w-none
          prose-headings:text-surface-900 dark:prose-headings:text-surface-100
          prose-headings:font-semibold prose-headings:leading-tight
          prose-h1:text-xl prose-h1:mt-6 prose-h1:mb-3
          prose-h2:text-lg prose-h2:mt-5 prose-h2:mb-2
          prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-surface-600 dark:prose-p:text-surface-400
          prose-p:leading-relaxed prose-p:my-2
          prose-a:text-accent-600 dark:prose-a:text-accent-400
          prose-a:no-underline hover:prose-a:underline
          prose-strong:text-surface-800 dark:prose-strong:text-surface-200
          prose-strong:font-semibold
          prose-code:text-sm prose-code:font-mono
          prose-code:bg-surface-100 dark:prose-code:bg-surface-800
          prose-code:text-surface-800 dark:prose-code:text-surface-200
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-surface-900 dark:prose-pre:bg-surface-950
          prose-pre:text-surface-100 prose-pre:rounded-xl
          prose-pre:p-4 prose-pre:my-3 prose-pre:overflow-x-auto
          prose-ul:my-2 prose-ul:pl-5 prose-ul:list-disc
          prose-ol:my-2 prose-ol:pl-5 prose-ol:list-decimal
          prose-li:text-surface-600 dark:prose-li:text-surface-400
          prose-li:my-0.5
          prose-blockquote:border-l-4 prose-blockquote:border-surface-300
          dark:prose-blockquote:border-surface-600
          prose-blockquote:pl-4 prose-blockquote:my-3
          prose-blockquote:text-surface-600 dark:prose-blockquote:text-surface-400
          prose-blockquote:italic
          prose-hr:border-surface-200 dark:prose-hr:border-surface-700
          prose-hr:my-4
          prose-table:my-3
          prose-th:text-left prose-th:text-surface-800 dark:prose-th:text-surface-200
          prose-th:font-semibold prose-th:p-2
          prose-th:border-b prose-th:border-surface-200 dark:prose-th:border-surface-700
          prose-td:p-2 prose-td:text-surface-600 dark:prose-td:text-surface-400
          prose-td:border-b prose-td:border-surface-100 dark:prose-td:border-surface-800
          ${props.class ?? ''}`}
        innerHTML={html()}
      />
    </Show>
  );
};
