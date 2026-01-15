import { createSignal } from 'solid-js';
import { Navbar, CodeBlock, Card, Button } from 'glass-ui-solid';
import type { NavbarItem } from 'glass-ui-solid';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Navbar</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A responsive navigation bar with glassmorphism styling. Features mobile hamburger menu, sticky positioning, and transparent mode that reveals on scroll.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Navbar } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        <div class="space-y-6">
          {/* Basic Navbar */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Basic Usage</h3>
            <Card class="p-0 overflow-hidden">
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
            </Card>
            <CodeBlock
              code={`<Navbar
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
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* With Actions */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">With Actions</h3>
            <Card class="p-0 overflow-hidden">
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
            </Card>
            <CodeBlock
              code={`<Navbar
  brand={<Logo />}
  items={navItems}
  actions={
    <div class="flex items-center gap-2">
      <Button variant="ghost" size="sm">Sign In</Button>
      <Button size="sm">Get Started</Button>
    </div>
  }
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Sticky Navbar */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Sticky Position</h3>
            <Card class="p-0 overflow-hidden">
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
            </Card>
            <CodeBlock
              code={`<Navbar sticky brand={<Logo />} items={navItems} />`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Transparent Mode */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Transparent Mode</h3>
            <Card class="p-0 overflow-hidden">
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
            </Card>
            <CodeBlock
              code={`<Navbar
  sticky
  transparent
  brand={<Logo />}
  items={navItems}
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Button Navigation */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Button Navigation (No href)</h3>
            <Card class="p-0 overflow-hidden">
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
            </Card>
            <CodeBlock
              code={`<Navbar
  brand={<span>App</span>}
  items={[
    { label: 'Dashboard', onClick: () => navigate('/dashboard'), active: true },
    { label: 'Settings', onClick: () => navigate('/settings') },
    { label: 'Help', onClick: () => setHelpOpen(true) },
  ]}
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>

          {/* Brand Only */}
          <div>
            <h3 class="text-md font-medium text-surface-800 dark:text-surface-200 mb-3">Brand Only</h3>
            <Card class="p-0 overflow-hidden">
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
            </Card>
            <CodeBlock
              code={`<Navbar
  brand={<Logo />}
  actions={<Button size="sm">Contact</Button>}
/>`}
              language="tsx"
              class="mt-3"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">NavbarItem Interface</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Property</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>label</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">Display label for the navigation item</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>href</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">Optional href for link-based navigation</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>onClick</code></td>
                <td class="p-3"><code>() =&gt; void</code></td>
                <td class="p-3">Optional click handler for programmatic navigation</td>
              </tr>
              <tr>
                <td class="p-3"><code>active</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3">Whether this item is currently active</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>brand</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Brand/logo element displayed on the left</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>items</code></td>
                <td class="p-3"><code>NavbarItem[]</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Navigation items</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>actions</code></td>
                <td class="p-3"><code>JSX.Element</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Actions slot (buttons, icons) displayed on the right</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>sticky</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3"><code>false</code></td>
                <td class="p-3">Whether the navbar should be sticky at the top</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>transparent</code></td>
                <td class="p-3"><code>boolean</code></td>
                <td class="p-3"><code>false</code></td>
                <td class="p-3">Whether the navbar is transparent until scroll</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="p-3"><code>class</code></td>
                <td class="p-3"><code>string</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Additional CSS classes</td>
              </tr>
              <tr>
                <td class="p-3"><code>style</code></td>
                <td class="p-3"><code>JSX.CSSProperties</code></td>
                <td class="p-3">-</td>
                <td class="p-3">Inline styles</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Features</h2>
        <Card class="p-6">
          <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
            <li>Responsive mobile menu with hamburger toggle</li>
            <li>Escape key closes mobile menu</li>
            <li>Smooth background transition on scroll (transparent mode)</li>
            <li>Glass effect background with backdrop blur</li>
            <li>Support for both link and button navigation items</li>
            <li>Actions slot for additional buttons or icons</li>
            <li>Active state styling for navigation items</li>
          </ul>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <Card class="p-6">
          <ul class="list-disc list-inside space-y-2 text-surface-600 dark:text-surface-400">
            <li>Uses semantic <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">&lt;nav&gt;</code> element with <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-label</code></li>
            <li>Mobile menu button has <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-expanded</code> and <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-controls</code></li>
            <li>Mobile menu has <code class="px-1 py-0.5 bg-surface-100 dark:bg-surface-800 rounded">aria-hidden</code> when closed</li>
            <li>Focus visible ring on interactive elements</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
