import { Button, Card, Drawer, useDisclosure } from 'glass-ui-solid';
import { For, createSignal } from 'solid-js';
import {
  DemoSection,
  FeatureList,
  PageHeader,
  PropsTable,
} from '../../components/demo';

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
      <PageHeader
        title="Drawer"
        description="Slide-in panel from left or right edge of the screen for secondary content or navigation."
      />

      <DemoSection
        title="Import"
        code="import { Drawer, useDisclosure } from 'glass-ui-solid';"
      />

      <DemoSection title="Basic Example" code={basicExample}>
        <Button onClick={basicDrawer.onOpen}>Open Drawer</Button>
        <Drawer
          open={basicDrawer.isOpen()}
          onClose={basicDrawer.onClose}
          title="Drawer Title"
        >
          <p class="text-surface-600 dark:text-surface-400">
            This is a basic drawer that slides in from the right. Click outside
            or press Escape to close.
          </p>
        </Drawer>
      </DemoSection>

      <DemoSection
        title="Position"
        description="Drawers can slide in from the left or right side of the screen."
        code={positionExample}
      >
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
      </DemoSection>

      <DemoSection title="Sizes" code={sizesExample}>
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
            This is a {selectedSize()} size drawer. The width changes based on
            the size prop.
          </p>
        </Drawer>
      </DemoSection>

      <DemoSection title="With Footer" code={withFooterExample}>
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
              <Button onClick={footerDrawer.onClose}>Save Changes</Button>
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
      </DemoSection>

      <DemoSection
        title="Navigation Drawer"
        description="Drawers are commonly used for mobile navigation menus."
        code={navigationExample}
      >
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
              onClick={(e) => {
                e.preventDefault();
                navDrawer.onClose();
              }}
              class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navDrawer.onClose();
              }}
              class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              About
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navDrawer.onClose();
              }}
              class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              Services
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navDrawer.onClose();
              }}
              class="block px-4 py-2 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"
            >
              Contact
            </a>
          </nav>
        </Drawer>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          compact
          props={[
            {
              name: 'open',
              type: 'boolean',
              default: 'required',
              description: 'Whether the drawer is open',
            },
            {
              name: 'onClose',
              type: '() => void',
              default: 'required',
              description: 'Callback when drawer should close',
            },
            {
              name: 'title',
              type: 'string',
              description: 'Drawer title in header',
            },
            {
              name: 'children',
              type: 'JSX.Element',
              default: 'required',
              description: 'Drawer content',
            },
            {
              name: 'position',
              type: "'left' | 'right'",
              default: "'right'",
              description: 'Slide-in direction',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg' | 'xl'",
              default: "'md'",
              description: 'Drawer width',
            },
            {
              name: 'footer',
              type: 'JSX.Element',
              description: 'Footer content',
            },
            {
              name: 'showClose',
              type: 'boolean',
              default: 'true',
              description: 'Show close button',
            },
            {
              name: 'closeOnBackdrop',
              type: 'boolean',
              default: 'true',
              description: 'Close when clicking backdrop',
            },
            {
              name: 'closeOnEscape',
              type: 'boolean',
              default: 'true',
              description: 'Close when pressing Escape',
            },
            {
              name: 'noPadding',
              type: 'boolean',
              default: 'false',
              description: 'Remove padding from content area',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Behavior">
        <FeatureList
          items={[
            <>
              <strong>Body scroll lock:</strong> Prevents page scrolling when
              open
            </>,
            <>
              <strong>Escape key:</strong> Closes drawer by default
              (configurable)
            </>,
            <>
              <strong>Backdrop click:</strong> Closes drawer by default
              (configurable)
            </>,
            <>
              <strong>Exit animation:</strong> Waits for animation to complete
              before unmounting
            </>,
          ]}
        />
      </DemoSection>

      <DemoSection title="Animation">
        <p class="text-surface-600 dark:text-surface-400 text-sm mb-2">
          The drawer uses slide animations:
        </p>
        <FeatureList
          items={[
            <>
              <strong>Enter:</strong> Slides in from the edge with fade (300ms)
            </>,
            <>
              <strong>Exit:</strong> Slides out to the edge with fade (200ms)
            </>,
          ]}
        />
      </DemoSection>
    </div>
  );
}
