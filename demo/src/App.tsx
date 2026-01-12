import { createSignal, For, Show, onMount } from 'solid-js';
import {
  // Layout
  Card,
  Section,
  Accordion,
  Modal,
  Dialog,
  Drawer,
  // Forms
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Badge,
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
  // Forms (advanced)
  JsonSchemaForm,
  // Navigation
  Tabs,
  SegmentedControl,
  Breadcrumb,
  Pagination,
  Menu,
  Dropdown,
  // Data Display
  Table,
  Chip,
  Avatar,
  Tooltip,
  CodeBlock,
  JsonViewer,
  Markdown,
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
          <Input label="With Error" error="This field is required" value="" onInput={() => {}} />
          <Input label="Disabled" disabled value="Cannot edit" onInput={() => {}} />
        </div>
      </DemoSection>

      <DemoSection title="Textarea">
        <div class="max-w-sm">
          <Textarea label="Description" placeholder="Enter description..." rows={3} value="" onInput={() => {}} />
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

      <DemoSection title="Spinner">
        <div class="flex gap-6 items-center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <div class="flex items-center gap-2 text-primary-500">
            <Spinner size="md" />
            <span class="text-sm">Loading...</span>
          </div>
        </div>
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
    </>
  );
}

function NavigationDemo() {
  const [activeTab, setActiveTab] = createSignal('tab1');
  const [segment, setSegment] = createSignal<'day' | 'week' | 'month'>('day');
  const [page, setPage] = createSignal(1);
  const [dropdownOpen, setDropdownOpen] = createSignal(false);

  return (
    <>
      <DemoSection title="Tabs">
        <Tabs
          items={[
            { id: 'tab1', label: 'Overview', content: <p class="text-surface-600">Overview content</p> },
            { id: 'tab2', label: 'Details', content: <p class="text-surface-600">Details content</p> },
            { id: 'tab3', label: 'Settings', content: <p class="text-surface-600">Settings content</p> },
          ]}
          activeTab={activeTab()}
          onTabChange={setActiveTab}
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
                  { label: 'Menu A - Item 1', onClick: () => {} },
                  { label: 'Menu A - Item 2', onClick: () => {} },
                ]}
              />
              <Menu
                trigger={<Button size="sm" variant="ghost">Menu B</Button>}
                items={[
                  { label: 'Menu B - Item 1', onClick: () => {} },
                  { label: 'Menu B - Item 2', onClick: () => {} },
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

  const jsonData = {
    name: 'Glass UI',
    version: '0.2.0',
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
            { key: 'status', header: 'Status', render: (value) => (
              <Badge variant={value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'error'}>
                {String(value)}
              </Badge>
            )},
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
                <span class={`inline-flex w-2 h-2 rounded-full ${
                  value === 'active' ? 'bg-success-500' : 
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
            <span class="text-sm text-surface-600 dark:text-surface-400">v0.2.0</span>
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
                  class={`w-full text-left px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    activeCategory() === cat.id
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
