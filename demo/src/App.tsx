import { createSignal, For, Show, onMount } from 'solid-js';
import { version } from '../../package.json';
import {
  // Layout
  Card,
  Section,
  Accordion,
  Modal,
  Dialog,
  Drawer,
  Divider,
  Collapsible,
  Sidebar,
  Navbar,
  Sheet,
  // Forms
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Badge,
  RadioGroup,
  Switch,
  Slider,
  Autocomplete,
  DatePicker,
  NumberInput,
  FileUpload,
  Stepper,
  // Feedback
  Alert,
  Progress,
  Skeleton,
  Spinner,
  ErrorDisplay,
  SnackbarContainer,
  snackbar,
  ToastContainer,
  toast,
  EmptyState,
  // Forms (advanced)
  JsonSchemaForm,
  // Navigation
  Tabs,
  SegmentedControl,
  Breadcrumb,
  Pagination,
  Menu,
  Dropdown,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  createContextMenu,
  CommandPalette,
  type CommandPaletteItemType,
  type CommandPaletteHandle,
  // Data Display
  Table,
  Chip,
  Avatar,
  Tooltip,
  Popover,
  HoverCard,
  CodeBlock,
  JsonViewer,
  Markdown,
  // Virtualization
  VirtualList,
  VirtualTable,
  // Hooks
  useDisclosure,
  useIsDark,
  // Background
  GlassBackground,
} from 'glass-ui-solid';

