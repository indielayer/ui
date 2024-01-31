<script lang="ts">
const validators = {
  ...useCommon.validators(),
  variant: ['line'] as const,
}
const stepperProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  modelValue: [String, Number],
  steps: {
    type: Array as PropType<StepperStep[]>,
    default: () => [],
  },
  variant: {
    type: String as PropType<StepperVariant>,
    default: 'line',
  },
  grow: Boolean,
  fullWidth: {
    type: Boolean,
    default: true,
  },
  interactive: {
    type: Boolean,
    default: true,
  },
  iconPristine: String,
  iconComplete: String,
  iconIncomplete: String,
  iconCurrent: String,
  iconError: String,
}

export type StepperStepStatus = 'pristine' | 'complete' | 'incomplete' | 'error'

export type StepperStep = {
  status: StepperStepStatus;
  label: string;
  description: string;
  disabled?: boolean;
}

export type StepperVariant = typeof validators.variant[number]
export type StepperProps = ExtractPublicPropTypes<typeof stepperProps>

type InternalClasses = 'wrapper' | 'list' | 'scroller' | 'content' | 'step' | 'label' | 'icon'
export interface StepperTheme extends ThemeComponent<StepperProps, InternalClasses> {}

export default {
  name: 'XStepper',
  validators,
}
</script>

<script setup lang="ts">
import { type PropType, ref, type ExtractPublicPropTypes } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XScroll from '../../components/scroll/Scroll.vue'
import XIcon from '../../components/icon/Icon.vue'
import { stepperPristineIcon, stepperIncompleteIcon, errorIcon, successIcon } from '../../common/icons'

const props = defineProps(stepperProps)

const emit = defineEmits(['update:modelValue'])

const scrollRef = ref<InstanceType<typeof XScroll> | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const stepperRef = ref<HTMLElement | null>(null)

function activateStep(step: StepperStep, index: number) {
  if (step.disabled || !props.interactive) return

  emit('update:modelValue', index)
}

function calcIcon(step: StepperStep, index: number) {
  if (step.status === 'incomplete') return props.iconIncomplete || stepperIncompleteIcon
  if (step.status === 'error') return props.iconError || errorIcon
  if (step.status === 'complete') return props.iconComplete || successIcon

  return props.iconPristine || stepperPristineIcon
}

const { styles, classes, className } = useTheme('Stepper', {}, props)
</script>

<template>
  <div>
    <div
      ref="wrapperRef"
      class="relative"
      :style="styles"
      :class="[
        className,
        classes.wrapper,
      ]"
    >
      <x-scroll
        ref="scrollRef"
        :scrollbar="false"
        horizontal
        mousewheel
        :class="classes.scroller"
      >
        <div
          ref="stepperRef"
          class="relative"
          :class="classes.list"
        >
          <component
            :is="interactive ? 'button' : 'div'"
            v-for="(step, index) in steps"
            :key="index"
            :class="[classes.step, {
              'cursor-pointer': interactive && !step.disabled,
              'text-gray-400 dark:text-gray-600': step.disabled,
              'flex-1': grow,
            }]"
            :disabled="step.disabled || !interactive"
            @click="activateStep(step, index)"
          >
            <div class="overflow-hidden">
              <div
                class="h-0.5 w-full mb-2"
                :class="[step.status === 'complete' || step.status === 'incomplete' ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700']"
              ></div>
              <div class="flex items-start pr-4">
                <x-icon
                  :icon="calcIcon(step, index)"
                  size="sm"
                  :class="[classes.icon, {
                    'text-primary-500': step.status === 'complete' || step.status === 'incomplete',
                    'text-error-500': step.status === 'error',
                  }]"
                />
                <div class="grid text-left">
                  <div class="text-sm truncate">{{ step.label }}</div>
                  <div v-if="step.description" class="text-xs text-gray-500">{{ step.description }}</div>
                </div>
              </div>
            </div>
          </component>
        </div>
      </x-scroll>
    </div>
    <div :class="classes.content">
      <slot></slot>
    </div>
  </div>
</template>
