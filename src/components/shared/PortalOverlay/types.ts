import type { Accessor, JSX } from 'solid-js';

export interface PortalOverlayRenderProps {
  /** Whether the overlay is in closing state (only valid when animated is true) */
  isClosing: Accessor<boolean>;
  /** Handler for content click to stop propagation */
  stopPropagation: (e: MouseEvent) => void;
}

export interface PortalOverlayProps {
  /** Whether the overlay is open */
  open: boolean | Accessor<boolean>;
  /** Callback when overlay should close */
  onClose: () => void;
  /**
   * Content to render inside the overlay.
   * Can be a JSX element or a render function that receives animation state.
   */
  children: JSX.Element | ((props: PortalOverlayRenderProps) => JSX.Element);
  /** Additional CSS classes for the backdrop */
  backdropClass?: string;
  /** Whether clicking the backdrop should close the overlay (default: true) */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape should close the overlay (default: true) */
  closeOnEscape?: boolean;
  /** ARIA role for the overlay container (default: 'dialog') */
  role?: 'dialog' | 'alertdialog';
  /** Whether the overlay is modal (default: true) */
  ariaModal?: boolean;
  /** ID of the element that labels the overlay */
  ariaLabelledby?: string;
  /** ID of the element that describes the overlay */
  ariaDescribedby?: string;
  /**
   * Whether to use animation state hook for enter/exit animations.
   * When true, the overlay will remain visible during exit animation.
   * (default: false)
   */
  animated?: boolean;
  /** Animation duration in milliseconds (only used when animated is true, default: 200) */
  animationDuration?: number;
  /** Custom enter animation class for backdrop (default: BACKDROP_ENTER) */
  backdropEnterClass?: string;
  /** Custom exit animation class for backdrop (default: BACKDROP_EXIT) */
  backdropExitClass?: string;
}

/** @deprecated Use PortalOverlayRenderProps instead */
export interface PortalOverlayChildProps {
  /** Handler for content click to stop propagation */
  stopPropagation: (e: MouseEvent) => void;
  /** Whether the overlay is in closing state (only valid when animated is true) */
  isClosing: boolean;
}
