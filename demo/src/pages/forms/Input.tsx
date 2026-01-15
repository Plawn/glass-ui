import { createSignal, For } from 'solid-js';
import { Input, Button, CodeBlock, Card } from 'glass-ui-solid';

export default function InputPage() {
  const [basicValue, setBasicValue] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [searchValue, setSearchValue] = createSignal('');

  const sizes = ['sm', 'md', 'lg'] as const;

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Input</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Text input with label, placeholder, and error states.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Input } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              value={basicValue()}
              onInput={setBasicValue}
              placeholder="Enter text..."
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [value, setValue] = createSignal('');

<Input
  value={value()}
  onInput={setValue}
  placeholder="Enter text..."
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Label</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              label="Email"
              value={email()}
              onInput={setEmail}
              placeholder="you@example.com"
              type="email"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input
  label="Email"
  value={email()}
  onInput={setEmail}
  placeholder="you@example.com"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Error</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              label="Username"
              value={username()}
              onInput={setUsername}
              placeholder="Enter username"
              error={username().length > 0 && username().length < 3 ? 'Username must be at least 3 characters' : undefined}
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input
  label="Username"
  value={username()}
  onInput={setUsername}
  error={!username() ? 'Username is required' : undefined}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Input Types</h2>
        <Card class="p-6 space-y-4">
          <div class="grid gap-4 md:grid-cols-2 max-w-2xl">
            <Input
              type="text"
              label="Text"
              value=""
              onInput={() => {}}
              placeholder="Plain text"
            />
            <Input
              type="email"
              label="Email"
              value=""
              onInput={() => {}}
              placeholder="you@example.com"
            />
            <Input
              type="password"
              label="Password"
              value={password()}
              onInput={setPassword}
              placeholder="Enter password"
            />
            <Input
              type="number"
              label="Number"
              value=""
              onInput={() => {}}
              placeholder="123"
            />
            <Input
              type="tel"
              label="Phone"
              value=""
              onInput={() => {}}
              placeholder="+1 (555) 000-0000"
            />
            <Input
              type="url"
              label="URL"
              value=""
              onInput={() => {}}
              placeholder="https://example.com"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input type="text" label="Name" {...props} />
<Input type="email" label="Email" {...props} />
<Input type="password" label="Password" {...props} />
<Input type="number" label="Age" {...props} />
<Input type="tel" label="Phone" {...props} />
<Input type="url" label="Website" {...props} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6">
          <div class="space-y-4 max-w-sm">
            <For each={sizes}>
              {(size) => (
                <Input
                  size={size}
                  label={`${size.toUpperCase()} Size`}
                  value=""
                  onInput={() => {}}
                  placeholder={`${size} input`}
                />
              )}
            </For>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input size="sm" label="Small" {...props} />
<Input size="md" label="Medium" {...props} />
<Input size="lg" label="Large" {...props} />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Required Field</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              label="Required Email"
              required
              value=""
              onInput={() => {}}
              placeholder="This field is required"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input
  label="Email"
  required
  value={email()}
  onInput={setEmail}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              label="Locked Field"
              value="Cannot edit this"
              onInput={() => {}}
              disabled
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input
  label="Locked Field"
  value="Cannot edit"
  disabled
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Read-only</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              label="Reference ID"
              value="REF-12345"
              onInput={() => {}}
              readonly
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input
  label="Reference ID"
  value="REF-12345"
  readonly
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Keyboard Events</h2>
        <Card class="p-6">
          <div class="max-w-sm">
            <Input
              label="Search"
              type="search"
              value={searchValue()}
              onInput={setSearchValue}
              placeholder="Press Enter to search"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  alert(`Searching for: ${searchValue()}`);
                }
              }}
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Input
  label="Search"
  value={search()}
  onInput={setSearch}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  }}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Form Example</h2>
        <Card class="p-6">
          <form
            class="space-y-4 max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
            }}
          >
            <Input
              label="Name"
              value=""
              onInput={() => {}}
              placeholder="Your name"
              required
            />
            <Input
              label="Email"
              type="email"
              value=""
              onInput={() => {}}
              placeholder="you@example.com"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`function ContactForm() {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // validate and submit
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <Input
        label="Name"
        value={name()}
        onInput={setName}
        required
      />
      <Input
        label="Email"
        type="email"
        value={email()}
        onInput={setEmail}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">
              <tr>
                <th class="px-4 py-3 rounded-tl-lg">Prop</th>
                <th class="px-4 py-3">Type</th>
                <th class="px-4 py-3">Default</th>
                <th class="px-4 py-3 rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-700 dark:text-surface-300">
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">value</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">required</td>
                <td class="px-4 py-3">Current input value</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">onInput</td>
                <td class="px-4 py-3 font-mono text-xs">(value: string) =&gt; void</td>
                <td class="px-4 py-3">required</td>
                <td class="px-4 py-3">Value change callback</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">label</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Label text</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">placeholder</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Placeholder text</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">type</td>
                <td class="px-4 py-3 font-mono text-xs">'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search'</td>
                <td class="px-4 py-3">'text'</td>
                <td class="px-4 py-3">Input type</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">size</td>
                <td class="px-4 py-3 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="px-4 py-3">'md'</td>
                <td class="px-4 py-3">Input size</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">error</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Error message</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">disabled</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">false</td>
                <td class="px-4 py-3">Disable the input</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">readonly</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">false</td>
                <td class="px-4 py-3">Make input read-only</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">required</td>
                <td class="px-4 py-3 font-mono text-xs">boolean</td>
                <td class="px-4 py-3">false</td>
                <td class="px-4 py-3">Mark as required</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <td class="px-4 py-3 font-mono text-xs">onKeyDown</td>
                <td class="px-4 py-3 font-mono text-xs">(e: KeyboardEvent) =&gt; void</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Keyboard event handler</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-xs">class</td>
                <td class="px-4 py-3 font-mono text-xs">string</td>
                <td class="px-4 py-3">-</td>
                <td class="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
