<script lang="ts">
const validators = {
  placement: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'] as const,
}

export type PopoverPlacement = Placement
export type PopoverTriggerEvent = TriggerEvent

const popoverProps = {
  disabled: {
    type: Boolean,
    description: 'Disables showing the popover.',
  },
  positioningDisabled: {
    type: Boolean,
    description: 'Keeps the popover in the DOM flow without floating positioning.',
  },
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom-start',
    description: 'Preferred placement relative to the trigger.',
  },
  delay: {
    type: [String, Number, Object] as PropType<string | number | { show: number; hide: number; }>,
    default: 0,
    description: 'Show/hide delay in ms, or `{ show, hide }`.',
  },
  distance: {
    type: [Number, String],
    description: 'Offset along the placement axis in pixels.',
  },
  skidding: {
    type: [Number, String],
    description: 'Offset along the trigger edge in pixels.',
  },
  triggers: {
    type: Array as PropType<Array<PopoverTriggerEvent>>,
    default: () => ['click'],
    description: 'Events that toggle the popover (for example click, hover, focus).',
  },
  hideArrow: {
    type: Boolean,
    default: true,
    description: 'Hides the popover arrow.',
  },
  showTriggers: {
    type: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
    description: 'Events that show the popover, or a function deriving them from `triggers`.',
  },
  hideTriggers: {
    type: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
    description: 'Events that hide the popover, or a function deriving them from `triggers`.',
  },
  popperTriggers: {
    type: Array as PropType<Array<PopoverTriggerEvent>>,
    description: 'Events on the popover content that keep it open.',
  },
  popperShowTriggers: {
    type: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
    description: 'Events on the content that show the popover.',
  },
  popperHideTriggers: {
    type: [Array, Function] as PropType<Array<PopoverTriggerEvent> | ((triggers: Array<PopoverTriggerEvent>) => Array<PopoverTriggerEvent>)>,
    description: 'Events on the content that hide the popover.',
  },
  container: {
    type: [String, Object, Boolean],
    default: 'body',
    description: 'Element that contains the floating popover DOM.',
  },
  boundary: {
    type: [String, Object],
    description: 'Overflow boundary used for flip/shift positioning.',
  },
  strategy: {
    type: String as PropType<'absolute' | 'fixed'>,
    default: 'absolute',
    description: 'CSS position strategy for the floating element.',
  },
  autoHide: {
    type: [Boolean, Function] as PropType<boolean | ((event: Event) => boolean)>,
    default: true,
    description: 'Hides on outside click, or a predicate deciding whether to hide.',
  },
  shown: {
    type: Boolean,
    description: 'Controlled open state.',
  },
  handleResize: {
    type: Boolean,
    default: true,
    description: 'Repositions when the popover content size changes.',
  },
  instantMove: {
    type: Boolean,
    description: 'Skips transition when the popover moves between placements.',
  },
  eagerMount: {
    type: Boolean,
    description: 'Mounts popover content immediately instead of on first open.',
  },
  popperClass: {
    type: [String, Array, Object],
    description: 'Extra class(es) on the floating popover element.',
  },
  computeTransformOrigin: {
    type: Boolean,
    description: 'Computes transform-origin for scale transitions.',
  },
}

export type PopoverProps = ExtractPublicPropTypes<typeof popoverProps>

type InternalClasses = 'wrapper' | 'content'
export interface PopoverTheme extends ThemeComponent<PopoverProps, InternalClasses> {}

export default {
  name: 'XPopover',
  validators,
  docs: {
    slots: {
      default: 'Trigger element.',
      content: 'Popover panel content.',
    },
    emits: {
      show: 'Emitted when the popover starts opening.',
      hide: 'Emitted when the popover starts closing.',
      'update:shown': 'Emitted when open state changes.',
      'apply-show': 'Emitted after the show transition is applied.',
      'apply-hide': 'Emitted after the hide transition is applied.',
      'close-group': 'Emitted when a popover group close is requested.',
      'close-directive': 'Emitted when closed via the close directive.',
      'auto-hide': 'Emitted when auto-hide closes the popover.',
      resize: 'Emitted when popover content is resized.',
    },
    methods: {
      show: 'Show the popover.',
      hide: 'Hide the popover.',
      toggle: 'Toggle open state.',
    },
  },
}
</script>

<script setup lang="ts">
import { type PropType, type ExtractPublicPropTypes, ref, inject, computed } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { injectButtonGroupKey } from '../../composables/keys'
import { Dropdown as VDropdown, type Placement, type TriggerEvent } from 'floating-vue'
import PopoverContentBoundary from './PopoverContentBoundary.vue'
import type { ButtonGroupInjection } from '../button/ButtonGroup.vue'

const inactiveButtonGroup: ButtonGroupInjection = {
  isButtonGroup: false,
  groupProps: {},
  registerChild: () => {},
  unregisterChild: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
}

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

const buttonGroup = inject(injectButtonGroupKey, inactiveButtonGroup)

const { styles, classes, className } = useTheme('Popover', {}, props)
</script>

<template>
  <v-dropdown
    ref="elRef"
    :style="styles"
    :class="[
      className,
      classes.wrapper,
      { 'inline-flex self-stretch': buttonGroup.isButtonGroup },
    ]"
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
      <popover-content-boundary>
        <slot name="content"></slot>
      </popover-content-boundary>
    </template>
  </v-dropdown>
</template>

<style>
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
}

.resize-observer object {
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

.v-popper__popper {
  z-index: 10000;
  top: 0;
  left: 0;
  outline: none;
}

.v-popper__popper.v-popper__popper--hidden {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
  pointer-events: none;
}

.v-popper__popper.v-popper__popper--shown {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.v-popper__popper.v-popper__popper--skip-transition,
.v-popper__popper.v-popper__popper--skip-transition > .v-popper__wrapper {
  transition: none !important;
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
