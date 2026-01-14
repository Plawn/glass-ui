# ErrorDisplay

Error message display component.

## Import

```tsx
import { ErrorDisplay } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<ErrorDisplay message="An unexpected error occurred" />
```

### Custom Title

```tsx
<ErrorDisplay
  title="Connection Failed"
  message="Unable to connect to the server. Please check your internet connection."
/>
```

### In Error Boundaries

```tsx
function App() {
  return (
    <ErrorBoundary
      fallback={(err) => (
        <ErrorDisplay
          title="Something went wrong"
          message={err.message}
        />
      )}
    >
      <MainContent />
    </ErrorBoundary>
  );
}
```

### API Error Handling

```tsx
function UserProfile() {
  const [user] = createResource(() => fetchUser());

  return (
    <Show
      when={!user.error}
      fallback={
        <ErrorDisplay
          title="Failed to load profile"
          message={user.error?.message || 'Unknown error'}
        />
      }
    >
      <UserDetails user={user()} />
    </Show>
  );
}
```

### Form Submission Error

```tsx
function ContactForm() {
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    try {
      await submitForm(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Show when={error()}>
        <ErrorDisplay message={error()!} />
      </Show>
      {/* form fields */}
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | required | Error message |
| `title` | `string` | `'Request Failed'` | Error title |
| `class` | `string` | - | Additional CSS classes |
