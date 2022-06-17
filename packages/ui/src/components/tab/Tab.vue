<script lang="ts">
import { defineComponent, inject, reactive, computed, toRefs, ref, onMounted, onBeforeUnmount } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { injectTabKey } from '../../composables/keys'
import { useCommon } from '../../composables/common'
import XIcon from '../icon/Icon.vue'
import XLink from '../link/Link.vue'

export default defineComponent({
  name: 'XTab',

  components: {
    XIcon,
    XLink,
  },

  props: {
    ...useCommon.props(),
    value: {
      type: [String, Number],
    },
    tag: {
      type: String,
      default: 'div',
    },
    to: String,
    label: String,
    icon: String,
    disabled: Boolean,
    exact: Boolean,
  },

  setup(props) {
    const cValue = computed(() => props.to || props.value )
    const cLabel = computed(() => props.label || props.value)
    const teleportTo = ref(null)
    const elRef = ref()

    const tabs = inject(injectTabKey, {
      tabsContentRef: ref(null),
      activateTab: () => {},
      state: reactive({
        active: null,
        variant: 'line',
        grow: false,
      }),
    })

    const cExact = computed(() => tabs.state.exact || props.exact)
    const cSize = computed(() => props.size || tabs.state.size)

    onMounted(() => {
      teleportTo.value = tabs.tabsContentRef.value

      if (props.to) {
        check()
        useMutationObserver(elRef.value.$el, check, {
          attributes: true,
          attributeFilter: ['class'],
        })
      }
    })

    function check() {
      if (elRef.value && elRef.value.$el && (props.to)) {
        const active = elRef.value?.$el.classList.contains(cExact.value ? 'router-link-exact-active' : 'router-link-active')

        if (active) tabs.activateTab(cValue.value)
      }
    }

    const state = reactive({
      selected: computed(() => tabs.state.active === cValue.value),
    })

    function onClickTab() {
      if (!props.to) tabs.activateTab(cValue.value)
    }

    const sizeClasses = computed(() => {
      if (cSize.value === 'xs') return 'text-xs'
      else if (cSize.value === 'sm') return 'text-sm'
      else if (cSize.value === 'lg') return 'text-lg'
      else if (cSize.value === 'xl') return 'text-xl'

      return ''
    })

    return {
      ...toRefs(state),
      variant: tabs.state.variant,
      grow: tabs.state.grow,
      elRef,
      cLabel,
      cValue,
      cSize,
      tabs,
      sizeClasses,
      teleportTo,
      onClickTab,
    }
  },
})
</script>

<template>
  <li :data-value="cValue" class="shrink-0 font-medium" :class="{ 'flex-1': grow }">
    <component
      :is="to ? 'x-link' : tag"
      ref="elRef"
      :to="to"
      class="py-2 transition-colors duration-150 ease-in-out whitespace-nowrap text-center"
      :class="[
        sizeClasses,
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
        :size="cSize"
        :icon="icon"
      >
        <div class="flex items-center justify-center">
          <XIcon v-if="icon" :icon="icon" :size="cSize" class="mr-1.5 shrink-0" />
          <span>{{ cLabel }}</span>
        </div>
      </slot>
      <Teleport v-if="selected && teleportTo" :to="teleportTo">
        <slot></slot>
      </Teleport>
    </component>
  </li>
</template>
