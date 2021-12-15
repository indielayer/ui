<template>
  <x-table
    v-model:sort="sort"
    :headers="headers"
    :items="itemsSorted"
    @click-row="$toast.log('open')"
  >
    <template #item-published="{ item }">
      {{ formatDate(item.published) }}
    </template>
  </x-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Published', value: 'published', sortable: true },
      ],
      items: [{
        title: 'Book of Magic',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, velit.',
        published: Date.now() - 1000,
      }, {
        title: 'Another book',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, velit.',
        published: Date.now() - 5000,
      }],
      sort: [],
    }
  },

  computed: {
    itemsSorted() {
      const items = this.items.slice(0)

      return items.sort((a, b) => {
        for (const sort of this.sort) {
          const [key, asc] = sort.split(',')

          if (a[key] > b[key]) return asc === '-1' ? -1 : 1
          if (a[key] < b[key]) return asc === '-1' ? 1 : -1
        }

        return 0
      })
    },
  },

  methods: {
    formatDate(val) {
      return (new Date(val)).toISOString()
    },
  },
}
</script>
