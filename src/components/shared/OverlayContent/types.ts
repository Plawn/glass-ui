import type { JSX } from 'solid-js';

/**
 * Props for the OverlayContent component.
 * Provides a consistent structure for overlay components (Modal, Drawer)
 * with header, scrollable content, and optional footer.
 */
export interface OverlayContentProps {
  /** Optional title displayed in the header */
  title?: string;

  /** ID for the title element, used for aria-labelledby */
  titleId?: string;

  /** Whether to show the close button. Defaults to true if onClose is provided */
  showClose?: boolean;

  /** Called when the close button is clicked */
  onClose?: () => void;

  /** Content to render in the scrollable body */
  children: JSX.Element;

  /** Optional footer content (e.g., action buttons) */
  footer?: JSX.Element;

  /** Whether to remove padding from the content area. Defaults to false */
  noPadding?: boolean;

  /** Custom class for the content area */
  contentClass?: string;

  /**
   * Use flex layout for content (flex-1 min-h-0).
   * Useful for full-height layouts like Drawer.
   */
  flexContent?: boolean;
}
