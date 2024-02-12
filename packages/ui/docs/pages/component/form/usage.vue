<script setup lang="ts">
import { useNotifications, type SelectOption } from '@indielayer/ui'
import { ref } from 'vue'

const notifications = useNotifications('notifica')

const email = ref('')
const password = ref('')
const description = ref('')
const checked = ref()
const selected = ref()
const country = ref('')
const countries: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Mexico', value: 'mx' },
]
const agree = ref(false)
const rules = {
  isEmail: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  isRequired: (v: string) => {
    if (Array.isArray(v)) return !!v.length || 'Field is required'

    return !!v  || 'Field is required'
  },
}
const range = ref([])

function onSubmit(isValid: string) {
  if (isValid) notifications?.success('Valid! Sumitted.')
  else notifications?.error('Invalid! Form has errors')
}
</script>

<template>
  <x-form title="Edit user information" description="Almost all fields are required" @submit="onSubmit">
    <x-input
      v-model="email"
      :rules="[rules.isRequired, rules.isEmail]"
      name="email"
      label="Email"
      placeholder="Enter your email"
    />
    <x-input
      v-model="password"
      type="password"
      :rules="[rules.isRequired]"
      name="password"
      label="Password"
      placeholder="Enter your password"
      helper="Must be between 8 and 10 characters"
    />
    <x-textarea
      v-model="description"
      name="description"
      label="Description"
      placeholder="Description"
    />

    <x-form-group v-model="selected" label="Group of checkboxes" :rules="[rules.isRequired]">
      <x-checkbox value="a" label="Lorem ipsum dolor" />
      <x-checkbox value="b" label="Second option" />
    </x-form-group>

    <x-form-group v-model="checked" label="Group of radio buttons" :rules="[rules.isRequired]">
      <x-radio name="inputName" value="a" label="Option A" />
      <x-radio name="inputName" value="b" label="Option B" />
    </x-form-group>

    <x-select
      v-model="country"
      :rules="[rules.isRequired]"
      :options="countries"
      name="country"
      placeholder="Select another country"
      label="Country"
    />

    <x-datepicker
      v-model="range"
      :rules="[rules.isRequired]"
      label="Select a date"
      helper="Pick a date"
      tooltip="Use it to pick a date"
      range
      multi-calendars
      disable-year-select
      :enable-time-picker="false"
    />

    <x-checkbox
      v-model="agree"
      :rules="[rules.isRequired]"
      name="agree"
      label="Agree with all the terms"
      helper="Have you read them?"
    />

    <template #secondary-action>
      <x-button ghost>Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" type="submit">Submit</x-button>
    </template>
  </x-form>
</template>
