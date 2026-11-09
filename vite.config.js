import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base:'./' keeps every built asset relative, so dist/index.html also works
// when served from a sub-folder (static preview, school web hosting, etc).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 900,
  },
});
