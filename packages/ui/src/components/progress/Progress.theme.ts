import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props }: ThemeParams) => `relative rounded bg-gray-100 dark:bg-gray-700 overflow-hidden pointer-events-none ${props.thick ? 'h-1.5' : 'h-1'}`,

    list: 'flex flex-col items-end w-full sm:w-[520px] px-4',

    item: 'w-full flex items-center rounded-md px-4 py-3 bg-gray-800 dark:bg-gray-50 text-white dark:text-gray-900',
  },

  styles: ({ props, colors, css }: ThemeParams) => {
    const color = colors.getPalette(props.color)
    const vars = []

    vars.push(css.variables({
      bg: color[500],
    }))

    if (props.gradient) vars.push({
      '--tw-gradient-stops': `${color[100]}, ${color[800]}`,
    })

    return vars
  },
}
