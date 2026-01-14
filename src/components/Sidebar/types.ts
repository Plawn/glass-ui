import type { JSX } from 'solid-js';
import type { BaseComponentProps } from '../../types';

/**
 * Sidebar navigation item
 */
export interface SidebarItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon element */
  icon?: JSX.Element;
  /** Optional href for navigation links */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Nested child items for groups */
  children?: SidebarItem[];
  /** Optional badge content (string or number) */
  badge?: string | number;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Sidebar component props
 */
export interface SidebarProps extends BaseComponentProps {
  /** Navigation items */
  items: SidebarItem[];
  /** Currently active item ID */
  activeId?: string;
  /** Whether the sidebar is collapsed (icon-only mode) */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Header content slot */
  header?: JSX.Element;
  /** Footer content slot */
  footer?: JSX.Element;
  /** Sidebar width when expanded */
  width?: string;
  /** Sidebar width when collapsed */
  collapsedWidth?: string;
  /** Callback when active item changes */
  onActiveChange?: (id: string) => void;
}

/**
 * Internal props for individual sidebar items
 */
export interface SidebarItemComponentProps {
  /** The item data */
  item: SidebarItem;
  /** Currently active item ID */
  activeId?: string;
  /** Whether the sidebar is collapsed */
  collapsed?: boolean;
  /** Nesting depth level */
  depth?: number;
  /** Callback when an item is clicked */
  onItemClick?: (item: SidebarItem) => void;
  /** IDs of expanded group items */
  expandedIds?: string[];
  /** Toggle expanded state of a group */
  onToggleExpand?: (id: string) => void;
}
