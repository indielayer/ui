<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNotifications } from '@indielayer/ui'

const show = ref(false)
const confirmation = ref('')
const itemName = 'Image1.jpg'
const confirmWord = 'delete'

const notifications = useNotifications()

const rules = {
  matchesConfirm: (v: string) => v === confirmWord || `Please type '${confirmWord}' to confirm.`,
}

watch(show, (open) => {
  if (!open) confirmation.value = ''
})

function onSubmit(isValid: boolean) {
  if (!isValid) return

  notifications?.success(`Deleted '${itemName}'`)
  show.value = false
}
</script>

<template>
  <x-modal
    v-model="show"
    title="Confirm Deletion"
    show-close
    backdrop
    blurry
    icon="trash"
    is-form
    size="sm"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <p>Are you sure you want to delete '{{ itemName }}'?</p>

      <x-input
        v-model="confirmation"
        name="confirmation"
        placeholder="delete"
        helper="Please type 'delete' to confirm."
        :rules="[rules.matchesConfirm]"
      />
    </div>

    <template #secondary-action>
      <x-button ghost tabindex="-1" @click="show = false">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="error" type="submit">Delete</x-button>
    </template>
  </x-modal>

  <x-button color="error" outlined @click="show = true">Delete item</x-button>
</template>
