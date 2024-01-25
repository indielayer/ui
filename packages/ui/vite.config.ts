/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig, loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import injectCss from './injectcss'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const viteEnv = loadEnv(mode, `.env.${mode}`)

  if (mode === 'docs') {
    return {
      plugins: [vue(), vueJsx()],
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
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      exclude: ['**/lib/**', '**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
    },
  }
})
