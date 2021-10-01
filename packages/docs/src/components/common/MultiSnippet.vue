<template>
  <div class="hljs pl-4 pt-4 dark">
    <x-tabs>
      <x-tab v-for="(snippet, index) in snippets" :key="index" :selected="selected === index" @click="selected = index">
        {{ snippet.title }}
      </x-tab>
    </x-tabs>
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
