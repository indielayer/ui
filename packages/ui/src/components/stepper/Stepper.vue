<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const validators = {
  ...useCommon.validators(),
  variant: ['line', 'dot'] as const,
  orientation: ['horizontal', 'vertical'] as const,
  labelPlacement: ['end', 'bottom'] as const,
}
const stepperProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  modelValue: [String, Number],
  steps: {
    type: Array as PropType<StepperStep[]>,
    default: () => [],
  },
  validate: Function as PropType<() => boolean>,
  beforeChange: Function as PropType<(to: string | number, from: string | number) => boolean | Promise<boolean>>,
  variant: {
    type: String as PropType<StepperVariant>,
    default: 'line',
  },
  orientation: {
    type: String as PropType<StepperOrientation>,
    default: 'vertical',
  },
  labelPlacement: {
    type: String as PropType<StepperLabelPlacement>,
    default: 'end',
  },
  linear: {
    type: Boolean,
    default: true,
  },
  interactive: {
    type: Boolean,
    default: true,
  },
  editable: optionalBooleanProp(),
  disabled: Boolean,
  loading: Boolean,
  iconComplete: String,
  iconError: String,
  iconEdit: String,
}

export type StepperStepStatus = 'upcoming' | 'active' | 'complete' | 'error'

export type StepperStep = {
  value: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  editable?: boolean;
  completed?: boolean;
  error?: boolean;
  icon?: string;
  beforeNext?: () => Promise<void>;
}

export type StepperVariant = typeof validators.variant[number]
export type StepperOrientation = typeof validators.orientation[number]
export type StepperLabelPlacement = typeof validators.labelPlacement[number]
export type StepperProps = ExtractPublicPropTypes<typeof stepperProps>

type InternalStep = StepperStep & { completed: boolean; }

type InternalClasses =
  | 'wrapper'
  | 'layout'
  | 'sidebar'
  | 'nav'
  | 'navItem'
  | 'indicator'
  | 'connector'
  | 'title'
  | 'subtitle'
  | 'description'
  | 'optional'
  | 'summary'
  | 'content'
  | 'panel'
  | 'scroller'
  | 'list'
  | 'step'
  | 'stepTrack'
  | 'stepConnector'
  | 'indicatorHorizontal'
  | 'label'
  | 'icon'

type InternalExtraData = {
  status: StepperStepStatus;
  index: number;
  active: boolean;
  completed: boolean;
  clickable: boolean;
}

export interface StepperTheme extends ThemeComponent<StepperProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XStepper',
  validators,
}
</script>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  useSlots,
  type PropType,
  type ExtractPublicPropTypes,
} from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import XScroll from '../../components/scroll/Scroll.vue'
import XIcon from '../../components/icon/Icon.vue'
import { errorIcon, successIcon } from '../../common/icons'

const editIcon = '<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />'

const props = defineProps(stepperProps)
const slots = useSlots()

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  'change': [value: string | number, index: number];
  'step-complete': [value: string | number, index: number];
}>()

const localSteps = ref<InternalStep[]>([])
const activeIndex = ref(0)
const previousIndex = ref(0)
const maxVisited = ref(0)
const transitionDirection = ref<'forward' | 'back'>('forward')

watch(() => props.steps, (steps) => {
  localSteps.value = steps.map((step) => ({
    ...step,
    completed: step.completed ?? false,
  }))
  syncActiveFromModel()
}, { immediate: true, deep: true })

function syncActiveFromModel() {
  if (!localSteps.value.length) return

  if (props.modelValue !== undefined && props.modelValue !== null) {
    const idx = localSteps.value.findIndex((s) => s.value === props.modelValue)

    if (idx >= 0) {
      activeIndex.value = idx
      maxVisited.value = Math.max(maxVisited.value, idx)

      return
    }
  }

  if (props.modelValue === undefined || props.modelValue === null) {
    const first = localSteps.value[0]?.value

    if (first !== undefined) emitActive(first)
  }
}

watch(() => props.modelValue, () => {
  if (!localSteps.value.length) return

  const idx = localSteps.value.findIndex((s) => s.value === props.modelValue)

  if (idx >= 0 && idx !== activeIndex.value) activeIndex.value = idx
})

watch(activeIndex, (idx) => {
  const step = localSteps.value[idx]

  if (step) {
    emit('update:modelValue', step.value)
    maxVisited.value = Math.max(maxVisited.value, idx)
  }
})

