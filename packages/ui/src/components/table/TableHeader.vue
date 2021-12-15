<template>
  <th
    class="py-2 bg-gray-50 dark:bg-gray-800 font-medium tracking-wide uppercase text-xs pr-1 last:pr-0"
    :class="[
      {
        //sort
        'cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-150 ease-in-out': sortable,
        //stickyHeader
        'sticky top-0': stickyHeader,
        // textAlign
        'text-left': textAlign === 'left',
        'text-center': textAlign === 'center',
        'text-right': textAlign === 'right',
        'text-justify': textAlign === 'justify',
      },
    ]"
  >
    <div
      v-if="sortable"
      class="flex items-center"
    >
      <slot></slot>

      <svg
        v-if="[1, -1].includes(sort)"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        role="presentation"
        class="inline-block stroke-2 w-3 h-3 ml-0.5"
      >
        <template v-if="sort === -1">
          <line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
          />
          <polyline points="19 12 12 19 5 12" />
        </template>

        <template v-if="sort === 1">
          <line
            x1="12"
            y1="19"
            x2="12"
            y2="5"
          />
          <polyline points="5 12 12 5 19 12" />
        </template>
      </svg>
    </div>

    <template v-else>
      <slot></slot>
    </template>
  </th>
</template>

<script>
const validator = {
  sort: [
    null,
    1,
    -1,
  ],
  textAlign: [
    null,
    'left',
    'center',
    'right',
    'justify',
  ],
}

export default {
  name: 'XTableHeader',

  validator,

  props: {
    sort: {
      type: [Number, Boolean],
      default: null,
      validator: (value) => validator.sort.includes(value),
    },

    sortable: {
      type: Boolean,
      default: false,
    },

    textAlign: {
      type: String,
      default: 'left',
      validator: (value) => validator.textAlign.includes(value),
    },

    stickyHeader: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
