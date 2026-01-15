import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  createContextMenu,
  CodeBlock,
} from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

export default function ContextMenuPage() {
  const [lastAction, setLastAction] = createSignal('');
  const menu = createContextMenu<FileItem>();

  const files: FileItem[] = [
    { id: '1', name: 'Documents', type: 'folder' },
    { id: '2', name: 'report.pdf', type: 'file' },
    { id: '3', name: 'photo.jpg', type: 'file' },
    { id: '4', name: 'Projects', type: 'folder' },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">ContextMenu</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Right-click context menu with support for contextual data in lists. Provides native-like context menu experience.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  createContextMenu
} from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Right-click on the trigger area to open the context menu.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <ContextMenu>
            <ContextMenuTrigger>
              <div class="p-8 border-2 border-dashed border-surface-300 dark:border-white/20 rounded-lg text-center text-surface-600 dark:text-surface-400 cursor-context-menu">
                Right-click this area
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => setLastAction('New File')}>
                New File
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setLastAction('New Folder')}>
                New Folder
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onSelect={() => setLastAction('Paste')}>
                Paste
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          {lastAction() && (
            <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
              Last action: <span class="font-medium">{lastAction()}</span>
            </p>
          )}
        </div>
        <CodeBlock
          code={`<ContextMenu>
  <ContextMenuTrigger>
    <div class="p-8 border-2 border-dashed rounded-lg">
      Right-click this area
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={() => console.log('New File')}>
      New File
    </ContextMenuItem>
    <ContextMenuItem onSelect={() => console.log('New Folder')}>
      New Folder
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem onSelect={() => console.log('Paste')}>
      Paste
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Data (For Lists)</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">createContextMenu&lt;T&gt;()</code> for typed context menus where each trigger passes its own data.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <ContextMenu {...menu.props}>
            <div class="space-y-1">
              <For each={files}>
                {(file) => (
                  <ContextMenuTrigger data={file}>
                    <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-white/5 cursor-context-menu transition-colors">
                      <span class="text-xl">{file.type === 'folder' ? '\uD83D\uDCC1' : '\uD83D\uDCC4'}</span>
                      <span class="text-surface-700 dark:text-surface-200">{file.name}</span>
                    </div>
                  </ContextMenuTrigger>
                )}
              </For>
            </div>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => setLastAction(`Open "${menu.data()?.name}"`)}>
                Open "{menu.data()?.name}"
              </ContextMenuItem>
              <ContextMenuItem shortcut="Cmd+C" onSelect={() => setLastAction(`Copy "${menu.data()?.name}"`)}>
                Copy
              </ContextMenuItem>
              <ContextMenuItem shortcut="Cmd+X" onSelect={() => setLastAction(`Cut "${menu.data()?.name}"`)}>
                Cut
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onSelect={() => setLastAction(`Rename "${menu.data()?.name}"`)}>
                Rename
              </ContextMenuItem>
              <ContextMenuItem
                destructive
                shortcut="Cmd+Del"
                onSelect={() => setLastAction(`Delete "${menu.data()?.name}"`)}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          {lastAction() && (
            <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
              Last action: <span class="font-medium">{lastAction()}</span>
            </p>
          )}
        </div>
        <CodeBlock
          code={`interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
}

