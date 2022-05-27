<script lang="ts">
import { defineComponent } from 'vue'
import { useCommon } from '@/composables/common'

import XIcon from '@/components/icon/Icon.vue'

export default defineComponent({
  name: 'XSpinner',

  components: {
    XIcon,
  },

  props: {
    ...useCommon.props(),
    icon: String,
  },

  setup() {
    const defaultIcon = `<g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>`

    return {
      defaultIcon,
    }
  },
})
</script>

<template>
  <x-icon :icon="icon || defaultIcon" :size="size" view-box="0 0 38 38"/>
</template>
