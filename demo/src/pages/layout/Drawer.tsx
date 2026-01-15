import { Drawer, Button, useDisclosure, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';

const basicExample = `import { Drawer, Button, useDisclosure } from 'glass-ui-solid';

function Example() {
  const drawer = useDisclosure();

  return (
    <>
      <Button onClick={drawer.onOpen}>Open Drawer</Button>

      <Drawer
        open={drawer.isOpen()}
        onClose={drawer.onClose}
        title="Drawer Title"
      >
        <p>Drawer content here.</p>
      </Drawer>
    </>
  );
}`;

const positionExample = `// Right side (default)
<Drawer position="right" {...props}>
  Right drawer
</Drawer>

// Left side
<Drawer position="left" {...props}>
  Left drawer
</Drawer>`;

const sizesExample = `<Drawer size="sm" {...props}>Small (320px)</Drawer>
<Drawer size="md" {...props}>Medium (400px, default)</Drawer>
<Drawer size="lg" {...props}>Large (500px)</Drawer>
<Drawer size="xl" {...props}>Extra large (640px)</Drawer>`;

const withFooterExample = `<Drawer
  open={drawer.isOpen()}
  onClose={drawer.onClose}
  title="Settings"
  footer={
    <div class="flex justify-end gap-2">
      <Button variant="secondary" onClick={drawer.onClose}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  }
>
  {/* Settings form */}
</Drawer>`;

const navigationExample = `<Drawer
  open={menuOpen()}
  onClose={() => setMenuOpen(false)}
  position="left"
  title="Navigation"
>
  <nav class="space-y-2">
    <a href="/" class="block px-4 py-2 rounded hover:bg-surface-100">
      Home
    </a>
    <a href="/about" class="block px-4 py-2 rounded hover:bg-surface-100">
      About
    </a>
    <a href="/contact" class="block px-4 py-2 rounded hover:bg-surface-100">
      Contact
    </a>
  </nav>
</Drawer>`;

type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';
type DrawerPosition = 'left' | 'right';

const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl'];

export default function DrawerPage() {
  const basicDrawer = useDisclosure();
  const leftDrawer = useDisclosure();
  const footerDrawer = useDisclosure();
  const navDrawer = useDisclosure();
  const [selectedSize, setSelectedSize] = createSignal<DrawerSize>('md');
  const sizeDrawer = useDisclosure();

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Drawer</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Slide-in panel from left or right edge of the screen for secondary content or navigation.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Drawer, useDisclosure } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Example</h2>
        <Card class="p-6 mb-4">
          <Button onClick={basicDrawer.onOpen}>Open Drawer</Button>
          <Drawer
            open={basicDrawer.isOpen()}
            onClose={basicDrawer.onClose}
            title="Drawer Title"
          >
            <p class="text-surface-600 dark:text-surface-400">
              This is a basic drawer that slides in from the right. Click outside or press Escape to close.
            </p>
          </Drawer>
        </Card>
        <CodeBlock code={basicExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Position</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Drawers can slide in from the left or right side of the screen.
        </p>
        <Card class="p-6 mb-4">
          <div class="flex gap-2">
            <Button onClick={leftDrawer.onOpen}>Left Drawer</Button>
            <Button onClick={basicDrawer.onOpen}>Right Drawer</Button>
          </div>
          <Drawer
            open={leftDrawer.isOpen()}
            onClose={leftDrawer.onClose}
            position="left"
            title="Left Drawer"
          >
            <p class="text-surface-600 dark:text-surface-400">
              This drawer slides in from the left side of the screen.
            </p>
          </Drawer>
        </Card>
        <CodeBlock code={positionExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6 mb-4">
          <div class="flex flex-wrap gap-2">
            <For each={sizes}>
              {(size) => (
                <Button
                  variant={selectedSize() === size ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    setSelectedSize(size);
                    sizeDrawer.onOpen();
                  }}
                >
                  {size.toUpperCase()}
                </Button>
              )}
            </For>
          </div>
          <Drawer
            open={sizeDrawer.isOpen()}
            onClose={sizeDrawer.onClose}
            title={`${selectedSize().toUpperCase()} Drawer`}
            size={selectedSize()}
          >
            <p class="text-surface-600 dark:text-surface-400">
              This is a {selectedSize()} size drawer. The width changes based on the size prop.
            </p>
          </Drawer>
        </Card>
        <CodeBlock code={sizesExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Footer</h2>
        <Card class="p-6 mb-4">
          <Button onClick={footerDrawer.onOpen}>Open Drawer with Footer</Button>
          <Drawer
            open={footerDrawer.isOpen()}
            onClose={footerDrawer.onClose}
            title="Settings"
            footer={
              <div class="flex justify-end gap-2">
                <Button variant="secondary" onClick={footerDrawer.onClose}>
                  Cancel
                </Button>
                <Button onClick={footerDrawer.onClose}>
                  Save Changes
                </Button>
              </div>
            }
          >
            <div class="space-y-4">
              <p class="text-surface-600 dark:text-surface-400">
                Configure your settings here. The footer contains action buttons.
              </p>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Setting 1
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800"
                  placeholder="Enter value..."
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Setting 2
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800"
                  placeholder="Enter value..."
                />
              </div>
            </div>
          </Drawer>
        </Card>
        <CodeBlock code={withFooterExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Navigation Drawer</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Drawers are commonly used for mobile navigation menus.
        </p>
        <Card class="p-6 mb-4">
          <Button onClick={navDrawer.onOpen}>Open Navigation</Button>
          <Drawer
            open={navDrawer.isOpen()}
            onClose={navDrawer.onClose}
            position="left"
            title="Navigation"
          >
            <nav class="space-y-1">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navDrawer.onClose(); }}
                class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                Home
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navDrawer.onClose(); }}
                class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                About
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navDrawer.onClose(); }}
                class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                Services
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navDrawer.onClose(); }}
                class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                Contact
              </a>
            </nav>
          </Drawer>
        </Card>
        <CodeBlock code={navigationExample} language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-2 pr-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-2 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">open</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Whether the drawer is open</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">onClose</td>
                <td class="py-2 pr-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Callback when drawer should close</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">title</td>
                <td class="py-2 pr-4 font-mono text-xs">string</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Drawer title in header</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">children</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">required</td>
                <td class="py-2">Drawer content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">position</td>
                <td class="py-2 pr-4 font-mono text-xs">'left' | 'right'</td>
                <td class="py-2 pr-4">'right'</td>
                <td class="py-2">Slide-in direction</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">size</td>
                <td class="py-2 pr-4 font-mono text-xs">'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="py-2 pr-4">'md'</td>
                <td class="py-2">Drawer width</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">footer</td>
                <td class="py-2 pr-4 font-mono text-xs">JSX.Element</td>
                <td class="py-2 pr-4">-</td>
                <td class="py-2">Footer content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">showClose</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Show close button</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">closeOnBackdrop</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Close when clicking backdrop</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-2 pr-4 font-mono text-xs">closeOnEscape</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">true</td>
                <td class="py-2">Close when pressing Escape</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-mono text-xs">noPadding</td>
                <td class="py-2 pr-4 font-mono text-xs">boolean</td>
                <td class="py-2 pr-4">false</td>
                <td class="py-2">Remove padding from content area</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Behavior</h2>
        <Card class="p-4">
          <ul class="space-y-2 text-surface-600 dark:text-surface-400 text-sm">
            <li><strong>Body scroll lock:</strong> Prevents page scrolling when open</li>
            <li><strong>Escape key:</strong> Closes drawer by default (configurable)</li>
            <li><strong>Backdrop click:</strong> Closes drawer by default (configurable)</li>
            <li><strong>Exit animation:</strong> Waits for animation to complete before unmounting</li>
          </ul>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Animation</h2>
        <Card class="p-4">
          <p class="text-surface-600 dark:text-surface-400 text-sm">
            The drawer uses slide animations:
          </p>
          <ul class="space-y-1 text-surface-600 dark:text-surface-400 text-sm mt-2">
            <li><strong>Enter:</strong> Slides in from the edge with fade (300ms)</li>
            <li><strong>Exit:</strong> Slides out to the edge with fade (200ms)</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