function FileList() {
  const menu = createContextMenu<FileItem>();
  const [files] = createSignal<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder' },
    { id: '2', name: 'report.pdf', type: 'file' },
  ]);

  return (
    <ContextMenu {...menu.props}>
      <For each={files()}>
        {(file) => (
          <ContextMenuTrigger data={file}>
            <div class="flex items-center gap-2 p-2 hover:bg-surface-100 rounded">
              <span>{file.type === 'folder' ? '\uD83D\uDCC1' : '\uD83D\uDCC4'}</span>
              <span>{file.name}</span>
            </div>
          </ContextMenuTrigger>
        )}
      </For>

      <ContextMenuContent>
        <ContextMenuItem onSelect={() => openFile(menu.data()!.id)}>
          Open "{menu.data()?.name}"
        </ContextMenuItem>
        <ContextMenuItem shortcut="Cmd+C" onSelect={() => copyFile(menu.data()!.id)}>
          Copy
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={() => deleteFile(menu.data()!.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Keyboard Shortcuts</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Display keyboard shortcuts next to menu items for discoverability.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <ContextMenu>
            <ContextMenuTrigger>
              <div class="p-8 border-2 border-dashed border-surface-300 dark:border-white/20 rounded-lg text-center text-surface-600 dark:text-surface-400 cursor-context-menu">
                Right-click for edit menu
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem shortcut="Cmd+Z" onSelect={() => setLastAction('Undo')}>
                Undo
              </ContextMenuItem>
              <ContextMenuItem shortcut="Cmd+Shift+Z" onSelect={() => setLastAction('Redo')}>
                Redo
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem shortcut="Cmd+X" onSelect={() => setLastAction('Cut')}>
                Cut
              </ContextMenuItem>
              <ContextMenuItem shortcut="Cmd+C" onSelect={() => setLastAction('Copy')}>
                Copy
              </ContextMenuItem>
              <ContextMenuItem shortcut="Cmd+V" onSelect={() => setLastAction('Paste')}>
                Paste
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <CodeBlock
          code={`<ContextMenuContent>
  <ContextMenuItem shortcut="Cmd+Z" onSelect={handleUndo}>
    Undo
  </ContextMenuItem>
  <ContextMenuItem shortcut="Cmd+Shift+Z" onSelect={handleRedo}>
    Redo
  </ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem shortcut="Cmd+X" onSelect={handleCut}>
    Cut
  </ContextMenuItem>
  <ContextMenuItem shortcut="Cmd+C" onSelect={handleCopy}>
    Copy
  </ContextMenuItem>
  <ContextMenuItem shortcut="Cmd+V" onSelect={handlePaste}>
    Paste
  </ContextMenuItem>
</ContextMenuContent>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled and Destructive Items</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">disabled</code> for unavailable actions and <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">destructive</code> for dangerous actions.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <ContextMenu>
            <ContextMenuTrigger>
              <div class="p-8 border-2 border-dashed border-surface-300 dark:border-white/20 rounded-lg text-center text-surface-600 dark:text-surface-400 cursor-context-menu">
                Right-click to see disabled/destructive items
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => setLastAction('Edit')}>Edit</ContextMenuItem>
              <ContextMenuItem onSelect={() => setLastAction('Duplicate')}>Duplicate</ContextMenuItem>
              <ContextMenuItem disabled>
                Paste (clipboard empty)
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem destructive onSelect={() => setLastAction('Delete')}>
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <CodeBlock
          code={`<ContextMenuContent>
  <ContextMenuItem onSelect={handleEdit}>Edit</ContextMenuItem>
  <ContextMenuItem disabled>
    Paste (clipboard empty)
  </ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem destructive onSelect={handleDelete}>
    Delete
  </ContextMenuItem>
</ContextMenuContent>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">createContextMenu Hook</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          The hook provides programmatic access to the context menu state.
        </p>
        <CodeBlock
          code={`const menu = createContextMenu<T>();

// Spread props on ContextMenu
<ContextMenu {...menu.props}>

// Access current data
const currentItem = menu.data();

// Check if menu is open
if (menu.isOpen()) { ... }

// Get position
const { x, y } = menu.position();

// Close programmatically
menu.close();`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Component Props</h2>

        <h3 class="text-md font-semibold text-surface-800 dark:text-surface-200 mb-3 mt-6">ContextMenu</h3>
        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">children</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">Child components</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">onOpenChange</td>
                <td class="py-3 px-4 font-mono text-xs">(open: boolean, data: T | null) =&gt; void</td>
                <td class="py-3 px-4">Open state change callback</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-surface-800 dark:text-surface-200 mb-3">ContextMenuTrigger</h3>
        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">children</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">Trigger content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">data</td>
                <td class="py-3 px-4 font-mono text-xs">T</td>
                <td class="py-3 px-4">Data to pass to menu</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">disabled</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">Disable the trigger</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-surface-800 dark:text-surface-200 mb-3">ContextMenuItem</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">children</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">Item label</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">onSelect</td>
                <td class="py-3 px-4 font-mono text-xs">() =&gt; void</td>
                <td class="py-3 px-4">Selection callback</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">disabled</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">Disable the item</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">icon</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">Icon on the left</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">shortcut</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">Keyboard shortcut display</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">destructive</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">Red styling for dangerous actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Behavior</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>Appears at cursor position with viewport boundary detection</li>
          <li>Closes on click outside, Escape key, or item selection</li>
          <li>Prevents browser's default context menu</li>
          <li>Renders via Portal for proper stacking</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accessibility</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li><code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">role="menu"</code> on content</li>
          <li><code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">role="menuitem"</code> on items</li>
          <li><code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">role="separator"</code> on separators</li>
          <li><code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">aria-disabled</code> for disabled items</li>
          <li>Keyboard navigation (Arrow keys, Enter, Escape)</li>
        </ul>
      </section>
    </div>
  );
}
