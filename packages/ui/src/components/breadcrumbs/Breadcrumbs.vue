<script lang="ts">
export default { name: 'XBreadcrumbs' }
</script>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { useTheme } from '../../composables/theme'
import { arrowRightIcon } from '../../common/icons'
import { useColors } from '../../composables/colors'

import XIcon from '../../components/icon/Icon.vue'
import XLink from '../../components/link/Link.vue'

import theme from './Breadcrumbs.theme'

export type BreadcrumbItem = {
  label: string,
  to?: string | object,
  href?: string,
  color?: string,
  icon?: string,
  shadow?: boolean,
  underline?: boolean
}

const props = defineProps({
  ...useColors.props(),
  items: Array as PropType<Array<BreadcrumbItem>>,
  icon: {
    type: String,
    default: arrowRightIcon,
  },
  shadow: Boolean,
  underline: Boolean,
})

const lastItem = computed(() => props.items && props.items.length > 0 ? props.items[props.items.length - 1] : undefined)

const { styles, classes, className } = useTheme('breadcrumbs', theme, props)
</script>

<template>
  <nav
    v-if="items && items.length > 0"
    aria-label="Breadcrumb"
    :class="className"
    :style="styles"
  >
    <ul :class="classes.wrapper">
      <li v-for="(item, index) in items?.slice(0,-1)" :key="index" :class="classes.item">
        <x-link
          :to="item.to"
          :href="item.href"
          :color="item.color || color"
          :shadow="item.shadow || shadow"
          :underline="item.underline|| underline"
          class="flex items-center"
        >
          <x-icon v-if="item.icon" :icon="item.icon" class="mr-1.5"/>
          {{ item.label }}
        </x-link>
        <x-icon :icon="icon" class="text-gray-400 mx-1.5" size="sm" />
      </li>
      <li v-if="lastItem" :class="classes.lastItem">
        <x-icon v-if="lastItem.icon" :icon="lastItem.icon" class="mr-1"/>
        {{ lastItem.label }}
      </li>
    </ul>
  </nav>
</template>
