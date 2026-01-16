import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  createContextMenu,
} from 'glass-ui-solid';
import { createSignal, For } from 'solid-js';
import { PageHeader, DemoSection, PropsTable, CodePill, FeatureList } from '../../components/demo';

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
      <PageHeader
        title="ContextMenu"
        description="Right-click context menu with support for contextual data in lists. Provides native-like context menu experience."
      />

      <DemoSection
        title="Import"
        code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  createContextMenu
} from 'glass-ui-solid';`}
      />

      <DemoSection
        title="Basic Usage"
        description="Right-click on the trigger area to open the context menu."
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
        cardClass="p-6"
      >
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
      </DemoSection>

      <DemoSection
        title="With Data (For Lists)"
        description={
          <>
            Use <CodePill>createContextMenu&lt;T&gt;()</CodePill> for typed context menus where each trigger passes its own data.
          </>
        }
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
        cardClass="p-6"
      >
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
      </DemoSection>

      <DemoSection
        title="With Keyboard Shortcuts"
        description="Display keyboard shortcuts next to menu items for discoverability."
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
        cardClass="p-6"
      >
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
      </DemoSection>

      <DemoSection
        title="Disabled and Destructive Items"
        description={
          <>
            Use <CodePill>disabled</CodePill> for unavailable actions and <CodePill>destructive</CodePill> for dangerous actions.
          </>
        }
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
        cardClass="p-6"
      >
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
      </DemoSection>

      <DemoSection
        title="createContextMenu Hook"
        description="The hook provides programmatic access to the context menu state."
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
      />

      <DemoSection title="Component Props">
        <DemoSection title="ContextMenu" subsection>
          <PropsTable
            compact
            props={[
              { name: 'children', type: 'JSX.Element', description: 'Child components' },
              { name: 'onOpenChange', type: '(open: boolean, data: T | null) => void', description: 'Open state change callback' },
            ]}
          />
        </DemoSection>

        <DemoSection title="ContextMenuTrigger" subsection>
          <PropsTable
            compact
            props={[
              { name: 'children', type: 'JSX.Element', description: 'Trigger content' },
              { name: 'data', type: 'T', description: 'Data to pass to menu' },
              { name: 'disabled', type: 'boolean', description: 'Disable the trigger' },
            ]}
          />
        </DemoSection>

        <DemoSection title="ContextMenuItem" subsection>
          <PropsTable
            compact
            props={[
              { name: 'children', type: 'JSX.Element', description: 'Item label' },
              { name: 'onSelect', type: '() => void', description: 'Selection callback' },
              { name: 'disabled', type: 'boolean', description: 'Disable the item' },
              { name: 'icon', type: 'JSX.Element', description: 'Icon on the left' },
              { name: 'shortcut', type: 'string', description: 'Keyboard shortcut display' },
              { name: 'destructive', type: 'boolean', description: 'Red styling for dangerous actions' },
            ]}
          />
        </DemoSection>
      </DemoSection>

      <DemoSection title="Behavior" card={false}>
        <FeatureList
          items={[
            'Appears at cursor position with viewport boundary detection',
            'Closes on click outside, Escape key, or item selection',
            "Prevents browser's default context menu",
            'Renders via Portal for proper stacking',
          ]}
        />
      </DemoSection>

      <DemoSection title="Accessibility" card={false}>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li><CodePill>role="menu"</CodePill> on content</li>
          <li><CodePill>role="menuitem"</CodePill> on items</li>
          <li><CodePill>role="separator"</CodePill> on separators</li>
          <li><CodePill>aria-disabled</CodePill> for disabled items</li>
          <li>Keyboard navigation (Arrow keys, Enter, Escape)</li>
        </ul>
      </DemoSection>
    </div>
  );
}
