<template>
  <component
    :is="to ? 'router-link' : tag"
    :to="to"
    class="pb-2 transition-colors duration-150 ease-in-out"
    :class="[
      {
        [`border-b-2 border-${color}-500 text-${color}-500`]: selected,
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
        'cursor-not-allowed text-gray-500': disabled && !selected,
      },
    ]"
    :aria-disabled="disabled ? 'true' : null"
    :aria-selected="selected ? 'true' : 'false'"
    @click="onClickTab"
  >
    <slot></slot>
  </component>
</template>

<script>
import { inject, reactive, computed, toRefs } from 'vue'

export default {
  name: 'XTab',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: [String, Number],
      default: null,
    },

    color: {
      type: String,
      default: 'primary',
    },

    tag: {
      type: String,
      default: 'li',
    },

    to: {
      type: String,
      default: undefined,
    },
  },

  setup(props) {
    const tabs = inject(
      'tabs',
      {
        state: reactive({
          active: null,
        }),
        activateTab: () => {},
      },
    )

    const state = reactive({
      selected: computed(() => tabs.state.active === props.value),
    })

    function onClickTab() {
      tabs.activateTab(props.value)
    }

    return {
      ...toRefs(state),
      tabs,
      onClickTab,
    }
  },
}
</script>
