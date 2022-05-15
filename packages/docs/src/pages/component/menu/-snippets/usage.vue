<template>
  <div class="p-2 rounded-none">
    <x-menu :items="items2" rounded filled />
  </div>

  <div class="p-2 mt-4 rounded-lg">
    <x-menu :items="items" rounded filled />
  </div>
</template>

<script setup>
const items2 = [{
  label: 'Open',
  active: false,
  value: 'a',
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
const items = [{
  //to: 'menu',
  label: 'Expand me for life',
  value: '',
  icon: 'smile',
  //iconRight: 'heart',
  //color: 'pink',
  exact: true,
  onClick: () => {
    // console.log('derpinator')
  },
  'active-class': '',
  'exact-active-class': '',
},{
  to: 'menu',
  label: 'a',
  value: '',
  icon: 'smile',
  //iconRight: 'heart',
  //color: 'pink',
  exact: true,
  onClick: () => {
    // console.log('derpinator')
  },
  'active-class': '',
  'exact-active-class': '',
},{
  // to: 'menu',
  label: 'b',
  value: '',
  icon: 'smile',
  //iconRight: 'heart',
  //color: 'pink',
  exact: true,
  onClick: () => {
    // console.log('derpinator')
  },
  items: [{
    label: 'derp',
  }],
  'active-class': '',
  'exact-active-class': '',
}, {
  divider: true,
}, {
  // to: ''
  label: 'Payments',
  loading: false,
  // icon: 'smile',
  collapsible: false,

  //color: 'purple',
  //iconRight: 'heart',
  items: [{
    // to: '',
    label: 'Stripe',
    value: '',
    icon: 'smile',
    // color: 'blue',

    //iconRight: 'heart',

    //collapseIcon: 'heart',

  }, {
    //to: 'menu',
    label: 'Atlas',
    value: '',
    // color: 'blue',
    items: [{
      to: 'menu',
      label: 'Atlas 2',
      // color: 'blue',
      value: '',
    }, {
      label: 'Atlas 2223',
      // color: 'blue',
      value: '',
    }],
  }],
}, {
  // to: '',
  label: 'last one',
  value: '',
  icon: 'smile',
  //iconRight: 'heart',
  exact: '',
  onClick: () => {

  },
  disabled: false,
  'active-class': '',
  'exact-active-class': '',
}]
</script>
