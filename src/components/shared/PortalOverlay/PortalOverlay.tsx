import {
  type Accessor,
  type Component,
  type JSX,
  Show,
  createMemo,
} from 'solid-js';
import {
  ANIMATION_DURATION,
  BACKDROP_ENTER,
  BACKDROP_EXIT,
} from '../../../constants';
import { useAnimationState, useDialogState } from '../../../hooks';
import { PortalWithDarkMode } from '../PortalWithDarkMode';
import type { PortalOverlayProps, PortalOverlayRenderProps } from './types';

/**
 * PortalOverlay - A shared wrapper for full-screen overlay components.
 *
 * This component handles common portal overlay patterns:
 * - Portal rendering with dark mode support
 * - Backdrop with click-to-close behavior
 * - Escape key handling
 * - Body scroll locking
 * - Optional enter/exit animations
 *
 * @example
 * ```tsx
 * // Simple usage (no exit animation)
 * <PortalOverlay open={isOpen()} onClose={handleClose}>
 *   <div onClick={(e) => e.stopPropagation()}>
 *     Content here
 *   </div>
 * </PortalOverlay>
 *
 * // With exit animation (using render prop)
 * <PortalOverlay
 *   open={isOpen()}
 *   onClose={handleClose}
 *   animated
 *   animationDuration={300}
 * >
 *   {({ isClosing, stopPropagation }) => (
 *     <div
 *       class={isClosing() ? 'animate-out' : 'animate-in'}
 *       onClick={stopPropagation}
 *     >
 *       Content here
 *     </div>
 *   )}
 * </PortalOverlay>
 * ```
 */
export const PortalOverlay: Component<PortalOverlayProps> = (props) => {
  // Normalize open to an accessor
  const openAccessor: Accessor<boolean> = createMemo(() =>
    typeof props.open === 'function' ? props.open() : props.open,
  );

  const animated = () => props.animated ?? false;
  const animationDuration = () => props.animationDuration ?? ANIMATION_DURATION;
  const role = () => props.role ?? 'dialog';
  const ariaModal = () => props.ariaModal ?? true;
  const backdropEnterClass = () => props.backdropEnterClass ?? BACKDROP_ENTER;
  const backdropExitClass = () => props.backdropExitClass ?? BACKDROP_EXIT;

  // Animation state for components that need exit animations
  const animationState = useAnimationState({
    open: openAccessor,
    duration: animationDuration,
  });

  // Determine visibility based on whether animations are enabled
  const isVisible = createMemo(() => {
    if (animated()) {
      return animationState.visible();
    }
    return openAccessor();
  });

  const isClosing = createMemo(() => {
    if (animated()) {
      return animationState.isClosing();
    }
    return false;
  });

  // Use shared dialog state hook for escape, scroll lock, and backdrop
  const { handleBackdropClick } = useDialogState({
    open: isVisible,
    onClose: props.onClose,
    closeOnEscape: () => props.closeOnEscape ?? true,
    closeOnBackdrop: () => props.closeOnBackdrop ?? true,
  });

  // Compute backdrop classes
  const backdropClasses = createMemo(() => {
    const baseClasses = 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm';
    const animClass = isClosing() ? backdropExitClass() : backdropEnterClass();
    const customClass = props.backdropClass ?? '';
    return `${baseClasses} ${animClass} ${customClass}`.trim();
  });

  // Helper to stop propagation
  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  // Render props for children that need animation state
  const renderProps: PortalOverlayRenderProps = {
    isClosing,
    stopPropagation,
  };

  // Render children - support both JSX elements and render functions
  const renderChildren = (): JSX.Element => {
    const children = props.children;
    if (typeof children === 'function') {
      return children(renderProps);
    }
    return children;
  };

  return (
    <Show when={isVisible()}>
      <PortalWithDarkMode>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled by useDialogState */}
        <div
          class={backdropClasses()}
          onClick={(e) => handleBackdropClick(e)}
          role={role()}
          aria-modal={ariaModal()}
          aria-labelledby={props.ariaLabelledby}
          aria-describedby={props.ariaDescribedby}
        >
          {renderChildren()}
        </div>
      </PortalWithDarkMode>
    </Show>
  );
};
