<template>
  <div class="grid grid-cols-3 gap-4">
    <x-progress :percentage="10" color="amber"/>
    <x-progress :percentage="50" color="primary"/>
    <x-progress :percentage="100" color="success"/>
  </div>
</template>
