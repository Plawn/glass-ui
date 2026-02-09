import { type Component, Show } from 'solid-js';
import {
  ANIMATION_DURATION,
  BACKDROP_ENTER,
  BACKDROP_EXIT,
  DRAWER_ENTER,
  DRAWER_EXIT,
  DRAWER_MAX_WIDTHS,
  DURATION_DEFAULT,
  DURATION_SLOW,
} from '../../constants';
import { useAnimationState, useDialogState, useFocusTrap } from '../../hooks';
import { getAnimationClass, getDirectionalAnimationClass } from '../../utils';
import { OverlayContent, PortalWithDarkMode } from '../shared';
import type { DrawerPosition, DrawerProps } from './types';

const positionPanelStyles: Record<DrawerPosition, string> = {
  left: 'left-0',
  right: 'right-0',
};

export const Drawer: Component<DrawerProps> = (props) => {
  let backdropRef: HTMLDivElement | undefined;

  const position = () => props.position ?? 'right';
  const size = () => props.size ?? 'md';
  const showClose = () => props.showClose ?? true;

  // Use animation state hook for enter/exit animations
  const { visible, isClosing } = useAnimationState({
    open: () => props.open,
    duration: () => ANIMATION_DURATION,
  });

  // Use shared dialog state hook for escape, scroll lock, and backdrop
  const { handleBackdropClick } = useDialogState({
    open: visible,
    onClose: props.onClose,
    closeOnEscape: () => props.closeOnEscape ?? true,
    closeOnBackdrop: () => props.closeOnBackdrop ?? true,
  });

  // Focus trap
  useFocusTrap({
    enabled: visible,
    containerRef: () => backdropRef,
  });

  const panelStyle = () => positionPanelStyles[position()];

  const backdropClasses = () =>
    getAnimationClass(isClosing(), BACKDROP_ENTER, BACKDROP_EXIT);

  const drawerClasses = () => {
    const animClass = getDirectionalAnimationClass(
      isClosing(),
      position(),
      DRAWER_ENTER,
      DRAWER_EXIT,
    );
    const durationClass = isClosing() ? DURATION_DEFAULT : DURATION_SLOW;
    return `${animClass} ${durationClass}`;
  };

  return (
    <Show when={visible()}>
      <PortalWithDarkMode>
        <div
          ref={backdropRef}
          class={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${backdropClasses()}`}
          onClick={(e) => handleBackdropClick(e)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={props.title ? 'drawer-title' : undefined}
        >
          <div
            class={`absolute inset-y-0 ${panelStyle()} w-full ${DRAWER_MAX_WIDTHS[size()]} glass-thick shadow-2xl overflow-hidden ${drawerClasses()}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div class="flex flex-col h-full overflow-hidden">
              <OverlayContent
                title={props.title}
                titleId="drawer-title"
                showClose={showClose()}
                onClose={props.onClose}
                footer={props.footer}
                noPadding={props.noPadding}
                flexContent
              >
                {props.children}
              </OverlayContent>
            </div>
          </div>
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
