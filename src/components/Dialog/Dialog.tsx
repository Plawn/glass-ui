import { type Component, Show } from 'solid-js';
import { DIALOG_MAX_WIDTHS, MODAL_PANEL_ENTER } from '../../constants';
import { PortalOverlay } from '../shared';
import type { DialogProps, DialogVariant } from './types';

const confirmButtonStyles: Record<DialogVariant, string> = {
  default: 'btn-primary',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus-ring',
};

export const Dialog: Component<DialogProps> = (props) => {
  const variant = () => props.variant ?? 'default';
  const size = () => props.size ?? 'sm';
  const confirmLabel = () => props.confirmLabel ?? 'Confirm';
  const cancelLabel = () => props.cancelLabel ?? 'Cancel';

  const handleCancel = () => {
    props.onOpenChange(false);
    props.onCancel?.();
  };

  const handleConfirm = () => {
    props.onConfirm();
    props.onOpenChange(false);
  };

  return (
    <PortalOverlay
      open={props.open}
      onClose={handleCancel}
      closeOnEscape
      closeOnBackdrop
      backdropClass="flex items-center justify-center p-2 sm:p-4"
      role="alertdialog"
      ariaLabelledby="dialog-title"
      ariaDescribedby={props.description ? 'dialog-description' : undefined}
    >
      <div
        class={`w-full ${DIALOG_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div class="p-4 sm:p-6">
          <h2
            id="dialog-title"
            class="text-lg font-semibold text-surface-900 dark:text-surface-100"
          >
            {props.title}
          </h2>
          <Show when={props.description}>
            <p
              id="dialog-description"
              class="mt-2 text-sm text-surface-600 dark:text-surface-400"
            >
              {props.description}
            </p>
          </Show>
        </div>

        {/* Actions */}
        <div class="flex items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t border-surface-200 dark:border-white/5">
          <button
            type="button"
            onClick={handleCancel}
            class="btn-secondary px-4 py-2 text-sm"
          >
            {cancelLabel()}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            class={`${confirmButtonStyles[variant()]} px-4 py-2 text-sm`}
          >
            {confirmLabel()}
          </button>
        </div>
      </div>
    </PortalOverlay>
  );
};
