import vue from 'rollup-plugin-vue'
import cleaner from 'rollup-plugin-cleaner'
import commonjs from 'rollup-plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

export default [{
  input: 'src/index.js',
  output: [{
    format: 'esm',
    dir: 'lib/esm',
    exports: 'auto',
    preserveModulesRoot: 'src',
  }, {
    format: 'cjs',
    dir: 'lib/cjs',
    exports: 'auto',
    preserveModulesRoot: 'src',
  }],
  external: ['vue'],
  plugins: [
    cleaner({ targets: ['lib/esm', 'lib/cjs'] }),
    vue(),
    postcss(),
    commonjs(),
    resolve(),
  ],
  preserveModules: true,
}, {
  input: 'src/index.js',
  output: [{
    format: 'umd',
    name: 'IndieUI',
    dir: 'lib/umd',
    exports: 'auto',
    globals: {
      vue: 'Vue',
    },
  }],
  external: ['vue'],
  plugins: [
    cleaner({ targets: ['lib/umd'] }),
    vue(),
    postcss(),
    commonjs(),
    resolve(),
    process.env.NODE_ENV === 'production' && terser(),
  ],
}, {
  input: 'src/tailwind.preset.js',
  output: {
    file: 'lib/tailwind.preset.js',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    cleaner({ targets: ['lib/tailwind.preset.js'] }),
  ],
}]
