<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'

const notifications = useNotifications()
</script>

<template>
  <div class="space-x-2">
    <x-tag color="primary">Hello</x-tag>
    <x-tag color="amber">Amber</x-tag>
    <x-tag outlined>I'm a tag</x-tag>
    <x-tag rounded outlined color="pink">I'm a tag</x-tag>
    <x-tag color="pink">I'm a tag</x-tag>
    <x-tag removable size="xs" @remove="notifications?.log('remove me')">I'm a xs tag</x-tag>
    <x-tag removable size="sm" @remove="notifications?.log('remove me')">I'm a sm tag</x-tag>
    <x-tag removable disabled @remove="notifications?.log('remove me')">I'm a md tag</x-tag>
    <x-tag removable size="lg" @remove="notifications?.log('remove me')">I'm a lg tag</x-tag>
    <x-tag removable size="xl" @remove="notifications?.log('remove me')">I'm a xl tag</x-tag>
  </div>
</template>
