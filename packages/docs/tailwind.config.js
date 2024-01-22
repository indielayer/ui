const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  content: [
    '../ui/lib/**/*',
    './src/**/*.vue',
    './src/theme.ts',
  ],
  darkMode: 'class',
  presets: [
    indielayer(),
  ],
}
