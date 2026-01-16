# Demo Plugins

## demo-code-capture

A Vite plugin that automatically captures the source code of `DemoSection` children and injects it as a `code` prop.

### Problem

When writing demo pages, you often have to duplicate code:

```tsx
// Annoying: write the same code twice
<DemoSection
  title="Basic"
  code="<Button variant='primary'>Click me</Button>"
>
  <Button variant="primary">Click me</Button>
</DemoSection>
```

### Solution

This plugin automatically extracts the children's source code at build time:

```tsx
// Just write it once - the plugin handles the rest
<DemoSection title="Basic">
  <Button variant="primary">Click me</Button>
</DemoSection>

// Transforms to:
<DemoSection title="Basic" code={`<Button variant="primary">Click me</Button>`}>
  <Button variant="primary">Click me</Button>
</DemoSection>
```

### Features

- **Automatic code extraction**: No manual `code` prop needed for simple cases
- **Preserves formatting**: Maintains indentation and line breaks
- **Smart dedentation**: Removes common leading whitespace
- **Skips when appropriate**:
  - Self-closing `<DemoSection />` (no children)
  - Already has a `code` prop
  - Children is `<PropsTable>` (no code display needed)

### When to use manual `code` prop

Use the `code` prop manually when:

1. **Import statements** (no children):
   ```tsx
   <DemoSection title="Import" code="import { Button } from 'glass-ui-solid';" />
   ```

2. **External variables** (captured code would be unclear):
   ```tsx
   const [count, setCount] = createSignal(0);

   <DemoSection
     title="Counter"
     code={`const [count, setCount] = createSignal(0);

   <Button onClick={() => setCount(c => c + 1)}>
     Count: {count()}
   </Button>`}
   >
     <Button onClick={() => setCount(c => c + 1)}>
       Count: {count()}
     </Button>
   </DemoSection>
   ```

3. **Simplified display** (show cleaner code than what's actually rendered):
   ```tsx
   <DemoSection
     title="Sizes"
     code={`<Spinner size="sm" />
   <Spinner size="md" />
   <Spinner size="lg" />`}
   >
     {/* Actual demo has labels and spacing */}
     <div class="flex items-center gap-6">
       <div class="flex flex-col items-center">
         <Spinner size="sm" />
         <span class="text-xs">sm</span>
       </div>
       {/* ... */}
     </div>
   </DemoSection>
   ```

### Conventions

1. **Self-contained examples**: Don't reference external variables in children
2. **Inline values**: Use literal values instead of variables
3. **Wrapper divs are OK**: They'll be included in the captured code

### Technical Details

- Runs in Vite's `pre` phase (before other transforms)
- Only processes files matching `demo/src/pages/**/*.tsx`
- Uses regex-based parsing (not full AST) for simplicity
- Escapes backticks and template expressions in captured code
