import type { JSX } from 'solid-js';

export interface PageHeaderProps {
  title: string;
  description: string | JSX.Element;
}

/**
 * Standard page header for demo pages.
 * Displays the component title and description.
 */
export function PageHeader(props: PageHeaderProps) {
  return (
    <div>
      <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">{props.title}</h1>
      <p class="text-surface-600 dark:text-surface-400">{props.description}</p>
    </div>
  );
}
