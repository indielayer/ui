<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'

import XMenuItem from './MenuItem.vue'
import XCollapse from '@/components/collapse/Collapse.vue'
import XDivider from '@/components/divider/Divider.vue'

export default defineComponent({
  name: 'XMenu',

  components: {
    XDivider,
    XCollapse,
    XMenuItem,
  },

  props: {
    ...useCommon.props(),
    ...useColors.props('primary'),
    items: Array as PropType<Array<any>>,
    collapsible: {
      type: Boolean,
      default: true,
    },
    collapseIcon: String,
    expanded: Boolean,
    disabled: Boolean,
    rounded: Boolean,
    filled: Boolean,
  },

  emits: ['expand'],
})
</script>

<template>
  <div v-if="items">
    <template v-for="(item, index) in items" :key="index">
      <template v-if="item.items">
        <x-collapse
          v-if="item.collapsible !== false"
          :icon="item.collapseIcon || collapseIcon"
          :expanded="item.expanded || expanded"
          :disabled="disabled || item.disabled"
          class="x-menu-inner"
          @expand="$emit('expand')"
        >
          <template #default="{ }">
            <x-menu-item
              :item="item"
              :color="item.color || color"
              :size="item.size || size"
              :rounded="rounded"
              :filled="filled"
              :disabled="disabled || item.disabled"
              class="pr-10 font-medium"
            />
          </template>
          <template #content="{ expand }">
            <x-menu
              class="border-l ml-4 border-gray-100 dark:border-gray-700 mt-2 mb-1"
              :class="{ 'pl-1': filled }"
              :items="item.items"
              :color="item.color || color"
              :size="item.size || size"
              :collapsible="collapsible"
              :collapse-icon="item.collapseIcon || collapseIcon"
              :expanded="item.expanded || expanded"
              :disabled="disabled || item.disabled"
              :rounded="rounded"
              :filled="filled"
              @expand="expand(false)"
            />
          </template>
        </x-collapse>
        <template v-else>
          <x-menu-item
            :item="item"
            :rounded="rounded"
            :color="item.color || color"
            :size="item.size || size"
            :disabled="disabled || item.disabled"
            class="font-medium"
            inactive
          />
          <x-menu
            class="x-menu-inner ml-4 border-l border-gray-100 dark:border-gray-700"
            :class="{ 'pl-1': filled }"
            :items="item.items"
            :color="item.color || color"
            :size="item.size || size"
            :collapsible="collapsible"
            :collapse-icon="item.collapseIcon || collapseIcon"
            :expanded="item.expanded || expanded"
            :disabled="disabled || item.disabled"
            :rounded="rounded"
            :filled="filled"
            @expand="$emit('expand')"
          />
        </template>
      </template>
      <component
        :is="item.divider ? 'x-divider' : 'x-menu-item'"
        v-else
        :color="item.color || color"
        :size="item.size || size"
        :item="item"
        :disabled="disabled || item.disabled"
        :filled="filled"
        :rounded="rounded"
        :class="{ 'my-2': item.divider }"
        @active="$emit('expand')"
      />
    </template>
  </div>
</template>