const categories = [
  { id: 'layout', label: 'Layout' },
  { id: 'forms', label: 'Forms' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data', label: 'Data Display' },
];

function DemoSection(props: { title: string; children: any }) {
  return (
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
        {props.title}
      </h3>
      <div class="space-y-4">{props.children}</div>
    </div>
  );
}

function LayoutDemo() {
  const modal = useDisclosure();
  const dialog = useDisclosure();
  const drawer = useDisclosure();
  const sheet = useDisclosure();
  const [sidebarCollapsed, setSidebarCollapsed] = createSignal(false);
  const [sidebarActiveId, setSidebarActiveId] = createSignal('dashboard');
  const [collapsibleOpen, setCollapsibleOpen] = createSignal(false);

  return (
    <>
      <DemoSection title="Card">
        <div class="flex gap-4 flex-wrap">
          <Card class="p-4 w-64">
            <h4 class="font-bold">Default Card</h4>
            <p class="text-sm text-surface-600">Card content here</p>
          </Card>
          <Card variant="elevated" class="p-4 w-64">
            <h4 class="font-bold">Elevated Card</h4>
            <p class="text-sm text-surface-600">With shadow effect</p>
          </Card>
        </div>
      </DemoSection>

      <DemoSection title="Section">
        <Section title="Simple Section">
          <p class="text-surface-600 dark:text-surface-400">
            This is a simple section with a title.
          </p>
        </Section>
      </DemoSection>

      <DemoSection title="Accordion">
        <Accordion
          items={[
            {
              id: '1',
              title: 'What is Glass UI?',
              content: <p class="text-surface-600 dark:text-surface-400">Glass UI is an iOS 26-inspired component library for SolidJS.</p>,
              defaultOpen: true,
            },
            {
              id: '2',
              title: 'How do I install it?',
              content: <p class="text-surface-600 dark:text-surface-400">Run: npm install glass-ui-solid</p>,
            },
            {
              id: '3',
              title: 'Is it customizable?',
              content: <p class="text-surface-600 dark:text-surface-400">Yes! You can customize colors via CSS variables.</p>,
            },
          ]}
          multiple
        />
      </DemoSection>

      <DemoSection title="Modal / Dialog / Drawer">
        <div class="flex gap-2 flex-wrap">
          <Button onClick={modal.onOpen}>Open Modal</Button>
          <Button variant="secondary" onClick={dialog.onOpen}>Open Dialog</Button>
          <Button variant="ghost" onClick={drawer.onOpen}>Open Drawer</Button>
        </div>

        <Modal open={modal.isOpen()} onClose={modal.onClose} title="Modal Example">
          <p class="text-surface-600">This is a modal dialog with a title and content.</p>
          <div class="mt-4 flex justify-end">
            <Button onClick={modal.onClose}>Close</Button>
          </div>
        </Modal>

        <Dialog
          open={dialog.isOpen()}
          onOpenChange={(open) => !open && dialog.onClose()}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={dialog.onClose}
        />

        <Drawer open={drawer.isOpen()} onClose={drawer.onClose} position="right" title="Drawer">
          <p class="text-surface-600">Drawer content goes here.</p>
        </Drawer>
      </DemoSection>

      <DemoSection title="Divider">
        <p class="text-sm text-surface-500 mb-3">Visual separators with different styles and orientations</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">Horizontal (default)</p>
            <div class="space-y-4 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
              <p class="text-sm text-surface-600 dark:text-surface-400">Content above</p>
              <Divider />
              <p class="text-sm text-surface-600 dark:text-surface-400">Content below</p>
            </div>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">With labels at different positions</p>
            <div class="space-y-4 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
              <Divider label="Start" labelPosition="start" />
              <Divider label="Center" labelPosition="center" />
              <Divider label="End" labelPosition="end" />
            </div>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Style variants: solid, dashed, dotted</p>
            <div class="space-y-4 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
              <Divider variant="solid" label="Solid" />
              <Divider variant="dashed" label="Dashed" />
              <Divider variant="dotted" label="Dotted" />
            </div>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Vertical orientation</p>
            <div class="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg h-24">
              <span class="text-sm text-surface-600 dark:text-surface-400">Left</span>
              <Divider orientation="vertical" />
              <span class="text-sm text-surface-600 dark:text-surface-400">Middle</span>
              <Divider orientation="vertical" variant="dashed" />
              <span class="text-sm text-surface-600 dark:text-surface-400">Right</span>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Collapsible">
        <p class="text-sm text-surface-500 mb-3">Expandable/collapsible content panels</p>
        <div class="space-y-4 max-w-md">
          <div>
            <p class="text-xs text-surface-400 mb-2">Uncontrolled (defaultOpen)</p>
            <Collapsible
              defaultOpen
              trigger={
                <Button variant="secondary" class="w-full justify-between">
                  Click to toggle (starts open)
                </Button>
              }
            >
              <Card class="mt-2 p-4">
                <p class="text-sm text-surface-600 dark:text-surface-400">
                  This content is collapsible. Click the trigger above to show/hide it.
                  It starts open because of defaultOpen prop.
                </p>
              </Card>
            </Collapsible>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Controlled mode</p>
            <Collapsible
              open={collapsibleOpen()}
              onOpenChange={setCollapsibleOpen}
              trigger={
                <Button variant="ghost" class="w-full justify-between">
                  {collapsibleOpen() ? 'Click to collapse' : 'Click to expand'}
                </Button>
              }
            >
              <Card class="mt-2 p-4">
                <p class="text-sm text-surface-600 dark:text-surface-400">
                  This is controlled collapsible content. The open state is managed externally.
                </p>
                <Button size="sm" class="mt-2" onClick={() => setCollapsibleOpen(false)}>
                  Close from inside
                </Button>
              </Card>
            </Collapsible>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Disabled state</p>
            <Collapsible
              disabled
              trigger={
                <Button variant="secondary" class="w-full justify-between" disabled>
                  Disabled (cannot toggle)
                </Button>
              }
            >
              <Card class="mt-2 p-4">
                <p class="text-sm text-surface-600 dark:text-surface-400">
                  This content won't be accessible because the collapsible is disabled.
                </p>
              </Card>
            </Collapsible>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Sidebar">
        <p class="text-sm text-surface-500 mb-3">Navigation sidebar with collapsible state and nested items</p>
        <div class="flex gap-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed())}
          >
            {sidebarCollapsed() ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </Button>
        </div>
        <div class="mt-4 border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
          <div class="flex h-80">
            <Sidebar
              collapsed={sidebarCollapsed()}
              onCollapsedChange={setSidebarCollapsed}
              activeId={sidebarActiveId()}
              onActiveChange={setSidebarActiveId}
              header={
                <div class="p-4 border-b border-surface-200 dark:border-surface-700">
                  <Show when={!sidebarCollapsed()} fallback={<span class="text-xl">G</span>}>
                    <span class="font-bold text-surface-900 dark:text-white">Glass UI</span>
                  </Show>
                </div>
              }
              footer={
                <div class="p-4 border-t border-surface-200 dark:border-surface-700">
                  <Show when={!sidebarCollapsed()} fallback={
                    <Avatar name="John Doe" size="sm" />
                  }>
                    <div class="flex items-center gap-2">
                      <Avatar name="John Doe" size="sm" />
                      <span class="text-sm text-surface-600 dark:text-surface-400">John Doe</span>
                    </div>
                  </Show>
                </div>
              }
              items={[
                {
                  id: 'dashboard',
                  label: 'Dashboard',
                  icon: <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
                },
                {
                  id: 'analytics',
                  label: 'Analytics',
                  badge: 3,
                  icon: <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
                },
                {
                  id: 'projects',
                  label: 'Projects',
                  icon: <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
                  children: [
                    { id: 'project-1', label: 'Project Alpha' },
                    { id: 'project-2', label: 'Project Beta' },
                    { id: 'project-3', label: 'Project Gamma', disabled: true },
                  ],
                },
                {
                  id: 'settings',
                  label: 'Settings',
                  icon: <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                },
              ]}
            />
            <div class="flex-1 p-4 bg-surface-50 dark:bg-surface-800/30">
              <p class="text-sm text-surface-600 dark:text-surface-400">
                Active: <span class="font-medium">{sidebarActiveId()}</span>
              </p>
              <p class="text-xs text-surface-500 mt-2">
                Click sidebar items to navigate. Click "Projects" to see nested items.
              </p>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Navbar">
        <p class="text-sm text-surface-500 mb-3">Application navigation bar with brand, items, and actions</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">Basic Navbar</p>
            <div class="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
              <Navbar
                brand={<span class="font-bold text-lg">Glass UI</span>}
                items={[
                  { label: 'Home', href: '#', active: true },
                  { label: 'Features', href: '#' },
                  { label: 'Pricing', href: '#' },
                  { label: 'Docs', href: '#' },
                ]}
                actions={
                  <div class="flex gap-2">
                    <Button variant="ghost" size="sm">Sign In</Button>
                    <Button size="sm">Get Started</Button>
                  </div>
                }
              />
            </div>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Navbar with logo and search</p>
            <div class="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
              <Navbar
                brand={
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <span class="font-bold">GlassUI</span>
                  </div>
                }
                items={[
                  { label: 'Dashboard', onClick: () => toast.info('Dashboard clicked') },
                  { label: 'Projects', onClick: () => toast.info('Projects clicked') },
                  { label: 'Team', onClick: () => toast.info('Team clicked') },
                ]}
                actions={
                  <div class="flex items-center gap-3">
                    <Avatar name="Jane Smith" size="sm" />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Sheet">
        <p class="text-sm text-surface-500 mb-3">Bottom sheet overlay with snap points (mobile-style)</p>
        <div class="flex gap-2 flex-wrap">
          <Button onClick={sheet.onOpen}>Open Sheet</Button>
        </div>
        <Sheet
          open={sheet.isOpen()}
          onOpenChange={(open) => !open && sheet.onClose()}
          snapPoints={[0.25, 0.5, 0.9]}
          defaultSnapPoint={1}
        >
          <div class="p-6">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
              Sheet Content
            </h3>
            <p class="text-surface-600 dark:text-surface-400 mb-4">
              This is a bottom sheet with snap points. Drag the handle to resize or swipe down to dismiss.
            </p>
            <div class="space-y-2">
              <p class="text-sm text-surface-500">Snap points: 25%, 50%, 90%</p>
              <div class="flex gap-2">
                <Button size="sm" variant="secondary" onClick={sheet.onClose}>Close</Button>
              </div>
            </div>
          </div>
        </Sheet>
      </DemoSection>
    </>
  );
}

function FormsDemo() {
  const [inputValue, setInputValue] = createSignal('');
  const [selectValue, setSelectValue] = createSignal('');
  const [checked, setChecked] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [schemaFormValue, setSchemaFormValue] = createSignal<Record<string, unknown>>({
    name: '',
    age: 25,
    role: 'user',
    notifications: true,
  });

  const userSchema = {
    type: 'object' as const,
    properties: {
      name: { type: 'string' as const, title: 'Name' },
      age: { type: 'number' as const, title: 'Age', minimum: 0, maximum: 120 },
      role: { type: 'string' as const, title: 'Role', enum: ['admin', 'user', 'guest'] },
      notifications: { type: 'boolean' as const, title: 'Enable notifications' },
    },
    required: ['name', 'role'],
  };

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <DemoSection title="Button">
        <div class="flex gap-2 flex-wrap items-center">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button loading={loading()} onClick={handleLoadingClick}>
            {loading() ? 'Loading...' : 'Click to Load'}
          </Button>
        </div>
        <div class="flex gap-2 flex-wrap items-center mt-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </DemoSection>

      <DemoSection title="Input">
        <div class="max-w-sm space-y-3">
          <Input
            label="Text Input"
            placeholder="Enter text..."
            value={inputValue()}
            onInput={setInputValue}
          />
          <Input label="With Error" error="This field is required" value="" onInput={() => { }} />
          <Input label="Disabled" disabled value="Cannot edit" onInput={() => { }} />
        </div>
      </DemoSection>

      <DemoSection title="Textarea">
        <div class="max-w-sm">
          <Textarea label="Description" placeholder="Enter description..." rows={3} value="" onInput={() => { }} />
        </div>
      </DemoSection>

      <DemoSection title="Select">
        <div class="max-w-sm">
          <Select
            label="Choose an option"
            value={selectValue()}
            onChange={setSelectValue}
          >
            <option value="">Select...</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Select>
        </div>
      </DemoSection>

      <DemoSection title="Checkbox">
        <Checkbox
          label="Accept terms and conditions"
          checked={checked()}
          onChange={setChecked}
        />
      </DemoSection>

      <DemoSection title="Badge">
        <div class="flex gap-2 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </DemoSection>

      <DemoSection title="JsonSchemaForm">
        <div class="max-w-md">
          <Card class="p-4">
            <JsonSchemaForm
              schema={userSchema}
              value={schemaFormValue()}
              onChange={(v) => setSchemaFormValue(v as Record<string, unknown>)}
            />
          </Card>
          <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
            <p class="text-xs text-surface-500 mb-1">Form value:</p>
            <pre class="text-xs text-surface-700 dark:text-surface-300">
              {JSON.stringify(schemaFormValue(), null, 2)}
            </pre>
          </div>
        </div>
      </DemoSection>

      <RadioGroupDemo />
      <SwitchDemo />
      <SliderDemo />
      <AutocompleteDemo />
      <DatePickerDemo />
      <NumberInputDemo />
      <FileUploadDemo />
      <StepperDemo />
    </>
  );
}

function NumberInputDemo() {
  const [basicValue, setBasicValue] = createSignal(10);
  const [quantityValue, setQuantityValue] = createSignal(1);
  const [temperatureValue, setTemperatureValue] = createSignal(72);

  return (
    <>
      <DemoSection title="NumberInput - Basic">
        <p class="text-sm text-surface-500 mb-3">Numeric input with increment/decrement buttons</p>
        <div class="max-w-xs space-y-4">
          <NumberInput
            label="Basic Number"
            value={basicValue()}
            onChange={setBasicValue}
          />
          <p class="text-xs text-surface-500">Value: {basicValue()}</p>
        </div>
      </DemoSection>

      <DemoSection title="NumberInput - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants: sm, md (default), lg</p>
        <div class="max-w-xs space-y-4">
          <NumberInput
            label="Small"
            size="sm"
            value={basicValue()}
            onChange={setBasicValue}
          />
          <NumberInput
            label="Medium (default)"
            size="md"
            value={basicValue()}
            onChange={setBasicValue}
          />
          <NumberInput
            label="Large"
            size="lg"
            value={basicValue()}
            onChange={setBasicValue}
          />
        </div>
      </DemoSection>

      <DemoSection title="NumberInput - Min/Max Constraints">
        <p class="text-sm text-surface-500 mb-3">Restrict values within a range</p>
        <div class="max-w-xs space-y-4">
          <NumberInput
            label="Quantity (1-10)"
            value={quantityValue()}
            onChange={setQuantityValue}
            min={1}
            max={10}
            step={1}
          />
          <p class="text-xs text-surface-500">Min: 1, Max: 10, Step: 1</p>
        </div>
      </DemoSection>

      <DemoSection title="NumberInput - Custom Step">
        <p class="text-sm text-surface-500 mb-3">Custom increment/decrement step values</p>
        <div class="max-w-xs space-y-4">
          <NumberInput
            label="Temperature (F)"
            value={temperatureValue()}
            onChange={setTemperatureValue}
            min={32}
            max={212}
            step={5}
          />
          <p class="text-xs text-surface-500">Step: 5 (range 32-212)</p>
        </div>
      </DemoSection>

      <DemoSection title="NumberInput - States">
        <p class="text-sm text-surface-500 mb-3">Disabled and error states</p>
        <div class="max-w-xs space-y-4">
          <NumberInput
            label="Disabled"
            value={50}
            onChange={() => {}}
            disabled
          />
          <NumberInput
            label="With Error"
            value={-5}
            onChange={() => {}}
            error="Value must be positive"
          />
        </div>
      </DemoSection>
    </>
  );
}

function FileUploadDemo() {
  const [files, setFiles] = createSignal<File[]>([]);
  const [multipleFiles, setMultipleFiles] = createSignal<File[]>([]);

  return (
    <>
      <DemoSection title="FileUpload - Basic">
        <p class="text-sm text-surface-500 mb-3">Single file upload with drag and drop support</p>
        <div class="max-w-md">
          <FileUpload
            label="Upload File"
            description="Drag and drop a file here, or click to select"
            onFilesChange={setFiles}
          />
          <Show when={files().length > 0}>
            <div class="mt-3 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
              <p class="text-xs text-surface-500 mb-1">Selected file:</p>
              <p class="text-sm font-medium">{files()[0]?.name}</p>
              <p class="text-xs text-surface-500">{(files()[0]?.size / 1024).toFixed(1)} KB</p>
            </div>
          </Show>
        </div>
      </DemoSection>

      <DemoSection title="FileUpload - Multiple Files">
        <p class="text-sm text-surface-500 mb-3">Allow multiple file selection</p>
        <div class="max-w-md">
          <FileUpload
            label="Upload Files"
            description="Drop multiple files or click to select"
            multiple
            maxFiles={5}
            onFilesChange={setMultipleFiles}
          />
          <Show when={multipleFiles().length > 0}>
            <div class="mt-3 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
              <p class="text-xs text-surface-500 mb-2">Selected files ({multipleFiles().length}):</p>
              <ul class="space-y-1">
                <For each={multipleFiles()}>
                  {(file) => (
                    <li class="text-sm flex justify-between">
                      <span>{file.name}</span>
                      <span class="text-surface-500">{(file.size / 1024).toFixed(1)} KB</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </Show>
        </div>
      </DemoSection>

      <DemoSection title="FileUpload - Accept Types">
        <p class="text-sm text-surface-500 mb-3">Restrict accepted file types</p>
        <div class="max-w-md space-y-4">
          <FileUpload
            label="Images Only"
            description="PNG, JPG, GIF up to 5MB"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            onFilesChange={() => {}}
          />
          <FileUpload
            label="Documents"
            description="PDF, DOC, DOCX files"
            accept=".pdf,.doc,.docx"
            onFilesChange={() => {}}
          />
        </div>
      </DemoSection>

      <DemoSection title="FileUpload - States">
        <p class="text-sm text-surface-500 mb-3">Disabled and error states</p>
        <div class="max-w-md space-y-4">
          <FileUpload
            label="Disabled Upload"
            description="This upload is disabled"
            disabled
            onFilesChange={() => {}}
          />
          <FileUpload
            label="With Error"
            description="Upload your file"
            error="File size exceeds the 2MB limit"
            onFilesChange={() => {}}
          />
        </div>
      </DemoSection>
    </>
  );
}

function StepperDemo() {
  const [currentStep, setCurrentStep] = createSignal(1);
  const [verticalStep, setVerticalStep] = createSignal(0);

  const steps = [
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Set up your profile' },
    { label: 'Review', description: 'Review your info' },
    { label: 'Complete', description: 'All done!' },
  ];

  return (
    <>
      <DemoSection title="Stepper - Horizontal">
        <p class="text-sm text-surface-500 mb-3">Horizontal step indicator with navigation</p>
        <div class="space-y-4">
          <Stepper
            steps={steps}
            currentStep={currentStep()}
            onStepClick={setCurrentStep}
            allowClickPrevious
          />
          <div class="flex gap-2 justify-center">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setCurrentStep(Math.max(0, currentStep() - 1))}
              disabled={currentStep() === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep() + 1))}
              disabled={currentStep() === steps.length - 1}
            >
              Next
            </Button>
          </div>
          <p class="text-xs text-center text-surface-500">
            Current step: {currentStep() + 1} of {steps.length} - {steps[currentStep()].label}
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Stepper - Vertical">
        <p class="text-sm text-surface-500 mb-3">Vertical orientation for detailed progress tracking</p>
        <div class="max-w-md">
          <Stepper
            steps={steps}
            currentStep={verticalStep()}
            orientation="vertical"
            onStepClick={setVerticalStep}
            allowClickPrevious
          />
          <div class="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setVerticalStep(Math.max(0, verticalStep() - 1))}
              disabled={verticalStep() === 0}
            >
              Back
            </Button>
            <Button
              size="sm"
              onClick={() => setVerticalStep(Math.min(steps.length - 1, verticalStep() + 1))}
              disabled={verticalStep() === steps.length - 1}
            >
              Continue
            </Button>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Stepper - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">size="sm"</p>
            <Stepper
              steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
              currentStep={1}
              size="sm"
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">size="md" (default)</p>
            <Stepper
              steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
              currentStep={1}
              size="md"
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">size="lg"</p>
            <Stepper
              steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
              currentStep={1}
              size="lg"
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Stepper - Different States">
        <p class="text-sm text-surface-500 mb-3">Steps showing completed, current, and upcoming states</p>
        <Stepper
          steps={[
            { label: 'Completed', description: 'This step is done' },
            { label: 'Completed', description: 'Also finished' },
            { label: 'Current', description: 'You are here' },
            { label: 'Upcoming', description: 'Not yet started' },
          ]}
          currentStep={2}
        />
      </DemoSection>
    </>
  );
}

function RadioGroupDemo() {
  const [selectedSize, setSelectedSize] = createSignal('md');
  const [selectedColor, setSelectedColor] = createSignal('blue');
  const [selectedPlan, setSelectedPlan] = createSignal('free');

  return (
    <>
      <DemoSection title="RadioGroup - Vertical (Default)">
        <p class="text-sm text-surface-500 mb-3">Vertical layout with different sizes</p>
        <div class="flex gap-8 flex-wrap">
          <RadioGroup
            label="Size (sm)"
            size="sm"
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]}
            value={selectedSize()}
            onChange={setSelectedSize}
          />
          <RadioGroup
            label="Size (md)"
            size="md"
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]}
            value={selectedSize()}
            onChange={setSelectedSize}
          />
          <RadioGroup
            label="Size (lg)"
            size="lg"
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]}
            value={selectedSize()}
            onChange={setSelectedSize}
          />
        </div>
        <p class="mt-3 text-xs text-surface-500">Selected: {selectedSize()}</p>
      </DemoSection>

      <DemoSection title="RadioGroup - Horizontal">
        <p class="text-sm text-surface-500 mb-3">Horizontal layout for compact option sets</p>
        <RadioGroup
          label="Choose a color"
          orientation="horizontal"
          options={[
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' },
            { value: 'purple', label: 'Purple' },
          ]}
          value={selectedColor()}
          onChange={setSelectedColor}
        />
        <p class="mt-3 text-xs text-surface-500">Selected: {selectedColor()}</p>
      </DemoSection>

      <DemoSection title="RadioGroup - With Disabled Options">
        <p class="text-sm text-surface-500 mb-3">Some options can be disabled</p>
        <RadioGroup
          label="Select a plan"
          options={[
            { value: 'free', label: 'Free Plan' },
            { value: 'pro', label: 'Pro Plan' },
            { value: 'enterprise', label: 'Enterprise (Coming Soon)', disabled: true },
          ]}
          value={selectedPlan()}
          onChange={setSelectedPlan}
        />
      </DemoSection>

      <DemoSection title="RadioGroup - Error State">
        <p class="text-sm text-surface-500 mb-3">Showing validation errors</p>
        <RadioGroup
          label="Required selection"
          error="Please select an option"
          options={[
            { value: 'opt1', label: 'Option 1' },
            { value: 'opt2', label: 'Option 2' },
            { value: 'opt3', label: 'Option 3' },
          ]}
          value=""
          onChange={() => {}}
        />
      </DemoSection>
    </>
  );
}

