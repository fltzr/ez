/// <reference types='vitest' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/ez-web',

  server: {
    host: '0.0.0.0',
    port: 4100,
  },

  preview: {
    port: 4100,
    host: '0.0.0.0',
  },

  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    nxViteTsPaths(),
  ],

  build: {
    outDir: '../../dist/ez-web',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        chunkFileNames: ({ name }) => {
          if (/all.*/.test(name)) {
            return 'locales/[name].js';
          }

          return 'chunks/[name]-[hash].js';
        },
        entryFileNames: 'entry/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (!name) {
            return 'assets/[name]-[hash][extname]';
          }

          if (name.match(/^all\..*\.js$/)) {
            return 'locales/[name]-[hash][extname]';
          }

          if (/\.(gif|jpe?g|png|svg)/.test(name)) {
            return 'images/[name]-[hash][extname]';
          }

          if (/\.(css)$/.test(name)) {
            return 'styles/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/ez-web',
      provider: 'v8',
    },
  },
});
