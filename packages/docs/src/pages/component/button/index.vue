<template>
  <document-page components="Button" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage">
      <usage-snippet />
    </code-preview>

    <h2 id="variants"><a href="#variants">#</a>Variants</h2>
    <code-preview :code="snippets.variants">
      <variants-snippet />
    </code-preview>

    <h2 id="states"><a href="#states">#</a>States</h2>
    <code-preview :code="snippets.states">
      <states-snippet />
    </code-preview>

    <h2 id="icons"><a href="#icons">#</a>Icons</h2>
    <code-preview :code="snippets.icons">
      <icons-snippet />
    </code-preview>
  </document-page>
</template>

<script>
// const files = import.meta.globEager('./-snippets/*.vue')
// const components = {}
// const snippets = Object.keys(files).map((path) => {
//   const name = path.match(/\.\/-snippets\/(.*)\.vue$/)[1].toLowerCase()
//   const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)

//   const component = files[path].default
//   const componentName = nameCapitalized + 'Snippet'

//   components[componentName] = component

//   return {
//     name,
//     nameCapitalized,
//     component,
//     componentName,
//   }
// })

import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'
import StatesSnippetCode from './-snippets/states.vue?raw'
import StatesSnippet from './-snippets/states.vue'
import IconsSnippetCode from './-snippets/icons.vue?raw'
import IconsSnippet from './-snippets/icons.vue'
import VariantsSnippetCode from './-snippets/variants.vue?raw'
import VariantsSnippet from './-snippets/variants.vue'

export default {
  components: {
    UsageSnippet,
    StatesSnippet,
    IconsSnippet,
    VariantsSnippet,
  },
  data() {
    return {
      title: 'Button',
      description: 'Button',
      snippets: {
        usage: UsageSnippetCode,
        states: StatesSnippetCode,
        icons: IconsSnippetCode,
        variants: VariantsSnippetCode,
      },
    }
  },
}
</script>
