import type { CarouselTheme } from '../Carousel.vue'

const theme: CarouselTheme = {
  classes: {
    wrapper({ props }) {
      const classes = ['relative w-full h-full overflow-hidden']

      return classes
    },

    slides({ props }) {
      const classes = ['relative w-full h-full overflow-hidden transition-transform duration-300 ease-in-out']

      return classes
    },

    dots: 'absolute flex gap-2 w-full justify-center items-center bottom-10',

    dot: 'bg-white w-2 h-2 rounded-full transition-all ease-in-out duration-300 opacity-75 cursor-pointer',

    dotActive: '!w-8 !opacity-100',
  },
}

export default theme
