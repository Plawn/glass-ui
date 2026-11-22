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

### In Error Boundaries (`Errored`)

```tsx
function App() {
  return (
    <Errored
      fallback={(err) => (
        <ErrorDisplay
          title="Something went wrong"
          message={String(err())}
        />
      )}
    >
      <MainContent />
    </Errored>
  );
}
```

### API Error Handling

```tsx
function UserProfile() {
  // Async memo: a rejected promise surfaces at the nearest <Errored>
  const user = createMemo(() => fetchUser());

  return (
    <Errored
      fallback={(err) => (
        <ErrorDisplay
          title="Failed to load profile"
          message={String(err()) || 'Unknown error'}
        />
      )}
    >
      <Loading fallback={<Spinner />}>
        <UserDetails user={user()} />
      </Loading>
    </Errored>
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
