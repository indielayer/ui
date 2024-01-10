<script lang="ts">
const breadcrumbsProps = {
  ...useColors.props(),
  items: Array as PropType<BreadcrumbsItem[]>,
  icon: {
    type: String,
    default: arrowRightIcon,
  },
  shadow: Boolean,
  underline: Boolean,
}

export type BreadcrumbsItem = {
  label: string;
  to?: string | object;
  href?: string;
  color?: string;
  icon?: string;
  shadow?: boolean;
  underline?: boolean;
}
export type BreadcrumbsProps = ExtractPublicPropTypes<typeof breadcrumbsProps>

type InternalClasses = 'wrapper' | 'item'
export interface BreadcrumbsTheme extends ThemeComponent<BreadcrumbsProps, InternalClasses> {}

export default { name: 'XBreadcrumbs' }
</script>

<script setup lang="ts">
import { type ExtractPublicPropTypes, type PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { arrowRightIcon } from '../../common/icons'
import { useColors } from '../../composables/useColors'

import XIcon from '../../components/icon/Icon.vue'
import XLink from '../../components/link/Link.vue'

const props = defineProps(breadcrumbsProps)

const { styles, classes, className } = useTheme('Breadcrumbs', {}, props)
</script>

<template>
  <nav
    v-if="items && items.length > 0"
    aria-label="Breadcrumb"
    :class="className"
    :style="styles"
  >
    <ul :class="classes.wrapper">
      <li v-for="(item, index) in items" :key="index" :class="classes.item">
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
        <x-icon
          v-if="index !== items.length - 1"
          :icon="icon"
          class="text-gray-400 mx-1.5"
          size="sm"
        />
      </li>
    </ul>
  </nav>
</template>
