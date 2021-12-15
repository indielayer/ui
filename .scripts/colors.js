const tailwindPalette = ['primary', 'secondary', 'error', 'warning', 'success', 'rose', 'zinc', 'neutral', 'stone', 'pink', 'fuchsia', 'purple', 'violet', 'indigo', 'blue', 'sky', 'cyan', 'teal', 'emerald', 'green', 'lime', 'yellow', 'amber', 'orange', 'red', 'gray']

tailwindPalette.forEach((p) => {
  ['50', '200', '500', '600', '800'].forEach((w) => {
    console.log(`'bg-${p}-${w}',`)
  });

  ['200', '500', '600', '700', '900'].forEach((w) => {
    console.log(`'border-${p}-${w}',`)
  });

  ['50', '500', '600', '900'].forEach((w) => {
    console.log(`'text-${p}-${w}',`)
  })

  console.log(`'shadow-${p}-500/50',`)
})