function SwitchDemo() {
  const [notifications, setNotifications] = createSignal(true);
  const [darkMode, setDarkMode] = createSignal(false);
  const [autoSave, setAutoSave] = createSignal(true);
  const [marketing, setMarketing] = createSignal(false);

  return (
    <>
      <DemoSection title="Switch - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants: sm, md (default), lg</p>
        <div class="space-y-4">
          <Switch
            size="sm"
            label="Small switch"
            checked={notifications()}
            onChange={setNotifications}
          />
          <Switch
            size="md"
            label="Medium switch (default)"
            checked={darkMode()}
            onChange={setDarkMode}
          />
          <Switch
            size="lg"
            label="Large switch"
            checked={autoSave()}
            onChange={setAutoSave}
          />
        </div>
      </DemoSection>

      <DemoSection title="Switch - Label Positions">
        <p class="text-sm text-surface-500 mb-3">Labels can appear on the left or right</p>
        <div class="space-y-4">
          <Switch
            label="Label on right (default)"
            labelPosition="right"
            checked={notifications()}
            onChange={setNotifications}
          />
          <Switch
            label="Label on left"
            labelPosition="left"
            checked={marketing()}
            onChange={setMarketing}
          />
        </div>
      </DemoSection>

      <DemoSection title="Switch - States">
        <p class="text-sm text-surface-500 mb-3">Disabled state</p>
        <div class="space-y-4">
          <Switch
            label="Disabled (off)"
            disabled
            checked={false}
            onChange={() => {}}
          />
          <Switch
            label="Disabled (on)"
            disabled
            checked={true}
            onChange={() => {}}
          />
        </div>
      </DemoSection>

      <DemoSection title="Switch - Settings Example">
        <p class="text-sm text-surface-500 mb-3">Real-world settings panel</p>
        <Card class="p-4 max-w-md">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-surface-900 dark:text-white">Push Notifications</div>
                <div class="text-xs text-surface-500">Receive push notifications on your device</div>
              </div>
              <Switch checked={notifications()} onChange={setNotifications} />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-surface-900 dark:text-white">Dark Mode</div>
                <div class="text-xs text-surface-500">Use dark theme throughout the app</div>
              </div>
              <Switch checked={darkMode()} onChange={setDarkMode} />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-surface-900 dark:text-white">Auto-save</div>
                <div class="text-xs text-surface-500">Automatically save your work</div>
              </div>
              <Switch checked={autoSave()} onChange={setAutoSave} />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-surface-900 dark:text-white">Marketing emails</div>
                <div class="text-xs text-surface-500">Receive promotional emails</div>
              </div>
              <Switch checked={marketing()} onChange={setMarketing} />
            </div>
          </div>
        </Card>
      </DemoSection>
    </>
  );
}

