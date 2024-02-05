<template>
  <x-tooltip>
    <x-button>Hover me to see the tooltip</x-button>
    <template #tooltip>
      <div class="font-bold">Tooltip title</div>
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus corrupti maiores aut minima iusto nulla inventore ea illo commodi et.</div>
    </template>
  </x-tooltip>

  <!-- tooltip with the info icon -->
  <x-toggle-tip content="Lets go"/>
</template>
