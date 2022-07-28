/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
import injectCss from './injectcss'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './src/exports',
  plugins: [
    vue(),
    vueJsx(),
    injectCss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'IndielayerUI',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        return `[name].${format}.js`
      },
    },
    rollupOptions: {
      // preserveModules: true,
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
