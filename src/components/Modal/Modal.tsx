import { type Component, Show } from 'solid-js';
import { MODAL_PANEL_ENTER, OVERLAY_MAX_WIDTHS } from '../../constants';
import { CloseButton, PortalOverlay } from '../shared';
import type { ModalProps } from './types';

export const Modal: Component<ModalProps> = (props) => {
  const size = () => props.size ?? 'md';
  const showClose = () => props.showClose ?? true;

  return (
    <PortalOverlay
      open={props.open}
      onClose={props.onClose}
      closeOnEscape={props.closeOnEscape ?? true}
      closeOnBackdrop={props.closeOnBackdrop ?? true}
      backdropClass="flex items-center justify-center p-4"
      ariaLabelledby={props.title ? 'modal-title' : undefined}
    >
      <div
        class={`w-full ${OVERLAY_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER}`}
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
    </PortalOverlay>
  );
};
