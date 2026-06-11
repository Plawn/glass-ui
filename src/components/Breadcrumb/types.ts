import type { JSX } from 'solid-js';
import type { IconProps } from '../../types';

export interface BreadcrumbItem extends IconProps {
  /** Display label for the breadcrumb item */
  label: string;
  /** Optional href for link-based navigation */
  href?: string;
  /** Optional click handler for programmatic navigation */
  onClick?: () => void;
}

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {
  /** Breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Custom separator element (default: /) */
  separator?: JSX.Element;
}
