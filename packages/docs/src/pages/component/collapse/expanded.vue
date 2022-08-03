<template>
  <x-collapse expanded show-icon>
    <template #default="{ collapsed }">
      <div class="p-2 border dark:border-gray-600">This is collapsed: {{ collapsed }} (click me to {{ collapsed ? 'expand' : 'collapse' }})</div>
    </template>
    <template #content>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veritatis unde natus esse minima, quibusdam nesciunt atque id assumenda inventore numquam vel consectetur est illum ratione perferendis optio architecto sapiente fuga et commodi harum ea? Error doloribus illum tempora obcaecati quam voluptatum cumque magnam nemo, perspiciatis quas mollitia. Aliquid nulla corrupti sit mollitia dolor sequi nobis eveniet cumque cupiditate perspiciatis magnam laudantium in ducimus fuga quaerat, ipsam assumenda consequatur obcaecati atque? Sint asperiores labore quidem minima modi odio autem rerum eligendi, quisquam incidunt quae enim eos vitae dolores praesentium debitis, consequatur fuga hic nostrum, dolorem dicta quod ea assumenda. Expedita.
    </template>
  </x-collapse>
</template>
