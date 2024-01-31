<template>
  <div class="space-y-8">
    <x-accordion>
      <x-accordion-item>
        Hey
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veritatis unde natus esse minima, quibusdam nesciunt atque id assumenda inventore numquam vel consectetur est illum ratione perferendis optio architecto sapiente fuga et commodi harum ea? Error doloribus illum tempora obcaecati quam voluptatum cumque magnam nemo, perspiciatis quas mollitia. Aliquid nulla corrupti sit mollitia dolor sequi nobis eveniet cumque cupiditate perspiciatis magnam laudantium in ducimus fuga quaerat, ipsam assumenda consequatur obcaecati atque? Sint asperiores labore quidem minima modi odio autem rerum eligendi, quisquam incidunt quae enim eos vitae dolores praesentium debitis, consequatur fuga hic nostrum, dolorem dicta quod ea assumenda. Expedita.
        </template>
      </x-accordion-item>

      <x-accordion-item expanded>
        <template #default="{ collapsed }">
          This is collapsed: {{ collapsed }} (click me to {{ collapsed ? 'expand' : 'collapse' }})
        </template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti veritatis unde natus esse minima, quibusdam nesciunt atque id assumenda inventore numquam vel consectetur est illum ratione perferendis optio architecto sapiente fuga et commodi harum ea? Error doloribus illum tempora obcaecati quam voluptatum cumque magnam nemo, perspiciatis quas mollitia. Aliquid nulla corrupti sit mollitia dolor sequi nobis eveniet cumque cupiditate perspiciatis magnam laudantium in ducimus fuga quaerat, ipsam assumenda consequatur obcaecati atque? Sint asperiores labore quidem minima modi odio autem rerum eligendi, quisquam incidunt quae enim eos vitae dolores praesentium debitis, consequatur fuga hic nostrum, dolorem dicta quod ea assumenda. Expedita.
        </template>
      </x-accordion-item>
    </x-accordion>

    <x-accordion icon-align="left">
      <x-accordion-item>
        Left side icon
        <template #content>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est, rem.
        </template>
      </x-accordion-item>
    </x-accordion>
  </div>
</template>
