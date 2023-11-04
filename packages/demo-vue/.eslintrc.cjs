/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    '@indielayer/eslint-config-vue',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
}
