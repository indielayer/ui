module.exports = {
  root: true,
  env: {
    'node': true,
  },
  extends: [
    '@indielayer/eslint-config-vue',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    'parser': 'babel-eslint',
  },
  rules: {},
}
