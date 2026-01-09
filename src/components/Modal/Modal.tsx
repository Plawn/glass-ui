import { type Component, Show, createEffect, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import { BACKDROP_ENTER, MODAL_PANEL_ENTER } from '../../constants';
import { useIsDark } from '../../hooks';
import { CloseButton } from '../shared';
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
  const closeOnBackdrop = () => props.closeOnBackdrop ?? true;
  const closeOnEscape = () => props.closeOnEscape ?? true;

  const isDark = useIsDark();

  // Handle escape key
  createEffect(() => {
    if (!props.open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape()) {
        props.onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Prevent body scroll when modal is open
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
    if (closeOnBackdrop() && e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.open}>
      <Portal>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled separately */}
        <div
          class={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ${BACKDROP_ENTER} ${isDark() ? 'dark' : ''}`}
          onClick={handleBackdropClick}
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
      </Portal>
    </Show>
  );
};
