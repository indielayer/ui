import type { PaginationItemTheme } from '../PaginationItem.vue'

const theme: PaginationItemTheme = {
  classes: {
    wrapper: ({ props }) => {
      if (props.size === 'xs') return '!leading-none !p-1 min-w-[1.375rem]'
      else if (props.size === 'sm') return '!leading-none !p-2 min-w-[2rem]'
      else if (props.size === 'lg') return '!leading-none !p-3 min-w-[2.75rem]'
      else if (props.size === 'xl') return '!leading-none !p-4 min-w-[3.375rem]'

      return '!leading-none !p-2 min-w-[2.125rem]'
    },
  },
}

export default theme
