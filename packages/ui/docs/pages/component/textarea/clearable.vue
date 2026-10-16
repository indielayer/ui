<script setup lang="ts">
import { ref } from 'vue'

const notes = ref('Click the clear icon to reset this value.')
const feedback = ref('Optional longer feedback that can be cleared.')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <x-textarea
      v-model="notes"
      label="Notes"
      clearable
      rows="3"
      placeholder="Write something…"
    />
    <x-textarea
      v-model="feedback"
      label="Feedback"
      clearable
      adjust-to-text
      rows="1"
      helper="Clearable with adjust-to-text"
    />
  </div>
</template>
