import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './app',
  plugins: [tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
});
