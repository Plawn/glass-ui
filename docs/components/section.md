# Section

Content section with title.

## Import

```tsx
import { Section } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<Section title="User Information">
  <p>Section content goes here.</p>
</Section>
```

### Multiple Sections

```tsx
<div class="space-y-6">
  <Section title="Personal Details">
    <Input label="Name" value={name()} onInput={setName} />
    <Input label="Email" value={email()} onInput={setEmail} />
  </Section>

  <Section title="Preferences">
    <Checkbox label="Email notifications" checked={notifications()} onChange={setNotifications} />
    <Checkbox label="Marketing emails" checked={marketing()} onChange={setMarketing} />
  </Section>

  <Section title="Security">
    <Button>Change Password</Button>
  </Section>
</div>
```

### In Settings Page

```tsx
function SettingsPage() {
  return (
    <div class="max-w-2xl mx-auto space-y-8">
      <Section title="Account">
        <Card>
          <div class="space-y-4">
            <Input label="Username" value={username()} onInput={setUsername} />
            <Input label="Email" type="email" value={email()} onInput={setEmail} />
          </div>
        </Card>
      </Section>

      <Section title="Appearance">
        <Card>
          <SegmentedControl
            value={theme()}
            onChange={setTheme}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' },
            ]}
          />
        </Card>
      </Section>

      <Section title="Danger Zone">
        <Card class="border-error-500">
          <Button variant="danger">Delete Account</Button>
        </Card>
      </Section>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Section title |
| `children` | `JSX.Element` | required | Section content |
| `class` | `string` | - | Additional CSS classes |
