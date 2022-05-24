<template>
  <x-breadcrumbs :items="items2" color="primary" />
</template>

<script>
export default {
  setup() {
    return {
      items: [{
        to: '#',
        label: 'Home',
      }],
      items2: [{
        to: '#',
        icon: 'smile',
        label: 'Breadcrumb item 1',
      }, {
        to: '#',
        label: 'Breadcrumb item 2',
        color: 'purple',
        shadow: true,
      }, {
        to: '#',
        icon: 'twitter',
        label: 'Breadcrumb item 3',
        color: 'yellow',
      }, {
        to: '#',
        label: 'Breadcrumb item selected',
      }],
    }
  },
}
</script>
