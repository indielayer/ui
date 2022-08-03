<script setup>
const menu1 = [{
  label: 'Open',
  active: false,
  value: 'a',
  disabled: true,
}, {
  label: 'Close',
  active: false,
  value: 'b',
}, {
  divider: true,
}, {
  label: 'Sign out',
  active: false,
  value: 'c',
}]
const menu2 = [{
  label: 'Menu item 1',
  value: '',
  exact: true,
},{
  to: 'menu',
  label: 'Menu item 2',
  value: '',
  icon: 'smile',
  exact: true,
},{
  label: 'Menu item 3',
  value: '',
  exact: true,
  items: [{
    label: 'derp',
  }],
}, {
  divider: true,
}, {
  label: 'Sub-menu (non-collapsible)',
  loading: false,
  collapsible: false,
  items: [{
    label: 'Option',
    value: '',
    icon: 'smile',
  }, {
    label: 'Links (sub-menu collapsible)',
    value: '',
    items: [{
      to: 'menu',
      label: 'Link to \'menu\'',
      value: '',
    }],
  }],
}, {
  label: 'Last menu item',
  value: '',
  icon: 'heart',
  exact: '',
  onClick: () => {},
  disabled: false,
}]
</script>

<template>
  <x-menu :items="menu1" />
  <x-divider class="my-8"/>
  <x-menu :items="menu2" />
</template>
