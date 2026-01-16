import { createSignal } from 'solid-js';
import { Navbar, Card, Button } from 'glass-ui-solid';
import type { NavbarItem } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill } from '../../components/demo';

const basicCode = `<Navbar
  brand={
    <div class="flex items-center gap-2">
      <Logo />
      <span class="font-semibold">Glass UI</span>
    </div>
  }
  items={[
    { label: 'Home', href: '/', active: true },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ]}
/>`;

const withActionsCode = `<Navbar
  brand={<Logo />}
  items={navItems}
  actions={
    <div class="flex items-center gap-2">
      <Button variant="ghost" size="sm">Sign In</Button>
      <Button size="sm">Get Started</Button>
    </div>
  }
/>`;

const stickyCode = `<Navbar sticky brand={<Logo />} items={navItems} />`;

const transparentCode = `<Navbar
  sticky
  transparent
  brand={<Logo />}
  items={navItems}
/>`;

const buttonNavCode = `<Navbar
  brand={<span>App</span>}
  items={[
    { label: 'Dashboard', onClick: () => navigate('/dashboard'), active: true },
    { label: 'Settings', onClick: () => navigate('/settings') },
    { label: 'Help', onClick: () => setHelpOpen(true) },
  ]}
/>`;

const brandOnlyCode = `<Navbar
  brand={<Logo />}
  actions={<Button size="sm">Contact</Button>}
/>`;

