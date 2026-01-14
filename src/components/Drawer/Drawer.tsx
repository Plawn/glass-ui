import { type Component, Show } from 'solid-js';
import {
  ANIMATION_DURATION,
  BACKDROP_ENTER,
  BACKDROP_EXIT,
  DRAWER_ENTER,
  DRAWER_EXIT,
  DURATION_DEFAULT,
  DURATION_SLOW,
} from '../../constants';
import { useAnimationState, useDialogState } from '../../hooks';
import { CloseButton, PortalWithDarkMode } from '../shared';
import type { DrawerPosition, DrawerProps, DrawerSize } from './types';

const sizeStyles: Record<DrawerSize, string> = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  xl: 'max-w-lg',
};

const positionPanelStyles: Record<DrawerPosition, string> = {
  left: 'left-0',
  right: 'right-0',
};

export const Drawer: Component<DrawerProps> = (props) => {
  const position = () => props.position ?? 'right';
  const size = () => props.size ?? 'md';
  const showClose = () => props.showClose ?? true;

  // Use animation state hook for enter/exit animations
  const { visible, isClosing } = useAnimationState({
    open: () => props.open,
    duration: ANIMATION_DURATION,
  });

  // Use shared dialog state hook for escape, scroll lock, and backdrop
  const { handleBackdropClick } = useDialogState({
    open: visible,
    onClose: props.onClose,
    closeOnEscape: () => props.closeOnEscape ?? true,
    closeOnBackdrop: () => props.closeOnBackdrop ?? true,
  });

  const panelStyle = () => positionPanelStyles[position()];

  const backdropClasses = () => (isClosing() ? BACKDROP_EXIT : BACKDROP_ENTER);

  const drawerClasses = () =>
    isClosing()
      ? `${DRAWER_EXIT[position()]} ${DURATION_DEFAULT}`
      : `${DRAWER_ENTER[position()]} ${DURATION_SLOW}`;

  return (
    <Show when={visible()}>
      <PortalWithDarkMode>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is supplementary to Escape key (handled by useDialogState) */}
        <div
          class={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${backdropClasses()}`}
          onClick={(e) => handleBackdropClick(e)}
          aria-modal="true"
          aria-labelledby={props.title ? 'drawer-title' : undefined}
        >
          <div
            class={`absolute inset-y-0 ${panelStyle()} w-full ${sizeStyles[size()]} glass-thick shadow-2xl overflow-hidden ${drawerClasses()}`}
          >
            <div class="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <Show when={props.title || showClose()}>
                <div class="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-white/5">
                  <Show when={props.title}>
                    <h2
                      id="drawer-title"
                      class="text-lg font-semibold text-surface-900 dark:text-surface-100"
                    >
                      {props.title}
                    </h2>
                  </Show>
                  <Show when={showClose()}>
                    <CloseButton onClick={props.onClose} class="ml-auto" />
                  </Show>
                </div>
              </Show>

              {/* Content */}
              <div
                class={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-thin ${props.noPadding ? '' : 'p-6'}`}
              >
                {props.children}
              </div>

              {/* Footer */}
              <Show when={props.footer}>
                <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-200 dark:border-white/5">
                  {props.footer}
                </div>
              </Show>
            </div>
          </div>
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
