export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    id: 'layout',
    label: 'Layout',
    items: [
      { id: 'card', label: 'Card', path: '/layout/card' },
      { id: 'section', label: 'Section', path: '/layout/section' },
      { id: 'accordion', label: 'Accordion', path: '/layout/accordion' },
      { id: 'modal', label: 'Modal', path: '/layout/modal' },
      { id: 'dialog', label: 'Dialog', path: '/layout/dialog' },
      { id: 'drawer', label: 'Drawer', path: '/layout/drawer' },
      { id: 'sheet', label: 'Sheet', path: '/layout/sheet' },
      { id: 'divider', label: 'Divider', path: '/layout/divider' },
      { id: 'collapsible', label: 'Collapsible', path: '/layout/collapsible' },
      { id: 'sidebar', label: 'Sidebar', path: '/layout/sidebar' },
      { id: 'navbar', label: 'Navbar', path: '/layout/navbar' },
      { id: 'window', label: 'Window', path: '/layout/window' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    items: [
      { id: 'button', label: 'Button', path: '/forms/button' },
      { id: 'input', label: 'Input', path: '/forms/input' },
      { id: 'textarea', label: 'Textarea', path: '/forms/textarea' },
      { id: 'select', label: 'Select', path: '/forms/select' },
      { id: 'checkbox', label: 'Checkbox', path: '/forms/checkbox' },
      { id: 'radio-group', label: 'RadioGroup', path: '/forms/radio-group' },
      { id: 'switch', label: 'Switch', path: '/forms/switch' },
      { id: 'slider', label: 'Slider', path: '/forms/slider' },
      { id: 'autocomplete', label: 'Autocomplete', path: '/forms/autocomplete' },
      { id: 'date-picker', label: 'DatePicker', path: '/forms/date-picker' },
      { id: 'number-input', label: 'NumberInput', path: '/forms/number-input' },
      { id: 'file-upload', label: 'FileUpload', path: '/forms/file-upload' },
      { id: 'stepper', label: 'Stepper', path: '/forms/stepper' },
      { id: 'json-schema-form', label: 'JsonSchemaForm', path: '/forms/json-schema-form' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      { id: 'alert', label: 'Alert', path: '/feedback/alert' },
      { id: 'progress', label: 'Progress', path: '/feedback/progress' },
      { id: 'skeleton', label: 'Skeleton', path: '/feedback/skeleton' },
      { id: 'spinner', label: 'Spinner', path: '/feedback/spinner' },
      { id: 'error-display', label: 'ErrorDisplay', path: '/feedback/error-display' },
      { id: 'snackbar', label: 'Snackbar', path: '/feedback/snackbar' },
      { id: 'toast', label: 'Toast', path: '/feedback/toast' },
      { id: 'empty-state', label: 'EmptyState', path: '/feedback/empty-state' },
      { id: 'chat', label: 'Chat', path: '/feedback/chat' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { id: 'tabs', label: 'Tabs', path: '/navigation/tabs' },
      { id: 'segmented-control', label: 'SegmentedControl', path: '/navigation/segmented-control' },
      { id: 'breadcrumb', label: 'Breadcrumb', path: '/navigation/breadcrumb' },
      { id: 'pagination', label: 'Pagination', path: '/navigation/pagination' },
      { id: 'menu', label: 'Menu', path: '/navigation/menu' },
      { id: 'dropdown', label: 'Dropdown', path: '/navigation/dropdown' },
      { id: 'context-menu', label: 'ContextMenu', path: '/navigation/context-menu' },
      { id: 'command-palette', label: 'CommandPalette', path: '/navigation/command-palette' },
    ],
  },
  {
    id: 'data',
    label: 'Data Display',
    items: [
      { id: 'table', label: 'Table', path: '/data/table' },
      { id: 'badge', label: 'Badge', path: '/data/badge' },
      { id: 'chip', label: 'Chip', path: '/data/chip' },
      { id: 'avatar', label: 'Avatar', path: '/data/avatar' },
      { id: 'tooltip', label: 'Tooltip', path: '/data/tooltip' },
      { id: 'popover', label: 'Popover', path: '/data/popover' },
      { id: 'hover-card', label: 'HoverCard', path: '/data/hover-card' },
      { id: 'code-block', label: 'CodeBlock', path: '/data/code-block' },
      { id: 'json-viewer', label: 'JsonViewer', path: '/data/json-viewer' },
      { id: 'markdown', label: 'Markdown', path: '/data/markdown' },
      { id: 'virtual-list', label: 'VirtualList', path: '/data/virtual-list' },
      { id: 'virtual-table', label: 'VirtualTable', path: '/data/virtual-table' },
    ],
  },
];
