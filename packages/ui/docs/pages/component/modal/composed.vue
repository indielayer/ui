<script setup lang="ts">
import { ref } from 'vue'
import { useNotifications } from '../../../../src'

const show = ref(false)

const notifications = useNotifications('notifica')

const email = ref('')
const password = ref('')
const description = ref('')

const rules = {
  isEmail: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  isRequired: (v: string) => !!v  || 'Field is required',
}

function onSubmit(isValid: boolean) {
  if (isValid) notifications?.success('Valid! Sumitted.')
  else notifications?.error('Invalid! Form has errors')
}
</script>

<template>
  <x-modal
    v-model="show"
    show-close
    backdrop
    is-form
    title="Modal title"
    label="Modal label"
    description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugit."
    @submit="onSubmit"
  >
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

    <!-- <template #tertiary-action>
      <x-button color="gray" size="lg">Tertiary</x-button>
    </template> -->
    <template #secondary-action>
      <x-button color="gray" size="lg" @click="show = false">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" size="lg" type="submit">Confirm</x-button>
    </template>
  </x-modal>

  <x-button class="mr-2" @click="show = true">Open modal</x-button>
</template>
