import { type Component, splitProps } from 'solid-js';
import { MODAL_PANEL_ENTER, OVERLAY_MAX_WIDTHS } from '../../constants';
import { OverlayContent, PortalOverlay } from '../shared';
import type { ModalProps } from './types';

export const Modal: Component<ModalProps> = (props) => {
  const [local, rest] = splitProps(props, [
    'open',
    'onClose',
    'onOpenChange',
    'title',
    'children',
    'size',
    'footer',
    'showClose',
    'closeOnBackdrop',
    'closeOnEscape',
    'class',
  ]);

  const size = () => local.size ?? 'md';
  const showClose = () => local.showClose ?? true;

  const requestClose = () => {
    local.onClose?.();
    local.onOpenChange?.(false);
  };

  return (
    <PortalOverlay
      open={local.open}
      onClose={requestClose}
      closeOnEscape={local.closeOnEscape ?? true}
      closeOnBackdrop={local.closeOnBackdrop ?? true}
      backdropClass="flex items-center justify-center p-2 sm:p-4"
      ariaLabelledby={local.title ? 'modal-title' : undefined}
    >
      <div
        {...rest}
        class={`w-full ${OVERLAY_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER} ${local.class ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <OverlayContent
          title={local.title}
          titleId="modal-title"
          showClose={showClose()}
          onClose={requestClose}
          footer={local.footer}
          contentClass="max-h-[80vh] sm:max-h-[70vh]"
        >
          {local.children}
        </OverlayContent>
      </div>
    </PortalOverlay>
  );
};
