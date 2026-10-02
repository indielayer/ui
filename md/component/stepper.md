# Stepper
Multi-step wizard with declarative steps, named panel slots, programmatic next/prev navigation, validation hooks, and optional sidebar summaries.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| beforeChange | Function as PropType<(to: string  \|  number |  | Async guard before changing steps; return false to cancel. |
| color | String | primary | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables all step navigation. |
| editable | Boolean |  | Allow revisiting completed steps (shows edit icon). |
| iconComplete | String |  | Icon for completed steps. |
| iconEdit | String |  | Icon for editable completed steps. |
| iconError | String |  | Icon for steps in an error state. |
| interactive | Boolean | true | Allow clicking step indicators to navigate. |
| labelPlacement | String StepperLabelPlacement | end | Where labels sit relative to indicators in horizontal mode. |
| linear | Boolean | true | Require prior steps to be completed before navigating ahead. |
| loading | Boolean |  | Blocks navigation while an async step action runs. |
| modelValue | [String, Number] |  | Active step value (`v-model`). |
| orientation | String StepperOrientation | vertical | Layout direction: vertical (sidebar) or horizontal. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| steps | Array StepperStep[] | [] | Step definitions (value, title, optional, completed, error, etc.). |
| validate | Function () = boolean> |  | Runs before leaving the current step; return false to block navigation. |
| variant | String StepperVariant | line | Indicator style: line or dot. |

### Slots
- `[stepValue]`: Panel content for a step; slot name matches `step.value`.
- `content-prefix`: Content rendered above the active step panel.
- `default`
- `summary-[stepValue]`: Sidebar summary for a completed step (vertical orientation).

### Events
- `change`: Emitted when the active step changes; payload is `(value, index)`.
- `step-complete`: Emitted when a step is marked complete via `next()`; payload is `(value, index)`.
- `update:modelValue`: Active step value (`v-model`).

### Methods
- `goTo`: Navigate to a step by value or index when allowed.
- `next`: Advance to the next step after validation.
- `prev`: Go to the previous step.
- `reset`: Clear completion state and return to the first step.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'

const stepperRef = ref()
const active = ref('details')
const steps = [
  { value: 'details', title: 'Details' },
  { value: 'settings', title: 'Settings', optional: true },
  { value: 'review', title: 'Review' },
]
</script>

<template>
  <div class="max-w-2xl">
    <x-stepper
      ref="stepperRef"
      v-model="active"
      :steps="steps"
      orientation="horizontal"
      label-placement="bottom"
      class="min-h-[10rem]"
    >
      <template #details>
        <p class="text-sm font-medium text-secondary-800 dark:text-secondary-200 mb-1">
          Basic information
        </p>
        <p class="text-sm text-secondary-600 dark:text-secondary-400">
          Enter your project details here.
        </p>
      </template>
      <template #settings>
        <p class="text-sm font-medium text-secondary-800 dark:text-secondary-200 mb-1">
          Optional preferences
        </p>
        <p class="text-sm text-secondary-600 dark:text-secondary-400">
          Configure optional settings, or skip ahead with Next.
        </p>
      </template>
      <template #review>
        <p class="text-sm font-medium text-secondary-800 dark:text-secondary-200 mb-1">
          Confirm and finish
        </p>
        <p class="text-sm text-secondary-600 dark:text-secondary-400">
          Review everything before submitting.
        </p>
      </template>
    </x-stepper>

    <div class="flex justify-end gap-2 mt-4">
      <x-button
        ghost
        :disabled="stepperRef?.isFirst"
        @click="stepperRef?.prev()"
      >
        Previous
      </x-button>
      <x-button
        :disabled="stepperRef?.isLast"
        @click="stepperRef?.next()"
      >
        Next
      </x-button>
    </div>
  </div>
</template>
```

#### Wizard
```vue
<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'
import { computed, ref } from 'vue'

const notifications = useNotifications()
const formRef = ref<{ validate: () => boolean; } | null>(null)
const stepperRef = ref()

const active = ref('account')
const saving = ref(false)

const firstName = ref('')
const lastName = ref('')
const phone = ref('')

const rules = {
  isRequired: (v: string) => !!v || 'Required',
  isEmail: (v: string) => /^\S+@\S+\.\S+$/.test(v) || 'Invalid email',
}

async function beforeContactNext() {
  saving.value = true
  await new Promise((r) => setTimeout(r, 600))
  saving.value = false
}

const steps = computed(() => [
  { value: 'account', title: 'Account', description: 'Required' },
  { value: 'contact', title: 'Contact', description: 'Optional', optional: true, beforeNext: beforeContactNext },
  { value: 'confirm', title: 'Confirm' },
])

const accountSummary = computed(() => {
  if (!firstName.value && !lastName.value) return ''

  return [firstName.value, lastName.value].filter(Boolean).join(' ')
})

function onSubmit(isValid: boolean) {
  if (isValid) notifications?.success('Submitted')
  else notifications?.error('Fix form errors')
}

async function onPrimaryClick() {
  if (stepperRef.value?.isLast) {
    if (formRef.value?.validate()) onSubmit(true)

    return
  }

  await stepperRef.value?.next()
}
</script>

<template>
  <x-form ref="formRef" class="max-w-3xl" @submit="onSubmit">
    <x-stepper
      ref="stepperRef"
      v-model="active"
      :steps="steps"
      :validate="() => formRef?.validate() ?? true"
      :loading="saving"
      linear
      class="min-h-[16rem]"
    >
      <template #account="{ next }">
        <div class="grid gap-4 max-w-lg">
          <x-input v-model="firstName" label="First name" :rules="[rules.isRequired]" />
          <x-input v-model="lastName" label="Last name" :rules="[rules.isRequired]" />
        </div>
        <div class="mt-6 flex justify-end">
          <x-button @click="next">Continue</x-button>
        </div>
      </template>

      <template #summary-account>
        <span v-if="accountSummary">{{ accountSummary }}</span>
      </template>

      <template #contact="{ next, prev }">
        <x-input v-model="phone" class="max-w-xs" label="Phone" helper="Optional" />
        <div class="mt-6 flex justify-between">
          <x-button ghost @click="prev">Back</x-button>
          <x-button :loading="saving" @click="next">Continue</x-button>
        </div>
      </template>

      <template #summary-contact>
        <span v-if="phone">{{ phone }}</span>
      </template>

      <template #confirm="{ prev }">
        <dl class="text-sm grid gap-2 max-w-md">
          <div class="flex justify-between gap-4">
            <dt class="text-secondary-500">Name</dt>
            <dd>{{ accountSummary || '—' }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-secondary-500">Phone</dt>
            <dd>{{ phone || '—' }}</dd>
          </div>
        </dl>
        <div class="mt-6 flex justify-between">
          <x-button ghost @click="prev">Back</x-button>
        </div>
      </template>
    </x-stepper>

    <div class="flex justify-end gap-2 mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
      <x-button
        ghost
        :disabled="stepperRef?.isFirst"
        @click="stepperRef?.prev()"
      >
        Previous
      </x-button>
      <x-button
        :loading="saving"
        :type="stepperRef?.isLast ? 'submit' : 'button'"
        @click="onPrimaryClick"
      >
        {{ stepperRef?.isLast ? 'Submit' : 'Next' }}
      </x-button>
    </div>
  </x-form>
</template>
```

HTML docs: https://indielayer.com/component/stepper
