const indielayerPreset = require('@indielayer/ui/tailwind.preset')

module.exports = {
  mode: 'jit',
  content: [
    '../ui/lib/**/*',
    './src/**/*.vue',
  ],
  darkMode: 'class',
  presets: [
    indielayerPreset(),
  ],
}
