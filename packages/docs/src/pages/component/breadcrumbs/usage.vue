<script setup>
const simple = [
  { to: '#', label: 'Breadcrumb item 1' },
  { to: '#', label: 'Breadcrumb item 2' },
  { to: '#', label: 'Breadcrumb item 3' },
  { to: '#', label: 'Breadcrumb item 4' },
]
const breadcrumbs = [
  { to: '#', label: 'Breadcrumb item 1', icon: 'smile' },
  { to: '#', label: 'Breadcrumb item 2', color: 'purple', shadow: true },
  { to: '#', label: 'Breadcrumb item 3', icon: 'twitter', color: 'yellow' },
  { to: '#', label: 'Breadcrumb item 4' },
]
</script>

<template>
  <x-breadcrumbs :items="simple" color="primary" />
  <x-breadcrumbs :items="breadcrumbs" color="primary" />
</template>
