import { type Component, Show, splitProps } from 'solid-js';
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

  const [local, rest] = splitProps(props, [
    'open',
    'onClose',
    'title',
    'children',
    'position',
    'size',
    'footer',
    'noPadding',
    'showClose',
    'closeOnBackdrop',
    'closeOnEscape',
    'class',
  ]);

  const position = () => local.position ?? 'right';
  const size = () => local.size ?? 'md';
  const showClose = () => local.showClose ?? true;

  // Use animation state hook for enter/exit animations
  const { visible, isClosing } = useAnimationState({
    open: () => local.open,
    duration: () => ANIMATION_DURATION,
  });

  // Use shared dialog state hook for escape, scroll lock, and backdrop
  const { handleBackdropClick } = useDialogState({
    open: visible,
    onClose: local.onClose,
    closeOnEscape: () => local.closeOnEscape ?? true,
    closeOnBackdrop: () => local.closeOnBackdrop ?? true,
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
          aria-labelledby={local.title ? 'drawer-title' : undefined}
        >
          <div
            {...rest}
            class={`absolute inset-y-0 ${panelStyle()} w-full ${DRAWER_MAX_WIDTHS[size()]} glass-thick shadow-2xl overflow-hidden ${drawerClasses()} ${local.class ?? ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div class="flex flex-col h-full overflow-hidden">
              <OverlayContent
                title={local.title}
                titleId="drawer-title"
                showClose={showClose()}
                onClose={local.onClose}
                footer={local.footer}
                noPadding={local.noPadding}
                flexContent
              >
                {local.children}
              </OverlayContent>
            </div>
          </div>
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
