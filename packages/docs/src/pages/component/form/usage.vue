<script setup>
import { useNotifications } from '@indielayer/ui'
import { ref } from 'vue'

const notifications = useNotifications('notifica')

const email = ref('')
const password = ref('')
const description = ref('')
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
  <x-form @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        v-model="email"
        :rules="[rules.isRequired, rules.isEmail]"
        name="email"
        label="Email"
        class="w-full"
      />
      <x-input
        v-model="password"
        type="password"
        :rules="[rules.isRequired]"
        name="password"
        label="Password"
        helper="Must be between 8 and 10 characters"
        class="w-full"
      />
    </div>
    <x-textarea v-model="description" name="description" label="Description" class="w-full"/>
    <x-checkbox v-model="agree" :rules="[rules.isRequired]" name="agree" label="Agree with all the terms"/>
    <x-button block color="primary" type="submit">Submit</x-button>
  </x-form>
</template>
