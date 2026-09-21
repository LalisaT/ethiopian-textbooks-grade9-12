import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: false,
    watch: {
      ignored: ['**/android/**', '**/*.apk', '**/*.mp4', '**/videos/**', '**/*.pdf'],
    },
  },
});
