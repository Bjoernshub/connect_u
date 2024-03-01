import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest test configuration options go here
    globals: true,
    environment: 'jsdom',
  },
});
