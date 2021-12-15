<template>
  <div>
    <section class="p-8 max-w-4xl xl:max-w-7xl mx-auto py-14">
      <div class="w-full flex document-page">
        <div class="min-w-0 flex-auto">
          <div class="text-4xl font-semibold">{{ title }}</div>
          <div class="text-lg my-2 text-gray-500">{{ description }}</div>
          <div class="mt-4">
            <slot></slot>

            <div v-if="componentsProperties">
              <h2 id="properties"><a href="#properties">#</a>Properties</h2>

              <section
                v-for="(component, componentName) in componentsProperties"
                :key="componentName"
              >
                <h3 class="mt-12 dark:text-gray-300 text-gray-800 text-2xl border-b-4 dark:border-gray-600 pb-2">
                  {{ componentName }}
                </h3>
                <div
                  v-for="(properties, propertyName) in component"
                  :key="propertyName"
                >
                  <div>
                    <h4 class="mt-6 mb-2 text-gray-800 dark:text-gray-300 text-xl">
                      {{ propertyName }}
                    </h4>

                    <div class="text-sm font-light">
                      <x-table
                        :headers="propertyName === 'props' ? headers : headersSimple"
                        :items="properties"
                      >
                        <template #item-name="{ item }">
                          <div class="text-primary-500">{{ item.name }}</div>
                        </template>
                        <template #item-type="{ item }">
                          <div v-for="type in item.type" :key="type">{{ type }}</div>
                        </template>
                        <template #item-required="{ item }">
                          <div>{{ item.required ? 'true' : '' }}</div>
                        </template>
                        <template #item-validator="{ item }">
                          <div v-for="validator in item.validator" :key="validator">{{ validator }}</div>
                        </template>
                      </x-table>
                    </div>
                  </div>
                </div>

              </section>
            </div>
          </div>
        </div>

        <div v-if="anchors.length > 0" class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
          <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-0">
            <div class="mb-8">
              <h5 class="text-gray-900 dark:text-gray-100 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">On this page</h5>
              <ul class="overflow-x-hidden text-gray-500 dark:text-gray-400 font-medium">
                <li v-for="(anchor, index) in anchors" :key="index">
                  <a
                    :href="`#${anchor.id}`"
                    class="block transform transition-colors duration-200 py-2 hover:text-gray-900"
                    :class="{
                      'text-gray-900 dark:text-gray-200': anchor.id === currentAnchor,
                    }"
                  >
                    {{ anchor.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'

export default {
  props: {
    components: {
      default: null,
      type: [Array, String],
    },
    headings: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      anchors: [],
      anchorObserver: null,
      currentAnchor: null,

      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Required', value: 'required' },
        { text: 'Values', value: 'validator' },
        { text: 'Default', value: 'default' },
      ],

      headersSimple: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
      ],
    }
  },
  head() {
    const { title, description } = this

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title + ' - Indielayer UI' },
        { hid: 'twitter:title', name: 'twitter:title', content: title + ' - Indielayer UI' },
      ],
    }
  },
  computed: {
    componentsProperties() {
      if (!this.components) return null
      const components = Array.isArray(this.components) ? this.components : [this.components]
      const properties = {}
      const instance = getCurrentInstance()

      components.forEach((component) => {
        const componentOptions = instance.appContext.components[`X${component}`]
        let allValidators = {}
        let allProps = {}

        if (componentOptions.mixins) componentOptions.mixins.forEach((m) => {
          allValidators = {
            ...allValidators,
            ...m.validator,
          }
          allProps = {
            ...allProps,
            ...m.props,
          }
        })

        allValidators = {
          ...allValidators,
          ...componentOptions.validator,
        }

        allProps = {
          ...allProps,
          ...componentOptions.props,
        }

        if (Object.keys(allProps).length > 0) {
          const mappedProps = Object.keys(allProps).map((key) => ({
            default: allProps[key].default,
            name: key,
            required: allProps[key].required,
            type: Array.isArray(allProps[key].type) ? allProps[key].type.map((type) => type.name) : [allProps[key].type.name],
            validator: allValidators[key],
          }))

          properties[component] = { props: mappedProps, ...properties[component] }
        }

        ['events', 'methods', 'slots', 'emits'].forEach((property) => {
          if (componentOptions[property]) properties[component][property] = Object.keys(componentOptions[property]).map((k) => ({ name: k }))
        })

        // vue 3 events
        if (componentOptions['emits']) properties[component]['emits'] = componentOptions['emits'].map((k) => ({ name: k }))
      })

      return properties
    },
  },
  mounted() {
    this.setAnchorObserver()
    this.setAnchors()
  },
  beforeUnmount() {
    this.anchorObserver.disconnect()
  },
  methods: {
    setAnchors() {
      document.querySelectorAll('h2').forEach((element) => {
        this.anchors.push({
          id: element.id,
          name: element?.textContent?.trim().replace('#', '') || '',
        })
        this.anchorObserver.observe(element)
      })
    },
    setAnchorObserver() {
      this.anchorObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.currentAnchor = entry.target.id
        })
      }, {
        root: null,
        threshold: 1,
      })
    },
  },
}
</script>

<style lang="postcss">
.document-page {
  h1, h2, h3 {
    position: relative;
  }

  h2 {
    @apply text-3xl font-semibold mb-4 mt-10;
  }

  h1 a, h2 a, h3 a {
    position: absolute;
    left: -24px;
    width: 30px;
    display: none;
    color: #96a1b3 !important;
  }

  h1:hover a, h2:hover a, h3:hover a {
    display: block;
  }
}
</style>