function SliderDemo() {
  const [basicValue, setBasicValue] = createSignal(50);
  const [volumeValue, setVolumeValue] = createSignal(75);
  const [priceValue, setPriceValue] = createSignal(250);
  const [ratingValue, setRatingValue] = createSignal(3);

  return (
    <>
      <DemoSection title="Slider - Basic">
        <p class="text-sm text-surface-500 mb-3">Simple slider with label and value display</p>
        <div class="max-w-md space-y-6">
          <Slider
            label="Basic Slider"
            value={basicValue()}
            onChange={setBasicValue}
          />
          <Slider
            label="With Value Display"
            value={volumeValue()}
            onChange={setVolumeValue}
            showValue
          />
        </div>
      </DemoSection>

      <DemoSection title="Slider - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants</p>
        <div class="max-w-md space-y-6">
          <Slider
            label="Small"
            size="sm"
            value={basicValue()}
            onChange={setBasicValue}
            showValue
          />
          <Slider
            label="Medium (default)"
            size="md"
            value={basicValue()}
            onChange={setBasicValue}
            showValue
          />
          <Slider
            label="Large"
            size="lg"
            value={basicValue()}
            onChange={setBasicValue}
            showValue
          />
        </div>
      </DemoSection>

      <DemoSection title="Slider - With Marks">
        <p class="text-sm text-surface-500 mb-3">Show tick marks at specific values</p>
        <div class="max-w-md space-y-8">
          <Slider
            label="Rating (1-5)"
            min={1}
            max={5}
            step={1}
            value={ratingValue()}
            onChange={setRatingValue}
            showValue
            marks={[
              { value: 1, label: 'Poor' },
              { value: 2, label: 'Fair' },
              { value: 3, label: 'Good' },
              { value: 4, label: 'Great' },
              { value: 5, label: 'Excellent' },
            ]}
          />
          <Slider
            label="Price Range"
            min={0}
            max={1000}
            step={50}
            value={priceValue()}
            onChange={setPriceValue}
            showValue
            marks={[
              { value: 0, label: '$0' },
              { value: 250, label: '$250' },
              { value: 500, label: '$500' },
              { value: 750, label: '$750' },
              { value: 1000, label: '$1000' },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection title="Slider - Custom Range & Step">
        <p class="text-sm text-surface-500 mb-3">Configure min, max, and step values</p>
        <div class="max-w-md space-y-6">
          <Slider
            label="Temperature (0-100)"
            min={0}
            max={100}
            step={5}
            value={basicValue()}
            onChange={setBasicValue}
            showValue
          />
          <Slider
            label="Percentage (0-100, step 10)"
            min={0}
            max={100}
            step={10}
            value={volumeValue()}
            onChange={setVolumeValue}
            showValue
          />
        </div>
      </DemoSection>

      <DemoSection title="Slider - Disabled">
        <p class="text-sm text-surface-500 mb-3">Disabled state</p>
        <div class="max-w-md">
          <Slider
            label="Disabled Slider"
            disabled
            value={50}
            onChange={() => {}}
            showValue
          />
        </div>
      </DemoSection>
    </>
  );
}

function AutocompleteDemo() {
  const [selectedFruit, setSelectedFruit] = createSignal('');
  const [selectedCountry, setSelectedCountry] = createSignal('');
  const [asyncValue, setAsyncValue] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [asyncOptions, setAsyncOptions] = createSignal<Array<{ value: string; label: string }>>([]);

  const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'honeydew', label: 'Honeydew' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico', disabled: true },
  ];

  // Simulate async search
  const handleAsyncInput = (input: string) => {
    if (input.length < 2) {
      setAsyncOptions([]);
      return;
    }
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const results = [
        { value: `${input}-1`, label: `Result for "${input}" #1` },
        { value: `${input}-2`, label: `Result for "${input}" #2` },
        { value: `${input}-3`, label: `Result for "${input}" #3` },
      ];
      setAsyncOptions(results);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      <DemoSection title="Autocomplete - Basic">
        <p class="text-sm text-surface-500 mb-3">Type to filter options from a list</p>
        <div class="max-w-sm">
          <Autocomplete
            label="Select a fruit"
            placeholder="Type to search..."
            options={fruitOptions}
            value={selectedFruit()}
            onChange={setSelectedFruit}
          />
          <p class="mt-2 text-xs text-surface-500">Selected: {selectedFruit() || 'none'}</p>
        </div>
      </DemoSection>

      <DemoSection title="Autocomplete - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants</p>
        <div class="max-w-sm space-y-4">
          <Autocomplete
            label="Small"
            size="sm"
            placeholder="Type to search..."
            options={fruitOptions}
            value={selectedFruit()}
            onChange={setSelectedFruit}
          />
          <Autocomplete
            label="Medium (default)"
            size="md"
            placeholder="Type to search..."
            options={fruitOptions}
            value={selectedFruit()}
            onChange={setSelectedFruit}
          />
          <Autocomplete
            label="Large"
            size="lg"
            placeholder="Type to search..."
            options={fruitOptions}
            value={selectedFruit()}
            onChange={setSelectedFruit}
          />
        </div>
      </DemoSection>

      <DemoSection title="Autocomplete - With Disabled Options">
        <p class="text-sm text-surface-500 mb-3">Some options can be disabled</p>
        <div class="max-w-sm">
          <Autocomplete
            label="Select a country"
            placeholder="Search countries..."
            options={countryOptions}
            value={selectedCountry()}
            onChange={setSelectedCountry}
          />
          <p class="mt-2 text-xs text-surface-500">Note: Mexico is disabled</p>
        </div>
      </DemoSection>

      <DemoSection title="Autocomplete - Async Loading">
        <p class="text-sm text-surface-500 mb-3">Simulate async data fetching (type at least 2 characters)</p>
        <div class="max-w-sm">
          <Autocomplete
            label="Search (async)"
            placeholder="Type at least 2 characters..."
            options={asyncOptions()}
            value={asyncValue()}
            onChange={setAsyncValue}
            onInputChange={handleAsyncInput}
            loading={isLoading()}
            emptyText="Type to search..."
          />
        </div>
      </DemoSection>

      <DemoSection title="Autocomplete - States">
        <p class="text-sm text-surface-500 mb-3">Error and disabled states</p>
        <div class="max-w-sm space-y-4">
          <Autocomplete
            label="With Error"
            placeholder="Type to search..."
            options={fruitOptions}
            value=""
            onChange={() => {}}
            error="Please select an option"
          />
          <Autocomplete
            label="Disabled"
            placeholder="Type to search..."
            options={fruitOptions}
            value="apple"
            onChange={() => {}}
            disabled
          />
        </div>
      </DemoSection>
    </>
  );
}

function DatePickerDemo() {
  const [basicDate, setBasicDate] = createSignal<Date | null>(null);
  const [rangeDate, setRangeDate] = createSignal<Date | null>(new Date());
  const [formatDate, setFormatDate] = createSignal<Date | null>(new Date());

  // Min date: 7 days ago, Max date: 30 days from now
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <>
      <DemoSection title="DatePicker - Basic">
        <p class="text-sm text-surface-500 mb-3">Click to open calendar picker</p>
        <div class="max-w-sm">
          <DatePicker
            label="Select a date"
            placeholder="Choose a date..."
            value={basicDate()}
            onChange={setBasicDate}
          />
          <p class="mt-2 text-xs text-surface-500">
            Selected: {basicDate() ? basicDate()!.toLocaleDateString() : 'none'}
          </p>
        </div>
      </DemoSection>

      <DemoSection title="DatePicker - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants</p>
        <div class="max-w-sm space-y-4">
          <DatePicker
            label="Small"
            size="sm"
            value={basicDate()}
            onChange={setBasicDate}
          />
          <DatePicker
            label="Medium (default)"
            size="md"
            value={basicDate()}
            onChange={setBasicDate}
          />
          <DatePicker
            label="Large"
            size="lg"
            value={basicDate()}
            onChange={setBasicDate}
          />
        </div>
      </DemoSection>

      <DemoSection title="DatePicker - With Min/Max Dates">
        <p class="text-sm text-surface-500 mb-3">Restrict selectable date range (7 days ago to 30 days from now)</p>
        <div class="max-w-sm">
          <DatePicker
            label="Select within range"
            value={rangeDate()}
            onChange={setRangeDate}
            min={minDate}
            max={maxDate}
          />
          <p class="mt-2 text-xs text-surface-500">
            Range: {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
          </p>
        </div>
      </DemoSection>

      <DemoSection title="DatePicker - Clearable">
        <p class="text-sm text-surface-500 mb-3">Show clear button to reset selection</p>
        <div class="max-w-sm">
          <DatePicker
            label="Clearable date"
            value={basicDate()}
            onChange={setBasicDate}
            clearable
          />
        </div>
      </DemoSection>

      <DemoSection title="DatePicker - Date Formats">
        <p class="text-sm text-surface-500 mb-3">Different display format options</p>
        <div class="max-w-sm space-y-4">
          <DatePicker
            label="ISO Format (yyyy-MM-dd)"
            format="yyyy-MM-dd"
            value={formatDate()}
            onChange={setFormatDate}
          />
          <DatePicker
            label="US Format (MM/dd/yyyy)"
            format="MM/dd/yyyy"
            value={formatDate()}
            onChange={setFormatDate}
          />
          <DatePicker
            label="EU Format (dd/MM/yyyy)"
            format="dd/MM/yyyy"
            value={formatDate()}
            onChange={setFormatDate}
          />
          <DatePicker
            label="Verbose (MMM dd, yyyy)"
            format="MMM dd, yyyy"
            value={formatDate()}
            onChange={setFormatDate}
          />
        </div>
      </DemoSection>

      <DemoSection title="DatePicker - Week Start">
        <p class="text-sm text-surface-500 mb-3">Calendar can start on Sunday (US) or Monday (EU)</p>
        <div class="flex gap-4 flex-wrap">
          <div class="flex-1 min-w-[200px]">
            <DatePicker
              label="Week starts Sunday"
              weekStartsOn={0}
              value={basicDate()}
              onChange={setBasicDate}
            />
          </div>
          <div class="flex-1 min-w-[200px]">
            <DatePicker
              label="Week starts Monday"
              weekStartsOn={1}
              value={basicDate()}
              onChange={setBasicDate}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="DatePicker - States">
        <p class="text-sm text-surface-500 mb-3">Error and disabled states</p>
        <div class="max-w-sm space-y-4">
          <DatePicker
            label="With Error"
            value={null}
            onChange={() => {}}
            error="Please select a date"
          />
          <DatePicker
            label="Disabled"
            value={new Date()}
            onChange={() => {}}
            disabled
          />
        </div>
      </DemoSection>
    </>
  );
}

function FeedbackDemo() {
  const [progress, setProgress] = createSignal(65);

  return (
    <>
      <DemoSection title="Alert">
        <div class="space-y-2">
          <Alert type="info" title="Information">
            This is an informational message.
          </Alert>
          <Alert type="success" title="Success">
            Operation completed successfully!
          </Alert>
          <Alert type="warning" title="Warning">
            Please review before continuing.
          </Alert>
          <Alert type="error" title="Error">
            Something went wrong.
          </Alert>
        </div>
      </DemoSection>

      <DemoSection title="Progress (Linear)">
        <div class="space-y-4 max-w-md">
          <Progress value={progress()} />
          <Progress value={progress()} color="success" />
          <Progress value={30} color="warning" />
          <div class="flex gap-2">
            <Button size="sm" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
              -10%
            </Button>
            <Button size="sm" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
              +10%
            </Button>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Progress (Circular)">
        <div class="flex gap-6 items-center">
          <Progress variant="circular" value={progress()} size="sm" />
          <Progress variant="circular" value={progress()} size="md" showValue />
          <Progress variant="circular" value={progress()} size="lg" showValue />
          <Progress variant="circular" value={75} color="success" size="md" showValue />
          <Progress variant="circular" value={30} color="warning" size="md" />
          <Progress variant="circular" value={50} color="error" size="md" />
        </div>
      </DemoSection>

      <DemoSection title="Spinner - Sizes">
        <p class="text-sm text-surface-500 mb-3">Four size variants: sm, md, lg, xl</p>
        <div class="flex gap-6 items-center">
          <div class="text-center">
            <Spinner size="sm" />
            <p class="text-xs text-surface-500 mt-2">sm</p>
          </div>
          <div class="text-center">
            <Spinner size="md" />
            <p class="text-xs text-surface-500 mt-2">md</p>
          </div>
          <div class="text-center">
            <Spinner size="lg" />
            <p class="text-xs text-surface-500 mt-2">lg</p>
          </div>
          <div class="text-center">
            <Spinner size="xl" />
            <p class="text-xs text-surface-500 mt-2">xl</p>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Spinner - Colors">
        <p class="text-sm text-surface-500 mb-3">Default and white color variants</p>
        <div class="flex gap-8 items-center">
          <div class="p-4">
            <Spinner size="lg" color="default" />
            <p class="text-xs text-surface-500 mt-2 text-center">default</p>
          </div>
          <div class="p-4 bg-accent-500 rounded-lg">
            <Spinner size="lg" color="white" />
            <p class="text-xs text-white/80 mt-2 text-center">white</p>
          </div>
          <div class="p-4 bg-surface-900 rounded-lg">
            <Spinner size="lg" color="white" />
            <p class="text-xs text-white/80 mt-2 text-center">white</p>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Spinner - With Label">
        <p class="text-sm text-surface-500 mb-3">Spinners can include a label</p>
        <div class="flex gap-8 items-center flex-wrap">
          <Spinner size="md" label="Loading..." />
          <Spinner size="lg" label="Please wait" />
        </div>
      </DemoSection>

      <DemoSection title="Spinner - Centered">
        <p class="text-sm text-surface-500 mb-3">Centered spinner for full-width containers</p>
        <Card class="p-8">
          <Spinner size="lg" label="Loading content..." centered />
        </Card>
      </DemoSection>

      <DemoSection title="Skeleton">
        <div class="space-y-2 max-w-md">
          <Skeleton height="1rem" width="60%" />
          <Skeleton height="1rem" width="80%" />
          <Skeleton height="1rem" width="40%" />
          <Skeleton height="4rem" class="mt-4" />
        </div>
      </DemoSection>

      <DemoSection title="Toast">
        <div class="flex gap-2 flex-wrap">
          <Button onClick={() => toast.success('Success message!')}>Success Toast</Button>
          <Button variant="secondary" onClick={() => toast.error('Error message!')}>
            Error Toast
          </Button>
          <Button variant="ghost" onClick={() => toast.info('Info message!')}>
            Info Toast
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="Snackbar">
        <div class="flex gap-2 flex-wrap">
          <Button onClick={() => snackbar.show('This is a snackbar notification')}>
            Show Snackbar
          </Button>
          <Button
            variant="secondary"
            onClick={() => snackbar.show('With action!', { action: 'Undo', onAction: () => console.log('Undo clicked') })}
          >
            With Action
          </Button>
          <Button variant="ghost" onClick={() => snackbar.clear()}>
            Clear All
          </Button>
        </div>
      </DemoSection>

      <DemoSection title="ErrorDisplay">
        <div class="space-y-4 max-w-lg">
          <ErrorDisplay message="Unable to connect to the server. Please check your internet connection." />
          <ErrorDisplay
            title="Validation Error"
            message="The email address you entered is not valid. Please try again."
          />
        </div>
      </DemoSection>

      <DemoSection title="EmptyState">
        <p class="text-sm text-surface-500 mb-3">Placeholder content for empty data states</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">Basic empty state</p>
            <Card class="p-8">
              <EmptyState
                title="No items found"
                description="There are no items to display at this time."
              />
            </Card>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">With icon and action button</p>
            <Card class="p-8">
              <EmptyState
                icon={
                  <svg class="w-12 h-12 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                }
                title="Your inbox is empty"
                description="You have no new messages. When someone sends you a message, it will appear here."
                action={<Button>Compose Message</Button>}
              />
            </Card>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Different sizes</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card class="p-4">
                <EmptyState
                  size="sm"
                  icon={
                    <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                  title="No documents"
                  description="Upload your first document"
                />
              </Card>
              <Card class="p-6">
                <EmptyState
                  size="md"
                  icon={
                    <svg class="w-10 h-10 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                  title="No team members"
                  description="Invite people to collaborate"
                />
              </Card>
              <Card class="p-8">
                <EmptyState
                  size="lg"
                  icon={
                    <svg class="w-16 h-16 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  title="No images"
                  description="Start by uploading some photos"
                  action={<Button size="sm">Upload Images</Button>}
                />
              </Card>
            </div>
          </div>
        </div>
      </DemoSection>
    </>
  );
}

// Context menu demo data
interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
}

const demoFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder' },
  { id: '2', name: 'report.pdf', type: 'file', size: '2.4 MB' },
  { id: '3', name: 'photo.jpg', type: 'file', size: '1.2 MB' },
  { id: '4', name: 'Projects', type: 'folder' },
  { id: '5', name: 'notes.txt', type: 'file', size: '12 KB' },
];

function ContextMenuDemo() {
  const menu = createContextMenu<FileItem>();

  const handleAction = (action: string, file: FileItem | null) => {
    if (file) {
      toast.info(`${action}: ${file.name}`);
    }
  };

  return (
    <>
      <DemoSection title="ContextMenu - Simple">
        <p class="text-sm text-surface-500 mb-3">Right-click on the area below to open the context menu.</p>
        <ContextMenu>
          <ContextMenuTrigger>
            <div class="p-8 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl text-center text-surface-500">
              Right-click here
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => toast.info('New File')}>
              New File
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => toast.info('New Folder')}>
              New Folder
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => toast.info('Paste')}>
              Paste
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => toast.info('Refresh')}>
              Refresh
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DemoSection>

      <DemoSection title="ContextMenu - With Data (List)">
        <p class="text-sm text-surface-500 mb-3">
          Right-click on any file to see contextual actions. The menu adapts based on which item you clicked.
        </p>
        <ContextMenu {...menu.props}>
          <div class="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
            <For each={demoFiles}>
              {(file) => (
                <ContextMenuTrigger data={file}>
                  <div class="flex items-center gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800/50 cursor-default border-b border-surface-100 dark:border-surface-800 last:border-b-0">
                    <span class="text-xl">
                      {file.type === 'folder' ? '📁' : '📄'}
                    </span>
                    <div class="flex-1">
                      <div class="font-medium text-surface-900 dark:text-white">{file.name}</div>
                      {file.size && (
                        <div class="text-xs text-surface-500">{file.size}</div>
                      )}
                    </div>
                  </div>
                </ContextMenuTrigger>
              )}
            </For>
          </div>

          <ContextMenuContent>
            <ContextMenuItem onSelect={() => handleAction('Open', menu.data())}>
              Open "{menu.data()?.name}"
            </ContextMenuItem>
            <ContextMenuItem
              shortcut="Cmd+C"
              onSelect={() => handleAction('Copy', menu.data())}
            >
              Copy
            </ContextMenuItem>
            <ContextMenuItem
              shortcut="Cmd+X"
              onSelect={() => handleAction('Cut', menu.data())}
            >
              Cut
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={() => handleAction('Rename', menu.data())}>
              Rename
            </ContextMenuItem>
            <ContextMenuItem
              destructive
              shortcut="Cmd+Del"
              onSelect={() => handleAction('Delete', menu.data())}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DemoSection>
    </>
  );
}

