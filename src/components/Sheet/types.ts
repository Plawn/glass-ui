import type { JSX } from 'solid-js';

/**
 * Sheet component props - mobile bottom sheet overlay
 */
export interface SheetProps {
  /** Whether the sheet is open */
  open: boolean;
  /** Callback when the open state changes */
  onOpenChange: (open: boolean) => void;
  /** Sheet content */
  children: JSX.Element;
  /** Snap points as percentages (0-1), e.g., [0.25, 0.5, 0.9] */
  snapPoints?: number[];
  /** Default snap point index (defaults to last snap point) */
  defaultSnapPoint?: number;
  /** Whether the sheet can be dragged down to close (default: true) */
  dismissible?: boolean;
  /** Whether to show the drag handle indicator (default: true) */
  showHandle?: boolean;
  /** Additional CSS classes for the sheet container */
  class?: string;
}
