<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useCSS } from '../../composables/css'
import { useColors } from '../../composables/colors'
import { useCommon } from '../../composables/common'

import XSpinner from '../../components/spinner/Spinner.vue'
import XLink from '../../components/link/Link.vue'

export default defineComponent({
  name: 'XMenuItem',

  components: {
    XSpinner,
    XLink,
  },

  props: {
    ...useCommon.props(),
    ...useColors.props('primary'),
    item: {
      type: Object,
      default: () => {},
    },
    active: Boolean,
    onClick: Function,
    inactive: Boolean,
    value: [Number,String],
    to: String,
    exact: Boolean,
    href: String,
    target: String,
    label: String,
    icon: String,
    iconRight: String,
    loading: Boolean,
    rounded: {
      type: Boolean,
      default: true,
    },
    filled: {
      type: Boolean,
      default: true,
    },
    selected: Boolean,
    disabled: Boolean,
  },

  emits: ['active', 'click'],

  setup(props, { emit }) {
    const elRef = ref()
    const isActive = ref(false)

    const filled = computed(() => props.filled || props.item?.filled)
    const cItem = computed(() => ({
      ...props,
      ...props.item,
    }))

    const htmlTag = cItem.value.to || cItem.value.href ? 'x-link' : 'div'
    const isSupported = window && 'MutationObserver' in window
    const classObserver = isSupported ? new MutationObserver(check) : null

    onMounted(() => {
      if (!elRef.value) return

      check()

      if (isSupported && htmlTag === 'x-link') classObserver?.observe(elRef.value.$el, {
        attributes: true,
        attributeFilter: ['class'],
      })
    })

    onBeforeUnmount(() => {
      if (classObserver) classObserver.disconnect()
    })

    function onItemClick(e: Event) {
      if (cItem.value.disabled) {
        e.stopPropagation()
        e.preventDefault()

        return
      }

      cItem.value.onClick && cItem.value.onClick(e)
      emit('click', e)
    }

    function check() {
      if (elRef.value && elRef.value.$el && (cItem.value.href || cItem.value.to)) {
        const active = elRef.value.$el.classList.contains(cItem.value.exact ? 'router-link-exact-active' : 'router-link-active')

        isActive.value = active
      } else {
        isActive.value = cItem.value.active
      }
    }

    watch(() => isActive.value, (val) => {
      if (val) emit('active')
    })

    watch(() => cItem.value.active, (val) => {
      isActive.value = val
    })

    const css = useCSS()
    const colors = useColors()
    const cssVariables = computed(() => {
      const color = colors.getPalette(cItem.value.color || 'gray')
      const gray = colors.getPalette('gray')

      if (cItem.value.disabled) return css.variables({
        text: gray[300],
        dark: {
          text: gray[600],
        },
      })

      if (filled.value) {
        if (isActive.value) {
          return css.variables({
            bg: props.selected ? color[100] : color[50],
            text: color[500],
            hover: {
              bg: props.selected ? color[100] : color[50],
              text: color[500],
            },
            dark: {
              bg: props.selected ? color[800] : color[700],
              text: color[100],
              hover: {
                bg: props.selected ? color[800] : color[700],
                text: color[100],
              },
            },
          })
        }

        return css.variables({
          bg: props.selected ? gray[50] : 'transparent',
          text: gray[800],
          hover: {
            bg: gray[50],
            text: gray[900],
          },
          dark: {
            bg: props.selected ? gray[800] : 'transparent',
            text: gray[200],
            hover: {
              bg: gray[800],
              text: gray[100],
            },
          },
        })
      }

      if (isActive.value) {
        return css.variables({
          text: color[500],
          hover: {
            text: color[500],
            border: color[500],
          },
          dark: {
            text: color[500],
            hover: {
              text: color[500],
              border: color[500],
            },
          },
        })
      }

      return css.variables({
        text: gray[800],
        hover: {
          text: gray[900],
          border: gray[300],
        },
        dark: {
          text: gray[300],
          hover: {
            text: gray[200],
            border: gray[800],
          },
        },
      })
    })

    return {
      elRef,
      cItem,
      htmlTag,
      isActive,
      cssVariables,
      onItemClick,
    }
  },
})
</script>

<template>
  <component
    :is="htmlTag"
    ref="elRef"
    :to="cItem.to"
    :href="cItem.href"
    :target="cItem.target"
    :color="cItem.color"
    class="relative !flex items-center whitespace-nowrap px-3 mt-1"
    :style="cssVariables"
    :class="[
      $style['menu-item'],
      [isActive ? $style['menu-item--active'] : ''],
      {
        'font-medium': isActive,
        'flex items-center': $slots.prefix || $slots.suffix,
        'cursor-pointer': !cItem.disabled && !inactive,

        // size
        'py-1 text-xs': cItem.size === 'xs',
        'py-2 text-sm': cItem.size === 'sm',
        'py-1.5': !cItem.size || !['xs', 'sm', 'lg', 'xl'].includes(cItem.size),
        'py-3': cItem.size === 'lg',
        'py-4 text-lg': cItem.size === 'xl',

        'rounded my-[1px]': rounded
      },
    ]"
    :title="cItem.label"
    :alt="cItem.label"
    @click="onItemClick"
  >
    <span v-if="$slots.prefix" class="mr-2 shrink-0">
      <slot name="prefix"></slot>
    </span>
    <x-icon v-else-if="cItem.icon" :size="cItem.size" :icon="cItem.icon" class="mr-2 shrink-0"/>

    <span class="flex-1 truncate">
      <slot>{{ cItem.label }}</slot>
    </span>

    <span class="ml-1 shrink-0">
      <x-spinner v-if="cItem.loading" :size="cItem.size" />
      <template v-else>
        <span v-if="$slots.suffix">
          <slot name="suffix"></slot>
        </span>
        <x-icon v-else-if="cItem.iconRight" :size="cItem.size" :icon="cItem.iconRight"/>
      </template>
    </span>
  </component>
</template>

<style lang="postcss" module scoped>
  .menu-item {
    color: var(--x-text);
    background-color: var(--x-bg);

    &:before {
      content: '';
      position: absolute;
      left: -1px;
      height: 100%;
      width: 1px;
      background-color: transparent;
    }

    &:hover {
      color: var(--x-text-hover, var(--x-text));
      background-color: var(--x-bg-hover, var(--x-bg));
    }

    :global(.dark) & {
      color: var(--x-dark-text);
      background: var(--x-dark-bg);
      &:hover {
        color: var(--x-dark-text-hover, var(--x-dark-text));
        background-color: var(--x-dark-bg-hover, var(--x-dark-bg));
      }
    }
  }

  :global(.x-menu-inner) {
    .menu-item {
      &:hover:before, &--active:before {
        background-color: var(--x-border-hover);
      }
    }
  }
</style>
