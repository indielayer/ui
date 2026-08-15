/// <reference types="vitest" />
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcssPostcss from '@tailwindcss/postcss'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import injectCss from './injectcss'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const viteEnv = loadEnv(mode, `.env.${mode}`)

  if (mode === 'docs') {
    return {
      base: viteEnv.VITE_BASE || '/',
      plugins: [vue(), vueJsx()],
      css: {
        postcss: {
          plugins: [tailwindcssPostcss()],
        },
      },
      publicDir: 'public',
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./docs', import.meta.url)),
          '@indielayer/ui': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        outDir: 'dist',
        emptyOutDir: true,
      },
      ssgOptions: {
        script: 'async',
        formatting: false,
        beastiesOptions: false,
        dirStyle: 'nested',
        includedRoutes(paths: string[]) {
          return paths.filter((path) => {
            if (path.includes(':') || path.includes('*')) return false
            if (path === '/play') return false

            return true
          })
        },
      },
    }
  }

  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    injectCss(),
  ]

  if (isBuild) {
    if (viteEnv.VITE_VISUALIZER === 'Y') plugins.push(visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption)
  }

  return {
    plugins,
    publicDir: 'exports',
    build: {
      outDir: 'lib',
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: (format) => {
          if (format === 'umd') return 'index.umd.js'

          return '[name].js'
        },
      },
      rollupOptions: {
        external: ['vue'],
        output: [{
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        }, {
          format: 'umd',
          name: 'IndielayerUI',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        }],
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      exclude: ['**/lib/**', '**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
    },
  }
})
