# GlassBackground

Animated gradient background with blobs.

## Import

```tsx
import { GlassBackground } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
<GlassBackground>
  <div class="relative z-10 p-8">
    <h1>Content on glass background</h1>
  </div>
</GlassBackground>
```

### Custom Gradient

```tsx
<GlassBackground
  gradient={{
    from: '#fdf4ff',
    via: '#fae8ff',
    to: '#f5d0fe',
  }}
  darkGradient={{
    from: '#1a0a1f',
    via: '#2d1b35',
    to: '#1f0d24',
  }}
>
  {children}
</GlassBackground>
```

### Custom Blobs

```tsx
<GlassBackground
  blobs={[
    {
      top: '10%',
      left: '20%',
      size: '400px',
      colors: ['#818cf8', '#c084fc'],
      opacity: 0.3,
      duration: 20,
    },
    {
      bottom: '20%',
      right: '10%',
      size: '300px',
      colors: ['#34d399', '#22d3ee'],
      opacity: 0.25,
      duration: 25,
      delay: 5,
    },
  ]}
>
  {children}
</GlassBackground>
```

### Static (No Animation)

```tsx
<GlassBackground animated={false}>
  {children}
</GlassBackground>
```

### Full Page Background

```tsx
function App() {
  return (
    <GlassBackground class="min-h-screen">
      <nav class="relative z-10">...</nav>
      <main class="relative z-10">...</main>
    </GlassBackground>
  );
}
```

### Login Page

```tsx
function LoginPage() {
  return (
    <GlassBackground class="min-h-screen flex items-center justify-center">
      <Card class="w-full max-w-md glass-card">
        <h1 class="text-2xl font-bold mb-6">Sign In</h1>
        <form class="space-y-4">
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          <Button class="w-full">Sign In</Button>
        </form>
      </Card>
    </GlassBackground>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` | - | Content to render on top |
| `blobs` | `GlassBackgroundBlob[]` | default blobs | Custom blob configuration |
| `animated` | `boolean` | `true` | Animate the blobs |
| `gradient` | `GlassBackgroundGradient` | - | Light mode gradient |
| `darkGradient` | `GlassBackgroundGradient` | - | Dark mode gradient |
| `class` | `string` | - | Additional CSS classes |

### GlassBackgroundBlob

| Prop | Type | Description |
|------|------|-------------|
| `top` | `string` | Position from top |
| `left` | `string` | Position from left |
| `right` | `string` | Position from right |
| `bottom` | `string` | Position from bottom |
| `size` | `string` | Blob size |
| `colors` | `[string, string]` | Gradient colors |
| `opacity` | `number` | Light mode opacity (0-1) |
| `darkOpacity` | `number` | Dark mode opacity (0-1) |
| `duration` | `number` | Animation duration (seconds) |
| `delay` | `number` | Animation delay (seconds) |

### GlassBackgroundGradient

| Prop | Type | Description |
|------|------|-------------|
| `from` | `string` | Start color |
| `via` | `string` | Middle color (optional) |
| `to` | `string` | End color |
