import {
  type Component,
  Show,
  createSignal,
  createUniqueId,
  splitProps,
} from 'solid-js';
import { DIALOG_MAX_WIDTHS, MODAL_PANEL_ENTER } from '../../constants';
import { PortalOverlay } from '../shared';
import type { DialogProps, DialogVariant } from './types';

const confirmButtonStyles: Record<DialogVariant, string> = {
  default: 'btn-primary',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus-ring',
};

export const Dialog: Component<DialogProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'open',
    'onOpenChange',
    'title',
    'description',
    'confirmLabel',
    'cancelLabel',
    'onConfirm',
    'onCancel',
    'confirmDisabled',
    'variant',
    'size',
    'returnFocusTo',
    'class',
    'children',
    'role',
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
  ]);

  const baseId = `glass-dialog-${createUniqueId()}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const labelledBy = () =>
    local['aria-labelledby'] ?? (local['aria-label'] ? undefined : titleId);
  const describedBy = () =>
    local['aria-describedby'] ??
    (local.description ? descriptionId : undefined);

  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'sm';
  const confirmLabel = () => local.confirmLabel ?? 'Confirm';
  const cancelLabel = () => local.cancelLabel ?? 'Cancel';

  const handleCancel = () => {
    local.onOpenChange(false);
    local.onCancel?.();
  };

  const [pending, setPending] = createSignal(false);
  const confirmDisabled = () => local.confirmDisabled || pending();

  const handleConfirm = async () => {
    if (confirmDisabled()) {
      return;
    }
    setPending(true);
    try {
      const result = await local.onConfirm();
      if (result !== false) {
        local.onOpenChange(false);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <PortalOverlay
      open={local.open}
      onClose={handleCancel}
      closeOnEscape
      closeOnBackdrop
      returnFocusTo={local.returnFocusTo}
      backdropClass="flex items-center justify-center p-2 sm:p-4"
      semanticsOnContent
    >
      <div
        {...rest}
        role={local.role ?? 'alertdialog'}
        aria-modal="true"
        aria-label={local['aria-label']}
        aria-labelledby={labelledBy()}
        aria-describedby={describedBy()}
        class={`w-full ${DIALOG_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER} ${local.class ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div class="p-4 sm:p-6">
          <h2
            id={titleId}
            class="text-lg font-semibold text-surface-900 dark:text-surface-100"
          >
            {local.title}
          </h2>
          <Show when={local.description}>
            <p
              id={descriptionId}
              class="mt-2 text-sm text-surface-600 dark:text-surface-400"
            >
              {local.description}
            </p>
          </Show>
          <Show when={local.children}>
            <div class="mt-4">{local.children}</div>
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
            disabled={confirmDisabled()}
            class={`${confirmButtonStyles[variant()]} px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {confirmLabel()}
          </button>
        </div>
      </div>
    </PortalOverlay>
  );
};
