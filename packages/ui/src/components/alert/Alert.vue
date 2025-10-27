<script lang="ts">
const alertType = ['info', 'success', 'error', 'warning'] as const
const alertProps = {
  ...useColors.props(),
  type: String as PropType<AlertType>,
  glow: Boolean,
  light: Boolean,
  outlined: Boolean,
  removable: Boolean,
  closeLabel: String,
}

export type AlertType = typeof alertType[number]
export type AlertProps = ExtractPublicPropTypes<typeof alertProps>

type InternalClasses = 'wrapper'
export interface AlertTheme extends ThemeComponent<AlertProps, InternalClasses> {}

export default {
  name: 'XAlert',
  validators: {
    type: alertType,
  },
}
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { closeIcon, successIcon, errorIcon, warningIcon, infoIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'

const props = defineProps(alertProps)

defineEmits(['remove'])

const icon = computed(() => {
  if (props.type === 'info') return infoIcon
  else if (props.type === 'success') return successIcon
  else if (props.type === 'error') return errorIcon
  else if (props.type === 'warning') return warningIcon

  return ''
})

const { styles, classes, className } = useTheme('Alert', {}, props)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      $style['alert'],
      glow ? $style['alert--glow'] : '',
      classes.wrapper,
    ]"
  >

    <slot name="icon">
      <x-icon
        v-if="type"
        :icon="icon"
        class="text-[color:var(--x-alert-icon)] dark:text-[color:var(--x-alert-dark-icon)]"
      />
    </slot>

    <div>
      <slot></slot>
    </div>
    <template v-if="removable">
      <div class="grow"></div>
      <button type="button" class="shrink-0" :aria-label="closeLabel" @click="(e: Event) => $emit('remove', e)">
        <slot name="removeIcon">
          <x-icon :icon="closeIcon"/>
        </slot>
      </button>
    </template>
  </div>
</template>

<style lang="postcss" module>
.alert {
  color: var(--x-alert-text);
  background-color: var(--x-alert-bg);
  border-color: var(--x-alert-border);

  &--glow {
    box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-alert-glow), 0 4px 6px -4px var(--x-alert-glow);
  }

  :global(.dark) &,
  &:global(.dark) {
    color: var(--x-alert-dark-text, var(--x-alert-text));
    background-color: var(--x-alert-dark-bg, var(--x-alert-bg));
    border-color: var(--x-alert-dark-border, var(--x-alert-border));
  }
}
</style>
