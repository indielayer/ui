<template>
  <component :is="tag" class="w-full">
    <div
      v-if="variant === 'bar'"
      class="rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden"
    >
      <div
        class="h-2 rounded-lg transition-all duration-200"
        :class="[`bg-${color}-500`]"
        :style="{
          width: `${percentage}%`,
        }"
      ></div>
    </div>

    <svg
      v-if="variant === 'circle'"
      class="transform -rotate-90"
      viewBox="0 0 100 100"
    >
      <circle
        class="text-gray-200 dark:text-gray-700"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="4"
        fill="none"
        cx="50"
        cy="50"
        r="40"
      />
      <circle
        class="transition-all duration-200"
        :class="[`text-${color}-500`]"
        :style="{ strokeDasharray: `${circleProgress} 252` }"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="4"
        fill="none"
        cx="50"
        cy="50"
        r="40"
      />
    </svg>

    <div
      v-if="variant === 'score'"
      class="space-x-1 inline-block"
    >
      <div
        v-for="index in scoreLength"
        :key="index"
        class="rounded-sm h-2 w-3 inline-block"
        :class="isScoreActive(index) ? [`bg-${color}-500`]: ['bg-gray-200 dark:bg-gray-700']"
      ></div>
    </div>
  </component>
</template>

<script>
const validator = {
  variant: [
    'bar',
    'circle',
    'score',
  ],
}

export default {
  name: 'XProgress',

  validator,

  props: {
    color: {
      type: String,
      default: 'primary',
    },

    percentage: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0 && val <= 100,
    },

    scoreLength: {
      type: Number,
      default: 3,
    },

    tag: {
      type: String,
      default: 'div',
    },

    variant: {
      type: String,
      default: 'bar',
      validator: (value) => validator.variant.includes(value),
    },
  },

  computed: {
    circleProgress() {
      const progressLimit = 251

      return (progressLimit / 100) * this.percentage
    },
  },

  methods: {
    isScoreActive(item) {
      if (this.percentage > (item - 1) * (100 / this.scoreLength)) return true

      return false
    },
  },
}
</script>
