<script setup lang="ts">
import { ref } from 'vue'

const start = ref('')
const end = ref('')

const rules = {
  required: (values: unknown) => {
    if (!Array.isArray(values)) return 'Both dates are required'

    if (values.length >= 2 && values.every((v) => !!v)) return true

    return 'Both dates are required'
  },
}
</script>

<template>
  <x-form @submit="() => {}">
    <div class="flex">
      <x-input-group
        label="Date range"
        helper="Select date and time"
        :rules="[rules.required]"
      >
        <x-datepicker
          v-model="start"
          teleport="body"
          placeholder="Date"
          :enable-time-picker="false"
        />
        <x-input v-model="end" type="time" placeholder="Time" />
      </x-input-group>
    </div>

    <x-button type="submit" color="primary">Submit</x-button>
  </x-form>
</template>
