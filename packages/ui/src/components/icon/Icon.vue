<script lang="ts">
export default { name: 'XIcon' }
</script>

<script setup lang="ts">
import { inject, ref, watchEffect, normalizeStyle, unref, computed } from 'vue'
import { useCommon } from '../../composables/common'
import { injectIconsKey } from '../../composables/keys'
import { useTheme } from '../../composables/theme'

import theme from './Icon.theme'

const props = defineProps({
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
})

const icons: any = inject(injectIconsKey, () => ({}))

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

const { styles, classes, className } = useTheme('icon', theme, props)

const normalizedStyle = computed(() => normalizeStyle(unref(styles)))
</script>

<template>
  <svg
    v-if="isWrapSVG"
    :style="normalizedStyle"
    :class="['shrink-0', className, classes.wrapper]"
    v-bind="attrs"
    v-html="computedIcon"
  />
  <svg
    v-else
    :style="normalizedStyle"
    xmlns="http://www.w3.org/2000/svg"
    :class="['shrink-0', className, classes.wrapper, { 'stroke-2': !computedFilled}]"
    :stroke-linejoin="computedFilled ? undefined : 'round'"
    :stroke-linecap="computedFilled ? undefined : 'round'"
    :stroke="computedFilled ? undefined : 'currentColor'"
    :fill="computedFilled ? 'currentColor' : 'none'"
    :viewBox="computedViewBox"
    v-html="computedIcon"
  />
</template>
