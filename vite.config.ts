import { resolve } from 'node:path';
import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    solid(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      // Multiple entries so the dedicated sub-exports (glass-ui-solid/code,
      // glass-ui-solid/markdown) emit real barrel files instead of being
      // inlined away by preserveModules. This lets consumers deep-import the
      // heavy components in isolation (prismjs / marked+dompurify).
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'components/CodeBlock/index': resolve(
          import.meta.dirname,
          'src/components/CodeBlock/index.ts',
        ),
        'components/Markdown/index': resolve(
          import.meta.dirname,
          'src/components/Markdown/index.ts',
        ),
      },
      formats: ['es'],
    },
    // false → all component CSS is bundled into a single dist/styles.css.
    // With splitting on, GlassBackground's scoped CSS landed in an unreferenced
    // styles2.css (consumers lost those styles). One file keeps the public
    // `glass-ui-solid/styles.css` import complete.
    cssCodeSplit: false,
    rolldownOptions: {
      external: (id) => /^(solid-js|@solidjs\/web)(\/|$)/.test(id),
      output: {
        // Preserve modules for tree-shaking
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.name || 'asset';
        },
      },
    },
    sourcemap: false,
    minify: 'oxc',
  },
});
