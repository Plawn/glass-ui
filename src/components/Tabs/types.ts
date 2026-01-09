import type { JSX } from 'solid-js';
import type { BaseComponentProps, IconProps } from '../../types';

export interface TabItem extends IconProps {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label */
  label: string;
  /** Tab content */
  content: JSX.Element;
  /** Optional badge count or text */
  badge?: number | string;
}

export interface TabsProps extends BaseComponentProps {
  /** Tab items */
  items: TabItem[];
  /** Default tab id when uncontrolled */
  defaultTab?: string;
  /** Active tab id for controlled mode */
  activeTab?: string;
  /** Callback when tab changes (for controlled mode) */
  onTabChange?: (tabId: string) => void;
}
