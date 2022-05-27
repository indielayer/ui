const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  content: [
    '../ui/lib/**/*',
    './src/**/*.vue',
  ],
  darkMode: 'class',
  presets: [
    indielayer(),
  ],
}
