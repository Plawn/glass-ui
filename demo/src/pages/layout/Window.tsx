import {
  Button,
  Window,
  useDisclosure,
  useWindowManager,
} from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

const basicExample = `import { Window, Button, useDisclosure } from 'glass-ui-solid';

function Example() {
  const window = useDisclosure();

  return (
    <>
      <Button onClick={window.onOpen}>Open Window</Button>

      <Window
        open={window.isOpen()}
        onClose={window.onClose}
        title="My Window"
        defaultPosition="center"
      >
        <p>Drag the title bar to move. Resize from edges and corners.</p>
      </Window>
    </>
  );
}`;

const withFooterExample = `<Window
  open={window.isOpen()}
  onClose={window.onClose}
  title="Window with Footer"
  footer={
    <div class="flex justify-end gap-2">
      <Button variant="secondary" onClick={window.onClose}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        Save
      </Button>
    </div>
  }
>
  <p>Content with footer actions.</p>
</Window>`;

const withBackdropExample = `<Window
  open={window.isOpen()}
  onClose={window.onClose}
  title="Modal-like Window"
  showBackdrop={true}
  closeOnBackdrop={true}
>
  <p>This window has a backdrop like a modal.</p>
</Window>`;

const constraintsExample = `<Window
  open={window.isOpen()}
  onClose={window.onClose}
  title="Constrained Window"
  constraints={{
    minWidth: 300,
    maxWidth: 600,
    minHeight: 200,
    maxHeight: 400,
  }}
>
  <p>This window has min/max size constraints.</p>
</Window>`;

const controlledExample = `const [position, setPosition] = createSignal({ x: 100, y: 100 });
const [size, setSize] = createSignal({ width: 400, height: 300 });

<Window
  open={window.isOpen()}
  onClose={window.onClose}
  title="Controlled Window"
  position={position()}
  onPositionChange={setPosition}
  size={size()}
  onSizeChange={setSize}
>
  <p>Position: {position().x}, {position().y}</p>
  <p>Size: {size().width} x {size().height}</p>
</Window>`;

const nonInteractiveExample = `<Window
  open={window.isOpen()}
  onClose={window.onClose}
  title="Static Window"
  draggable={false}
  resizable={false}
  defaultPosition={{ x: 200, y: 150 }}
>
  <p>This window cannot be moved or resized.</p>
</Window>`;

const multiWindowExample = `import { Window, useDisclosure, useWindowManager } from 'glass-ui-solid';

function Example() {
  const windows = useWindowManager();
  const win1 = windows.register('window1');
  const win2 = windows.register('window2');
  const win3 = windows.register('window3');

  const window1 = useDisclosure();
  const window2 = useDisclosure();
  const window3 = useDisclosure();

  return (
    <>
      <Window
        open={window1.isOpen()}
        onClose={window1.onClose}
        title="Window 1"
        zIndex={win1.zIndex()}
        onFocus={win1.focus}
      >
        Click on a window to bring it to front!
      </Window>
      {/* ... more windows */}
    </>
  );
}`;

