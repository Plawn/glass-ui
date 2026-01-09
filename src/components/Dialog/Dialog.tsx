import { type Component, Show, createEffect, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useIsDark } from '../../hooks';
import type { DialogProps, DialogVariant } from './types';

const confirmButtonStyles: Record<DialogVariant, string> = {
  default: 'btn-primary',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors focus:outline-none focus-ring',
};

export const Dialog: Component<DialogProps> = (props) => {
  const variant = () => props.variant ?? 'default';
  const confirmLabel = () => props.confirmLabel ?? 'Confirm';
  const cancelLabel = () => props.cancelLabel ?? 'Cancel';

  const isDark = useIsDark();

  // Handle escape key
  createEffect(() => {
    if (!props.open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onOpenChange(false);
        props.onCancel?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Prevent body scroll when dialog is open
  createEffect(() => {
    if (props.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    onCleanup(() => {
      document.body.style.overflow = '';
    });
  });

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onOpenChange(false);
      props.onCancel?.();
    }
  };

  const handleCancel = () => {
    props.onOpenChange(false);
    props.onCancel?.();
  };

  const handleConfirm = () => {
    props.onConfirm();
    props.onOpenChange(false);
  };

  return (
    <Show when={props.open}>
      <Portal>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled separately */}
        <div
          class={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 ${isDark() ? 'dark' : ''}`}
          onClick={handleBackdropClick}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby={props.description ? 'dialog-description' : undefined}
        >
          <div
            class="w-full max-w-sm glass-card rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content */}
            <div class="p-6">
              <h2 id="dialog-title" class="text-lg font-semibold text-surface-900 dark:text-surface-100">
                {props.title}
              </h2>
              <Show when={props.description}>
                <p id="dialog-description" class="mt-2 text-sm text-surface-600 dark:text-surface-400">
                  {props.description}
                </p>
              </Show>
            </div>

            {/* Actions */}
            <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-200 dark:border-white/5">
              <button type="button" onClick={handleCancel} class="btn-secondary px-4 py-2 text-sm">
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
        </div>
      </Portal>
    </Show>
  );
};
