import { CommandPalette, Button } from 'glass-ui-solid';
import type { CommandPaletteHandle, CommandPaletteItemType } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function CommandPalettePage() {
  let paletteRef: CommandPaletteHandle | undefined;
  const [lastSelected, setLastSelected] = createSignal('');
  const [recentIds, setRecentIds] = createSignal<string[]>([]);
  const [controlledOpen, setControlledOpen] = createSignal(false);

  const commands: CommandPaletteItemType[] = [
    { id: 'new-file', label: 'New File', description: 'Create a new file', group: 'File' },
    { id: 'open-file', label: 'Open File', description: 'Open an existing file', group: 'File' },
    { id: 'save', label: 'Save', description: 'Save current file', group: 'File' },
    { id: 'save-as', label: 'Save As...', description: 'Save file with a new name', group: 'File' },
    { id: 'settings', label: 'Settings', description: 'Open settings', group: 'Preferences' },
    { id: 'theme', label: 'Toggle Theme', description: 'Switch between light and dark mode', group: 'Preferences' },
    { id: 'search', label: 'Search', description: 'Search in files', group: 'Edit', keywords: ['find', 'lookup'] },
    { id: 'replace', label: 'Find and Replace', description: 'Search and replace text', group: 'Edit' },
    { id: 'git-commit', label: 'Git: Commit', description: 'Commit staged changes', group: 'Git' },
    { id: 'git-push', label: 'Git: Push', description: 'Push commits to remote', group: 'Git' },
    { id: 'git-pull', label: 'Git: Pull', description: 'Pull changes from remote', group: 'Git' },
  ];

  const handleSelect = (item: CommandPaletteItemType) => {
    setLastSelected(item.label);
    // Track recent items
    setRecentIds((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 5));
  };

  return (
    <div class="space-y-8">
      <PageHeader
        title="CommandPalette"
        description="Keyboard-driven command palette (Cmd+K). A searchable command menu that supports fuzzy search, recent items, keyboard navigation, and item grouping."
      />

      <DemoSection
        title="Import"
        code="import { CommandPalette } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        description={
          <>
            Press <kbd class="px-2 py-1 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Cmd+K</kbd> (or <kbd class="px-2 py-1 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Ctrl+K</kbd> on Windows) to open the command palette.
          </>
        }
        code={`const commands = [
  { id: 'new-file', label: 'New File', group: 'File' },
  { id: 'open-file', label: 'Open File', group: 'File' },
  { id: 'save', label: 'Save', group: 'File' },
  { id: 'settings', label: 'Settings', group: 'Preferences' },
  { id: 'theme', label: 'Toggle Theme', group: 'Preferences' },
];

<CommandPalette
  items={commands}
  onSelect={(item) => handleCommand(item.id)}
/>`}
        cardClass="p-6"
      >
        <div class="flex items-center gap-4 flex-wrap">
          <Button onClick={() => paletteRef?.open()}>Open Command Palette</Button>
          <span class="text-sm text-surface-500 dark:text-surface-400">
            or press <kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Cmd+K</kbd>
          </span>
        </div>
        {lastSelected() && (
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Last selected: <span class="font-medium">{lastSelected()}</span>
          </p>
        )}
        <CommandPalette
          ref={(handle) => (paletteRef = handle)}
          items={commands}
          onSelect={handleSelect}
          recentIds={recentIds()}
          placeholder="Type a command or search..."
        />
      </DemoSection>

      <DemoSection
        title="With Descriptions and Keywords"
        description="Add descriptions to help users understand commands. Use keywords for better search discovery."
        code={`const commands = [
  {
    id: 'new-file',
    label: 'New File',
    description: 'Create a new file',
    group: 'File',
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Search in files',
    group: 'Edit',
    keywords: ['find', 'lookup'], // Also matches these terms
  },
];

<CommandPalette
  items={commands}
  onSelect={(item) => executeCommand(item.id)}
/>`}
      />

      <DemoSection
        title="Recent Items Tracking"
        description="Track recently used commands and show them at the top when the palette opens."
        code={`const [recentIds, setRecentIds] = createSignal<string[]>([]);

<CommandPalette
  items={commands}
  recentIds={recentIds()}
  onSelect={(item) => {
    executeCommand(item.id);
    // Add to recent items (max 5)
    setRecentIds((prev) =>
      [item.id, ...prev.filter(id => id !== item.id)].slice(0, 5)
    );
  }}
/>`}
      />

      <DemoSection
        title="Imperative Handle"
        description="Control the palette programmatically using a ref handle."
        code={`let paletteRef: CommandPaletteHandle;

<Button onClick={() => paletteRef.open()}>
  Open Command Palette
</Button>

<CommandPalette
  ref={(handle) => (paletteRef = handle)}
  items={commands}
  onSelect={handleSelect}
  disableShortcut // Disable Cmd+K shortcut
/>

// Available methods:
// paletteRef.open()   - Open the palette
// paletteRef.close()  - Close the palette
// paletteRef.toggle() - Toggle open state
// paletteRef.isOpen() - Check if open`}
        cardClass="p-6"
      >
        <div class="flex items-center gap-3">
          <Button onClick={() => paletteRef?.open()}>open()</Button>
          <Button variant="secondary" onClick={() => paletteRef?.close()}>close()</Button>
          <Button variant="secondary" onClick={() => paletteRef?.toggle()}>toggle()</Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Controlled Mode"
        description={
          <>
            Control the open state externally using <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">open</code> and <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">onOpenChange</code>.
          </>
        }
        code={`const [open, setOpen] = createSignal(false);

<CommandPalette
  items={commands}
  onSelect={handleSelect}
  open={open()}
  onOpenChange={setOpen}
/>`}
        cardClass="p-6"
      >
        <div class="flex items-center gap-4">
          <Button onClick={() => setControlledOpen(true)}>Open Controlled Palette</Button>
          <span class="text-sm text-surface-500 dark:text-surface-400">
            State: {controlledOpen() ? 'Open' : 'Closed'}
          </span>
        </div>
        <CommandPalette
          items={commands}
          onSelect={handleSelect}
          open={controlledOpen()}
          onOpenChange={setControlledOpen}
          disableShortcut
        />
      </DemoSection>

      <DemoSection
        title="Custom Shortcut Key"
        description="Change the keyboard shortcut from Cmd+K to another key."
        code={`<CommandPalette
  items={commands}
  onSelect={handleSelect}
  shortcutKey="p" // Cmd+P instead of Cmd+K
/>`}
      />

      <DemoSection
        title="Custom Search Function"
        description="Override the default fuzzy search with your own search implementation."
        code={`<CommandPalette
  items={commands}
  onSelect={handleSelect}
  searchFn={(query, items) => {
    // Custom search logic
    return items
      .filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
      .map(item => ({ item, score: 0 }));
  }}
/>`}
      />

      <DemoSection
        title="Custom Footer"
        description="Replace the default footer with custom content."
        code={`<CommandPalette
  items={commands}
  onSelect={handleSelect}
  footer={
    <div class="flex justify-between text-xs text-surface-500">
      <span>Press Enter to select</span>
      <span>Esc to close</span>
    </div>
  }
/>`}
      />

      <DemoSection
        title="Disabled Items"
        description="Mark items as disabled to prevent selection."
        code={`const commands = [
  { id: 'available', label: 'Available Action' },
  { id: 'premium', label: 'Premium Feature', disabled: true },
];

<CommandPalette items={commands} onSelect={handleSelect} />`}
      />

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            { name: 'items', type: 'CommandPaletteItem[]', default: 'required', description: 'Available commands' },
            { name: 'onSelect', type: '(item) => void', default: 'required', description: 'Selection callback' },
            { name: 'searchFn', type: '(query, items) => SearchResult[]', description: 'Custom search function' },
            { name: 'shortcutKey', type: 'string', default: "'k'", description: 'Keyboard shortcut key' },
            { name: 'disableShortcut', type: 'boolean', default: 'false', description: 'Disable keyboard shortcut' },
            { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Input placeholder text' },
            { name: 'emptyText', type: 'string', default: "'No results'", description: 'No results message' },
            { name: 'recentIds', type: 'string[]', description: 'Recent item IDs (shown first)' },
            { name: 'open', type: 'boolean', description: 'Controlled open state' },
            { name: 'onOpenChange', type: '(open) => void', description: 'Open state callback' },
            { name: 'footer', type: 'JSX.Element', description: 'Custom footer content' },
            { name: 'ref', type: '(handle) => void', description: 'Imperative handle ref' },
          ]}
        />
      </DemoSection>

      <DemoSection title="CommandPaletteItem">
        <PropsTable
          compact
          props={[
            { name: 'id', type: 'string', description: 'Unique identifier' },
            { name: 'label', type: 'string', description: 'Display label' },
            { name: 'description', type: 'string', description: 'Secondary text' },
            { name: 'group', type: 'string', description: 'Group name for categorization' },
            { name: 'icon', type: 'JSX.Element', description: 'Optional icon' },
            { name: 'keywords', type: 'string[]', description: 'Additional search keywords' },
            { name: 'disabled', type: 'boolean', description: 'Disable item selection' },
            { name: 'data', type: 'T', description: 'Custom data attached to item' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Handle Methods">
        <PropsTable
          compact
          props={[
            { name: 'open()', type: '', description: 'Open the palette' },
            { name: 'close()', type: '', description: 'Close the palette' },
            { name: 'toggle()', type: '', description: 'Toggle open state' },
            { name: 'isOpen()', type: '', description: 'Check if palette is open' },
          ]}
        />
      </DemoSection>

      <DemoSection title="Keyboard Navigation" card={false}>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Cmd+K</kbd> / <kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Ctrl+K</kbd> - Toggle palette open/close</li>
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Arrow Up/Down</kbd> - Navigate through items</li>
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Enter</kbd> - Select highlighted item</li>
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Escape</kbd> - Close palette</li>
        </ul>
      </DemoSection>
    </div>
  );
}
