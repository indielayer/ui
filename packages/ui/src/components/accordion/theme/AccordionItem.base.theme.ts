import type { AccordionItemTheme } from '../AccordionItem.vue'

const theme: AccordionItemTheme = {
  classes: {
    wrapper: ({ props, slots, data }) => {
      const classes = ['relative flex items-center w-full text-left rounded']

      if (!data.isInsideAccordion) return classes

      if (slots.default) {
        if (props.iconAlign === 'left') classes.push('pl-8 pr-4')
        else classes.push('pr-8 pl-4')
        classes.push('py-2')
        if (!props.disabled) classes.push('hover:bg-secondary-100 dark:hover:bg-secondary-600')
      }

      if (!props.disabled) classes.push('cursor-pointer')

      return classes
    },

    icon: ({ props, data }) => {
      const classes = ['absolute flex transform transition-transform duration-150']

      if (!data.collapsed) classes.push('rotate-180')
      if (props.disabled) classes.push('text-secondary-300')

      if (props.iconAlign === 'left') classes.push('left-2')
      else classes.push('right-2')

      return classes
    },

    content: 'transition-[height] duration-150 overflow-y-hidden',
  },
}

export default theme
