import type { CollapseTheme } from '../../components/collapse'

const theme: CollapseTheme = {
  classes: {
    wrapper: ({ props }) => `relative flex items-center ${props.icon ?  'flex-row-reverse' : ''} ${props.disabled ? '' : 'cursor-pointer'}`,

    icon: 'absolute top-1/2 transform -translate-y-1/2 right-3',

    content: 'transition-[height] duration-150 overflow-y-hidden',
  },
}

export default theme
