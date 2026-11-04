import type { InputFooterTheme } from '../InputFooter.vue'

const theme: InputFooterTheme = {
  classes: {
    wrapper: 'text-[0.85rem] mt-1 !font-sans',
    container: 'flex justify-between items-start gap-2',
    helperText: 'text-secondary-500 dark:text-secondary-400',
    errorText: 'text-error-500 dark:text-error-400',
    counter: 'text-secondary-500 dark:text-secondary-400 whitespace-nowrap',
  },
}

export default theme
