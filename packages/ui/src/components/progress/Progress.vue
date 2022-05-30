<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { useCSS } from '../../composables/css'
import { useColors } from '../../composables/colors'

// const validators = {
//   variant: ['bar','score'],
// }

export default defineComponent({
  name: 'XProgress',

  // validators,

  props: {
    ...useColors.props('primary'),
    percentage: {
      type: Number,
      default: 0,
      validator: (value: number) => value >= 0 && value <= 100,
    },
    // variant: {
    //   type: String as PropType<'bar' | 'score'>,
    //   default: 'bar',
    //   validator: (value: string) => validators.variant.includes(value),
    // },
    gradient: Boolean,
    animate: {
      type: Boolean,
      default: true,
    },
    thick: Boolean,
  },

  setup(props) {
    const css = useCSS('progress')
    const colors = useColors()
    const style = computed(() => {
      const color = colors.getPalette(props.color)
      const vars = []

      vars.push(css.variables({
        bg: color[500],
      }))

      if (props.gradient) vars.push({
        '--tw-gradient-stops': `${color[100]}, ${color[800]}`,
      })

      return vars
    })

    return {
      style,
    }
  },
})
</script>

<template>
  <div
    class="relative rounded bg-gray-100 dark:bg-gray-700 overflow-hidden pointer-events-none"
    :class="[thick ? 'h-1.5' : 'h-1']"
    :style="style"
  >
    <div
      class="h-full"
      :class="[
        gradient ? 'bg-gradient-to-r' : 'bg-[color:var(--x-progress-bg)]',
        {
          'duration-150 transition-[width]': animate
        }
      ]"
      :style="[!gradient ? {width: `${percentage}%`} : '']"
    >
    </div>
    <div
      v-if="gradient"
      class="absolute h-full bg-gray-100 dark:bg-gray-700 right-0 top-0"
      :class="{ 'duration-150 transition-[width]': animate }"
      :style="{
        width: `${100 - percentage}%`
      }"
    ></div>
  </div>
</template>
