<script setup>
const breadcrumbs = [
  { to: '#', label: 'Breadcrumb item 1', icon: 'smile' },
  { to: '#', label: 'Breadcrumb item 2', color: 'purple', shadow: true },
  { to: '#', label: 'Breadcrumb item 3', icon: 'twitter', color: 'yellow' },
  { to: '#', label: 'Breadcrumb item 4' },
]
</script>

<template>
  <x-breadcrumbs :items="breadcrumbs" color="primary" />
</template>
