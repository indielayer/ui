<template>
  <div class="grid grid-cols-3 gap-4">
    <x-progress
      :percentage="percentage"
      gradient

      color="sky"
    />
    <x-progress :percentage="percentage" color="rose" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0,
    }
  },
  mounted() {
    const interval = setInterval(() => {
      this.percentage += 1
      if (this.percentage >= 100) clearTimeout(interval)
    }, 100)
  },
}
</script>
