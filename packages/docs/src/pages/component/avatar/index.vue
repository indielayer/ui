<template>
  <document-page components="Avatar" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage" expanded>
      <usage-snippet />
    </code-preview>

    <!-- squared  -->
    <h2 id="squared"><a href="#squared">#</a>Squared</h2>
    <code-preview :code="snippets.squared">
      <squared-snippet />
    </code-preview>

  </document-page>
</template>

<script>
import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'
import SquaredSnippetCode from './-snippets/squared.vue?raw'
import SquaredSnippet from './-snippets/squared.vue'

export default {
  components: {
    UsageSnippet,
    SquaredSnippet,
  },
  data() {
    return {
      title: 'Avatar',
      description: 'Not related to the movie',
      snippets: {
        usage: UsageSnippetCode,
        squared: SquaredSnippetCode,
      },
    }
  },
}
</script>
