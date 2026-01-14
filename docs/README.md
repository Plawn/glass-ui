# Glass UI Documentation

iOS 26-inspired glassmorphism UI components for SolidJS.

## Components

### Layout & Containers
- [Card](./components/card.md) - Container with glass effect
- [Section](./components/section.md) - Collapsible section with header
- [Modal](./components/modal.md) - Centered dialog with backdrop
- [Dialog](./components/dialog.md) - Confirmation dialog with actions
- [Drawer](./components/drawer.md) - Slide-in panel
- [Accordion](./components/accordion.md) - Collapsible panels

### Forms & Inputs
- [Button](./components/button.md) - Buttons with variants and states
- [Input](./components/input.md) - Text input with label and error
- [Textarea](./components/textarea.md) - Multiline text input
- [Select](./components/select.md) - Dropdown select
- [Checkbox](./components/checkbox.md) - Checkbox with label
- [JsonSchemaForm](./components/json-schema-form.md) - Auto-generated form

### Feedback
- [Alert](./components/alert.md) - Inline alert messages
- [Toast](./components/toast.md) - Toast notifications
- [Snackbar](./components/snackbar.md) - Bottom notification bar
- [Progress](./components/progress.md) - Progress bar (linear & circular)
- [Skeleton](./components/skeleton.md) - Loading placeholder
- [ErrorDisplay](./components/error-display.md) - Error message display

### Navigation
- [Tabs](./components/tabs.md) - Tab navigation
- [SegmentedControl](./components/segmented-control.md) - iOS-style segmented control
- [Breadcrumb](./components/breadcrumb.md) - Breadcrumb navigation
- [Pagination](./components/pagination.md) - Page navigation
- [Menu](./components/menu.md) - Dropdown menu
- [Dropdown](./components/dropdown.md) - Generic dropdown container
- [ContextMenu](./components/context-menu.md) - Right-click context menu
- [CommandPalette](./components/command-palette.md) - Command palette (Cmd+K)

### Data Display
- [Table](./components/table.md) - Data table with sorting and selection
- [VirtualList](./components/virtual-list.md) - Virtualized list
- [VirtualTable](./components/virtual-table.md) - Virtualized table
- [Badge](./components/badge.md) - Status badges
- [Chip](./components/chip.md) - Dismissible chips/tags
- [Avatar](./components/avatar.md) - User avatar
- [Tooltip](./components/tooltip.md) - Hover tooltips
- [CodeBlock](./components/code-block.md) - Syntax-highlighted code
- [JsonViewer](./components/json-viewer.md) - Collapsible JSON tree
- [Markdown](./components/markdown.md) - Markdown renderer

### Backgrounds
- [GlassBackground](./components/glass-background.md) - Animated glassmorphism background

## Hooks

- [useDisclosure](./hooks.md#usedisclosure) - Open/close state management
- [useDialogState](./hooks.md#usedialogstate) - Modal behavior (escape, backdrop)
- [useCopyToClipboard](./hooks.md#usecopytoclipboard) - Clipboard operations
- [useIsDark](./hooks.md#useisdark) - Dark mode detection
- [useAnimationState](./hooks.md#useanimationstate) - Animation lifecycle
- [useVirtualizer](./hooks.md#usevirtualizer) - Low-level virtualization

## Theming

See [Theming Guide](./theming.md) for customization options.
