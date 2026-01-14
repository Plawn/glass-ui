import type { DialogVariant, BaseComponentProps, OverlaySize } from '../../types';

/**
 * Dialog size variants - subset of OverlaySize most appropriate for dialogs
 */
export type DialogSize = Extract<OverlaySize, 'sm' | 'md' | 'lg'>;

export interface DialogProps extends BaseComponentProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Dialog title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Label for confirm button */
  confirmLabel?: string;
  /** Label for cancel button */
  cancelLabel?: string;
  /** Callback when confirm is clicked */
  onConfirm: () => void;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Visual variant - danger shows red confirm button */
  variant?: DialogVariant;
  /** Size variant */
  size?: DialogSize;
}

// Re-export shared types for convenience
export type { DialogVariant } from '../../types';
