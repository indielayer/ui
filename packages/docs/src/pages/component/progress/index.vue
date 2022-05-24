<template>
  <document-page components="Progress" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage">
      <usage-snippet />
    </code-preview>

    <h2 id="variants"><a href="#variants">#</a>Variants</h2>
    <code-preview :code="snippets.variants">
      <variants-snippet />
    </code-preview>
  </document-page>
</template>

<script>
import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'
import VariantsSnippetCode from './-snippets/variants.vue?raw'
import VariantsSnippet from './-snippets/variants.vue'

export default {
  components: {
    UsageSnippet,
    VariantsSnippet,
  },
  data() {
    return {
      title: 'Progress',
      description: 'Progress',
      snippets: {
        usage: UsageSnippetCode,
        variants: VariantsSnippetCode,
      },
    }
  },
}
</script>
