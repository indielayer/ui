<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

export type BreadcrumbItem = {
  label: string,
  to?: string | object,
  href?: string,
  color?: string,
  icon?: string,
  shadow?: boolean,
  underline?: boolean
}

export default defineComponent({
  name: 'XBreadcrumbs',

  props: {
    items: Array as PropType<Array<BreadcrumbItem>>,
    icon: String,
    color: String,
    shadow: Boolean,
    underline: Boolean,
  },

  setup(props) {
    const arrowIcon = '<path d="M13 7l5 5m0 0l-5 5m5-5H6" />'
    const lastItem = computed(() => props.items && props.items.length > 0 ? props.items[props.items.length - 1] : undefined)

    return {
      arrowIcon,
      lastItem,
    }
  },
})
</script>

<template>
  <nav v-if="items && items.length > 0" aria-label="Breadcrumb">
    <ul class="flex items-center flex-wrap">
      <li v-for="(item, index) in items?.slice(0,-1)" :key="index" class="flex items-center">
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
        <x-icon :icon="icon || arrowIcon" class="text-gray-400 mx-1.5 shrink-0" size="sm" />
      </li>
      <li v-if="lastItem" class="font-semibold">
        <x-icon v-if="lastItem.icon" :icon="lastItem.icon" class="mr-1"/>
        {{ lastItem.label }}
      </li>
    </ul>
  </nav>
</template>
