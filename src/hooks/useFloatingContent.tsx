import type { JSX, Accessor } from 'solid-js';
import { Show } from 'solid-js';
import { PortalWithDarkMode } from '../components/shared/PortalWithDarkMode/PortalWithDarkMode';
import { POPOVER_ENTER } from '../constants/animations';
import { usePositioning } from './usePositioning';
import type { Placement, Direction } from '../types';

// =============================================================================
// TYPES
// =============================================================================

/** Default offset between trigger and floating content */
const DEFAULT_OFFSET = 8;

/** Configuration options for useFloatingContent hook */
export interface UseFloatingContentOptions {
  /** Reference to the trigger element */
  triggerRef: Accessor<HTMLElement | undefined>;
  /** Reference to the content element */
  contentRef: Accessor<HTMLElement | undefined>;
  /** Whether the floating content is open */
  isOpen: Accessor<boolean>;
  /** Placement relative to trigger (full placement with alignment) */
  placement?: Accessor<Placement>;
  /** Simple direction placement (without alignment, defaults to center) */
  direction?: Accessor<Direction>;
  /** Offset distance from the trigger (in pixels) */
  offset?: number;
  /** Whether to show an arrow pointing to the trigger */
  showArrow?: Accessor<boolean>;
  /** Additional CSS classes for the content container */
  contentClass?: Accessor<string | undefined>;
  /** ARIA role for the floating content */
  role?: 'dialog' | 'tooltip' | 'listbox' | 'menu';
  /** Set aria-modal attribute (only relevant for role="dialog") */
  ariaModal?: boolean;
  /** Additional event handlers for the content container */
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/** Return type for useFloatingContent hook */
export interface UseFloatingContentReturn {
  /** Get position styles for the content element */
  getPositionStyles: () => JSX.CSSProperties;
  /** Get arrow styles for the optional arrow element */
  getArrowStyles: () => JSX.CSSProperties;
  /** Render the floating content with portal, positioning, and styling */
  FloatingContent: (props: FloatingContentProps) => JSX.Element;
}

/** Props for the FloatingContent component */
export interface FloatingContentProps {
  /** Content to render inside the floating container */
  children: JSX.Element;
  /** Ref callback for the content container element */
  ref?: (el: HTMLDivElement) => void;
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook for rendering floating content (popovers, hover cards, tooltips, etc.)
 * with consistent positioning, portal rendering, and glass styling.
 *
 * This hook provides shared logic for:
 * - Positioning relative to a trigger element
 * - Portal rendering with dark mode support
 * - Glass card styling with animations
 * - Optional arrow indicator
 *
 * @example
 * ```tsx
 * let contentRef: HTMLDivElement | undefined;
 *
 * const { FloatingContent } = useFloatingContent({
 *   triggerRef: () => triggerEl,
 *   contentRef: () => contentRef,
 *   isOpen: () => isOpen(),
 *   placement: () => 'bottom',
 *   showArrow: () => true,
 * });
 *
 * return (
 *   <>
 *     <button ref={triggerEl}>Trigger</button>
 *     <FloatingContent ref={contentRef}>
 *       Content here
 *     </FloatingContent>
 *   </>
 * );
 * ```
 */
export function useFloatingContent(options: UseFloatingContentOptions): UseFloatingContentReturn {
  const offset = options.offset ?? DEFAULT_OFFSET;
  const role = options.role ?? 'dialog';
  const ariaModal = options.ariaModal ?? false;

  // Use the shared positioning hook
  const { getPositionStyles, getArrowStyles } = usePositioning({
    triggerRef: options.triggerRef,
    contentRef: options.contentRef,
    placement: options.placement,
    direction: options.direction,
    offset,
  });

  // Component for rendering the floating content
  const FloatingContent = (props: FloatingContentProps): JSX.Element => {
    const showArrow = () => options.showArrow?.() ?? false;
    const contentClass = () => options.contentClass?.() ?? '';

    return (
      <Show when={options.isOpen()}>
        <PortalWithDarkMode>
          <div
            ref={props.ref}
            class={`fixed z-50 glass-card rounded-xl shadow-lg ${POPOVER_ENTER} ${contentClass()}`}
            style={getPositionStyles()}
            role={role}
            aria-modal={role === 'dialog' ? ariaModal : undefined}
            onMouseEnter={options.onMouseEnter}
            onMouseLeave={options.onMouseLeave}
          >
            {props.children}
            <Show when={showArrow()}>
              <div
                class="glass-card"
                style={getArrowStyles()}
                aria-hidden="true"
              />
            </Show>
          </div>
        </PortalWithDarkMode>
      </Show>
    );
  };

  return {
    getPositionStyles,
    getArrowStyles,
    FloatingContent,
  };
}
