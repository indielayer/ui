<template>
  <div class="pt-1">
    <x-tab-group v-model="selected" class="mb-2">
      <x-tab v-for="(snippet, index) in snippets" :key="index" :value="index" :label="snippet.label"/>
    </x-tab-group>
    <div v-for="(snippet, index) in snippets" :key="index">
      <code-snippet v-if="selected === index" class="!pl-0" :code="snippet.code" :lang="snippet.lang" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    snippets: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      selected: 0,
    }
  },
}
</script>
