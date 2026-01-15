import { CommandPalette, CodeBlock, Button } from 'glass-ui-solid';
import type { CommandPaletteHandle, CommandPaletteItemType } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">CommandPalette</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Keyboard-driven command palette (Cmd+K). A searchable command menu that supports fuzzy search, recent items, keyboard navigation, and item grouping.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { CommandPalette } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Press <kbd class="px-2 py-1 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Cmd+K</kbd> (or <kbd class="px-2 py-1 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Ctrl+K</kbd> on Windows) to open the command palette.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
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
        </div>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Descriptions and Keywords</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Add descriptions to help users understand commands. Use keywords for better search discovery.
        </p>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Recent Items Tracking</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Track recently used commands and show them at the top when the palette opens.
        </p>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Imperative Handle</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Control the palette programmatically using a ref handle.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <div class="flex items-center gap-3">
            <Button onClick={() => paletteRef?.open()}>open()</Button>
            <Button variant="secondary" onClick={() => paletteRef?.close()}>close()</Button>
            <Button variant="secondary" onClick={() => paletteRef?.toggle()}>toggle()</Button>
          </div>
        </div>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Controlled Mode</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Control the open state externally using <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">open</code> and <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">onOpenChange</code>.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
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
        </div>
        <CodeBlock
          code={`const [open, setOpen] = createSignal(false);

<CommandPalette
  items={commands}
  onSelect={handleSelect}
  open={open()}
  onOpenChange={setOpen}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Shortcut Key</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Change the keyboard shortcut from Cmd+K to another key.
        </p>
        <CodeBlock
          code={`<CommandPalette
  items={commands}
  onSelect={handleSelect}
  shortcutKey="p" // Cmd+P instead of Cmd+K
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Search Function</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Override the default fuzzy search with your own search implementation.
        </p>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Custom Footer</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Replace the default footer with custom content.
        </p>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled Items</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Mark items as disabled to prevent selection.
        </p>
        <CodeBlock
          code={`const commands = [
  { id: 'available', label: 'Available Action' },
  { id: 'premium', label: 'Premium Feature', disabled: true },
];

<CommandPalette items={commands} onSelect={handleSelect} />`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">items</td>
                <td class="py-3 px-4 font-mono text-xs">CommandPaletteItem[]</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Available commands</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">onSelect</td>
                <td class="py-3 px-4 font-mono text-xs">(item) =&gt; void</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Selection callback</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">searchFn</td>
                <td class="py-3 px-4 font-mono text-xs">(query, items) =&gt; SearchResult[]</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Custom search function</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">shortcutKey</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'k'</td>
                <td class="py-3 px-4">Keyboard shortcut key</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">disableShortcut</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Disable keyboard shortcut</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">placeholder</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'Search...'</td>
                <td class="py-3 px-4">Input placeholder text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">emptyText</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">'No results'</td>
                <td class="py-3 px-4">No results message</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">recentIds</td>
                <td class="py-3 px-4 font-mono text-xs">string[]</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Recent item IDs (shown first)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">open</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Controlled open state</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">onOpenChange</td>
                <td class="py-3 px-4 font-mono text-xs">(open) =&gt; void</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Open state callback</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">footer</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Custom footer content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">ref</td>
                <td class="py-3 px-4 font-mono text-xs">(handle) =&gt; void</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Imperative handle ref</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">CommandPaletteItem</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Property</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">id</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">Unique identifier</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">label</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">Display label</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">description</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">Secondary text</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">group</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">Group name for categorization</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">icon</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">Optional icon</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">keywords</td>
                <td class="py-3 px-4 font-mono text-xs">string[]</td>
                <td class="py-3 px-4">Additional search keywords</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">disabled</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">Disable item selection</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">data</td>
                <td class="py-3 px-4 font-mono text-xs">T</td>
                <td class="py-3 px-4">Custom data attached to item</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Handle Methods</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Method</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">open()</td>
                <td class="py-3 px-4">Open the palette</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">close()</td>
                <td class="py-3 px-4">Close the palette</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">toggle()</td>
                <td class="py-3 px-4">Toggle open state</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">isOpen()</td>
                <td class="py-3 px-4">Check if palette is open</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Keyboard Navigation</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Cmd+K</kbd> / <kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Ctrl+K</kbd> - Toggle palette open/close</li>
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Arrow Up/Down</kbd> - Navigate through items</li>
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Enter</kbd> - Select highlighted item</li>
          <li><kbd class="px-1.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-white/10 rounded border border-surface-200 dark:border-white/10">Escape</kbd> - Close palette</li>
        </ul>
      </section>
    </div>
  );
}