const isFirst = computed(() => activeIndex.value <= 0)
const isLast = computed(() => localSteps.value.length === 0 || activeIndex.value >= localSteps.value.length - 1)
const activeValue = computed(() => localSteps.value[activeIndex.value]?.value)
const activeStep = computed(() => localSteps.value[activeIndex.value])
const isSingleStep = computed(() => localSteps.value.length === 1)

function getStepStatus(step: InternalStep, index: number): StepperStepStatus {
  if (step.error) return 'error'
  if (index === activeIndex.value) return 'active'
  if (isStepCompleted(step, index)) return 'complete'

  return 'upcoming'
}

function isStepCompleted(step: InternalStep, index: number) {
  return step.completed || index < activeIndex.value
}

function isStepEditable(step: InternalStep, index: number) {
  return (step.editable ?? props.editable) && isStepCompleted(step, index) && index !== activeIndex.value
}

function canGoToIndex(index: number) {
  const step = localSteps.value[index]

  if (!step || step.disabled) return false
  if (props.loading || props.disabled) return false

  if (props.linear) {
    if (index === 0) return true

    return localSteps.value.slice(0, index).every((s) => s.completed)
  }

  return index <= maxVisited.value
}

async function runValidate() {
  if (!props.validate) return true

  return props.validate()
}

async function runBeforeNext(step: InternalStep) {
  if (!step.beforeNext) return true

  try {
    await step.beforeNext()

    return true
  } catch {
    return false
  }
}

async function runLeaveGuards() {
  const current = localSteps.value[activeIndex.value]

  if (!current) return true

  if (isStepCompleted(current, activeIndex.value)) {
    if (!(await runValidate())) return false
    if (!(await runBeforeNext(current))) return false
  }

  return true
}

async function runBeforeChange(to: string | number, from: string | number) {
  if (!props.beforeChange) return true

  const result = await props.beforeChange(to, from)

  return result !== false
}

async function setActiveIndex(index: number, direction: 'forward' | 'back' = 'forward') {
  if (index === activeIndex.value) return
  if (index < 0 || index >= localSteps.value.length) return

  const to = localSteps.value[index]?.value
  const from = localSteps.value[activeIndex.value]?.value

  if (to === undefined || from === undefined) return

  if (!(await runBeforeChange(to, from))) return

  if (index !== activeIndex.value && !(await runLeaveGuards())) return

  previousIndex.value = activeIndex.value
  transitionDirection.value = direction
  activeIndex.value = index
  emit('change', to, index)
}

async function next() {
  if (props.loading || props.disabled || isLast.value) return

  if (!(await runValidate())) return

  const current = localSteps.value[activeIndex.value]

  if (!current) return

  if (!(await runBeforeNext(current))) return

  current.completed = true
  emit('step-complete', current.value, activeIndex.value)

  if (!isLast.value) await setActiveIndex(activeIndex.value + 1, 'forward')
}

async function prev() {
  if (props.loading || props.disabled || isFirst.value) return

  if (!(await runLeaveGuards())) return

  await setActiveIndex(activeIndex.value - 1, 'back')
}

async function goTo(target: string | number) {
  const index = typeof target === 'number' && target >= 0 && target < localSteps.value.length && localSteps.value[target]
    ? target
    : localSteps.value.findIndex((s) => s.value === target)

  if (index < 0) return
  if (!props.interactive) return
  if (!canGoToIndex(index)) return

  const direction = index > activeIndex.value ? 'forward' : 'back'

  await setActiveIndex(index, direction)
}

function onNavClick(index: number) {
  goTo(index)
}

function reset() {
  localSteps.value.forEach((step) => {
    step.completed = false
  })
  maxVisited.value = 0
  previousIndex.value = 0
  activeIndex.value = 0

  const first = localSteps.value[0]?.value

  if (first !== undefined) {
    emit('update:modelValue', first)
    emit('change', first, 0)
  }
}

function emitActive(value: string | number) {
  emit('update:modelValue', value)
}

function summarySlotName(value: string | number) {
  return `summary-${value}`
}

function panelSlotProps(step: InternalStep, index: number) {
  return {
    step,
    index,
    isActive: index === activeIndex.value,
    next,
    prev,
    goTo,
  }
}

function connectorClass(index: number) {
  const step = localSteps.value[index]

  if (!step) return 'border-secondary-200 dark:border-secondary-700'

  return isStepCompleted(step, index)
    ? 'border-primary-300 dark:border-primary-700'
    : 'border-secondary-200 dark:border-secondary-700'
}

