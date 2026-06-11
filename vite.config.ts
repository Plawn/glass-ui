import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solid from 'vite-plugin-solid';

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
        index: resolve(__dirname, 'src/index.ts'),
        'components/CodeBlock/index': resolve(
          __dirname,
          'src/components/CodeBlock/index.ts',
        ),
        'components/Markdown/index': resolve(
          __dirname,
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
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'solid-js/store'],
      output: {
        globals: {
          'solid-js': 'SolidJS',
          'solid-js/web': 'SolidJSWeb',
          'solid-js/store': 'SolidJSStore',
        },
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
    minify: 'esbuild',
  },
});
