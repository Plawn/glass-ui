# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
bun install

# Build the library (outputs to dist/)
bun run build

# Build with watch mode for development
bun run dev

# Type check without emitting
bun run typecheck

# Run the demo app (installs demo deps and starts Vite)
bun run demo

# Build the demo app
bun run demo:build
```

## Architecture

This is a SolidJS component library called `glass-ui-solid` that provides iOS 26-inspired glassmorphism UI components. It uses Tailwind CSS v4 with OKLCH color space theming.

### Project Structure

- `src/index.ts` - Main entry point, imports global CSS and re-exports components/hooks
- `src/components/` - Each component has its own folder with `ComponentName.tsx`, `types.ts`, and `index.ts`
- `src/hooks/` - Shared hooks (useDialogState, useDisclosure, useCopyToClipboard, useIsDark, useAnimationState)
- `src/styles/` - CSS files: `global.css` (main entry), `glass.css`, `buttons.css`, `animations.css`, `utilities.css`, `theme.css`
- `src/constants/` - Centralized animation constants (`animations.ts`) and color definitions
- `src/components/shared/` - Shared internal components (CloseButton, icons)
- `demo/` - Separate Vite app for testing components (links to parent via `link:..`)

### Component Patterns

1. **Props Pattern**: Each component has a `types.ts` file defining props interfaces. Props extend standard JSX attributes where appropriate.

2. **Default Props**: Use nullish coalescing in computed signals, e.g., `const size = () => props.size ?? 'md';`

3. **Tailwind Classes**: Use `clsx` for conditional classes. Button variants and sizes use lookup objects mapping to Tailwind classes.

4. **Portals**: Modal, Drawer, Toast, Snackbar use `Portal` from `solid-js/web` to render outside the component tree. They use `useIsDark()` to apply the `dark` class to portal content.

5. **Global State**: Toast and Snackbar have global stores (`store.ts`) using `solid-js/store` with `createStore` and `produce`. Export imperative APIs like `toast.success()`, `showSnackbar()`.

6. **Dialog Behavior**: Modal/Drawer components implement escape key handling, body scroll lock, and backdrop click closing. The `useDialogState` hook provides this shared logic.

7. **Animation Constants**: Import animation class strings from `src/constants/animations.ts` (e.g., `MODAL_PANEL_ENTER`, `BACKDROP_ENTER`) rather than hardcoding.

### Styling Architecture

- Uses Tailwind CSS v4 with `@theme` for design tokens
- OKLCH color space for consistent color perception
- CSS custom properties defined in `:root` for runtime theming
- Dark mode via `.dark` class (class-based, not media query)
- Glass effects use `backdrop-filter: blur()` and semi-transparent backgrounds

### Key Dependencies

- `solid-js` - Peer dependency (^1.8.0)
- `clsx` - Class name composition
- `marked` + `dompurify` - Markdown component sanitization
- `prismjs` - CodeBlock syntax highlighting

### Build Configuration

- Vite library mode with `vite-plugin-solid` and `vite-plugin-dts`
- ES modules only (`formats: ['es']`)
- Preserves module structure for tree-shaking (`preserveModules: true`)
- External: solid-js, solid-js/web, solid-js/store
