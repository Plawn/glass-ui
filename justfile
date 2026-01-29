# Justfile for glass-ui-solid

# Default recipe
default:
    @just --list

# Bump patch version and publish to npm
release:
    npm version patch
    bun run build
    npm publish

# Bump minor version and publish to npm
release-minor:
    npm version minor
    bun run build
    npm publish

# Bump major version and publish to npm
release-major:
    npm version major
    bun run build
    npm publish

# Build only
build:
    bun run build

# Run dev mode
dev:
    bun run dev

# Run demo app
demo:
    bun run demo

# Type check
typecheck:
    bun run typecheck

# Lint
lint:
    bun run lint

# Lint and fix
lint-fix:
    bun run lint:fix
