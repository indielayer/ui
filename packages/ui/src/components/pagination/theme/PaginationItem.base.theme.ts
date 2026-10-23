import type { PaginationItemTheme } from '../PaginationItem.vue'

const theme: PaginationItemTheme = {
  classes: {
    // Match Button fixed heights; square min-width, horizontal padding only (no !p-* vertical)
    wrapper: ({ props }) => {
      if (props.size === 'xs') return '!leading-none !px-1.5 min-w-7'
      else if (props.size === 'sm') return '!leading-none !px-2 min-w-8'
      else if (props.size === 'lg') return '!leading-none !px-3 min-w-[42px]'
      else if (props.size === 'xl') return '!leading-none !px-3.5 min-w-[46px]'

      return '!leading-none !px-2.5 min-w-9'
    },
  },
}

export default theme
