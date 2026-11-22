import {
  type Component,
  Show,
  createSignal,
  createUniqueId,
  omit,
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
  const rest = omit(
    props,
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
  );

  const baseId = `glass-dialog-${createUniqueId()}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const labelledBy = () =>
    props['aria-labelledby'] ?? (props['aria-label'] ? undefined : titleId);
  const describedBy = () =>
    props['aria-describedby'] ??
    (props.description ? descriptionId : undefined);

  const variant = () => props.variant ?? 'default';
  const size = () => props.size ?? 'sm';
  const confirmLabel = () => props.confirmLabel ?? 'Confirm';
  const cancelLabel = () => props.cancelLabel ?? 'Cancel';

  const handleCancel = () => {
    props.onOpenChange(false);
    props.onCancel?.();
  };

  const [pending, setPending] = createSignal(false);
  const confirmDisabled = () => props.confirmDisabled || pending();

  const handleConfirm = async () => {
    if (confirmDisabled()) {
      return;
    }
    setPending(true);
    try {
      const result = await props.onConfirm();
      if (result !== false) {
        props.onOpenChange(false);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <PortalOverlay
      open={props.open}
      onClose={handleCancel}
      closeOnEscape
      closeOnBackdrop
      returnFocusTo={props.returnFocusTo}
      backdropClass="flex items-center justify-center p-2 sm:p-4"
      semanticsOnContent
    >
      <div
        {...rest}
        role={props.role ?? 'alertdialog'}
        aria-modal="true"
        aria-label={props['aria-label']}
        aria-labelledby={labelledBy()}
        aria-describedby={describedBy()}
        class={`w-full ${DIALOG_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER} ${props.class ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div class="p-4 sm:p-6">
          <h2
            id={titleId}
            class="text-lg font-semibold text-surface-900 dark:text-surface-100"
          >
            {props.title}
          </h2>
          <Show when={props.description}>
            <p
              id={descriptionId}
              class="mt-2 text-sm text-surface-600 dark:text-surface-400"
            >
              {props.description}
            </p>
          </Show>
          <Show when={props.children}>
            <div class="mt-4">{props.children}</div>
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
