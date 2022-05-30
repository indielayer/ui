/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@indielayer/eslint-config-vue',
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/type-annotation-spacing': [1, {
      'before': false, 'after': true,
    }],
    'vue/require-default-prop': 0,
  },
}
