import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { demoCodeCapture } from './plugins/demo-code-capture';

export default defineConfig({
  plugins: [demoCodeCapture(), solid(), tailwindcss()],
  base: process.env.GITHUB_ACTIONS ? '/glass-ui/' : '/',
  resolve: {
    alias: {
      'glass-ui-solid': resolve(__dirname, '../src'),
      // Force single instance of solid-js to fix reactivity in production
      'solid-js/web': resolve(__dirname, 'node_modules/solid-js/web'),
      'solid-js/store': resolve(__dirname, 'node_modules/solid-js/store'),
      'solid-js': resolve(__dirname, 'node_modules/solid-js'),
    },
  },
});
