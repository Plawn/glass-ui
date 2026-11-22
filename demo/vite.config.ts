import { resolve } from 'node:path';
import solid from '@solidjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { demoCodeCapture } from './plugins/demo-code-capture';

export default defineConfig({
  plugins: [demoCodeCapture(), solid(), tailwindcss()],
  base: process.env.GITHUB_ACTIONS ? '/glass-ui/' : '/',
  resolve: {
    alias: {
      'glass-ui-solid': resolve(import.meta.dirname, '../src'),
    },
    dedupe: ['solid-js', '@solidjs/web', '@solidjs/signals'],
  },
});