function horizontalConnectorClass(index: number) {
  const step = localSteps.value[index]

  if (!step) return 'bg-secondary-200 dark:bg-secondary-700'

  return isStepCompleted(step, index)
    ? 'bg-primary-500 dark:bg-primary-600'
    : 'bg-secondary-200 dark:bg-secondary-700'
}

function horizontalTrackAlignClass(index: number) {
  const last = localSteps.value.length - 1

  if (index <= 0) return 'justify-start'
  if (index >= last) return 'justify-end'

  return 'justify-center'
}

function horizontalLabelAlignClass(index: number) {
  const last = localSteps.value.length - 1

  if (index <= 0) return 'items-start text-left'
  if (index >= last) return 'items-end text-right'

  return 'items-center text-center'
}

function indicatorStatusClass(step: InternalStep, index: number) {
  const status = getStepStatus(step, index)

  if (status === 'error') return 'bg-error-100 dark:bg-error-900 text-error-700 dark:text-error-300'
  if (status === 'complete') return 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
  if (status === 'active') return 'bg-primary-200 dark:bg-primary-800 text-primary-900 dark:text-primary-100'

  return 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
}

function titleStatusClass(step: InternalStep, index: number) {
  if (index === activeIndex.value) return 'font-semibold text-primary-800 dark:text-primary-200'

  return ''
}

function stepHeaderClass(step: InternalStep, index: number) {
  const status = getStepStatus(step, index)

  if (status === 'active') return 'text-primary-700 dark:text-primary-300'
  if (status === 'complete') return 'text-primary-600 dark:text-primary-400'
  if (status === 'error') return 'text-error-600 dark:text-error-400'

  return 'text-secondary-600 dark:text-secondary-400'
}

function slotName(value: string | number) {
  return String(value)
}

function indicatorContent(step: InternalStep, index: number) {
  const status = getStepStatus(step, index)

  if (status === 'error') return { type: 'icon' as const, icon: props.iconError || errorIcon }
  if (status === 'complete') {
    if (isStepEditable(step, index)) return { type: 'icon' as const, icon: props.iconEdit || editIcon }

    return { type: 'icon' as const, icon: props.iconComplete || successIcon }
  }

  if (props.variant === 'dot' && props.orientation === 'horizontal') return { type: 'dot' as const }

  return { type: 'number' as const, number: index + 1 }
}

const panelTransitionEnterFrom = computed(() =>
  transitionDirection.value === 'forward' ? '-translate-y-full' : 'translate-y-full',
)

const { styles, classes, className } = useTheme('Stepper', {}, props)

defineExpose({
  next,
  prev,
  goTo,
  reset,
  isFirst,
  isLast,
  activeIndex,
  activeValue,
})
</script>

