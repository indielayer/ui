<script lang="ts">
import { optionalBooleanProp } from '../../common/props'
import { emptyIcon } from '../../common/icons'

const emptyProps = {
  ...useCommon.props(),
  title: {
    type: String,
    description: 'Primary empty-state heading.',
  },
  description: {
    type: String,
    description: 'Supporting text shown below the title.',
  },
  icon: {
    type: String,
    default: emptyIcon,
    description: 'Icon name shown above the title.',
  },
  bordered: optionalBooleanProp('Adds a border around the empty state.'),
}

export type EmptyProps = ExtractPublicPropTypes<typeof emptyProps>

type InternalClasses = 'wrapper' | 'bordered' | 'icon' | 'title' | 'description' | 'actions'
export interface EmptyTheme extends ThemeComponent<EmptyProps, InternalClasses> {}

export default {
  name: 'XEmpty',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      icon: 'Custom icon; overrides the `icon` prop.',
      title: 'Custom title content; overrides the `title` prop.',
      description: 'Custom description content; overrides the `description` prop.',
      actions: 'Action controls shown below the description.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes } from 'vue'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon, type Size } from '../../composables/useCommon'
import XIcon from '../icon/Icon.vue'

const sizeOrder: Size[] = ['xs', 'sm', 'md', 'lg', 'xl']

const props = defineProps(emptyProps)
const resolvedProps = useResolvedComponentProps('Empty', props)

const iconSize = computed(() => {
  const size = resolvedProps.value.size ?? 'md'
  const index = sizeOrder.indexOf(size)
  const nextIndex = index < 0 ? sizeOrder.indexOf('md') + 1 : Math.min(index + 1, sizeOrder.length - 1)

  return sizeOrder[nextIndex]
})

const { styles, classes, className } = useTheme('Empty', {}, resolvedProps)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      classes.wrapper,
      resolvedProps.bordered ? classes.bordered : '',
    ]"
  >
    <slot name="icon">
      <x-icon
        v-if="resolvedProps.icon"
        :icon="resolvedProps.icon"
        :size="iconSize"
        :class="classes.icon"
      />
    </slot>

    <slot name="title">
      <p v-if="resolvedProps.title" :class="classes.title">
        {{ resolvedProps.title }}
      </p>
    </slot>

    <slot name="description">
      <p v-if="resolvedProps.description" :class="classes.description">
        {{ resolvedProps.description }}
      </p>
    </slot>

    <div v-if="$slots.actions" :class="classes.actions">
      <slot name="actions" ></slot>
    </div>
  </div>
</template>
