import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  base: process.env.GITHUB_ACTIONS ? '/glass-ui/' : '/',
  resolve: {
    alias: {
      'glass-ui-solid': resolve(__dirname, '../src'),
    },
  },
});
