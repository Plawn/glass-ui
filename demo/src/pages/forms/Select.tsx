import { Select } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import {
  DemoSection,
  PageHeader,
  PropsTable,
  StateDisplay,
} from '../../components/demo';

interface User {
  id: number;
  name: string;
  role: string;
}

export default function SelectPage() {
  const [fruit, setFruit] = createSignal('');
  const [country, setCountry] = createSignal('');
  const [priority, setPriority] = createSignal('');
  const [language, setLanguage] = createSignal<string | null>(null);
  const [selectedUser, setSelectedUser] = createSignal<User | null>(null);

  const languageOptions = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'py', label: 'Python' },
    { value: 'rs', label: 'Rust' },
    { value: 'go', label: 'Go', disabled: true },
  ];

  const userOptions = [
    { value: { id: 1, name: 'John', role: 'Admin' }, label: 'John (Admin)' },
    { value: { id: 2, name: 'Jane', role: 'Editor' }, label: 'Jane (Editor)' },
    { value: { id: 3, name: 'Bob', role: 'Viewer' }, label: 'Bob (Viewer)' },
  ];

  return (
    <div class="space-y-8">
      <PageHeader
        title="Select"
        description="A glassmorphic select dropdown component with custom styling and a chevron indicator."
      />

      <DemoSection
        title="Import"
        code="import { Select } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [fruit, setFruit] = createSignal('');

<Select value={fruit()} onChange={setFruit}>
  <option value="">Select a fruit...</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
  <option value="grape">Grape</option>
</Select>`}
      >
        <div class="space-y-4 max-w-xs">
          <Select value={fruit()} onChange={setFruit}>
            <option value="">Select a fruit...</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
            <option value="grape">Grape</option>
          </Select>
          <StateDisplay label="Selected" value={fruit() || '(none)'} />
        </div>
      </DemoSection>

      <DemoSection
        title="With Options Array"
        code={`const languageOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'rs', label: 'Rust' },
  { value: 'go', label: 'Go', disabled: true },
];

<Select
  value={language()}
  onChange={setLanguage}
  label="Language"
  emptyOption="Select a language..."
  options={languageOptions}
/>`}
      >
        <div class="space-y-4 max-w-xs">
          <Select
            value={language()}
            onChange={setLanguage}
            label="Language"
            emptyOption="Select a language..."
            options={languageOptions}
          />
          <StateDisplay label="Selected" value={language() || '(none)'} />
        </div>
      </DemoSection>

      <DemoSection
        title="With Object Values"
        code={`interface User {
  id: number;
  name: string;
  role: string;
}

const [selectedUser, setSelectedUser] = createSignal<User | null>(null);

const userOptions = [
  { value: { id: 1, name: 'John', role: 'Admin' }, label: 'John (Admin)' },
  { value: { id: 2, name: 'Jane', role: 'Editor' }, label: 'Jane (Editor)' },
  { value: { id: 3, name: 'Bob', role: 'Viewer' }, label: 'Bob (Viewer)' },
];

<Select
  value={selectedUser()}
  onChange={setSelectedUser}
  label="User"
  emptyOption="Select a user..."
  options={userOptions}
/>`}
      >
        <div class="space-y-4 max-w-xs">
          <Select
            value={selectedUser()}
            onChange={setSelectedUser}
            label="User"
            emptyOption="Select a user..."
            options={userOptions}
          />
          <StateDisplay
            label="Selected"
            value={
              selectedUser()
                ? `${selectedUser()?.name} (${selectedUser()?.role})`
                : '(none)'
            }
          />
        </div>
      </DemoSection>

      <DemoSection
        title="With Label"
        code={`<Select
  value={country()}
  onChange={setCountry}
  label="Country"
>
  <option value="">Select your country...</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  ...
</Select>`}
      >
        <div class="max-w-xs">
          <Select value={country()} onChange={setCountry} label="Country">
            <option value="">Select your country...</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
          </Select>
        </div>
      </DemoSection>

      <DemoSection
        title="With Option Groups"
        code={`<Select value={priority()} onChange={setPriority} label="Priority">
  <option value="">Select priority...</option>
  <optgroup label="High Priority">
    <option value="critical">Critical</option>
    <option value="urgent">Urgent</option>
  </optgroup>
  <optgroup label="Normal Priority">
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  </optgroup>
</Select>`}
      >
        <div class="max-w-xs">
          <Select value={priority()} onChange={setPriority} label="Priority">
            <option value="">Select priority...</option>
            <optgroup label="High Priority">
              <option value="critical">Critical</option>
              <option value="urgent">Urgent</option>
            </optgroup>
            <optgroup label="Normal Priority">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </optgroup>
          </Select>
        </div>
      </DemoSection>

      <DemoSection
        title="With Error"
        code={`<Select
  value=""
  onChange={() => {}}
  label="Category"
  error="Please select a category"
>
  <option value="">Select a category...</option>
  <option value="tech">Technology</option>
  ...
</Select>`}
      >
        <div class="max-w-xs">
          <Select
            value=""
            onChange={() => {}}
            label="Category"
            error="Please select a category"
          >
            <option value="">Select a category...</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </Select>
        </div>
      </DemoSection>

      <DemoSection
        title="Required Field"
        code={`<Select
  value={category()}
  onChange={setCategory}
  label="Category"
  required
>
  <option value="">Select a category...</option>
  ...
</Select>`}
      >
        <div class="max-w-xs">
          <Select
            value=""
            onChange={() => {}}
            label="Required Category"
            required
          >
            <option value="">Select a category...</option>
            <option value="tech">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </Select>
        </div>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<Select
  value="option1"
  onChange={() => {}}
  label="Disabled Select"
  disabled
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>`}
      >
        <div class="max-w-xs">
          <Select
            value="option1"
            onChange={() => {}}
            label="Disabled Select"
            disabled
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </Select>
        </div>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'value',
              type: 'string',
              description: 'Current selected value (required)',
            },
            {
              name: 'onChange',
              type: '(value: string) => void',
              description: 'Callback when selection changes (required)',
            },
            {
              name: 'children',
              type: 'JSX.Element',
              description: 'Option elements (use this OR options)',
            },
            {
              name: 'options',
              type: 'SelectOption[]',
              description: 'Array of options (use this OR children)',
            },
            {
              name: 'emptyOption',
              type: 'string',
              description: 'Placeholder text for empty option',
            },
            {
              name: 'label',
              type: 'string',
              description: 'Label text displayed above the select',
            },
            {
              name: 'error',
              type: 'string',
              description: 'Error message displayed below the select',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Whether the select is disabled',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Whether the select is required',
            },
            { name: 'id', type: 'string', description: 'HTML id attribute' },
            {
              name: 'name',
              type: 'string',
              description: 'HTML name attribute',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
