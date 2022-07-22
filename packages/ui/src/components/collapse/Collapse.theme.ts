import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props }: ThemeParams) => `relative flex items-center ${props.icon ?  'flex-row-reverse' : ''} ${props.disabled ? '' : 'cursor-pointer'}`,

    icon: 'absolute top-1/2 transform -translate-y-1/2 right-3',

    content: 'transition-[height] duration-150 overflow-y-hidden',
  },
}
