import type { JSX } from 'solid-js';

/**
 * A single item in the command palette
 */
export interface CommandPaletteItem<T = unknown> {
  /** Unique identifier for the item */
  id: string;
  /** Primary text displayed for the item */
  label: string;
  /** Optional secondary text/description */
  description?: string;
  /** Optional group name for categorization */
  group?: string;
  /** Optional icon to display (JSX element) */
  icon?: JSX.Element;
  /** Optional keywords for search (not displayed) */
  keywords?: string[];
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom data associated with the item */
  data?: T;
}

/**
 * Result from the search function with match positions
 */
export interface CommandPaletteSearchResult<T = unknown> {
  item: CommandPaletteItem<T>;
  /** Match positions in label [start, end][] */
  labelMatches?: [number, number][];
  /** Match positions in description [start, end][] */
  descriptionMatches?: [number, number][];
  /** Relevance score (lower is better) */
  score?: number;
}

/**
 * Handle for programmatic control of the command palette
 */
export interface CommandPaletteHandle {
  /** Open the command palette */
  open: () => void;
  /** Close the command palette */
  close: () => void;
  /** Toggle the command palette open/closed */
  toggle: () => void;
  /** Check if the command palette is currently open */
  isOpen: () => boolean;
}

/**
 * Props for the CommandPalette component
 */
export interface CommandPaletteProps<T = unknown> {
  /** Array of items to display in the palette */
  items: CommandPaletteItem<T>[];
  /** Callback when an item is selected */
  onSelect: (item: CommandPaletteItem<T>) => void;
  /** Optional custom search function */
  searchFn?: (
    query: string,
    items: CommandPaletteItem<T>[],
  ) => CommandPaletteSearchResult<T>[];
  /** Keyboard shortcut key (default: 'k' for Cmd/Ctrl+K) */
  shortcutKey?: string;
  /** Disable the keyboard shortcut */
  disableShortcut?: boolean;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Text to display when no results are found */
  emptyText?: string;
  /** Array of recent item IDs (displayed first when no query) */
  recentIds?: string[];
  /** Callback to get the handle for programmatic control */
  ref?: (handle: CommandPaletteHandle) => void;
  /** Whether the palette is controlled externally */
  open?: boolean;
  /** Callback when the palette should close (for controlled mode) */
  onOpenChange?: (open: boolean) => void;
  /** Footer content to display at the bottom */
  footer?: JSX.Element;
  /** Custom class for the container */
  class?: string;
}

/**
 * Props for the CommandPaletteItem component
 */
export interface CommandPaletteItemProps<T = unknown> {
  /** The item to render */
  item: CommandPaletteItem<T>;
  /** Whether this item is currently selected */
  selected: boolean;
  /** Whether this item is a recent item */
  isRecent?: boolean;
  /** Match positions in label */
  labelMatches?: [number, number][];
  /** Match positions in description */
  descriptionMatches?: [number, number][];
  /** Callback when item is clicked */
  onClick: () => void;
  /** Callback when mouse enters the item */
  onMouseEnter: () => void;
}
