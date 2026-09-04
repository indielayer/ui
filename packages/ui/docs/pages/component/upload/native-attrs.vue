<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '@indielayer/ui'

const files = ref<UploadFile[]>([])
</script>

<template>
  <div class="grid gap-3 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      The outer ring is wrapper <code class="text-xs">class</code>. The hidden file input receives
      <code class="text-xs">data-testid</code> — inspect
      <code class="text-xs">&lt;input type=&quot;file&quot;&gt;</code> in devtools.
    </p>
    <x-upload
      v-model="files"
      label="Avatar"
      accept="image/*"
      placeholder="Choose an image"
      helper="data-testid on the sr-only file input"
      class="ring-2 ring-primary-400/50 rounded-lg p-3"
      data-testid="demo-avatar-upload"
    />
  </div>
</template>
