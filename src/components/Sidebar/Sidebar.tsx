import { type Component, For, Show, createEffect, createSignal, onCleanup } from 'solid-js';
import {
  ANIMATION_DURATION_SLOW,
  BACKDROP_ENTER,
  BACKDROP_EXIT,
  DRAWER_ENTER,
  DRAWER_EXIT,
  DURATION_DEFAULT,
  DURATION_SLOW,
} from '../../constants';
import { useAnimationState } from '../../hooks';
import { PortalWithDarkMode } from '../shared';
import { ChevronLeftIcon, ChevronRightIcon } from '../shared/icons';
import { SidebarItemComponent } from './SidebarItem';
import type { SidebarItem, SidebarProps } from './types';

/** Default sidebar width */
const DEFAULT_WIDTH = '240px';
/** Default collapsed width */
const DEFAULT_COLLAPSED_WIDTH = '64px';
/** Mobile breakpoint in pixels */
const MOBILE_BREAKPOINT = 768;

/**
 * Sidebar navigation component with glassmorphism styling.
 * Supports collapsible mode, nested navigation items, and mobile drawer behavior.
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: 'home', label: 'Home', icon: <HomeIcon /> },
 *   { id: 'settings', label: 'Settings', icon: <SettingsIcon />, children: [
 *     { id: 'profile', label: 'Profile' },
 *     { id: 'security', label: 'Security' },
 *   ]},
 * ];
 *
 * <Sidebar
 *   items={items}
 *   activeId="home"
 *   collapsed={collapsed()}
 *   onCollapsedChange={setCollapsed}
 * />
 * ```
 */
