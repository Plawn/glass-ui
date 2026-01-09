import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

export interface SectionProps extends BaseComponentProps {
  /** The section title */
  title: string;
  /** The section content */
  children: JSX.Element;
}
