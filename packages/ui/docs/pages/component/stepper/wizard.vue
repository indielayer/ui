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
