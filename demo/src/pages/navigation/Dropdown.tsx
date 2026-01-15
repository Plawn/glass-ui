import { Dropdown, CodeBlock, Button, Checkbox } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function DropdownPage() {
  const [open, setOpen] = createSignal(false);
  const [darkMode, setDarkMode] = createSignal(false);
  const [notifications, setNotifications] = createSignal(true);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Dropdown</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Generic dropdown container for custom content. A simplified wrapper around Popover for common dropdown use cases.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Dropdown } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          The Dropdown component accepts a trigger element and renders custom content when clicked.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <Dropdown trigger={<Button>Open Dropdown</Button>}>
            <div class="p-4 w-48">
              <p class="text-sm text-surface-700 dark:text-surface-200">
                This is custom dropdown content. You can put anything here!
              </p>
            </div>
          </Dropdown>
        </div>
        <CodeBlock
          code={`<Dropdown trigger={<Button>Open Dropdown</Button>}>
  <div class="p-4">
    <p>Custom dropdown content</p>
  </div>
</Dropdown>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Controlled State</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Control the dropdown's open state externally using <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">open</code> and <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">onOpenChange</code> props.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <div class="flex items-center gap-4">
            <Dropdown
              trigger={<Button>Controlled Dropdown</Button>}
              open={open()}
              onOpenChange={setOpen}
            >
              <div class="p-4 w-48">
                <p class="text-sm text-surface-700 dark:text-surface-200 mb-3">
                  This dropdown is controlled externally.
                </p>
                <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
              </div>
            </Dropdown>
            <span class="text-sm text-surface-500 dark:text-surface-400">
              State: {open() ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
        <CodeBlock
          code={`const [open, setOpen] = createSignal(false);

<Dropdown
  trigger={<Button>Toggle</Button>}
  open={open()}
  onOpenChange={setOpen}
>
  <div class="p-4">
    <Button onClick={() => setOpen(false)}>Close</Button>
  </div>
</Dropdown>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Placement Options</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Position the dropdown relative to its trigger using the <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">placement</code> prop.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <div class="flex flex-wrap gap-3">
            <Dropdown trigger={<Button variant="secondary">Bottom Start</Button>} placement="bottom-start">
              <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">Bottom start aligned</div>
            </Dropdown>
            <Dropdown trigger={<Button variant="secondary">Bottom</Button>} placement="bottom">
              <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">Bottom centered</div>
            </Dropdown>
            <Dropdown trigger={<Button variant="secondary">Bottom End</Button>} placement="bottom-end">
              <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">Bottom end aligned</div>
            </Dropdown>
            <Dropdown trigger={<Button variant="secondary">Top</Button>} placement="top">
              <div class="p-3 w-40 text-sm text-surface-700 dark:text-surface-200">Top centered</div>
            </Dropdown>
          </div>
        </div>
        <CodeBlock
          code={`<Dropdown trigger={trigger} placement="bottom">
  Bottom centered
</Dropdown>
<Dropdown trigger={trigger} placement="bottom-start">
  Bottom left aligned
</Dropdown>
<Dropdown trigger={trigger} placement="bottom-end">
  Bottom right aligned
</Dropdown>
<Dropdown trigger={trigger} placement="top">
  Top centered
</Dropdown>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Settings Panel</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-sm bg-surface-100 dark:bg-white/10 px-1.5 py-0.5 rounded">contentClass</code> to control the width of the dropdown content.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <Dropdown trigger={<Button>Settings</Button>} contentClass="w-72">
            <div class="p-4 space-y-4">
              <h3 class="font-semibold text-surface-900 dark:text-white">Quick Settings</h3>
              <Checkbox
                label="Dark mode"
                checked={darkMode()}
                onChange={setDarkMode}
              />
              <Checkbox
                label="Notifications"
                checked={notifications()}
                onChange={setNotifications}
              />
            </div>
          </Dropdown>
        </div>
        <CodeBlock
          code={`<Dropdown
  trigger={<Button>Settings</Button>}
  contentClass="w-80"
>
  <div class="p-4 space-y-4">
    <h3 class="font-semibold">Quick Settings</h3>
    <Checkbox label="Dark mode" checked={dark()} onChange={setDark} />
    <Checkbox label="Notifications" checked={notifs()} onChange={setNotifs} />
  </div>
</Dropdown>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">User Menu Example</h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Dropdowns work great for user menus and navigation.
        </p>
        <div class="p-6 glass-card rounded-xl mb-4">
          <Dropdown
            trigger={
              <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-white/10 transition-colors">
                <div class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <span class="text-surface-700 dark:text-surface-200">John Doe</span>
              </button>
            }
          >
            <div class="py-2 w-48">
              <button class="w-full text-left px-4 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-white/10">
                Profile
              </button>
              <button class="w-full text-left px-4 py-2 text-sm text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-white/10">
                Settings
              </button>
              <div class="border-t border-surface-200 dark:border-white/10 my-2" />
              <button class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
                Sign out
              </button>
            </div>
          </Dropdown>
        </div>
        <CodeBlock
          code={`<Dropdown
  trigger={
    <button class="flex items-center gap-2">
      <Avatar name={user.name} size="sm" />
      <span>{user.name}</span>
    </button>
  }
>
  <div class="py-2">
    <a href="/profile" class="block px-4 py-2 hover:bg-surface-100">
      Profile
    </a>
    <a href="/settings" class="block px-4 py-2 hover:bg-surface-100">
      Settings
    </a>
    <div class="border-t my-2" />
    <button onClick={logout} class="w-full text-left px-4 py-2 hover:bg-surface-100">
      Sign out
    </button>
  </div>
</Dropdown>`}
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
                <td class="py-3 px-4 font-mono text-xs">trigger</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Trigger element that opens the dropdown</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">children</td>
                <td class="py-3 px-4 font-mono text-xs">JSX.Element</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Dropdown content</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">open</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Controlled open state</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">onOpenChange</td>
                <td class="py-3 px-4 font-mono text-xs">(open: boolean) =&gt; void</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Open state callback</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">placement</td>
                <td class="py-3 px-4 font-mono text-xs">'bottom' | 'bottom-start' | ...</td>
                <td class="py-3 px-4">'bottom-start'</td>
                <td class="py-3 px-4">Dropdown placement relative to trigger</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">contentClass</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">CSS classes for content container</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-white/5">
                <td class="py-3 px-4 font-mono text-xs">scrollBehavior</td>
                <td class="py-3 px-4 font-mono text-xs">'close' | 'lock' | 'none'</td>
                <td class="py-3 px-4">'close'</td>
                <td class="py-3 px-4">How to handle scroll when open</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Behavior</h2>
        <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-2">
          <li>Closes on click outside</li>
          <li>Closes on Escape key</li>
          <li>Positions with viewport boundary detection</li>
          <li>Uses Portal to render outside component tree</li>
        </ul>
      </section>
    </div>
  );
}
