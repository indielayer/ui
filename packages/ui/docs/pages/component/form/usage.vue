<script setup lang="ts">
import { useNotifications, type SelectOption } from '@indielayer/ui'
import { ref } from 'vue'

const notifications = useNotifications()

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
const countryCode = ref('')
const phoneNumber = ref('')
const countryCodes: SelectOption[] = [
  { label: '+1', value: '+1' },
  { label: '+44', value: '+44' },
  { label: '+351', value: '+351' },
  { label: '+49', value: '+49' },
]
const agree = ref(false)
const rules = {
  isEmail: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  isRequired: (v: string) => {
    if (Array.isArray(v)) return !!v.length || 'Field is required'

    return !!v  || 'Field is required'
  },
  phoneComplete: (values: unknown) => {
    if (!Array.isArray(values)) return 'Country code and phone number are required'

    if (values.every((v) => !!v)) return true

    return 'Country code and phone number are required'
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
      required
      placeholder="Enter your email"
      tooltip="We will never share your email with anyone"
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
      filterable
      name="country"
      placeholder="Select another country"
      label="Country"
    />

    <x-input-group
      label="Phone number"
      helper="Select a country code and enter your local number"
      :rules="[rules.phoneComplete]"
      required
    >
      <x-select
        v-model="countryCode"
        :options="countryCodes"
        name="countryCode"
        placeholder="Code"
        class="!w-28"
      />
      <x-input
        v-model="phoneNumber"
        type="number"
        name="phoneNumber"
        placeholder="5550000"
      />
    </x-input-group>

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
