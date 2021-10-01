<template>
  <div v-if="show" class="w-full fixed bottom-0 left-0 mt-8 z-40 bg-white dark:bg-gray-800">
    <div role="dialog" class="flex justify-center items-center border-t dark:border-gray-700 flex-col pt-2 px-2 md:pt-0 md:px-0 md:flex-row text-center">
      <p>
        We use Cookies for user analysis and on-page improvements!
        <a href="https://www.cookiesandyou.com/" class="underline" target="_blank">
          Learn about cookies
        </a>
      </p>
      <x-button color="gray" class="m-2" @click="gotit">
        Got it
      </x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cookies',
  data() {
    return {
      show: false,
    }
  },
  created() {
    try {
      if (!localStorage.getItem('cookie-gotit')) this.show = true
    } catch (e) {
      this.show = true
    }
  },
  methods: {
    gotit() {
      try {
        localStorage.setItem('cookie-gotit', true)
      } catch (e) { console.log(e) }

      this.show = false
    },
  },
}
</script>
