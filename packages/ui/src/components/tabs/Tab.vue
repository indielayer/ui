<script lang="ts">
import { defineComponent, inject, reactive, computed, toRefs, ref, onMounted } from 'vue'
import { injectTabKey } from '@/composables/keys'
import { useCommon } from '@/composables/common'

export default defineComponent({
  name: 'XTab',

  props: {
    ...useCommon.props(),
    value: {
      type: [String, Number],
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
    to: String,
    label: String,
    icon: String,
    disabled: Boolean,
  },

  setup(props) {
    const cLabel = computed(() => props.label || props.value)
    const teleportTo = ref(null)

    const tabs = inject(injectTabKey, {
      tabsContentRef: ref(null),
      activateTab: () => {},
      state: reactive({
        active: null,
        variant: 'line',
        grow: false,
      }),
    })

    onMounted(() => {
      teleportTo.value = tabs.tabsContentRef.value
    })

    const state = reactive({
      selected: computed(() => tabs.state.active === props.value),
    })

    function onClickTab() {
      tabs.activateTab(props.value)
    }

    return {
      ...toRefs(state),
      variant: tabs.state.variant,
      grow: tabs.state.grow,
      cLabel,
      tabs,
      teleportTo,
      onClickTab,
    }
  },
})
</script>

<template>
  <li :data-value="value" class="shrink-0 font-medium" :class="{ 'flex-1': grow }">
    <component
      :is="to ? 'router-link' : tag"
      :to="to"
      class="py-2 transition-colors duration-150 ease-in-out whitespace-nowrap text-center"
      :class="[
        {
          'px-8': variant === 'block',
          'text-[color:var(--x-tabs-text)] dark:text-[color:var(--x-dark-tabs-text)]': selected,
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
          'cursor-not-allowed text-gray-500': disabled && !selected,
        },
      ]"
      :aria-disabled="disabled ? 'true' : undefined"
      :aria-selected="selected ? 'true' : 'false'"
      @click="onClickTab"
    >
      <slot
        name="tab"
        :label="label"
        :value="value"
        :size="size"
        :icon="icon"
      >
        <div class="flex items-center justify-center">
          <x-icon v-if="icon" :icon="icon" :size="size" class="mr-1.5 shrink-0" />
          <span>{{ cLabel }}</span>
        </div>
      </slot>
      <Teleport v-if="selected && teleportTo" :to="teleportTo">
        <slot></slot>
      </Teleport>
    </component>
  </li>
</template>
