<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'

const notifications = useNotifications()
</script>

<template>
  <div class="space-x-2 space-y-2">
    <x-tag color="primary" to="/">Hello</x-tag>
    <x-tag color="purple">Hello</x-tag>
    <x-tag
      color="green"
      size="sm"
      filled
      rounded
      outlined
    >Hello</x-tag>
    <x-tag color="red">Hello</x-tag>
    <x-tag color="amber">Amber</x-tag>
    <x-tag outlined>I'm a tag</x-tag>
    <x-tag rounded outlined color="pink">I'm a tag</x-tag>
    <x-tag color="pink">I'm a tag</x-tag>
    <x-tag removable size="xs" @remove="notifications?.log('remove me')">I'm a xs tag</x-tag>
    <x-tag removable size="sm" @remove="notifications?.log('remove me')">I'm a sm tag</x-tag>
    <x-tag removable disabled @remove="notifications?.log('remove me')">I'm a md tag</x-tag>
    <x-tag removable size="lg" @remove="notifications?.log('remove me')">I'm a lg tag</x-tag>
    <x-tag removable size="xl" @remove="notifications?.log('remove me')">I'm a xl tag</x-tag>

    <div class="flex flex-col max-w-xs gap-y-1">
      <div>
        <x-tag outlined>
          I'm a veeeeeeeeeeeeeeeeeeeeeeeery long tag
        </x-tag>
      </div>

      <div>
        <x-tag outlined>
          <template #prefix>
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
          </template>
          I'm a veeeeeeeeeeeeeeeeeeeeery long tag
        </x-tag>
      </div>

      <div>
        <x-tag removable outlined>
          <template #prefix>
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
          </template>
          I'm a veeeeeeeeeeeeeeeeeeery long tag
        </x-tag>
      </div>
    </div>
  </div>
</template>
