const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  content: [
    '../ui/lib/**/*',
    './App.vue',
  ],
  darkMode: 'class',
  presets: [
    indielayer(),
  ],
}