export default function WindowPage() {
  const basicWindow = useDisclosure();
  const footerWindow = useDisclosure();
  const backdropWindow = useDisclosure();
  const constraintsWindow = useDisclosure();
  const controlledWindow = useDisclosure();
  const staticWindow = useDisclosure();

  // Multi-window with focus management
  const multiWindow1 = useDisclosure();
  const multiWindow2 = useDisclosure();
  const multiWindow3 = useDisclosure();
  const windowManager = useWindowManager();
  const win1 = windowManager.register('win1');
  const win2 = windowManager.register('win2');
  const win3 = windowManager.register('win3');

  const [position, setPosition] = createSignal({ x: 100, y: 100 });
  const [size, setSize] = createSignal({ width: 400, height: 300 });

  const openAllWindows = () => {
    multiWindow1.onOpen();
    multiWindow2.onOpen();
    multiWindow3.onOpen();
  };

  return (
    <div class="space-y-8">
      <PageHeader
        title="Window"
        description="A draggable and resizable window component. Supports position/size control, constraints, and optional backdrop."
      />

      <DemoSection
        title="Import"
        code="import { Window, useDisclosure } from 'glass-ui-solid';"
      />

      <DemoSection title="Basic Example" code={basicExample}>
        <Button onClick={basicWindow.onOpen}>Open Window</Button>
        <Window
          open={basicWindow.isOpen()}
          onClose={basicWindow.onClose}
          title="My Window"
          defaultPosition="center"
        >
          <p class="text-surface-600 dark:text-surface-400">
            Drag the title bar to move the window. Resize from any edge or
            corner. The window is bounded to the viewport by default.
          </p>
        </Window>
      </DemoSection>

      <DemoSection title="With Footer" code={withFooterExample}>
        <Button onClick={footerWindow.onOpen}>Open Window with Footer</Button>
        <Window
          open={footerWindow.isOpen()}
          onClose={footerWindow.onClose}
          title="Window with Footer"
          defaultPosition="center"
          footer={
            <div class="flex justify-end gap-2">
              <Button variant="secondary" onClick={footerWindow.onClose}>
                Cancel
              </Button>
              <Button onClick={footerWindow.onClose}>Save</Button>
            </div>
          }
        >
          <p class="text-surface-600 dark:text-surface-400">
            This window has a footer with action buttons.
          </p>
        </Window>
      </DemoSection>

      <DemoSection title="With Backdrop" code={withBackdropExample}>
        <Button onClick={backdropWindow.onOpen}>Open Modal-like Window</Button>
        <Window
          open={backdropWindow.isOpen()}
          onClose={backdropWindow.onClose}
          title="Modal-like Window"
          defaultPosition="center"
          showBackdrop={true}
          closeOnBackdrop={true}
        >
          <p class="text-surface-600 dark:text-surface-400">
            This window has a backdrop like a modal. Click outside or press
            Escape to close.
          </p>
        </Window>
      </DemoSection>

      <DemoSection title="Size Constraints" code={constraintsExample}>
        <Button onClick={constraintsWindow.onOpen}>
          Open Constrained Window
        </Button>
        <Window
          open={constraintsWindow.isOpen()}
          onClose={constraintsWindow.onClose}
          title="Constrained Window"
          defaultPosition="center"
          constraints={{
            minWidth: 300,
            maxWidth: 600,
            minHeight: 200,
            maxHeight: 400,
          }}
        >
          <p class="text-surface-600 dark:text-surface-400">
            This window has size constraints: min 300x200, max 600x400. Try
            resizing to see the limits.
          </p>
        </Window>
      </DemoSection>

      <DemoSection title="Controlled Position/Size" code={controlledExample}>
        <div class="flex gap-2 flex-wrap items-center">
          <Button onClick={controlledWindow.onOpen}>
            Open Controlled Window
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setPosition({ x: 100, y: 100 });
              setSize({ width: 400, height: 300 });
            }}
          >
            Reset
          </Button>
          <span class="text-sm text-surface-500">
            Position: ({position().x}, {position().y}) | Size: {size().width}x
            {size().height}
          </span>
        </div>
        <Window
          open={controlledWindow.isOpen()}
          onClose={controlledWindow.onClose}
          title="Controlled Window"
          position={position()}
          onPositionChange={setPosition}
          size={size()}
          onSizeChange={setSize}
        >
          <div class="space-y-2 text-surface-600 dark:text-surface-400">
            <p>
              Position: ({position().x}, {position().y})
            </p>
            <p>
              Size: {size().width} x {size().height}
            </p>
          </div>
        </Window>
      </DemoSection>

      <DemoSection title="Non-Interactive" code={nonInteractiveExample}>
        <Button onClick={staticWindow.onOpen}>Open Static Window</Button>
        <Window
          open={staticWindow.isOpen()}
          onClose={staticWindow.onClose}
          title="Static Window"
          draggable={false}
          resizable={false}
          defaultPosition="center"
        >
          <p class="text-surface-600 dark:text-surface-400">
            This window cannot be moved or resized. Only the close button works.
          </p>
        </Window>
      </DemoSection>

      <DemoSection
        title="Multiple Windows with Focus"
        description="Click on a window to bring it to front. Uses useWindowManager for automatic z-index management."
        code={multiWindowExample}
      >
        <div class="flex gap-2">
          <Button onClick={openAllWindows}>Open All Windows</Button>
          <Button variant="secondary" onClick={multiWindow1.onOpen}>
            Window 1
          </Button>
          <Button variant="secondary" onClick={multiWindow2.onOpen}>
            Window 2
          </Button>
          <Button variant="secondary" onClick={multiWindow3.onOpen}>
            Window 3
          </Button>
        </div>
        <Window
          open={multiWindow1.isOpen()}
          onClose={multiWindow1.onClose}
          title="Window 1 (Red)"
          defaultPosition={{ x: 80, y: 100 }}
          defaultSize={{ width: 320, height: 220 }}
          zIndex={win1.zIndex()}
          onFocus={win1.focus}
          class="border-2 border-red-500/50"
        >
          <p class="text-surface-600 dark:text-surface-400">
            Click on any window to bring it to front!
          </p>
          <p class="text-sm text-surface-500 mt-2">
            Current z-index: {win1.zIndex()}
          </p>
        </Window>
        <Window
          open={multiWindow2.isOpen()}
          onClose={multiWindow2.onClose}
          title="Window 2 (Green)"
          defaultPosition={{ x: 180, y: 160 }}
          defaultSize={{ width: 320, height: 220 }}
          zIndex={win2.zIndex()}
          onFocus={win2.focus}
          class="border-2 border-green-500/50"
        >
          <p class="text-surface-600 dark:text-surface-400">
            Click on any window to bring it to front!
          </p>
          <p class="text-sm text-surface-500 mt-2">
            Current z-index: {win2.zIndex()}
          </p>
        </Window>
        <Window
          open={multiWindow3.isOpen()}
          onClose={multiWindow3.onClose}
          title="Window 3 (Blue)"
          defaultPosition={{ x: 280, y: 220 }}
          defaultSize={{ width: 320, height: 220 }}
          zIndex={win3.zIndex()}
          onFocus={win3.focus}
          class="border-2 border-blue-500/50"
        >
          <p class="text-surface-600 dark:text-surface-400">
            Click on any window to bring it to front!
          </p>
          <p class="text-sm text-surface-500 mt-2">
            Current z-index: {win3.zIndex()}
          </p>
        </Window>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          compact
          props={[
            {
              name: 'open',
              type: 'boolean',
              default: 'required',
              description: 'Whether the window is open',
            },
            {
              name: 'onClose',
              type: '() => void',
              default: 'required',
              description: 'Callback when window should close',
            },
            {
              name: 'title',
              type: 'string',
              description: 'Window title in header',
            },
            {
              name: 'children',
              type: 'JSX.Element',
              default: 'required',
              description: 'Window content',
            },
            {
              name: 'footer',
              type: 'JSX.Element',
              description: 'Footer content',
            },
            {
              name: 'defaultPosition',
              type: "Position | 'center'",
              default: "'center'",
              description: 'Initial position',
            },
            {
              name: 'defaultSize',
              type: '{ width, height }',
              default: '{ 400, 300 }',
              description: 'Initial size',
            },
            {
              name: 'position',
              type: '{ x, y }',
              description: 'Controlled position',
            },
            {
              name: 'onPositionChange',
              type: '(pos) => void',
              description: 'Position change callback',
            },
            {
              name: 'size',
              type: '{ width, height }',
              description: 'Controlled size',
            },
            {
              name: 'onSizeChange',
              type: '(size) => void',
              description: 'Size change callback',
            },
            {
              name: 'constraints',
              type: '{ minWidth?, maxWidth?, minHeight?, maxHeight? }',
              description: 'Size constraints',
            },
            {
              name: 'draggable',
              type: 'boolean',
              default: 'true',
              description: 'Enable dragging',
            },
            {
              name: 'resizable',
              type: 'boolean',
              default: 'true',
              description: 'Enable resizing',
            },
            {
              name: 'bounded',
              type: 'boolean',
              default: 'true',
              description: 'Bound to viewport',
            },
            {
              name: 'showBackdrop',
              type: 'boolean',
              default: 'false',
              description: 'Show backdrop overlay',
            },
            {
              name: 'closeOnBackdrop',
              type: 'boolean',
              default: 'true',
              description: 'Close on backdrop click',
            },
            {
              name: 'showClose',
              type: 'boolean',
              default: 'true',
              description: 'Show close button',
            },
            {
              name: 'closeOnEscape',
              type: 'boolean',
              default: 'true',
              description: 'Close on Escape key',
            },
            {
              name: 'zIndex',
              type: 'number',
              default: '50',
              description: 'Z-index for stacking',
            },
            {
              name: 'onFocus',
              type: '() => void',
              description:
                'Callback when window is clicked (for focus management)',
            },
            {
              name: 'class',
              type: 'string',
              description: 'Additional CSS class',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
