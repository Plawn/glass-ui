import type { JSX } from 'solid-js';

export interface SectionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The section title */
  title: string;
  /** The section content */
  children: JSX.Element;
}