<template>
  <div
    :style="styles"
    :class="[className, classes.wrapper]"
  >
    <!-- Single step: panel only -->
    <template v-if="isSingleStep && localSteps[0]">
      <slot
        v-if="slots[slotName(localSteps[0].value)]"
        :name="slotName(localSteps[0].value)"
        v-bind="panelSlotProps(localSteps[0], 0)"
      ></slot>
    </template>

    <!-- Vertical wizard -->
    <div
      v-else-if="orientation === 'vertical' && localSteps.length"
      :class="classes.layout"
    >
      <nav
        :class="classes.sidebar"
        aria-label="Progress"
      >
        <ol :class="classes.nav">
          <li
            v-for="(step, index) in localSteps"
            :key="step.value"
            :class="[
              classes.navItem,
              connectorClass(index),
              {
                'cursor-pointer': interactive && canGoToIndex(index) && !loading,
                'cursor-not-allowed': !canGoToIndex(index) || loading,
                'cursor-progress': loading,
              },
            ]"
            :aria-current="index === activeIndex ? 'step' : undefined"
            :aria-disabled="!canGoToIndex(index) || step.disabled ? 'true' : undefined"
            @click="onNavClick(index)"
          >
            <span
              :class="[classes.indicator, indicatorStatusClass(step, index)]"
            >
              <x-icon
                v-if="indicatorContent(step, index).type === 'icon'"
                :icon="indicatorContent(step, index).icon!"
                size="sm"
              />
              <template v-else>{{ indicatorContent(step, index).number }}</template>
            </span>

            <div class="min-w-0 flex-1">
              <div :class="[classes.title, titleStatusClass(step, index)]">
                {{ step.title }}
                <span
                  v-if="step.optional"
                  :class="classes.optional"
                >(optional)</span>
              </div>
              <div
                v-if="step.subtitle"
                :class="classes.subtitle"
              >
                {{ step.subtitle }}
              </div>
              <div
                v-if="step.description"
                :class="classes.description"
              >
                {{ step.description }}
              </div>
              <div
                v-if="slots[summarySlotName(step.value)] && isStepCompleted(step, index) && index !== activeIndex"
                :class="classes.summary"
              >
                <slot
                  :name="summarySlotName(step.value)"
                  :step="step"
                  :index="index"
                ></slot>
              </div>
            </div>
          </li>
        </ol>
      </nav>

      <div
        :class="classes.content"
        aria-live="polite"
      >
        <slot name="content-prefix" ></slot>
        <transition
          :enter-from-class="panelTransitionEnterFrom"
          enter-active-class="transition-transform duration-300 ease-out"
          :leave-to-class="panelTransitionEnterFrom"
          leave-active-class="transition-transform duration-300 ease-in"
          mode="out-in"
        >
          <div
            v-if="activeStep"
            :key="activeStep.value"
            :class="classes.panel"
            data-stepper-panel
          >
            <slot
              v-if="slots[slotName(activeStep.value)]"
              :name="slotName(activeStep.value)"
              v-bind="panelSlotProps(activeStep, activeIndex)"
            ></slot>
          </div>
        </transition>
      </div>
    </div>

    <!-- Horizontal -->
    <template v-else-if="localSteps.length">
      <div :class="classes.layout">
        <x-scroll
          :scrollbar="false"
          horizontal
          mousewheel
          :class="classes.scroller"
        >
          <nav
            :class="classes.list"
            aria-label="Progress"
          >
            <component
              :is="interactive ? 'button' : 'div'"
              v-for="(step, index) in localSteps"
              :key="step.value"
              :type="interactive ? 'button' : undefined"
              :class="[
                classes.step,
                stepHeaderClass(step, index),
                horizontalLabelAlignClass(index),
                {
                  'cursor-pointer': interactive && canGoToIndex(index) && !loading,
                  'cursor-not-allowed': !canGoToIndex(index) || loading,
                },
              ]"
              :disabled="!interactive || !canGoToIndex(index) || step.disabled || loading"
              :aria-current="index === activeIndex ? 'step' : undefined"
              @click="onNavClick(index)"
            >
              <div
                :class="[
                  classes.stepTrack,
                  horizontalTrackAlignClass(index),
                ]"
              >
                <div
                  v-if="index > 0"
                  :class="[classes.stepConnector, horizontalConnectorClass(index - 1)]"
                ></div>
                <span :class="[classes.indicatorHorizontal, indicatorStatusClass(step, index)]">
                  <x-icon
                    v-if="step.icon"
                    :icon="step.icon"
                    size="sm"
                  />
                  <x-icon
                    v-else-if="indicatorContent(step, index).type === 'icon'"
                    :icon="indicatorContent(step, index).icon!"
                    size="sm"
                  />
                  <template v-else>{{ indicatorContent(step, index).number }}</template>
                </span>
                <div
                  v-if="index < localSteps.length - 1"
                  :class="[classes.stepConnector, horizontalConnectorClass(index)]"
                ></div>
              </div>
              <div
                :class="[
                  classes.label,
                  horizontalLabelAlignClass(index),
                ]"
              >
                <span class="text-sm font-medium leading-tight">{{ step.title }}</span>
                <span
                  v-if="step.optional"
                  :class="classes.optional"
                >(optional)</span>
                <span
                  v-if="step.subtitle && labelPlacement === 'end'"
                  :class="classes.subtitle"
                >{{ step.subtitle }}</span>
              </div>
            </component>
          </nav>
        </x-scroll>

        <div
          :class="classes.content"
          aria-live="polite"
        >
          <slot name="content-prefix" ></slot>
          <transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-150"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <div
              v-if="activeStep"
              :key="activeStep.value"
              :class="classes.panel"
            >
              <slot
                v-if="slots[slotName(activeStep.value)]"
                :name="slotName(activeStep.value)"
                v-bind="panelSlotProps(activeStep, activeIndex)"
              ></slot>
            </div>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>
