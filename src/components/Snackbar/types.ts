import type { SnackbarPosition } from '../../types';

export interface SnackbarProps {
  /** Message to display */
  message: string;
  /** Optional action button label */
  action?: string;
  /** Callback when action button is clicked */
  onAction?: () => void;
  /** Auto-dismiss duration in milliseconds (default: 4000, 0 to disable) */
  duration?: number;
  /** Position on screen */
  position?: SnackbarPosition;
  /** Whether the snackbar is visible */
  open: boolean;
  /** Callback when snackbar should close */
  onClose: () => void;
}

// Re-export shared types for convenience
export type { SnackbarPosition } from '../../types';
