import { type Component, For, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { useDisclosure } from '../../hooks';
import type { NavbarItem, NavbarProps } from './types';

/**
 * Hamburger menu icon component
 */
const HamburgerIcon: Component<{ open: boolean; class?: string }> = (props) => {
  return (
    <svg
      class={`w-6 h-6 transition-transform duration-200 ${props.class ?? ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <Show
        when={props.open}
        fallback={
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        }
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </Show>
    </svg>
  );
};

/**
 * Navigation item component for desktop view
 */
const NavItem: Component<{ item: NavbarItem }> = (props) => {
  const baseClasses =
    'px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500';
  const activeClasses = 'text-accent-600 dark:text-accent-400 bg-accent-500/10';
  const inactiveClasses =
    'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-black/5 dark:hover:bg-white/5';

  const handleClick = () => {
    if (props.item.onClick) {
      props.item.onClick();
    }
  };

  return (
    <Show
      when={props.item.href}
      fallback={
        <button
          type="button"
          onClick={handleClick}
          class={`${baseClasses} ${props.item.active ? activeClasses : inactiveClasses}`}
        >
          {props.item.label}
        </button>
      }
    >
      <a
        href={props.item.href}
        onClick={props.item.onClick}
        class={`${baseClasses} ${props.item.active ? activeClasses : inactiveClasses}`}
      >
        {props.item.label}
      </a>
    </Show>
  );
};

/**
 * Mobile navigation item component
 */
const MobileNavItem: Component<{ item: NavbarItem; onClose: () => void }> = (props) => {
  const baseClasses =
    'block w-full px-4 py-3 text-base font-medium transition-colors text-left';
  const activeClasses = 'text-accent-600 dark:text-accent-400 bg-accent-500/10';
  const inactiveClasses =
    'text-surface-700 dark:text-surface-200 hover:bg-black/5 dark:hover:bg-white/5';

  const handleClick = () => {
    if (props.item.onClick) {
      props.item.onClick();
    }
    props.onClose();
  };

  return (
    <Show
      when={props.item.href}
      fallback={
        <button
          type="button"
          onClick={handleClick}
          class={`${baseClasses} ${props.item.active ? activeClasses : inactiveClasses}`}
        >
          {props.item.label}
        </button>
      }
    >
      <a
        href={props.item.href}
        onClick={handleClick}
        class={`${baseClasses} ${props.item.active ? activeClasses : inactiveClasses}`}
      >
        {props.item.label}
      </a>
    </Show>
  );
};

/**
 * A responsive navigation bar component with glassmorphism styling.
 *
 * Features:
 * - Glass effect background with backdrop blur
 * - Sticky positioning option
 * - Transparent mode that shows background on scroll
 * - Mobile-responsive with hamburger menu
 * - Brand/logo slot, navigation items, and actions slot
 *
 * @example
 * ```tsx
 * <Navbar
 *   brand={<Logo />}
 *   items={[
 *     { label: 'Home', href: '/', active: true },
 *     { label: 'About', href: '/about' },
 *     { label: 'Contact', onClick: () => setContactOpen(true) },
 *   ]}
 *   actions={<Button>Sign In</Button>}
 *   sticky
 * />
 * ```
 */
export const Navbar: Component<NavbarProps> = (props) => {
  const sticky = () => props.sticky ?? false;
  const transparent = () => props.transparent ?? false;

  const mobileMenu = useDisclosure(false);
  const [scrolled, setScrolled] = createSignal(false);

  // Track scroll position for transparent navbar
  onMount(() => {
    if (transparent()) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      handleScroll(); // Check initial position
      window.addEventListener('scroll', handleScroll, { passive: true });

      onCleanup(() => {
        window.removeEventListener('scroll', handleScroll);
      });
    }
  });

  // Close mobile menu on escape key
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenu.isOpen()) {
        mobileMenu.onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeyDown);
    });
  });

  const showBackground = () => !transparent() || scrolled();

  const navbarClasses = () => {
    const baseClasses = 'w-full h-16 z-40 transition-all duration-200';
    const positionClasses = sticky() ? 'sticky top-0' : 'relative';
    const backgroundClasses = showBackground()
      ? 'glass border-b border-surface-200/50 dark:border-white/5'
      : 'bg-transparent border-b border-transparent';

    return `${baseClasses} ${positionClasses} ${backgroundClasses} ${props.class ?? ''}`;
  };

  const mobileMenuClasses = () => {
    const baseClasses =
      'absolute top-full left-0 right-0 glass border-b border-surface-200/50 dark:border-white/5 shadow-lg overflow-hidden transition-all duration-200';

    return mobileMenu.isOpen()
      ? `${baseClasses} opacity-100 translate-y-0`
      : `${baseClasses} opacity-0 -translate-y-2 pointer-events-none`;
  };

  return (
    <nav class={navbarClasses()} aria-label="Main navigation">
      <div class="h-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div class="flex items-center justify-between h-full">
          {/* Brand/Logo */}
          <div class="flex-shrink-0">
            <Show when={props.brand}>{props.brand}</Show>
          </div>

          {/* Desktop Navigation - centered or right aligned based on actions */}
          <Show when={props.items && props.items.length > 0}>
            <div class="hidden md:flex md:items-center md:gap-1">
              <For each={props.items}>{(item) => <NavItem item={item} />}</For>
            </div>
          </Show>

          {/* Actions and Mobile Menu Button */}
          <div class="flex items-center gap-3">
            {/* Desktop Actions */}
            <Show when={props.actions}>
              <div class="hidden md:flex md:items-center md:gap-2">{props.actions}</div>
            </Show>

            {/* Mobile Menu Button */}
            <Show when={(props.items && props.items.length > 0) || props.actions}>
              <button
                type="button"
                onClick={mobileMenu.onToggle}
                class="md:hidden p-2 rounded-lg text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                aria-expanded={mobileMenu.isOpen()}
                aria-controls="mobile-menu"
                aria-label={mobileMenu.isOpen() ? 'Close menu' : 'Open menu'}
              >
                <HamburgerIcon open={mobileMenu.isOpen()} />
              </button>
            </Show>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div id="mobile-menu" class={mobileMenuClasses()} aria-hidden={!mobileMenu.isOpen()}>
        <div class="py-2">
          {/* Mobile Navigation Items */}
          <Show when={props.items && props.items.length > 0}>
            <div class="px-2 pb-2">
              <For each={props.items}>
                {(item) => <MobileNavItem item={item} onClose={mobileMenu.onClose} />}
              </For>
            </div>
          </Show>

          {/* Mobile Actions */}
          <Show when={props.actions}>
            <div class="px-4 pt-2 pb-2 border-t border-surface-200/50 dark:border-white/5">
              {props.actions}
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
};
