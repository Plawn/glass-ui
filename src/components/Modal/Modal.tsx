import { type Component, Show } from 'solid-js';
import { BACKDROP_ENTER, MODAL_PANEL_ENTER } from '../../constants';
import { useDialogState } from '../../hooks';
import { CloseButton, PortalWithDarkMode } from '../shared';
import type { ModalProps, ModalSize } from './types';

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

export const Modal: Component<ModalProps> = (props) => {
  const size = () => props.size ?? 'md';
  const showClose = () => props.showClose ?? true;

  // Use shared dialog state hook for escape, scroll lock, and backdrop
  const { handleBackdropClick } = useDialogState({
    open: () => props.open,
    onClose: props.onClose,
    closeOnEscape: () => props.closeOnEscape ?? true,
    closeOnBackdrop: () => props.closeOnBackdrop ?? true,
  });

  return (
    <Show when={props.open}>
      <PortalWithDarkMode>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled by useDialogState */}
        <div
          class={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ${BACKDROP_ENTER}`}
          onClick={(e) => handleBackdropClick(e)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={props.title ? 'modal-title' : undefined}
        >
          <div
            class={`w-full ${sizeStyles[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <Show when={props.title || showClose()}>
              <div class="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-white/5">
                <Show when={props.title}>
                  <h2 id="modal-title" class="text-lg font-semibold text-surface-900 dark:text-surface-100">
                    {props.title}
                  </h2>
                </Show>
                <Show when={showClose()}>
                  <CloseButton onClick={props.onClose} class="ml-auto" />
                </Show>
              </div>
            </Show>

            {/* Content */}
            <div class="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">{props.children}</div>

            {/* Footer */}
            <Show when={props.footer}>
              <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-200 dark:border-white/5">
                {props.footer}
              </div>
            </Show>
          </div>
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
