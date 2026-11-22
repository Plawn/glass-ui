import type { JSX } from '@solidjs/web';

export interface SectionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The section title */
  title: string;
  /** The section content */
  children: JSX.Element;
}
