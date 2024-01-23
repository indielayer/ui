<script setup>
import { ref } from 'vue'
const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
</script>

<template>
  <x-modal v-model="show" show-close backdrop>
    <template #image>
      <x-image src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" alt=""/>
    </template>
    <template #header>
      Modal Header
    </template>

    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.
    </div>

    <template #actions>
      <div class="text-right space-x-4">
        <x-button>Cancel</x-button>
        <x-button color="success">Confirm</x-button>
      </div>
    </template>
  </x-modal>

  <x-modal v-model="show1" backdrop>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.
  </x-modal>

  <x-modal v-model="show2" backdrop>
    <template #header>
      Modal Header
    </template>

    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.

    <template #actions>
      <div class="text-right space-x-4">
        <x-button>Cancel</x-button>
        <x-button color="success">Confirm</x-button>
      </div>
    </template>
  </x-modal>

  <x-modal v-model="show3" show-close>
    <template #header>
      Modal Title
    </template>

    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.
  </x-modal>

  <x-button class="mr-2" @click="show = true">complete</x-button>
  <x-button class="mr-2" @click="show1 = true">content only</x-button>
  <x-button class="mr-2" @click="show2 = true">title & content</x-button>
  <x-button class="mr-2" @click="show3 = true">header & content</x-button>
</template>
