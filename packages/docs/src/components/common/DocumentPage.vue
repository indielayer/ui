<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  components: {
    type: [Array, String],
    default: () => [],
  },
  headings: {
    type: Array,
    default: () => [],
  },
  title: String,
  description: String,
  back: String,
  github: String,
  next: String,
  demos: {
    type: Array,
    default: () => [],
  },
})

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Type', value: 'type' },
  { text: 'Default', value: 'default' },
  { text: 'Values', value: 'validator' },
  { text: 'Required', value: 'required' },
]

const headersSimple = [
  { text: 'Name', value: 'name' },
  { text: 'Description', value: 'description' },
]

const componentsProperties = computed(() => {
  if (!props.components) return null
  const components = Array.isArray(props.components) ? props.components : [props.components]
  const properties = {}

  components.forEach((comp: any) => {
    const componentName = comp.name.slice(1)
    let allValidators = {}
    let allProps = {}

    if (comp.mixins) comp.mixins.forEach((m) => {
      allValidators = {
        ...allValidators,
        ...m.validators,
      }
      allProps = {
        ...allProps,
        ...m.props,
      }
    })

    allValidators = {
      ...allValidators,
      ...comp.validators,
    }

    allProps = {
      ...allProps,
      ...comp.props,
    }

    if (Object.keys(allProps).length > 0) {
      const mappedProps = Object.keys(allProps).map((key) => {
        const propFrom = allProps[key].type ?? allProps[key]
        let propDefault = allProps[key].default
        let propType = []

        if (Array.isArray(propFrom)) {
          propType = propFrom.map((type) => type.name)
        } else {
          propType = [propFrom.name]
          if (propFrom.name === 'Boolean' && !propDefault) propDefault = false
        }

        return {
          name: key,
          default: propDefault,
          required: allProps[key].required,
          validator: allValidators[key],
          type: propType,
        }
      })

      properties[componentName] = { props: mappedProps, ...properties[componentName] }
    }

    ['methods', 'slots'].forEach((property) => {
      if (comp[property]) properties[componentName][property] = Object.keys(comp[property]).map((k) => ({ name: k }))
    })

    // vue 3 events
    if (comp['emits']) properties[componentName]['emits'] = comp['emits'].map((k) => ({ name: k }))
    if (comp['expose']) properties[componentName]['methods'] = comp['expose'].map((k) => ({ name: k }))
  })

  return properties
})

const anchors = ref([])
const currentAnchor = ref(null)
const anchorObserver = ref(null)

onMounted(() => {
  // setAnchorObserver()
  // setAnchors()
})

onUnmounted(() => {
  // anchorObserver.value.disconnect()
})

// function setAnchors() {
//   document.querySelectorAll('h2').forEach((element) => {
//     anchors.value.push({
//       id: element.id,
//       name: element?.textContent?.trim().replace('#', '') || '',
//     })
//     anchorObserver.value.observe(element)
//   })
// }
// function setAnchorObserver() {
//   anchorObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) currentAnchor.value = entry.target.id
//     })
//   }, {
//     root: null,
//     threshold: 1,
//   })
// }
</script>

<template>
  <div>
    <section class="p-4 lg:p-8 max-w-4xl xl:max-w-7xl mx-auto">
      <div class="w-full flex document-page">
        <div class="min-w-0 flex-auto">
          <div class="text-4xl font-semibold">
            {{ title }}
            <x-tooltip>
              <x-link :href="`${github}/index.vue`" target="blank" color="#94a3b8">
                <x-icon icon="edit" size="sm" />
              </x-link>
              <template #tooltip>
                Edit on <span class="text-gray-300">GitHub</span>
              </template>
            </x-tooltip>
          </div>
          <div class="text-lg my-2 text-gray-500">{{ description }}</div>
          <div class="mt-4">
            <slot></slot>

            <div v-for="demo in demos" :key="demo.name">
              <code-preview
                :title="demo.name"
                :description="demo.description"
                :code="demo.code"
                :github="github"
              >
                <component :is="demo.component" />
              </code-preview>
            </div>

            <div v-if="componentsProperties">
              <h2 id="api" class="!text-2xl !mt-20"><a class="anchor" href="#api">#</a>API</h2>

              <section
                v-for="(component, componentName) in componentsProperties"
                :key="componentName"
              >
                <h3 class="mt-10 dark:text-gray-300 text-gray-800 text-2xl border-b-2 dark:border-gray-600 pb-2">
                  {{ componentName }}
                </h3>
                <div
                  v-for="(properties, propertyName) in component"
                  :key="propertyName"
                >
                  <div>
                    <h4 class="mt-6 mb-2 text-gray-800 dark:text-gray-300 text-xl capitalize">
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
                          <div v-for="t in item.type" :key="t">{{ t }}</div>
                        </template>
                        <template #item-required="{ item }">
                          <div>{{ item.required ? 'true' : '' }}</div>
                        </template>
                        <template #item-validator="{ item }">
                          <div class="space-x-2">
                            <span v-for="validator in item.validator" :key="validator">{{ validator }}</span>
                          </div>
                        </template>
                      </x-table>
                    </div>
                  </div>
                </div>

              </section>
            </div>
          </div>

          <div class="flex my-10">
            <x-button
              v-if="back"
              :to="back"
              outlined
              class="capitalize"
              icon="arrow-left"
            >{{ back }}</x-button>
            <x-spacer/>
            <x-button
              v-if="next"
              :to="next"
              outlined
              class="capitalize"
              icon-right="arrow-right"
            >{{ next }}</x-button>
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

<style lang="postcss">
.document-page {
  h1, h2, h3 {
    position: relative;
  }

  h2 {
    @apply text-xl font-semibold mb-4 mt-8;
  }

  h1 .anchor, h2 .anchor, h3 .anchor {
    position: absolute;
    left: -24px;
    width: 30px;
    display: none;
    color: #96a1b3 !important;
  }

  h1:hover .anchor, h2:hover .anchor, h3:hover .anchor {
    display: block;
  }
}
</style>
