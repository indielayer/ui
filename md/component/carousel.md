# Carousel
A sliding viewport for cycling through images or content panels. Use carousels for galleries and featured items when horizontal space is limited.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| autoplay | Boolean |  | Advances slides automatically. |
| classDots | [Array, String] |  | Extra class(es) on the default dots container. |
| delay | Number | 5000 | Autoplay interval in milliseconds. |
| effect | String CarouselEffect | slide | Transition effect between slides. |
| showDots | Boolean | true | Shows pagination dots under the slides. |

### Slots
- `default`: Slides (typically x-carousel-slide). Slot props: to, next, prev, current, total.
- `dots`: Custom pagination dots. Slot props: to, next, prev, current, total.

### Events
- `update`: Emitted when the current slide index changes.

### Methods
- `next`: Go to the next slide (wraps to the first).
- `prev`: Go to the previous slide (wraps to the last).
- `to`: Go to a slide by zero-based index.

### Demos
#### Usage
```vue
<template>
  <x-carousel class="!h-80 rounded-md" class-dots="!justify-start pl-10">
    <x-carousel-slide>
      <img src="../../../assets/images/photo2.jpeg" alt="" />
    </x-carousel-slide>
    <x-carousel-slide>
      <img src="../../../assets/images/photo1.jpeg" alt="" />
    </x-carousel-slide>
  </x-carousel>
</template>
```

HTML docs: https://indielayer.com/component/carousel