export const Sidebar: Component<SidebarProps> = (props) => {
  const [isMobile, setIsMobile] = createSignal(false);
  const [mobileOpen, setMobileOpen] = createSignal(false);
  const [expandedIds, setExpandedIds] = createSignal<string[]>([]);

  const collapsed = () => props.collapsed ?? false;
  const width = () => props.width ?? DEFAULT_WIDTH;
  const collapsedWidth = () => props.collapsedWidth ?? DEFAULT_COLLAPSED_WIDTH;

  // Check for mobile viewport
  createEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    onCleanup(() => window.removeEventListener('resize', checkMobile));
  });

  // Handle body scroll lock on mobile
  createEffect(() => {
    if (isMobile() && mobileOpen()) {
      document.body.style.overflow = 'hidden';
      onCleanup(() => {
        document.body.style.overflow = '';
      });
    }
  });

  // Animation state for mobile drawer
  const { visible: mobileVisible, isClosing: mobileClosing } = useAnimationState({
    open: mobileOpen,
    duration: ANIMATION_DURATION_SLOW,
  });

  // Handle item click
  const handleItemClick = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick();
    }
    props.onActiveChange?.(item.id);

    // Close mobile drawer on navigation
    if (isMobile()) {
      setMobileOpen(false);
    }
  };

  // Toggle expanded state for groups
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle collapsed state
  const handleCollapseToggle = () => {
    props.onCollapsedChange?.(!collapsed());
  };

  // Close mobile drawer
  const closeMobileDrawer = () => {
    setMobileOpen(false);
  };

  // Handle escape key for mobile drawer
  createEffect(() => {
    if (!isMobile() || !mobileOpen()) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileDrawer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    onCleanup(() => document.removeEventListener('keydown', handleKeyDown));
  });

  // Collapse toggle button
  const CollapseButton = () => (
    <button
      type="button"
      onClick={handleCollapseToggle}
      class="
        p-2 rounded-xl
        text-surface-500 dark:text-surface-400
        hover:text-surface-700 dark:hover:text-surface-200
        transition-all duration-300 ease-out
        backdrop-blur-md
        bg-white/5 dark:bg-white/5
        border border-white/10 dark:border-white/5
        hover:bg-white/15 dark:hover:bg-white/10
        hover:border-white/20 dark:hover:border-white/10
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
        hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.05)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50
      "
      aria-label={collapsed() ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <Show when={collapsed()} fallback={<ChevronLeftIcon class="w-4 h-4" />}>
        <ChevronRightIcon class="w-4 h-4" />
      </Show>
    </button>
  );

  // Sidebar content (shared between desktop and mobile)
  const SidebarContent = () => (
    <div class="flex flex-col h-full overflow-hidden">
      {/* Header slot */}
      <Show when={props.header}>
        <div
          class={`flex-shrink-0 border-b border-white/10 dark:border-white/5 ${
            collapsed() ? 'p-3' : 'px-4 py-4'
          }`}
        >
          {props.header}
        </div>
      </Show>

      {/* Navigation items */}
      <nav
        class={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin ${
          collapsed() ? 'p-2' : 'p-3'
        }`}
        aria-label="Main navigation"
      >
        <div class="space-y-1">
          <For each={props.items}>
            {(item) => (
              <SidebarItemComponent
                item={item}
                activeId={props.activeId}
                collapsed={collapsed()}
                depth={0}
                onItemClick={handleItemClick}
                expandedIds={expandedIds()}
                onToggleExpand={toggleExpand}
              />
            )}
          </For>
        </div>
      </nav>

      {/* Footer slot with collapse toggle */}
      <div
        class={`flex-shrink-0 border-t border-white/10 dark:border-white/5 ${
          collapsed() ? 'p-2' : 'px-3 py-3'
        }`}
      >
        <Show
          when={props.footer}
          fallback={
            <div class={collapsed() ? 'flex justify-center' : 'flex justify-end'}>
              <CollapseButton />
            </div>
          }
        >
          <div class="space-y-3">
            {props.footer}
            <Show when={!isMobile()}>
              <div class={collapsed() ? 'flex justify-center' : 'flex justify-end'}>
                <CollapseButton />
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );

  // Mobile hamburger trigger (rendered externally, could be used via CSS variable)
  const MobileTrigger = () => (
    <button
      type="button"
      onClick={() => setMobileOpen(true)}
      class="
        p-2.5 rounded-xl md:hidden
        transition-all duration-300 ease-out
        backdrop-blur-xl
        bg-white/20 dark:bg-white/10
        border border-white/30 dark:border-white/15
        text-surface-700 dark:text-surface-300
        hover:bg-white/30 dark:hover:bg-white/15
        hover:border-white/40 dark:hover:border-white/20
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.08)]
        hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.1)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50
      "
      aria-label="Open navigation menu"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside
      class={`h-full glass-sidebar transition-all duration-300 ease-in-out ${props.class ?? ''}`}
      style={{
        width: collapsed() ? collapsedWidth() : width(),
        'min-width': collapsed() ? collapsedWidth() : width(),
        ...props.style,
      }}
      aria-label="Sidebar navigation"
    >
      <SidebarContent />
    </aside>
  );

  // Mobile drawer sidebar
  const MobileDrawer = () => (
    <Show when={mobileVisible()}>
      <PortalWithDarkMode>
        {/* Backdrop */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click is supplementary to Escape key */}
        <div
          class={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${
            mobileClosing() ? BACKDROP_EXIT : BACKDROP_ENTER
          }`}
          onClick={closeMobileDrawer}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <aside
          class={`fixed inset-y-0 left-0 z-50 glass-sidebar shadow-2xl ${
            mobileClosing()
              ? `${DRAWER_EXIT.left} ${DURATION_DEFAULT}`
              : `${DRAWER_ENTER.left} ${DURATION_SLOW}`
          }`}
          style={{ width: width() }}
          aria-label="Mobile navigation"
          role="dialog"
          aria-modal="true"
        >
          <SidebarContent />
        </aside>
      </PortalWithDarkMode>
    </Show>
  );

  return (
    <>
      {/* Desktop: Regular sidebar */}
      <Show when={!isMobile()}>
        <DesktopSidebar />
      </Show>

      {/* Mobile: Drawer */}
      <Show when={isMobile()}>
        <MobileTrigger />
        <MobileDrawer />
      </Show>
    </>
  );
};
