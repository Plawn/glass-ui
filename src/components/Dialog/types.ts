import type { JSX } from 'solid-js';
import type { DialogSize, DialogVariant } from '../../types';

// Re-export from central types for backwards compatibility
export type { DialogSize } from '../../types';

export interface DialogProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
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
  /**
   * Callback when confirm is clicked.
   *
   * Return (or resolve to) `false` to veto the auto-close — the dialog stays
   * open, e.g. when inline validation fails or an API call rejects. Returning
   * `undefined`/`true` keeps the default behaviour of closing on confirm.
   * Async handlers are awaited before deciding whether to close.
   */
  // biome-ignore lint/suspicious/noConfusingVoidType: `void` keeps backward compatibility with handlers returning nothing, while `boolean` enables the opt-in close-veto.
  onConfirm: () => void | boolean | Promise<void | boolean>;
  /** Disables the confirm button (greyed, non-clickable) */
  confirmDisabled?: boolean;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
  /** Visual variant - danger shows red confirm button */
  variant?: DialogVariant;
  /** Size variant */
  size?: DialogSize;
}

// Re-export shared types for convenience
export type { DialogVariant } from '../../types';
