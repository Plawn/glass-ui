import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { CloseButton } from '../CloseButton';
import type { OverlayContentProps } from './types';

/**
 * Shared component for overlay content structure (Modal, Drawer).
 *
 * Provides consistent layout with:
 * - Optional header with title and close button
 * - Scrollable content area
 * - Optional footer with border
 *
 * @example
 * ```tsx
 * <OverlayContent
 *   title="My Modal"
 *   titleId="modal-title"
 *   showClose
 *   onClose={() => setOpen(false)}
 *   footer={<Button>Save</Button>}
 * >
 *   <p>Modal content here</p>
 * </OverlayContent>
 * ```
 */
export const OverlayContent: Component<OverlayContentProps> = (props) => {
  const showClose = () => props.showClose ?? !!props.onClose;
  const showHeader = () => props.title || showClose();

  return (
    <>
      {/* Header */}
      <Show when={showHeader()}>
        <div class="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-surface-200 dark:border-white/5">
          <Show when={props.title}>
            <h2
              id={props.titleId}
              class="text-lg font-semibold text-surface-900 dark:text-surface-100"
            >
              {props.title}
            </h2>
          </Show>
          <Show when={showClose() && props.onClose}>
            <CloseButton onClick={props.onClose!} class="ml-auto" />
          </Show>
        </div>
      </Show>

      {/* Content */}
      <div
        class={`overflow-y-auto scrollbar-thin ${props.flexContent ? 'flex-1 min-h-0 overflow-x-hidden flex flex-col' : ''} ${props.noPadding ? '' : 'p-4 sm:p-6'} ${props.contentClass ?? ''}`}
      >
        {props.children}
      </div>

      {/* Footer */}
      <Show when={props.footer}>
        <div class="flex items-center justify-end gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t border-surface-200 dark:border-white/5">
          {props.footer}
        </div>
      </Show>
    </>
  );
};