function PopoverDemo() {
  return (
    <>
      <DemoSection title="Popover - Basic">
        <p class="text-sm text-surface-500 mb-3">Click trigger to show popover content</p>
        <div class="flex gap-4 flex-wrap">
          <Popover
            trigger={<Button variant="secondary">Click me</Button>}
          >
            <div class="p-3 w-64">
              <h4 class="font-medium text-surface-900 dark:text-white mb-2">Popover Content</h4>
              <p class="text-sm text-surface-600 dark:text-surface-400">
                This is a basic popover with some content inside. It can contain any elements.
              </p>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection title="Popover - Placements">
        <p class="text-sm text-surface-500 mb-3">All 12 placement options</p>
        <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto py-8">
          {/* Top row */}
          <Popover placement="top-start" trigger={<Button size="sm" variant="ghost" class="w-full">top-start</Button>}>
            <div class="p-2 text-sm">Top Start</div>
          </Popover>
          <Popover placement="top" trigger={<Button size="sm" variant="ghost" class="w-full">top</Button>}>
            <div class="p-2 text-sm">Top Center</div>
          </Popover>
          <Popover placement="top-end" trigger={<Button size="sm" variant="ghost" class="w-full">top-end</Button>}>
            <div class="p-2 text-sm">Top End</div>
          </Popover>

          {/* Middle rows */}
          <Popover placement="left-start" trigger={<Button size="sm" variant="ghost" class="w-full">left-start</Button>}>
            <div class="p-2 text-sm">Left Start</div>
          </Popover>
          <div></div>
          <Popover placement="right-start" trigger={<Button size="sm" variant="ghost" class="w-full">right-start</Button>}>
            <div class="p-2 text-sm">Right Start</div>
          </Popover>

          <Popover placement="left" trigger={<Button size="sm" variant="ghost" class="w-full">left</Button>}>
            <div class="p-2 text-sm">Left Center</div>
          </Popover>
          <div></div>
          <Popover placement="right" trigger={<Button size="sm" variant="ghost" class="w-full">right</Button>}>
            <div class="p-2 text-sm">Right Center</div>
          </Popover>

          <Popover placement="left-end" trigger={<Button size="sm" variant="ghost" class="w-full">left-end</Button>}>
            <div class="p-2 text-sm">Left End</div>
          </Popover>
          <div></div>
          <Popover placement="right-end" trigger={<Button size="sm" variant="ghost" class="w-full">right-end</Button>}>
            <div class="p-2 text-sm">Right End</div>
          </Popover>

          {/* Bottom row */}
          <Popover placement="bottom-start" trigger={<Button size="sm" variant="ghost" class="w-full">bottom-start</Button>}>
            <div class="p-2 text-sm">Bottom Start</div>
          </Popover>
          <Popover placement="bottom" trigger={<Button size="sm" variant="ghost" class="w-full">bottom</Button>}>
            <div class="p-2 text-sm">Bottom Center</div>
          </Popover>
          <Popover placement="bottom-end" trigger={<Button size="sm" variant="ghost" class="w-full">bottom-end</Button>}>
            <div class="p-2 text-sm">Bottom End</div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection title="Popover - With Arrow">
        <p class="text-sm text-surface-500 mb-3">Show an arrow pointing to the trigger</p>
        <div class="flex gap-4 flex-wrap items-center">
          <Popover
            showArrow
            placement="top"
            trigger={<Button variant="secondary">Arrow Top</Button>}
          >
            <div class="p-3">
              <p class="text-sm">Popover with arrow pointing down</p>
            </div>
          </Popover>
          <Popover
            showArrow
            placement="right"
            trigger={<Button variant="secondary">Arrow Right</Button>}
          >
            <div class="p-3">
              <p class="text-sm">Popover with arrow pointing left</p>
            </div>
          </Popover>
          <Popover
            showArrow
            placement="bottom"
            trigger={<Button variant="secondary">Arrow Bottom</Button>}
          >
            <div class="p-3">
              <p class="text-sm">Popover with arrow pointing up</p>
            </div>
          </Popover>
          <Popover
            showArrow
            placement="left"
            trigger={<Button variant="secondary">Arrow Left</Button>}
          >
            <div class="p-3">
              <p class="text-sm">Popover with arrow pointing right</p>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection title="Popover - Rich Content">
        <p class="text-sm text-surface-500 mb-3">Popovers can contain any content including forms</p>
        <div class="flex gap-4 flex-wrap">
          <Popover
            showArrow
            placement="bottom-start"
            trigger={<Button>User Profile</Button>}
          >
            <div class="p-4 w-72">
              <div class="flex items-center gap-3 mb-3">
                <Avatar name="John Doe" size="lg" />
                <div>
                  <div class="font-medium text-surface-900 dark:text-white">John Doe</div>
                  <div class="text-sm text-surface-500">john@example.com</div>
                </div>
              </div>
              <div class="border-t border-surface-200 dark:border-surface-700 pt-3 space-y-2">
                <Button size="sm" variant="secondary" class="w-full">View Profile</Button>
                <Button size="sm" variant="ghost" class="w-full">Sign Out</Button>
              </div>
            </div>
          </Popover>

          <Popover
            showArrow
            placement="bottom"
            trigger={<Button variant="secondary">Feedback</Button>}
          >
            <div class="p-4 w-80">
              <h4 class="font-medium text-surface-900 dark:text-white mb-3">Send Feedback</h4>
              <Textarea
                placeholder="Tell us what you think..."
                rows={3}
                value=""
                onInput={() => {}}
              />
              <div class="mt-3 flex justify-end gap-2">
                <Button size="sm" variant="ghost">Cancel</Button>
                <Button size="sm">Submit</Button>
              </div>
            </div>
          </Popover>
        </div>
      </DemoSection>

      <DemoSection title="Popover - Custom Offset">
        <p class="text-sm text-surface-500 mb-3">Adjust the distance from the trigger</p>
        <div class="flex gap-4 flex-wrap">
          <Popover
            offset={4}
            showArrow
            trigger={<Button size="sm" variant="ghost">Offset 4px</Button>}
          >
            <div class="p-2 text-sm">Very close</div>
          </Popover>
          <Popover
            offset={8}
            showArrow
            trigger={<Button size="sm" variant="ghost">Offset 8px (default)</Button>}
          >
            <div class="p-2 text-sm">Default distance</div>
          </Popover>
          <Popover
            offset={16}
            showArrow
            trigger={<Button size="sm" variant="ghost">Offset 16px</Button>}
          >
            <div class="p-2 text-sm">Further away</div>
          </Popover>
          <Popover
            offset={24}
            showArrow
            trigger={<Button size="sm" variant="ghost">Offset 24px</Button>}
          >
            <div class="p-2 text-sm">Even further</div>
          </Popover>
        </div>
      </DemoSection>
    </>
  );
}

// Command palette items for demo
const commandPaletteItems: CommandPaletteItemType[] = [
  { id: 'search', label: 'Search files', description: 'Find files in project', keywords: ['find', 'locate'] },
  { id: 'settings', label: 'Open settings', description: 'Configure preferences', group: 'Preferences' },
  { id: 'theme', label: 'Toggle theme', description: 'Switch between light and dark mode', group: 'Preferences', keywords: ['dark', 'light'] },
  { id: 'new-file', label: 'New file', description: 'Create a new file', group: 'Actions' },
  { id: 'new-folder', label: 'New folder', description: 'Create a new folder', group: 'Actions' },
  { id: 'git-commit', label: 'Git: Commit', description: 'Commit staged changes', group: 'Git' },
  { id: 'git-push', label: 'Git: Push', description: 'Push to remote', group: 'Git' },
  { id: 'git-pull', label: 'Git: Pull', description: 'Pull from remote', group: 'Git' },
  { id: 'format', label: 'Format document', description: 'Format current file' },
  { id: 'reload', label: 'Reload window', description: 'Reload the application window' },
];

