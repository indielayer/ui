import type { AccordionItemTheme } from '../AccordionItem.vue'

const theme: AccordionItemTheme = {
  classes: {
    wrapper: ({ props, slots }) => {
      const classes = ['relative flex items-center w-full text-left']

      if (slots.default) {
        classes.push('px-4 py-2')
        if (!props.disabled) classes.push('hover:bg-gray-50 dark:hover:bg-gray-800')
      }

      if (props.iconAlign === 'left') classes.push('flex-row-reverse')

      if (!props.disabled) classes.push('cursor-pointer')

      return classes
    },

    icon: ({ props, data }) => {
      const classes = ['flex transform transition-transform duration-150']

      if (!data.collapsed) classes.push('rotate-180')
      if (props.disabled) classes.push('text-gray-300')

      if (props.iconAlign === 'left') classes.push('mr-4')

      return classes
    },

    content: 'px-4 pt-2 pb-6 transition-[height] duration-150 overflow-y-hidden',
  },
}

export default theme
