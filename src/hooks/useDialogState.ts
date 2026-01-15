import { type Accessor } from 'solid-js';
import { useEscapeKey } from './useEscapeKey';
import { useBodyScrollLock } from './useBodyScrollLock';

export interface UseDialogStateOptions {
  open: Accessor<boolean>;
  onClose: () => void;
  closeOnEscape?: Accessor<boolean>;
  closeOnBackdrop?: Accessor<boolean>;
}

export interface UseDialogStateReturn {
  /** Whether clicking backdrop should close the dialog */
  shouldCloseOnBackdrop: Accessor<boolean>;
  /** Handler for backdrop click events */
  handleBackdropClick: (e: MouseEvent, targetCheck?: (e: MouseEvent) => boolean) => void;
}

/**
 * Shared dialog state management for Modal and Drawer components.
 * Handles escape key, body scroll prevention, and backdrop clicks.
 */
export function useDialogState(options: UseDialogStateOptions): UseDialogStateReturn {
  const { open, onClose, closeOnEscape, closeOnBackdrop } = options;

  const shouldCloseOnEscape = () => closeOnEscape?.() ?? true;
  const shouldCloseOnBackdrop = () => closeOnBackdrop?.() ?? true;

  // Handle escape key (for non-dialog elements like Drawer)
  useEscapeKey({
    onEscape: onClose,
    enabled: () => open() && shouldCloseOnEscape(),
  });

  // Prevent body scroll when dialog is open
  useBodyScrollLock({
    enabled: open,
  });

  const handleBackdropClick = (
    e: MouseEvent,
    targetCheck: (e: MouseEvent) => boolean = (ev) => ev.target === ev.currentTarget,
  ) => {
    if (shouldCloseOnBackdrop() && targetCheck(e)) {
      onClose();
    }
  };

  return {
    shouldCloseOnBackdrop,
    handleBackdropClick,
  };
}