function NavigationDemo() {
  const [activeTab, setActiveTab] = createSignal('tab1');
  const [segment, setSegment] = createSignal<'day' | 'week' | 'month'>('day');
  const [page, setPage] = createSignal(1);
  const [dropdownOpen, setDropdownOpen] = createSignal(false);
  const [paletteOpen, setPaletteOpen] = createSignal(false);
  const [recentIds, setRecentIds] = createSignal<string[]>([]);
  let paletteHandle: CommandPaletteHandle | undefined;

  const handleCommandSelect = (item: CommandPaletteItemType) => {
    // Update recents
    setRecentIds((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 5));
    toast.info(`Selected: ${item.label}`);
  };

  return (
    <>
      <DemoSection title="CommandPalette">
        <p class="text-sm text-surface-500 mb-4">
          Press <kbd class="px-1.5 py-0.5 text-xs bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">⌘K</kbd> or click the button to open.
        </p>
        <div class="flex gap-2 flex-wrap">
          <Button onClick={() => paletteHandle?.open()}>Open Command Palette</Button>
          <Button variant="secondary" onClick={() => setPaletteOpen(true)}>Controlled Open</Button>
        </div>
        <CommandPalette
          items={commandPaletteItems}
          onSelect={handleCommandSelect}
          recentIds={recentIds()}
          placeholder="Type a command or search..."
          ref={(handle) => (paletteHandle = handle)}
        />
        <CommandPalette
          items={commandPaletteItems}
          onSelect={handleCommandSelect}
          recentIds={recentIds()}
          open={paletteOpen()}
          onOpenChange={setPaletteOpen}
          disableShortcut
          placeholder="Controlled palette..."
        />
      </DemoSection>

      <DemoSection title="Tabs - Variants">
        <p class="text-sm text-surface-500 mb-4">Three visual variants: pills (default), underline, enclosed</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">variant="pills" (default)</p>
            <Tabs
              variant="pills"
              items={[
                { id: 'tab1', label: 'Overview', content: <p class="text-surface-600 dark:text-surface-400">Pills variant content - Overview</p> },
                { id: 'tab2', label: 'Details', content: <p class="text-surface-600 dark:text-surface-400">Pills variant content - Details</p> },
                { id: 'tab3', label: 'Settings', content: <p class="text-surface-600 dark:text-surface-400">Pills variant content - Settings</p> },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">variant="underline"</p>
            <Tabs
              variant="underline"
              items={[
                { id: 'tab1', label: 'Overview', content: <p class="text-surface-600 dark:text-surface-400">Underline variant content - Overview</p> },
                { id: 'tab2', label: 'Details', content: <p class="text-surface-600 dark:text-surface-400">Underline variant content - Details</p> },
                { id: 'tab3', label: 'Settings', content: <p class="text-surface-600 dark:text-surface-400">Underline variant content - Settings</p> },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">variant="enclosed"</p>
            <Tabs
              variant="enclosed"
              items={[
                { id: 'tab1', label: 'Overview', content: <p class="text-surface-600 dark:text-surface-400">Enclosed variant content - Overview. This variant has a bordered content area.</p> },
                { id: 'tab2', label: 'Details', content: <p class="text-surface-600 dark:text-surface-400">Enclosed variant content - Details</p> },
                { id: 'tab3', label: 'Settings', content: <p class="text-surface-600 dark:text-surface-400">Enclosed variant content - Settings</p> },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Tabs - Sizes">
        <p class="text-sm text-surface-500 mb-4">Three sizes: sm, md (default), lg</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">size="sm"</p>
            <Tabs
              size="sm"
              items={[
                { id: 'tab1', label: 'Small', content: <p class="text-surface-600 dark:text-surface-400 text-sm">Small tabs content</p> },
                { id: 'tab2', label: 'Tabs', content: <p class="text-surface-600 dark:text-surface-400 text-sm">Content 2</p> },
                { id: 'tab3', label: 'Here', content: <p class="text-surface-600 dark:text-surface-400 text-sm">Content 3</p> },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">size="md" (default)</p>
            <Tabs
              size="md"
              items={[
                { id: 'tab1', label: 'Medium', content: <p class="text-surface-600 dark:text-surface-400">Medium tabs content</p> },
                { id: 'tab2', label: 'Tabs', content: <p class="text-surface-600 dark:text-surface-400">Content 2</p> },
                { id: 'tab3', label: 'Here', content: <p class="text-surface-600 dark:text-surface-400">Content 3</p> },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">size="lg"</p>
            <Tabs
              size="lg"
              items={[
                { id: 'tab1', label: 'Large', content: <p class="text-surface-600 dark:text-surface-400 text-lg">Large tabs content</p> },
                { id: 'tab2', label: 'Tabs', content: <p class="text-surface-600 dark:text-surface-400 text-lg">Content 2</p> },
                { id: 'tab3', label: 'Here', content: <p class="text-surface-600 dark:text-surface-400 text-lg">Content 3</p> },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Tabs - Full Width">
        <p class="text-sm text-surface-500 mb-4">Tabs stretch to fill available width</p>
        <Tabs
          fullWidth
          items={[
            { id: 'tab1', label: 'First', content: <p class="text-surface-600 dark:text-surface-400">Full width tab 1</p> },
            { id: 'tab2', label: 'Second', content: <p class="text-surface-600 dark:text-surface-400">Full width tab 2</p> },
            { id: 'tab3', label: 'Third', content: <p class="text-surface-600 dark:text-surface-400">Full width tab 3</p> },
          ]}
        />
        <div class="mt-4">
          <p class="text-xs text-surface-400 mb-2">fullWidth + variant="underline"</p>
          <Tabs
            fullWidth
            variant="underline"
            items={[
              { id: 'tab1', label: 'Tab 1', content: <p class="text-surface-600 dark:text-surface-400">Content 1</p> },
              { id: 'tab2', label: 'Tab 2', content: <p class="text-surface-600 dark:text-surface-400">Content 2</p> },
              { id: 'tab3', label: 'Tab 3', content: <p class="text-surface-600 dark:text-surface-400">Content 3</p> },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection title="Tabs - With Icons & Badges">
        <p class="text-sm text-surface-500 mb-4">Tabs can have icons and badge counts</p>
        <Tabs
          items={[
            {
              id: 'inbox',
              label: 'Inbox',
              badge: 12,
              icon: <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
              content: <p class="text-surface-600 dark:text-surface-400">You have 12 new messages in your inbox.</p>
            },
            {
              id: 'sent',
              label: 'Sent',
              icon: <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
              content: <p class="text-surface-600 dark:text-surface-400">Sent messages appear here.</p>
            },
            {
              id: 'drafts',
              label: 'Drafts',
              badge: 3,
              icon: <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
              content: <p class="text-surface-600 dark:text-surface-400">You have 3 draft messages.</p>
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Tabs - Disabled">
        <p class="text-sm text-surface-500 mb-4">Individual tabs can be disabled</p>
        <Tabs
          items={[
            { id: 'tab1', label: 'Active Tab', content: <p class="text-surface-600 dark:text-surface-400">This tab is enabled</p> },
            { id: 'tab2', label: 'Disabled', disabled: true, content: <p class="text-surface-600 dark:text-surface-400">You shouldn't see this</p> },
            { id: 'tab3', label: 'Another Active', content: <p class="text-surface-600 dark:text-surface-400">This tab is also enabled</p> },
            { id: 'tab4', label: 'Also Disabled', disabled: true, badge: 5, content: <p class="text-surface-600 dark:text-surface-400">You shouldn't see this either</p> },
          ]}
        />
      </DemoSection>

      <DemoSection title="Tabs - Vertical Orientation">
        <p class="text-sm text-surface-500 mb-4">Tabs can be displayed vertically</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">orientation="vertical" + variant="pills"</p>
            <Tabs
              orientation="vertical"
              variant="pills"
              items={[
                { id: 'account', label: 'Account', content: <div class="text-surface-600 dark:text-surface-400"><h4 class="font-medium mb-2">Account Settings</h4><p>Manage your account details and preferences.</p></div> },
                { id: 'security', label: 'Security', content: <div class="text-surface-600 dark:text-surface-400"><h4 class="font-medium mb-2">Security Settings</h4><p>Password, 2FA, and security options.</p></div> },
                { id: 'notifications', label: 'Notifications', content: <div class="text-surface-600 dark:text-surface-400"><h4 class="font-medium mb-2">Notification Preferences</h4><p>Configure how you receive notifications.</p></div> },
                { id: 'billing', label: 'Billing', disabled: true, content: <div>Billing content</div> },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">orientation="vertical" + variant="enclosed"</p>
            <Tabs
              orientation="vertical"
              variant="enclosed"
              items={[
                { id: 'general', label: 'General', content: <div class="text-surface-600 dark:text-surface-400"><h4 class="font-medium mb-2">General Settings</h4><p>Basic configuration options.</p></div> },
                { id: 'advanced', label: 'Advanced', content: <div class="text-surface-600 dark:text-surface-400"><h4 class="font-medium mb-2">Advanced Settings</h4><p>Power user options and configurations.</p></div> },
                { id: 'integrations', label: 'Integrations', content: <div class="text-surface-600 dark:text-surface-400"><h4 class="font-medium mb-2">Integrations</h4><p>Connect with third-party services.</p></div> },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Tabs - Controlled">
        <p class="text-sm text-surface-500 mb-4">Controlled mode with external state</p>
        <div class="flex gap-2 mb-4">
          <Button size="sm" variant={activeTab() === 'tab1' ? 'primary' : 'secondary'} onClick={() => setActiveTab('tab1')}>Go to Tab 1</Button>
          <Button size="sm" variant={activeTab() === 'tab2' ? 'primary' : 'secondary'} onClick={() => setActiveTab('tab2')}>Go to Tab 2</Button>
          <Button size="sm" variant={activeTab() === 'tab3' ? 'primary' : 'secondary'} onClick={() => setActiveTab('tab3')}>Go to Tab 3</Button>
        </div>
        <Tabs
          activeTab={activeTab()}
          onTabChange={setActiveTab}
          items={[
            { id: 'tab1', label: 'First', content: <p class="text-surface-600 dark:text-surface-400">Controlled tab content 1. Current: {activeTab()}</p> },
            { id: 'tab2', label: 'Second', content: <p class="text-surface-600 dark:text-surface-400">Controlled tab content 2. Current: {activeTab()}</p> },
            { id: 'tab3', label: 'Third', content: <p class="text-surface-600 dark:text-surface-400">Controlled tab content 3. Current: {activeTab()}</p> },
          ]}
        />
      </DemoSection>

      <DemoSection title="SegmentedControl">
        <div class="space-y-4">
          <SegmentedControl
            options={[
              { value: 'day' as const, label: 'Day' },
              { value: 'week' as const, label: 'Week' },
              { value: 'month' as const, label: 'Month' },
            ]}
            value={segment()}
            onChange={setSegment}
          />
          <SegmentedControl
            size="sm"
            options={[
              { value: 'day' as const, label: 'D' },
              { value: 'week' as const, label: 'W' },
              { value: 'month' as const, label: 'M' },
            ]}
            value={segment()}
            onChange={setSegment}
          />
        </div>
      </DemoSection>

      <DemoSection title="Breadcrumb">
        <Breadcrumb
          items={[
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Current Page' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Pagination">
        <Pagination page={page()} total={100} pageSize={10} onChange={setPage} />
      </DemoSection>

      <DemoSection title="Menu">
        <Menu
          trigger={<Button variant="secondary">Open Menu</Button>}
          items={[
            { label: 'Edit', onClick: () => console.log('Edit') },
            { label: 'Duplicate', onClick: () => console.log('Duplicate') },
            { divider: true },
            { label: 'Delete', onClick: () => console.log('Delete') },
          ]}
        />
      </DemoSection>

      <DemoSection title="Dropdown">
        <Dropdown
          open={dropdownOpen()}
          onOpenChange={setDropdownOpen}
          trigger={<Button variant="secondary">Dropdown</Button>}
        >
          <div class="p-2 space-y-1">
            <button class="w-full text-left px-3 py-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700">
              Option 1
            </button>
            <button class="w-full text-left px-3 py-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700">
              Option 2
            </button>
          </div>
        </Dropdown>
      </DemoSection>

      <PopoverDemo />

      <ContextMenuDemo />

      {/* Z-INDEX CONFLICT TEST CASES */}
      <DemoSection title="Z-Index Tests">
        <p class="text-sm text-surface-500 mb-4">
          Test these scenarios to verify z-index hierarchy works correctly:
        </p>

        {/* Test 1: Menu near header */}
        <div class="space-y-6">
          <div class="p-4 border border-dashed border-warning-500 rounded-lg">
            <p class="text-xs text-warning-600 dark:text-warning-400 mb-2 font-medium">
              Test 1: Menu should appear ABOVE the sticky header when scrolled
            </p>
            <Menu
              trigger={<Button size="sm">Menu (scroll page then open)</Button>}
              items={[
                { label: 'This menu should', disabled: true },
                { label: 'appear above header', disabled: true },
                { divider: true },
                { label: 'Action 1', onClick: () => toast.success('Menu works!') },
                { label: 'Action 2', onClick: () => toast.success('Menu works!') },
              ]}
            />
          </div>

          {/* Test 2: Dropdown in a card with overflow */}
          <div class="p-4 border border-dashed border-warning-500 rounded-lg">
            <p class="text-xs text-warning-600 dark:text-warning-400 mb-2 font-medium">
              Test 2: Dropdown inside a Card should escape overflow:hidden
            </p>
            <Card class="p-4 overflow-hidden">
              <p class="text-sm text-surface-600 mb-2">Card with overflow:hidden</p>
              <Dropdown
                trigger={<Button size="sm" variant="secondary">Dropdown in Card</Button>}
              >
                <div class="p-3 w-48">
                  <p class="text-sm font-medium mb-2">I should be fully visible!</p>
                  <p class="text-xs text-surface-500">Not clipped by the card</p>
                </div>
              </Dropdown>
            </Card>
          </div>

          {/* Test 3: Multiple overlapping menus */}
          <div class="p-4 border border-dashed border-warning-500 rounded-lg">
            <p class="text-xs text-warning-600 dark:text-warning-400 mb-2 font-medium">
              Test 3: Multiple triggers - only one should be open at a time
            </p>
            <div class="flex gap-2 flex-wrap">
              <Menu
                trigger={<Button size="sm" variant="ghost">Menu A</Button>}
                items={[
                  { label: 'Menu A - Item 1', onClick: () => { } },
                  { label: 'Menu A - Item 2', onClick: () => { } },
                ]}
              />
              <Menu
                trigger={<Button size="sm" variant="ghost">Menu B</Button>}
                items={[
                  { label: 'Menu B - Item 1', onClick: () => { } },
                  { label: 'Menu B - Item 2', onClick: () => { } },
                ]}
              />
              <Dropdown trigger={<Button size="sm" variant="ghost">Dropdown C</Button>}>
                <div class="p-3">Dropdown C content</div>
              </Dropdown>
            </div>
          </div>

          {/* Test 4: Tooltip vs Dropdown */}
          <div class="p-4 border border-dashed border-warning-500 rounded-lg">
            <p class="text-xs text-warning-600 dark:text-warning-400 mb-2 font-medium">
              Test 4: Tooltip and Dropdown interaction
            </p>
            <div class="flex gap-4 items-center">
              <Tooltip content="I'm a tooltip!">
                <Button size="sm" variant="secondary">Hover for tooltip</Button>
              </Tooltip>
              <Dropdown trigger={<Button size="sm">Click for dropdown</Button>}>
                <div class="p-3 w-48">
                  <p class="text-sm">Dropdown content</p>
                  <Tooltip content="Nested tooltip!" position="right">
                    <Badge class="mt-2 cursor-help">Hover me too</Badge>
                  </Tooltip>
                </div>
              </Dropdown>
            </div>
          </div>

          {/* Test 5: Menu in scrollable Table area */}
          <div class="p-4 border border-dashed border-warning-500 rounded-lg">
            <p class="text-xs text-warning-600 dark:text-warning-400 mb-2 font-medium">
              Test 5: Menu in a table with sticky header - menu should appear above table header
            </p>
            <Table
              maxHeight="200px"
              stickyHeader
              data={[
                { id: 1, name: 'Row 1', action: 'menu' },
                { id: 2, name: 'Row 2', action: 'menu' },
                { id: 3, name: 'Row 3', action: 'menu' },
                { id: 4, name: 'Row 4', action: 'menu' },
                { id: 5, name: 'Row 5', action: 'menu' },
                { id: 6, name: 'Row 6', action: 'menu' },
              ]}
              columns={[
                { key: 'id', header: 'ID', width: '60px' },
                { key: 'name', header: 'Name' },
                {
                  key: 'action',
                  header: 'Actions',
                  align: 'right',
                  render: (_, row) => (
                    <Menu
                      placement="bottom-end"
                      trigger={<Button size="sm" variant="ghost">Actions</Button>}
                      items={[
                        { label: `Edit ${row.name}`, onClick: () => toast.info(`Edit ${row.name}`) },
                        { label: `Delete ${row.name}`, onClick: () => toast.error(`Delete ${row.name}`) },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>

          {/* Test 6: Modal with dropdown inside */}
          <div class="p-4 border border-dashed border-warning-500 rounded-lg">
            <p class="text-xs text-warning-600 dark:text-warning-400 mb-2 font-medium">
              Test 6: Dropdown inside a Modal
            </p>
            <ModalDropdownTest />
          </div>
        </div>
      </DemoSection>
    </>
  );
}

// Separate component for modal test to manage its own state
function ModalDropdownTest() {
  const modal = useDisclosure();

  return (
    <>
      <Button size="sm" onClick={modal.onOpen}>Open Modal with Dropdown</Button>
      <Modal open={modal.isOpen()} onClose={modal.onClose} title="Modal with Dropdown">
        <p class="text-surface-600 mb-4">The dropdown below should appear correctly inside this modal:</p>
        <Dropdown trigger={<Button variant="secondary">Dropdown in Modal</Button>}>
          <div class="p-3 w-48">
            <p class="text-sm font-medium mb-2">Dropdown content</p>
            <p class="text-xs text-surface-500">Should be fully visible and interactive</p>
            <Button size="sm" class="mt-2 w-full" onClick={() => toast.success('Clicked inside modal dropdown!')}>
              Click me
            </Button>
          </div>
        </Dropdown>
        <div class="mt-6 flex justify-end">
          <Button onClick={modal.onClose}>Close</Button>
        </div>
      </Modal>
    </>
  );
}

function DataDisplayDemo() {
  const [chips, setChips] = createSignal(['React', 'Vue', 'Solid', 'Angular']);
  const [tableLoading, setTableLoading] = createSignal(false);
  const [selectedKeys, setSelectedKeys] = createSignal<Set<string | number>>(new Set());
  const [singleSelectedKey, setSingleSelectedKey] = createSignal<Set<string | number>>(new Set());

  const tableData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', department: 'Engineering', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', department: 'Marketing', status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', department: 'Content', status: 'inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', department: 'HR', status: 'active' },
    { id: 5, name: 'Edward Norton', email: 'edward@example.com', role: 'User', department: 'Finance', status: 'pending' },
  ];

  const largeTableData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'User', 'Editor'][i % 3],
    score: Math.floor(Math.random() * 100),
  }));

  // Large dataset for virtualization demo (1000 rows)
  const virtualizedTableData = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
    salary: 50000 + Math.floor(i * 50),
    startDate: new Date(2020, i % 12, (i % 28) + 1).toLocaleDateString(),
  }));

  const jsonData = {
    name: 'Glass UI',
    version,
    features: ['Glassmorphism', 'Dark mode', 'Animations'],
    config: { theme: 'ios26', responsive: true },
  };

  const codeExample = `function hello() {
  console.log('Hello, Glass UI!');
}`;

  const markdownExample = `## Markdown Example

This is **bold** and *italic* text.

- List item 1
- List item 2

Inline \`code\` example.`;

  const handleLoadTable = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 2000);
  };

  return (
    <>
      {/* ==================== TABLE DEMOS ==================== */}

      <DemoSection title="Table - Basic">
        <p class="text-sm text-surface-500 mb-3">Simple table with sortable columns</p>
        <Table
          data={tableData}
          columns={[
            { key: 'name', header: 'Name', sortable: true },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role', sortable: true },
          ]}
        />
      </DemoSection>

      <DemoSection title="Table - Sizes">
        <p class="text-sm text-surface-500 mb-3">Three size variants: sm, md (default), lg</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">size="sm"</p>
            <Table
              size="sm"
              data={tableData.slice(0, 3)}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">size="md" (default)</p>
            <Table
              size="md"
              data={tableData.slice(0, 3)}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">size="lg"</p>
            <Table
              size="lg"
              data={tableData.slice(0, 3)}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Table - Variants">
        <p class="text-sm text-surface-500 mb-3">Visual variants: default, bordered, striped</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">variant="default"</p>
            <Table
              variant="default"
              data={tableData.slice(0, 3)}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">variant="bordered"</p>
            <Table
              variant="bordered"
              data={tableData.slice(0, 3)}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">variant="striped"</p>
            <Table
              variant="striped"
              data={tableData}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Table - Selection (Multiple)">
        <p class="text-sm text-surface-500 mb-3">Multi-select with checkboxes. Selected: {selectedKeys().size} rows</p>
        <Table
          data={tableData}
          selectable="multiple"
          selectedKeys={selectedKeys()}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            { key: 'department', header: 'Department' },
          ]}
        />
        <div class="mt-2 text-xs text-surface-500">
          Selected IDs: {Array.from(selectedKeys()).join(', ') || 'none'}
        </div>
      </DemoSection>

      <DemoSection title="Table - Selection (Single)">
        <p class="text-sm text-surface-500 mb-3">Single selection with radio-style behavior</p>
        <Table
          data={tableData}
          selectable="single"
          selectedKeys={singleSelectedKey()}
          onSelectionChange={(keys) => setSingleSelectedKey(keys)}
          clickableRows
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
          ]}
        />
        <div class="mt-2 text-xs text-surface-500">
          Selected ID: {Array.from(singleSelectedKey())[0] ?? 'none'}
        </div>
      </DemoSection>

      <DemoSection title="Table - Row Click & Custom Row Classes">
        <p class="text-sm text-surface-500 mb-3">Click rows to see events. Inactive users are highlighted.</p>
        <Table
          data={tableData}
          onRowClick={(row, index) => toast.info(`Clicked: ${row.name} (row ${index})`)}
          onRowDoubleClick={(row) => toast.success(`Double-clicked: ${row.name}`)}
          clickableRows
          rowClass={(row) => row.status === 'inactive' ? 'bg-error-50/30 dark:bg-error-900/20' : ''}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            {
              key: 'status', header: 'Status', render: (value) => (
                <Badge variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'error'}>
                  {String(value)}
                </Badge>
              )
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Table - Custom Cell Rendering">
        <p class="text-sm text-surface-500 mb-3">Custom render functions for cells and headers</p>
        <Table
          data={tableData}
          columns={[
            {
              key: 'name',
              header: 'User',
              render: (_, row) => (
                <div class="flex items-center gap-2">
                  <Avatar name={String(row.name)} size="sm" />
                  <div>
                    <div class="font-medium">{String(row.name)}</div>
                    <div class="text-xs text-surface-500">{String(row.email)}</div>
                  </div>
                </div>
              ),
            },
            { key: 'role', header: 'Role', render: (value) => <Chip size="sm">{String(value)}</Chip> },
            { key: 'department', header: 'Department' },
            {
              key: 'status',
              header: 'Status',
              align: 'center',
              render: (value) => (
                <span class={`inline-flex w-2 h-2 rounded-full ${value === 'active' ? 'bg-success-500' :
                  value === 'pending' ? 'bg-warning-500' : 'bg-error-500'
                  }`} />
              ),
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Table - Loading State">
        <p class="text-sm text-surface-500 mb-3">Skeleton loading with configurable row count</p>
        <div class="mb-3">
          <Button size="sm" onClick={handleLoadTable}>
            {tableLoading() ? 'Loading...' : 'Simulate Loading'}
          </Button>
        </div>
        <Table
          loading={tableLoading()}
          loadingRows={5}
          data={tableData}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            { key: 'department', header: 'Department' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Table - Empty State">
        <p class="text-sm text-surface-500 mb-3">Custom empty message and render</p>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-surface-400 mb-2">Default empty message</p>
            <Table
              data={[]}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Custom empty message</p>
            <Table
              data={[]}
              emptyMessage="No users found. Try adjusting your filters."
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
              ]}
            />
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Custom empty render</p>
            <Table
              data={[]}
              emptyRender={() => (
                <div class="flex flex-col items-center gap-2 py-4">
                  <span class="text-4xl">📭</span>
                  <span class="font-medium">No data yet</span>
                  <Button size="sm" variant="secondary">Add your first item</Button>
                </div>
              )}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
              ]}
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Table - Sticky Header">
        <p class="text-sm text-surface-500 mb-3">Fixed header with scrollable body (maxHeight)</p>
        <Table
          data={largeTableData}
          maxHeight="300px"
          stickyHeader
          sortable
          columns={[
            { key: 'id', header: 'ID', width: '60px', align: 'center' },
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            { key: 'score', header: 'Score', align: 'right' },
          ]}
        />
      </DemoSection>

      {/* <DemoSection title="Table - Virtualization (1000 rows)">
        <p class="text-sm text-surface-500 mb-3">
          Virtualized rendering for large datasets. Only visible rows are rendered in the DOM.
          <span class="ml-2 text-xs text-accent-500 font-medium">1000 rows, ~60fps scroll</span>
        </p>
        <Table
          data={virtualizedTableData}
          maxHeight="400px"
          sortable
          selectable="multiple"
          virtualizeThreshold={50}
          columns={[
            { key: 'id', header: 'ID', width: '70px', align: 'center' },
            { key: 'name', header: 'Name', minWidth: '150px' },
            { key: 'email', header: 'Email', minWidth: '200px' },
            { key: 'department', header: 'Department' },
            { key: 'salary', header: 'Salary', align: 'right', render: (v) => <div style={{ height: "100px" }}>hello</div> },
            { key: 'startDate', header: 'Start Date', align: 'center' },
          ]}
        />
        <p class="mt-2 text-xs text-surface-400">
          Tip: Open DevTools and inspect the tbody - only ~15-20 rows are in the DOM at any time.
        </p>
      </DemoSection> */}

      <DemoSection title="Table - Column Alignment & Width">
        <p class="text-sm text-surface-500 mb-3">Control column alignment and fixed widths</p>
        <Table
          data={largeTableData.slice(0, 5)}
          columns={[
            { key: 'id', header: 'ID', width: '80px', align: 'center' },
            { key: 'name', header: 'Name', minWidth: '150px' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role', align: 'center', width: '100px' },
            { key: 'score', header: 'Score', align: 'right', width: '80px' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Table - Hoverable Control">
        <p class="text-sm text-surface-500 mb-3">Disable hover effect with hoverable=false</p>
        <Table
          data={tableData.slice(0, 3)}
          hoverable={false}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Table - Full Featured Example">
        <p class="text-sm text-surface-500 mb-3">Combining multiple features: selection, sorting, custom rendering, variants</p>
        <Table
          variant="striped"
          size="sm"
          data={tableData}
          sortable
          selectable="multiple"
          selectedKeys={selectedKeys()}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
          onRowClick={(row) => console.log('Clicked:', row)}
          columns={[
            {
              key: 'name',
              header: 'User',
              sortable: true,
              render: (_, row) => (
                <div class="flex items-center gap-2">
                  <Avatar name={String(row.name)} size="sm" />
                  <span class="font-medium">{String(row.name)}</span>
                </div>
              ),
            },
            { key: 'email', header: 'Email', sortable: true },
            { key: 'role', header: 'Role', align: 'center', render: (v) => <Chip size="sm" variant="outlined">{String(v)}</Chip> },
            { key: 'department', header: 'Dept', sortable: true },
            {
              key: 'status',
              header: 'Status',
              align: 'center',
              render: (value) => (
                <Badge variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'error'} size="sm">
                  {String(value)}
                </Badge>
              ),
            },
          ]}
        />
      </DemoSection>

      {/* ==================== OTHER DATA DISPLAY COMPONENTS ==================== */}

      <DemoSection title="Chip">
        <div class="flex gap-2 flex-wrap">
          <For each={chips()}>
            {(chip) => (
              <Chip onRemove={() => setChips((c) => c.filter((x) => x !== chip))}>
                {chip}
              </Chip>
            )}
          </For>
        </div>
      </DemoSection>

      <DemoSection title="Avatar">
        <div class="flex gap-4 items-center">
          <Avatar src="https://i.pravatar.cc/150?img=1" name="Alice Smith" size="sm" />
          <Avatar src="https://i.pravatar.cc/150?img=2" name="Bob Jones" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=3" name="Charlie Brown" size="lg" />
          <Avatar name="John Doe" size="md" />
        </div>
      </DemoSection>

      <DemoSection title="Tooltip">
        <div class="flex gap-4">
          <Tooltip content="This is a tooltip">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <Badge>Bottom</Badge>
          </Tooltip>
        </div>
      </DemoSection>

      <DemoSection title="HoverCard">
        <p class="text-sm text-surface-500 mb-3">Rich content previews on hover</p>
        <div class="space-y-6">
          <div>
            <p class="text-xs text-surface-400 mb-2">User profile preview</p>
            <div class="flex items-center gap-4">
              <HoverCard
                placement="bottom"
                showArrow
                trigger={
                  <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                    <Avatar name="Jane Smith" size="sm" />
                    <span class="text-sm font-medium text-surface-900 dark:text-white">@janesmith</span>
                  </button>
                }
              >
                <div class="p-4 w-72">
                  <div class="flex items-start gap-3">
                    <Avatar name="Jane Smith" size="lg" />
                    <div class="flex-1">
                      <div class="font-semibold text-surface-900 dark:text-white">Jane Smith</div>
                      <div class="text-sm text-surface-500">@janesmith</div>
                    </div>
                  </div>
                  <p class="mt-3 text-sm text-surface-600 dark:text-surface-400">
                    Product designer at Acme Inc. Passionate about creating beautiful, accessible interfaces.
                  </p>
                  <div class="mt-3 flex gap-4 text-sm text-surface-500">
                    <span><strong class="text-surface-900 dark:text-white">1.2k</strong> followers</span>
                    <span><strong class="text-surface-900 dark:text-white">892</strong> following</span>
                  </div>
                  <Button size="sm" class="w-full mt-3">Follow</Button>
                </div>
              </HoverCard>
              <HoverCard
                placement="right"
                showArrow
                trigger={
                  <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                    <Avatar name="Bob Johnson" size="sm" />
                    <span class="text-sm font-medium text-surface-900 dark:text-white">@bobjohnson</span>
                  </button>
                }
              >
                <div class="p-4 w-72">
                  <div class="flex items-start gap-3">
                    <Avatar name="Bob Johnson" size="lg" />
                    <div class="flex-1">
                      <div class="font-semibold text-surface-900 dark:text-white">Bob Johnson</div>
                      <div class="text-sm text-surface-500">@bobjohnson</div>
                    </div>
                  </div>
                  <p class="mt-3 text-sm text-surface-600 dark:text-surface-400">
                    Full-stack developer. Building cool things with SolidJS and TypeScript.
                  </p>
                  <div class="mt-3 flex gap-4 text-sm text-surface-500">
                    <span><strong class="text-surface-900 dark:text-white">3.5k</strong> followers</span>
                    <span><strong class="text-surface-900 dark:text-white">421</strong> following</span>
                  </div>
                </div>
              </HoverCard>
            </div>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Product preview</p>
            <div class="flex gap-4 flex-wrap">
              <HoverCard
                placement="bottom-start"
                openDelay={200}
                closeDelay={100}
                trigger={
                  <a href="#" class="text-accent-500 hover:underline font-medium">
                    Glass UI Pro
                  </a>
                }
              >
                <div class="p-4 w-80">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <div class="font-semibold text-surface-900 dark:text-white">Glass UI Pro</div>
                      <div class="text-xs text-surface-500">Premium component library</div>
                    </div>
                  </div>
                  <p class="text-sm text-surface-600 dark:text-surface-400 mb-3">
                    Unlock all 50+ premium components, priority support, and Figma design files.
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-surface-900 dark:text-white">$99/year</span>
                    <Button size="sm">Learn More</Button>
                  </div>
                </div>
              </HoverCard>
            </div>
          </div>
          <div>
            <p class="text-xs text-surface-400 mb-2">Different placements</p>
            <div class="flex gap-3 flex-wrap justify-center py-8">
              <HoverCard placement="top" trigger={<Button size="sm" variant="ghost">Top</Button>}>
                <div class="p-3 text-sm">Hover card on top</div>
              </HoverCard>
              <HoverCard placement="right" trigger={<Button size="sm" variant="ghost">Right</Button>}>
                <div class="p-3 text-sm">Hover card on right</div>
              </HoverCard>
              <HoverCard placement="bottom" trigger={<Button size="sm" variant="ghost">Bottom</Button>}>
                <div class="p-3 text-sm">Hover card on bottom</div>
              </HoverCard>
              <HoverCard placement="left" trigger={<Button size="sm" variant="ghost">Left</Button>}>
                <div class="p-3 text-sm">Hover card on left</div>
              </HoverCard>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="CodeBlock">
        <CodeBlock code={codeExample} language="javascript" />
      </DemoSection>

      <DemoSection title="JsonViewer">
        <JsonViewer data={jsonData} initialExpandDepth={3} />
      </DemoSection>

      <DemoSection title="Markdown">
        <Card class="p-4">
          <Markdown content={markdownExample} />
        </Card>
      </DemoSection>

      {/* ==================== VIRTUALIZATION COMPONENTS ==================== */}

      <DemoSection title="VirtualList - Basic">
        <p class="text-sm text-surface-500 mb-3">
        Supports variable height items with automatic measurement.
        </p>
        <VirtualList
          style={{ height: '300px' }}
          totalCount={1000}
          defaultItemHeight={56}
          itemContent={(index) => (
            <div class={`px-4 py-3 border-b border-surface-200 dark:border-surface-700 ${index % 2 === 0 ? 'bg-surface-50 dark:bg-surface-800/50' : ''}`}>
              <div class="font-medium">Item {index}</div>
              <div class="text-sm text-surface-500">This is item number {index} in a list of 1000 items</div>
            </div>
          )}
        />
      </DemoSection>

      <DemoSection title="VirtualList - Variable Heights">
        <p class="text-sm text-surface-500 mb-3">
          Items with variable heights are automatically measured and positioned correctly.
        </p>
        <VirtualList
          style={{ height: '400px' }}
          totalCount={500}
          defaultItemHeight={80}
          itemContent={(index) => (
            <div class="px-4 py-3 border-b border-surface-200 dark:border-surface-700">
              <div class="flex items-start gap-3">
                <Avatar name={`User ${index}`} size="md" />
                <div class="flex-1">
                  <div class="font-medium">User {index}</div>
                  <p class="text-sm text-surface-600 dark:text-surface-400">
                    {index % 3 === 0
                      ? 'Short message'
                      : index % 3 === 1
                        ? 'Medium length message that spans multiple lines to demonstrate variable height support in the virtualized list component.'
                        : 'Long message that demonstrates how the virtual list handles items of different sizes. This message is intentionally longer to create visual variety and test the measurement system. The virtualization engine automatically measures each item and positions them correctly, even when heights vary significantly.'}
                  </p>
                  <div class="mt-1 text-xs text-surface-400">{index} minutes ago</div>
                </div>
              </div>
            </div>
          )}
        />
      </DemoSection>

      <DemoSection title="VirtualTable - Basic">
        <p class="text-sm text-surface-500 mb-3">
          Semantic HTML table with virtualization. Perfect for large datasets with proper table accessibility.
        </p>
        <VirtualTable
          style={{ height: '400px' }}
          totalCount={1000}
          fixedHeaderContent={() => (
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 w-20">ID</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">Name</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">Email</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">Department</th>
              <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 w-24">Salary</th>
            </tr>
          )}
          itemContent={(index) => (
            <>
              <td class="px-4 py-3 text-sm text-surface-500">{index + 1}</td>
              <td class="px-4 py-3 text-sm font-medium">User {index + 1}</td>
              <td class="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">user{index + 1}@example.com</td>
              <td class="px-4 py-3 text-sm">{['Engineering', 'Design', 'Marketing', 'Sales'][index % 4]}</td>
              <td class="px-4 py-3 text-sm text-right font-mono">${(50000 + (index * 1000) % 100000).toLocaleString()}</td>
            </>
          )}
          components={{
            TableRow: (props) => (
              <tr
                data-index={props['data-index']}
                data-known-size={props['data-known-size']}
                class={`border-b border-surface-200 dark:border-surface-700 ${props['data-index'] % 2 === 0 ? 'bg-surface-50/50 dark:bg-surface-800/30' : ''}`}
              >
                {props.children}
              </tr>
            ),
          }}
        />
        <p class="mt-2 text-xs text-surface-400">
          Tip: The sticky header remains visible while scrolling through 1000 rows.
        </p>
      </DemoSection>

      <DemoSection title="VirtualTable - With Data Array">
        <p class="text-sm text-surface-500 mb-3">
          Using the data prop for type-safe access to row data.
        </p>
          <VirtualTable
            style={{ height: '350px' }}
            data={virtualizedTableData}
            fixedHeaderContent={() => (
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 w-16">ID</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">Email</th>
                <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400">Department</th>
                <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-surface-600 dark:text-surface-400 w-24">Status</th>
              </tr>
            )}
            itemContent={(index, data) => (
              <>
                <td class="px-4 py-3 text-sm text-surface-500">{data.id}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center gap-2">
                    <Avatar name={String(data.name)} size="sm" />
                    <span class="font-medium">{String(data.name)}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-surface-600 dark:text-surface-400">{String(data.email)}</td>
                <td class="px-4 py-3 text-sm text-center">
                  <Chip size="sm" variant="outlined">{String(data.department)}</Chip>
                </td>
                <td class="px-4 py-3 text-sm text-center">
                  <Badge size="sm" variant={data.status === 'Active' ? 'success' : data.status === 'Pending' ? 'warning' : 'default'}>
                    {String(data.status)}
                  </Badge>
                </td>
              </>
            )}
            components={{
              TableRow: (props) => (
                <tr
                  data-index={props['data-index']}
                  data-known-size={props['data-known-size']}
                  class="border-b border-surface-200/50 dark:border-surface-700/50 hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors"
                >
                  {props.children}
                </tr>
              ),
            }}
          />
      </DemoSection>
    </>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = createSignal('layout');
  const isDark = useIsDark();

  // Detect system dark mode preference
  const prefersDarkMode = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [darkMode, setDarkMode] = createSignal(prefersDarkMode());

  // Apply dark mode class on mount based on system preference
  onMount(() => {
    if (prefersDarkMode()) {
      document.documentElement.classList.add('dark');
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode());
    document.documentElement.classList.toggle('dark');
  };

  return (
    <GlassBackground>
      <ToastContainer />
      <SnackbarContainer />

      {/* Header */}
      <header class="sticky top-0 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 class="text-xl font-bold text-surface-900 dark:text-white">
            Glass UI Demo
          </h1>
          <div class="flex items-center gap-4">
            <span class="text-sm text-surface-600 dark:text-surface-400">v{version}</span>
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {darkMode() ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar */}
        <nav class="w-40 shrink-0">
          <div class="sticky top-20 space-y-0.5">
            <For each={categories}>
              {(cat) => (
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  class={`w-full text-left px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeCategory() === cat.id
                    ? 'bg-accent-500 text-white'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`}
                >
                  {cat.label}
                </button>
              )}
            </For>
          </div>
        </nav>

        {/* Main content */}
        <main class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold text-surface-900 dark:text-white mb-6">
            {categories.find((c) => c.id === activeCategory())?.label}
          </h2>

          <Show when={activeCategory() === 'layout'}>
            <LayoutDemo />
          </Show>
          <Show when={activeCategory() === 'forms'}>
            <FormsDemo />
          </Show>
          <Show when={activeCategory() === 'feedback'}>
            <FeedbackDemo />
          </Show>
          <Show when={activeCategory() === 'navigation'}>
            <NavigationDemo />
          </Show>
          <Show when={activeCategory() === 'data'}>
            <DataDisplayDemo />
          </Show>
        </main>
      </div>
    </GlassBackground>
  );
}
