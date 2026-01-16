import { createSignal, For } from 'solid-js';
import { Input, Button } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function InputPage() {
  const [basicValue, setBasicValue] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [username, setUsername] = createSignal('ab');
  const [password, setPassword] = createSignal('');
  const [searchValue, setSearchValue] = createSignal('');

  const sizes = ['sm', 'md', 'lg'] as const;

  return (
    <div class="space-y-8">
      <PageHeader
        title="Input"
        description="Text input with label, placeholder, and error states."
      />

      <DemoSection
        title="Import"
        code="import { Input } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [value, setValue] = createSignal('');

<Input
  value={value()}
  onInput={setValue}
  placeholder="Enter text..."
/>`}
      >
        <div class="max-w-sm">
          <Input
            value={basicValue()}
            onInput={setBasicValue}
            placeholder="Enter text..."
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Label"
        code={`<Input
  label="Email"
  value={email()}
  onInput={setEmail}
  placeholder="you@example.com"
/>`}
      >
        <div class="max-w-sm">
          <Input
            label="Email"
            value={email()}
            onInput={setEmail}
            placeholder="you@example.com"
            type="email"
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Error"
        code={`<Input
  label="Username"
  value={username()}
  onInput={setUsername}
  error={!username() ? 'Username is required' : undefined}
/>`}
      >
        <div class="max-w-sm">
          <Input
            label="Username"
            value={username()}
            onInput={setUsername}
            placeholder="Enter username"
            error={username().length > 0 && username().length < 3 ? 'Username must be at least 3 characters' : undefined}
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Input Types"
        code={`<Input type="text" label="Name" {...props} />
<Input type="email" label="Email" {...props} />
<Input type="password" label="Password" {...props} />
<Input type="number" label="Age" {...props} />
<Input type="tel" label="Phone" {...props} />
<Input type="url" label="Website" {...props} />`}
        cardClass="p-6 space-y-4"
      >
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
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Input size="sm" label="Small" {...props} />
<Input size="md" label="Medium" {...props} />
<Input size="lg" label="Large" {...props} />`}
      >
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
      </DemoSection>

      <DemoSection
        title="Required Field"
        code={`<Input
  label="Email"
  required
  value={email()}
  onInput={setEmail}
/>`}
      >
        <div class="max-w-sm">
          <Input
            label="Required Email"
            required
            value=""
            onInput={() => {}}
            placeholder="This field is required"
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Disabled"
        code={`<Input
  label="Locked Field"
  value="Cannot edit"
  disabled
/>`}
      >
        <div class="max-w-sm">
          <Input
            label="Locked Field"
            value="Cannot edit this"
            onInput={() => {}}
            disabled
          />
        </div>
      </DemoSection>

      <DemoSection
        title="Read-only"
        code={`<Input
  label="Reference ID"
  value="REF-12345"
  readonly
/>`}
      >
        <div class="max-w-sm">
          <Input
            label="Reference ID"
            value="REF-12345"
            onInput={() => {}}
            readonly
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Keyboard Events"
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
      >
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
      </DemoSection>

      <DemoSection
        title="Form Example"
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
      >
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
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'string', default: 'required', description: 'Current input value' },
            { name: 'onInput', type: '(value: string) => void', default: 'required', description: 'Value change callback' },
            { name: 'label', type: 'string', description: 'Label text' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text' },
            { name: 'type', type: "'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search'", default: "'text'", description: 'Input type' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size' },
            { name: 'error', type: 'string', description: 'Error message' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
            { name: 'readonly', type: 'boolean', default: 'false', description: 'Make input read-only' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
            { name: 'onKeyDown', type: '(e: KeyboardEvent) => void', description: 'Keyboard event handler' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
