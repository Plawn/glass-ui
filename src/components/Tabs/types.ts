import type { JSX } from 'solid-js';
import type { BaseComponentProps, ComponentSize, IconProps } from '../../types';

// =============================================================================
// TAB ORIENTATION
// =============================================================================

export type TabOrientation = 'horizontal' | 'vertical';

// =============================================================================
// TAB ITEM
// =============================================================================

export interface TabItem extends IconProps {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label */
  label: string;
  /** Tab content */
  content: JSX.Element;
  /** Optional badge count or text */
  badge?: number | string;
  /** Whether this tab is disabled */
  disabled?: boolean;
}

// =============================================================================
// TABS PROPS
// =============================================================================

export interface TabsProps extends BaseComponentProps {
  /** Tab items */
  items: TabItem[];
  /** Default tab id when uncontrolled */
  defaultTab?: string;
  /** Active tab id for controlled mode */
  activeTab?: string;
  /** Callback when tab changes (for controlled mode) */
  onTabChange?: (tabId: string) => void;

  // --- Visual customization ---
  /** Size variant */
  size?: ComponentSize;
  /** Whether tabs should take full width (equal distribution) */
  fullWidth?: boolean;
  /** Tab orientation */
  orientation?: TabOrientation;

  // --- Behavior ---
  /** Whether to lazy-load tab content (only render when active) */
  lazy?: boolean;
  /** Whether to keep inactive tab content mounted (preserve state) */
  keepMounted?: boolean;

  // --- Styling ---
  /** Custom class for the tab list container */
  tabListClass?: string;
  /** Custom class for the content panel */
  contentClass?: string;
}

// =============================================================================
// RE-EXPORTS
// =============================================================================

export type { ComponentSize as TabSize } from '../../types';