export default function NavbarPage() {
  const [activeNav, setActiveNav] = createSignal('home');

  const items: NavbarItem[] = [
    { label: 'Home', href: '#', active: activeNav() === 'home', onClick: () => setActiveNav('home') },
    { label: 'Features', href: '#', active: activeNav() === 'features', onClick: () => setActiveNav('features') },
    { label: 'Pricing', href: '#', active: activeNav() === 'pricing', onClick: () => setActiveNav('pricing') },
    { label: 'About', href: '#', active: activeNav() === 'about', onClick: () => setActiveNav('about') },
  ];

  return (
    <div class="space-y-8">
      <PageHeader
        title="Navbar"
        description="A responsive navigation bar with glassmorphism styling. Features mobile hamburger menu, sticky positioning, and transparent mode that reveals on scroll."
      />

      <DemoSection title="Import" code="import { Navbar } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
        <div class="space-y-6">
          {/* Basic Navbar */}
          <DemoSection title="Basic Usage" subsection code={basicCode} cardClass="p-0 overflow-hidden">
            <Navbar
              brand={
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <span class="font-semibold text-surface-900 dark:text-white">Glass UI</span>
                </div>
              }
              items={items}
            />
          </DemoSection>

          {/* With Actions */}
          <DemoSection title="With Actions" subsection code={withActionsCode} cardClass="p-0 overflow-hidden">
            <Navbar
              brand={
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <span class="font-semibold text-surface-900 dark:text-white">Glass UI</span>
                </div>
              }
              items={items}
              actions={
                <div class="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Sign In</Button>
                  <Button size="sm">Get Started</Button>
                </div>
              }
            />
          </DemoSection>

          {/* Sticky Navbar */}
          <DemoSection title="Sticky Position" subsection code={stickyCode} cardClass="p-0 overflow-hidden">
            <div class="relative h-48 overflow-y-auto">
              <Navbar
                sticky
                brand={
                  <span class="font-semibold text-surface-900 dark:text-white">Sticky Navbar</span>
                }
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'About', href: '#' },
                ]}
              />
              <div class="p-6 space-y-4">
                <p class="text-surface-600 dark:text-surface-400">Scroll down to see the sticky behavior.</p>
                <p class="text-surface-600 dark:text-surface-400">The navbar stays at the top.</p>
                <p class="text-surface-600 dark:text-surface-400">Lorem ipsum dolor sit amet...</p>
                <p class="text-surface-600 dark:text-surface-400">More content here...</p>
                <p class="text-surface-600 dark:text-surface-400">Even more content...</p>
                <p class="text-surface-600 dark:text-surface-400">Keep scrolling...</p>
              </div>
            </div>
          </DemoSection>

          {/* Transparent Mode */}
          <DemoSection title="Transparent Mode" subsection code={transparentCode} cardClass="p-0 overflow-hidden">
            <div class="relative h-64 overflow-y-auto bg-gradient-to-br from-primary-500 to-accent-500">
              <Navbar
                sticky
                transparent
                brand={
                  <span class="font-semibold text-white">Transparent</span>
                }
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'About', href: '#' },
                ]}
              />
              <div class="p-6 pt-20">
                <h2 class="text-2xl font-bold text-white mb-4">Hero Section</h2>
                <p class="text-white/80 mb-4">Scroll down to see the navbar background appear.</p>
                <p class="text-white/80 mb-4">The transparent mode is perfect for hero sections.</p>
                <p class="text-white/80 mb-4">More content...</p>
                <p class="text-white/80 mb-4">Keep scrolling...</p>
                <p class="text-white/80">Even more content here...</p>
              </div>
            </div>
          </DemoSection>

          {/* Button Navigation */}
          <DemoSection title="Button Navigation (No href)" subsection code={buttonNavCode} cardClass="p-0 overflow-hidden">
            <Navbar
              brand={
                <span class="font-semibold text-surface-900 dark:text-white">App</span>
              }
              items={[
                { label: 'Dashboard', onClick: () => console.log('Dashboard clicked'), active: true },
                { label: 'Settings', onClick: () => console.log('Settings clicked') },
                { label: 'Help', onClick: () => console.log('Help clicked') },
              ]}
            />
          </DemoSection>

          {/* Brand Only */}
          <DemoSection title="Brand Only" subsection code={brandOnlyCode} cardClass="p-0 overflow-hidden">
            <Navbar
              brand={
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <span class="font-semibold text-surface-900 dark:text-white">Glass UI</span>
                </div>
              }
              actions={
                <Button size="sm">Contact</Button>
              }
            />
          </DemoSection>
        </div>
      </DemoSection>

      <DemoSection title="NavbarItem Interface" card={false}>
        <PropsTable
          compact
          props={[
            { name: 'label', type: 'string', description: 'Display label for the navigation item' },
            { name: 'href', type: 'string', description: 'Optional href for link-based navigation' },
            { name: 'onClick', type: '() => void', description: 'Optional click handler for programmatic navigation' },
            { name: 'active', type: 'boolean', description: 'Whether this item is currently active' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'brand', type: 'JSX.Element', description: 'Brand/logo element displayed on the left' },
            { name: 'items', type: 'NavbarItem[]', description: 'Navigation items' },
            { name: 'actions', type: 'JSX.Element', description: 'Actions slot (buttons, icons) displayed on the right' },
            { name: 'sticky', type: 'boolean', default: 'false', description: 'Whether the navbar should be sticky at the top' },
            { name: 'transparent', type: 'boolean', default: 'false', description: 'Whether the navbar is transparent until scroll' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
            { name: 'style', type: 'JSX.CSSProperties', description: 'Inline styles' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Features">
        <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
          <li>Responsive mobile menu with hamburger toggle</li>
          <li>Escape key closes mobile menu</li>
          <li>Smooth background transition on scroll (transparent mode)</li>
          <li>Glass effect background with backdrop blur</li>
          <li>Support for both link and button navigation items</li>
          <li>Actions slot for additional buttons or icons</li>
          <li>Active state styling for navigation items</li>
        </ul>
      </DemoSection>

      <DemoSection title="Accessibility">
        <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
          <li>Uses semantic <CodePill>&lt;nav&gt;</CodePill> element with <CodePill>aria-label</CodePill></li>
          <li>Mobile menu button has <CodePill>aria-expanded</CodePill> and <CodePill>aria-controls</CodePill></li>
          <li>Mobile menu has <CodePill>aria-hidden</CodePill> when closed</li>
          <li>Focus visible ring on interactive elements</li>
        </ul>
      </DemoSection>
    </div>
  );
}
