<script setup>
import { useNotifications } from '../../../../src'
import { ref } from 'vue'

const notifications = useNotifications('notifica')

const email = ref('')
const password = ref('')
const description = ref('')
const country = ref('')
const country2 = ref('')
const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Mexico', value: 'mx' },
]
const agree = ref(false)
const rules = {
  isEmail: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  isRequired: (v) => !!v  || 'Field is required',
}

function onSubmit(isValid) {
  if (isValid) notifications.success('Valid! Sumitted.')
  else notifications.error('Invalid! Form has errors')
}
</script>

<template>
  <x-form title="Edit user information" description="Almost all fields are required" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
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
    </div>
    <x-textarea
      v-model="description"
      name="description"
      label="Description"
      placeholder="Description"
    />
    <x-select
      v-model="country"
      :rules="[rules.isRequired]"
      :options="countries"
      native
      name="country"
      placeholder="Select a country"
      label="Country"
    />
    <x-select
      v-model="country2"
      :rules="[rules.isRequired]"
      :options="countries"
      name="country2"
      placeholder="Select another country"
      label="Country"
    />
    <x-checkbox v-model="agree" :rules="[rules.isRequired]" name="agree" label="Agree with all the terms"/>

    <template #secondary-action>
      <x-button color="gray">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" type="submit">Submit</x-button>
    </template>
  </x-form>
</template>
