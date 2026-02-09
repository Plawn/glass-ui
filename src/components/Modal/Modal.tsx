import type { Component } from 'solid-js';
import { MODAL_PANEL_ENTER, OVERLAY_MAX_WIDTHS } from '../../constants';
import { OverlayContent, PortalOverlay } from '../shared';
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
      backdropClass="flex items-center justify-center p-2 sm:p-4"
      ariaLabelledby={props.title ? 'modal-title' : undefined}
    >
      <div
        class={`w-full ${OVERLAY_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER}`}
        onClick={(e) => e.stopPropagation()}
      >
        <OverlayContent
          title={props.title}
          titleId="modal-title"
          showClose={showClose()}
          onClose={props.onClose}
          footer={props.footer}
          contentClass="max-h-[80vh] sm:max-h-[70vh]"
        >
          {props.children}
        </OverlayContent>
      </div>
    </PortalOverlay>
  );
};
