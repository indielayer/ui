<template>
  <div class="flex gap-4">
    <x-tag color="primary">Hello</x-tag>
    <x-tag color="amber">Amber</x-tag>
    <x-tag outlined>I'm a tag</x-tag>
    <x-tag removable @remove="$toast.log('remove me')">I'm a tag</x-tag>
  </div>
</template>
