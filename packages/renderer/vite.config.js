/* eslint-env node */

import { defineConfig } from 'vite';

import { chrome } from '../../.electron-vendors.cache.json';
import { renderer } from 'unplugin-auto-expose';
import { join } from 'node:path';
import { injectAppVersion } from '../../version/inject-app-version-plugin.mjs';
import Solid from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  // test: {
  //   environment: 'happy-dom',
  // },
  plugins: [
    Solid(),
    UnoCSS({
      "configFile": "./uno.config.ts"
    }),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
    }),
    injectAppVersion(),
  ],
});

export default config;
