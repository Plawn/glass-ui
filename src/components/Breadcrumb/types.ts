import type { JSX } from 'solid-js';
import type { BaseComponentProps, IconProps } from '../../types';

export interface BreadcrumbItem extends IconProps {
  /** Display label for the breadcrumb item */
  label: string;
  /** Optional href for link-based navigation */
  href?: string;
  /** Optional click handler for programmatic navigation */
  onClick?: () => void;
}

export interface BreadcrumbProps extends BaseComponentProps {
  /** Breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Custom separator element (default: /) */
  separator?: JSX.Element;
}
