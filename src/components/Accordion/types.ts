import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Panel title */
  title: string | JSX.Element;
  /** Panel content */
  content: JSX.Element;
  /** Whether the panel is open by default */
  defaultOpen?: boolean;
}

export interface AccordionProps extends BaseComponentProps {
  /** Accordion items */
  items: AccordionItem[];
  /** Allow multiple items to be open at once */
  multiple?: boolean;
}

export interface AccordionPanelProps extends BaseComponentProps {
  /** Panel title */
  title: string | JSX.Element;
  /** Panel content */
  children: JSX.Element;
  /** Whether the panel is open by default */
  defaultOpen?: boolean;
}
