import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo';
  
  return {
    plugins: [react()],
    resolve: {
      alias: isDemo
        ? {
            'quidlass': path.resolve(__dirname, './src'),
          }
        : {},
    },
    base: isDemo ? '/quidlass/' : '/',
    root: isDemo ? './demo' : './',
    build: isDemo
      ? {
          outDir: '../demo/dist',
        }
      : {},
  };
});

