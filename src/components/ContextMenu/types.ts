import type { Accessor, JSX } from 'solid-js';
import type { OverlayScrollBehavior } from '../../hooks';
import type { BaseComponentProps } from '../../types';

// =============================================================================
// HOOK RETURN TYPE
// =============================================================================

/**
 * Return type of createContextMenu hook
 */
export interface CreateContextMenuReturn<T> {
  /** Props to spread on ContextMenu component */
  props: ContextMenuProps<T>;
  /** Data of the currently targeted item (null when closed) */
  data: Accessor<T | null>;
  /** Menu position */
  position: Accessor<{ x: number; y: number }>;
  /** Open/closed state */
  isOpen: Accessor<boolean>;
  /** Close the menu programmatically */
  close: () => void;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * Props for the ContextMenu wrapper component
 */
export interface ContextMenuProps<T = unknown> extends BaseComponentProps {
  children: JSX.Element;
  /** Callback when menu opens/closes */
  onOpenChange?: (open: boolean, data: T | null) => void;
  /** Internal state (provided by createContextMenu) */
  __internal?: ContextMenuInternalState<T>;
}

/**
 * Props for ContextMenuTrigger component
 */
export interface ContextMenuTriggerProps<T = unknown>
  extends BaseComponentProps {
  children: JSX.Element;
  /** Data associated with this trigger (passed to menu) */
  data?: T;
  /** Disable context menu on this trigger */
  disabled?: boolean;
}

/**
 * Props for ContextMenuContent component
 */
export interface ContextMenuContentProps extends BaseComponentProps {
  children: JSX.Element;
  /**
   * How to handle scroll when context menu is open
   * - 'close': Close on scroll (default)
   * - 'lock': Prevent body scroll while open
   * - 'none': Stay open and allow scroll
   */
  scrollBehavior?: OverlayScrollBehavior;
}

/**
 * Props for ContextMenuItem component
 */
export interface ContextMenuItemProps extends BaseComponentProps {
  children: JSX.Element;
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Icon displayed on the left */
  icon?: JSX.Element;
  /** Keyboard shortcut displayed on the right */
  shortcut?: string;
  /** Destructive/danger styling */
  destructive?: boolean;
}

/**
 * Props for ContextMenuSeparator component
 */
export interface ContextMenuSeparatorProps extends BaseComponentProps {}

// =============================================================================
// INTERNAL TYPES
// =============================================================================

/**
 * Internal state managed by createContextMenu hook
 */
export interface ContextMenuInternalState<T> {
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  position: Accessor<{ x: number; y: number }>;
  setPosition: (pos: { x: number; y: number }) => void;
  data: Accessor<T | null>;
  setData: (data: T | null) => void;
}

/**
 * Context value shared between ContextMenu components
 */
export interface ContextMenuContextValue<T = unknown> {
  open: Accessor<boolean>;
  position: Accessor<{ x: number; y: number }>;
  data: Accessor<T | null>;
  close: () => void;
  openMenu: (pos: { x: number; y: number }, data: T | null) => void;
}
