<script lang="ts">
import { computed, defineComponent, inject, ref, watchEffect } from 'vue'
import { useCommon } from '../../composables/common'
import { injectIconsKey } from '../../composables/keys'

export default defineComponent({
  name: 'XIcon',

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    icon: {
      type: String,
      required: true,
    },
    filled: Boolean,
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
  },

  setup(props) {
    const icons: any = inject(injectIconsKey, () => {}, false)
    const sizeClasses = computed(() => {
      if (props.size === 'xs') return 'h-3 w-3'
      else if (props.size === 'sm') return 'h-4 w-4'
      else if (props.size === 'lg') return 'h-6 w-6'
      else if (props.size === 'xl') return 'h-9 w-9'

      return 'h-5 w-5'
    })

    const isWrapSVG = ref(false)
    const computedIcon = ref('')
    const computedFilled = ref(props.filled)
    const computedViewBox = ref(props.viewBox)
    const attrs = ref({})

    watchEffect(() => {
      const injectedIcon = icons && icons[props.icon]

      isWrapSVG.value = false
      computedIcon.value = injectedIcon

      if (injectedIcon) {
        if (typeof injectedIcon === 'string') {
          if (injectedIcon.startsWith('<svg')) {
            isWrapSVG.value = true

            const { content, attributes } = getSVG(injectedIcon)

            attrs.value = attributes
            computedIcon.value = content
          } else {
            isWrapSVG.value = false
            computedIcon.value = injectedIcon
          }
        } else if (typeof injectedIcon === 'object') {
          computedIcon.value = injectedIcon.icon
          computedFilled.value = injectedIcon.filled || props.filled
          computedViewBox.value = injectedIcon.viewBox || injectedIcon.viewbox || props.viewBox
        }
      } else {
        computedIcon.value = props.icon
      }
    })

    function getSVG(svgString: string) {
      svgString = svgString.trim()
      const content = svgString.substring(svgString.indexOf('>') + 1, svgString.lastIndexOf('</svg>'))
      const attrsRaw = svgString.substring(svgString.indexOf('<svg') + 4, svgString.indexOf('>')).trim().match(/[\w-]+="[^"]*"/g)

      const attributes: Record<string, string | null> = {}

      attrsRaw?.forEach((a) => {
        const [attribute, value] = a.split('=')

        if (!['height', 'width', 'class'].includes(attribute)) attributes[attribute] = value.replace(/(^"|"$)/g, '')
      })

      return {
        attributes,
        content,
      }
    }

    return {
      attrs,
      isWrapSVG,
      computedIcon,
      computedFilled,
      computedViewBox,
      sizeClasses,
    }
  },
})
</script>

<template>
  <svg
    v-if="isWrapSVG"
    class="inline"
    :class="sizeClasses"
    v-bind="attrs"
    v-html="computedIcon"
  />
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="inline"
    :class="[sizeClasses, { 'stroke-2': !computedFilled}]"
    :stroke-linejoin="computedFilled ? undefined : 'round'"
    :stroke-linecap="computedFilled ? undefined : 'round'"
    :stroke="computedFilled ? undefined : 'currentColor'"
    :fill="computedFilled ? 'currentColor' : 'none'"
    :viewBox="computedViewBox"
    v-html="computedIcon"
  />
</template>
