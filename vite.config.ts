import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: './src/renderers/index.ts',
      name: 'TwodoMicrofrontends',
      formats: ['umd'],
      fileName: () => 'note-page-mfe.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  define: {
    'process.env': {},
  },
});