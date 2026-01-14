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
  CommandPalette,
  type CommandPaletteItemType,
  type CommandPaletteHandle,
  // Data Display
  Table,
  Chip,
  Avatar,
  Tooltip,
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
