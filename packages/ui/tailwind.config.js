const indielayer = require('./tailwind.preset')

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.vue',
  ],
  darkMode: 'class',
  presets: [indielayer()],
}
