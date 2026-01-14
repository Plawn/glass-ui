import type { JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useIsDark } from '../../../hooks';

export interface PortalWithDarkModeProps {
  /** Content to render inside the portal */
  children: JSX.Element;
  /** Additional CSS classes for the wrapper div */
  class?: string;
}

/**
 * Portal wrapper that automatically applies the dark mode class.
 * Use this instead of Portal directly when rendering content that needs
 * to respect the current dark mode setting.
 *
 * @example
 * ```tsx
 * <PortalWithDarkMode>
 *   <div class="glass-card">Content that respects dark mode</div>
 * </PortalWithDarkMode>
 * ```
 */
export function PortalWithDarkMode(props: PortalWithDarkModeProps): JSX.Element {
  const isDark = useIsDark();

  return (
    <Portal>
      <div class={`${isDark() ? 'dark' : ''} ${props.class ?? ''}`}>{props.children}</div>
    </Portal>
  );
}
