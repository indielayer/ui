<template>
  <div class="mt-10 flex">
    <div class="mt-1">
    <slot name="icon"></slot>
    </div>
    <div class="flex-1 ml-4">
      <h3 class="text-xl font-semibold">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

