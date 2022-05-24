<template>
  <x-tooltip>
    <x-button>Hover me to see tooltip</x-button>
    <template #tooltip>
      Cool <span class="text-gray-300">Tooltip</span>
    </template>
  </x-tooltip>

  <x-tooltip>
    <x-button>Hover me to see tooltip</x-button>
    <template #tooltip>
      <div class="font-bold">Tooltip title</div>
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus corrupti maiores aut minima iusto nulla inventore ea illo commodi et.</div>
    </template>
  </x-tooltip>
</template>
