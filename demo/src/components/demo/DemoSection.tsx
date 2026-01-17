import type { JSX } from 'solid-js';
import { Show, children } from 'solid-js';
import { Card, CodeBlock } from 'glass-ui-solid';

export interface DemoSectionProps {
  /** Section title (h2) */
  title: string;
  /** Optional description shown below the title */
  description?: string | JSX.Element;
  /** Demo content to display */
  children?: JSX.Element;
  /** Code example to show */
  code?: string;
  /** Code language for syntax highlighting */
  language?: string;
  /** Wrap children in a Card (default: true if children provided) */
  card?: boolean;
  /** Card padding class (default: "p-6") */
  cardClass?: string;
  /** Use h3 instead of h2 for subsection */
  subsection?: boolean;
}

/**
 * Standard demo section with title, optional description, demo area, and code block.
 *
 * Usage examples:
 *
 * ```tsx
 * // Import section (code only)
 * <DemoSection title="Import" code="import { Button } from 'glass-ui-solid';" language="tsx" />
 *
 * // Demo with card and code
 * <DemoSection title="Basic Usage" code={codeExample} language="tsx">
 *   <Button>Click me</Button>
 * </DemoSection>
 *
 * // Demo with description
 * <DemoSection
 *   title="Custom Duration"
 *   description="Control how long the toast is displayed."
 *   code={codeExample}
 *   language="tsx"
 * >
 *   <Button>Show Toast</Button>
 * </DemoSection>
 *
 * // No card wrapper
 * <DemoSection title="Examples" card={false}>
 *   <div>Custom content without card</div>
 * </DemoSection>
 * ```
 */
export function DemoSection(props: DemoSectionProps) {
  // Resolve children once to avoid recreating components on each access
  const resolved = children(() => props.children);

  const showCard = () => props.card ?? (resolved() !== undefined);
  const cardClass = () => props.cardClass ?? 'p-6';
  const language = () => props.language ?? 'tsx';

  return (
    <section>
      <Show
        when={!props.subsection}
        fallback={
          <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">
            {props.title}
          </h3>
        }
      >
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">{props.title}</h2>
      </Show>

      <Show when={props.description}>
        <p class="text-surface-600 dark:text-surface-400 mb-4">{props.description}</p>
      </Show>

      <Show when={resolved()}>
        <Show when={showCard()} fallback={resolved()}>
          <Card class={cardClass()}>{resolved()}</Card>
        </Show>
      </Show>

      <Show when={props.code}>
        <div class={resolved() ? 'mt-4' : ''}>
          <CodeBlock code={props.code!} language={language()} />
        </div>
      </Show>
    </section>
  );
}
