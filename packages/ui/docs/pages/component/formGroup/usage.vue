<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'
import { ref } from 'vue'

const notifications = useNotifications('notifica')

const selected = ref(['a'])
const checked = ref()

const rules = {
  isRequired: (v: string) => {
    if (Array.isArray(v)) return !!v.length || 'Field is required'

    return !!v  || 'Field is required'
  },
}

function onSubmit(isValid: string) {
  if (isValid) notifications?.success('Valid! Sumitted.')
  else notifications?.error('Invalid! Form has errors')
}
</script>

<template>
  <x-form title="Form with form groups" @submit="onSubmit">
    <x-form-group
      v-model="selected"
      label="Group of checkboxes"
      helper="Helper text"
      tooltip="Tooltip text"
      :rules="[rules.isRequired]"
      vertical
    >
      <x-checkbox name="selectgroup" value="a" label="Lorem ipsum dolor" />
      <x-checkbox name="selectgroup" value="b" label="Second option" />
    </x-form-group>

    <x-form-group v-model="checked" label="Group of radio buttons" helper="Helper text" :rules="[rules.isRequired]">
      <x-radio name="radiogroup" value="a" label="Option A" />
      <x-radio name="radiogroup" value="b" label="Option B" />
    </x-form-group>

    <template #primary-action>
      <x-button color="primary" type="submit">Submit</x-button>
    </template>
  </x-form>
</template>
