<script lang="ts">
const validators = {
  placement: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'] as const,
}

export type PopoverPlacement = Placement
export type PopoverTriggerEvent = TriggerEvent

const popoverProps = {
  disabled: Boolean,
  positioningDisabled: Boolean,
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom-start',
  },
  delay: {
    type: [String, Number, Object] as PropType<string | number | { show: number; hide: number; }>,
    default: 0,
  },
  distance: [Number, String],
  skidding: [Number, String],
  triggers: {
    type: Array as PropType<Array<PopoverTriggerEvent>>,
    default: () => ['click'],
  },
  hideArrow: {
    type: Boolean,
    default: true,
  },
  showTriggers: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
  hideTriggers: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
  popperTriggers: Array as PropType<Array<PopoverTriggerEvent>>,
  popperShowTriggers: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
  popperHideTriggers: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
  container: {
    type: [String, Object, Boolean],
    default: 'body',
  },
  boundary: [String, Object],
  strategy: {
    type: String as PropType<'absolute' | 'fixed'>,
    default: 'absolute',
  },
  autoHide: {
    type: [Boolean, Function] as PropType<boolean | ((event: Event) => boolean)>,
    default: true,
  },
  shown: Boolean,
  handleResize: {
    type: Boolean,
    default: true,
  },
  instantMove: Boolean,
  eagerMount: Boolean,
  popperClass: [String, Array, Object],
  computeTransformOrigin: Boolean,
}

export type PopoverProps = ExtractPublicPropTypes<typeof popoverProps>

type InternalClasses = 'wrapper' | 'content'
export interface PopoverTheme extends ThemeComponent<PopoverProps, InternalClasses> {}

export default {
  name: 'XPopover',
  validators,
}
</script>

<script setup lang="ts">
import { type PropType, type ExtractPublicPropTypes, ref } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { Dropdown as VDropdown, type Placement, type TriggerEvent } from 'floating-vue'

const props = defineProps(popoverProps)

const elRef = ref<InstanceType<typeof VDropdown> | null>(null)

defineEmits(['show', 'hide', 'update:shown', 'apply-show', 'apply-hide', 'close-group', 'close-directive', 'auto-hide', 'resize'])

function show(): void {
  elRef.value?.show()
}

function hide(): void {
  elRef.value?.hide()
}

function toggle(): void {
  if (isOpen.value) hide()
  else show()
}

const isOpen = ref(false)

defineExpose({ show, hide, toggle, isOpen })

const { styles, classes, className } = useTheme('Popover', {}, props)
</script>

<template>
  <v-dropdown
    ref="elRef"
    :style="styles"
    :class="[className, classes.wrapper]"
    :positioning-disabled="positioningDisabled"
    :placement="placement"
    :disabled="disabled"
    :delay="delay"
    :shown="shown"
    :distance="distance"
    :skidding="skidding"
    :triggers="triggers"
    :show-triggers="showTriggers"
    :hide-triggers="hideTriggers"
    :popper-triggers="popperTriggers"
    :popper-show-triggers="popperShowTriggers"
    :popper-hide-triggers="popperHideTriggers"
    :container="container"
    :boundary="boundary"
    :strategy="strategy"
    :auto-hide="autoHide"
    :handle-resize="handleResize"
    :instant-move="instantMove"
    :eager-mount="eagerMount"
    :popper-class="[
      classes.content,
      popperClass,
      hideArrow ? 'v-popper__popper--no-arrow' : '',
    ]"
    :compute-transform-origin="computeTransformOrigin"
    @show="() => { isOpen = true; $emit('show') }"
    @hide="() => { isOpen = false; $emit('hide') }"
    @update:shown="(shown) => $emit('update:shown', shown)"
    @apply-show="() => $emit('apply-show')"
    @apply-hide="() => $emit('apply-hide')"
    @close-group="() => $emit('close-group')"
    @close-directive="() => $emit('close-directive')"
    @auto-hide="() => $emit('auto-hide')"
    @resize="() => $emit('resize')"
  >
    <slot></slot>
    <template #popper>
      <slot name="content"></slot>
    </template>
  </v-dropdown>
</template>

<style lang="postcss">
/* stylelint-disable no-duplicate-selectors */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable selector-class-pattern */
.resize-observer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
  display: block;
  overflow: hidden;
  opacity: 0;

  object {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
  }
}

.v-popper__popper {
  z-index: 10000;
  top: 0;
  left: 0;
  outline: none;

  &.v-popper__popper--hidden {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
    pointer-events: none;
  }

  &.v-popper__popper--shown {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }

  &.v-popper__popper--skip-transition,
  &.v-popper__popper.v-popper__popper--skip-transition > .v-popper__wrapper {
    transition: none !important;
  }
}

.v-popper__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}

.v-popper__arrow-container {
  position: absolute;
  width: 10px;
  height: 10px;
}

.v-popper__arrow-inner {
  border-style: solid;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  visibility: hidden;
  border-width: 7px;
}
.v-popper__arrow-outer { display: none; }

.v-popper__popper[data-popper-placement^="top"] .v-popper__arrow-inner,
.v-popper__popper[data-popper-placement^="bottom"] .v-popper__arrow-inner { left: -2px; }

.v-popper__popper[data-popper-placement^="top"] .v-popper__arrow-inner {
  border-bottom-width: 0;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
}
.v-popper__popper[data-popper-placement^="top"] .v-popper__arrow-inner { top: -2px; }
.v-popper__popper[data-popper-placement^="bottom"] .v-popper__arrow-container { top: 0; }

.v-popper__popper[data-popper-placement^="bottom"] .v-popper__arrow-inner {
  border-top-width: 0;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
}
.v-popper__popper[data-popper-placement^="bottom"] .v-popper__arrow-inner { top: -4px; }

.v-popper__popper[data-popper-placement^="left"] .v-popper__arrow-inner,
.v-popper__popper[data-popper-placement^="right"] .v-popper__arrow-inner { top: -2px; }

.v-popper__popper[data-popper-placement^="right"] .v-popper__arrow-inner {
  border-left-width: 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
}
.v-popper__popper[data-popper-placement^="right"] .v-popper__arrow-inner { left: -4px; }
.v-popper__popper[data-popper-placement^="left"] .v-popper__arrow-container { right: -10px; }

.v-popper__popper[data-popper-placement^="left"] .v-popper__arrow-inner {
  border-right-width: 0;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
}
.v-popper__popper[data-popper-placement^="left"] .v-popper__arrow-inner { left: -2px; }

.v-popper--theme-dropdown .v-popper__arrow-inner {
  visibility: visible;
  border-color: #374151;
}

.v-popper__popper--no-arrow .v-popper__arrow-container {
  display: none;
}
</style>
