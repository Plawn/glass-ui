import type { JSX } from 'solid-js';

export interface CodePillProps {
  children: JSX.Element;
}

/**
 * Inline code pill for highlighting code references in text.
 *
 * Usage:
 * ```tsx
 * <p>
 *   Add <CodePill>ToastContainer</CodePill> once at the root of your app.
 * </p>
 * ```
 */
export function CodePill(props: CodePillProps) {
  return (
    <code class="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm">
      {props.children}
    </code>
  );
}
