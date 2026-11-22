import { type Component, createUniqueId, omit } from 'solid-js';
import { MODAL_PANEL_ENTER, OVERLAY_MAX_WIDTHS } from '../../constants';
import { OverlayContent, PortalOverlay } from '../shared';
import type { ModalProps } from './types';

export const Modal: Component<ModalProps> = (props) => {
  const rest = omit(
    props,
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
    'returnFocusTo',
    'class',
    'role',
    'aria-label',
    'aria-labelledby',
  );

  const size = () => props.size ?? 'md';
  const showClose = () => props.showClose ?? true;
  const titleId = `glass-modal-${createUniqueId()}-title`;

  // A caller-provided name wins over the visible title
  const labelledBy = () =>
    props['aria-labelledby'] ??
    (props.title && !props['aria-label'] ? titleId : undefined);

  const requestClose = () => {
    props.onClose?.();
    props.onOpenChange?.(false);
  };

  return (
    <PortalOverlay
      open={props.open}
      onClose={requestClose}
      closeOnEscape={props.closeOnEscape ?? true}
      closeOnBackdrop={props.closeOnBackdrop ?? true}
      returnFocusTo={props.returnFocusTo}
      backdropClass="flex items-center justify-center p-2 sm:p-4"
      semanticsOnContent
    >
      <div
        {...rest}
        role={props.role ?? 'dialog'}
        aria-modal="true"
        aria-label={props['aria-label']}
        aria-labelledby={labelledBy()}
        class={`w-full ${OVERLAY_MAX_WIDTHS[size()]} glass-card rounded-2xl shadow-2xl ${MODAL_PANEL_ENTER} ${props.class ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <OverlayContent
          title={props.title}
          titleId={titleId}
          showClose={showClose()}
          onClose={requestClose}
          footer={props.footer}
          contentClass="max-h-[80vh] sm:max-h-[70vh]"
        >
          {props.children}
        </OverlayContent>
      </div>
    </PortalOverlay>
  );
};
