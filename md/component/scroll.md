# Scroll
Scroll container with optional edge shadows that hint at more content. Use Scroll for overflow lists and panels that scroll vertically or horizontally.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| horizontal | Boolean |  | Scrolls horizontally instead of vertically. |
| mousewheel | Boolean |  | Maps vertical mouse wheel to horizontal scroll when `horizontal` is set. |
| scrollbar | Boolean | true | Shows the native scrollbar. Set false to hide it. |
| shadow | Boolean |  | Shows edge shadows when more content can be scrolled. |

### Slots
- `default`: Scrollable content.

### Events
- _(none)_

### Methods
- `scrollEl`: Ref to the inner scrollable element.

### Demos
#### Usage
```vue
<template>
  <x-scroll class="h-20">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quod fuga deleniti eaque sit nemo, labore, quisquam est esse quidem corrupti quia illo totam. Dicta laborum hic cupiditate distinctio quas totam sed sunt sint mollitia nostrum, provident quasi quam, suscipit atque rem ut saepe quae! In ipsum, minus non deleniti quasi temporibus qui autem voluptates! Architecto iusto unde placeat mollitia doloremque amet vel necessitatibus sapiente ipsa tenetur temporibus quidem perferendis sunt, quibusdam porro minima error impedit! Voluptatum ratione porro praesentium est veniam commodi, veritatis nemo voluptates atque iste, neque illum nesciunt aspernatur reprehenderit. Deleniti, aspernatur iusto accusamus nulla quos magni.
  </x-scroll>
</template>
```

#### Horizontal
```vue
<template>
  <x-scroll horizontal>
    <div class="w-screen">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quod fuga deleniti eaque sit nemo, labore, quisquam est esse quidem corrupti quia illo totam. Dicta laborum hic cupiditate distinctio quas totam sed sunt sint mollitia nostrum, provident quasi quam, suscipit atque rem ut saepe quae! In ipsum, minus non deleniti quasi temporibus qui autem voluptates! Architecto iusto unde placeat mollitia doloremque amet vel necessitatibus sapiente ipsa tenetur temporibus quidem perferendis sunt, quibusdam porro minima error impedit! Voluptatum ratione porro praesentium est veniam commodi, veritatis nemo voluptates atque iste, neque illum nesciunt aspernatur reprehenderit. Deleniti, aspernatur iusto accusamus nulla quos magni.
    </div>
  </x-scroll>

  <div class="text-lg mt-10">Horizontal scroll with Mousewheel</div>
  <x-scroll horizontal mousewheel>
    <div class="w-screen">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, quod fuga deleniti eaque sit nemo, labore, quisquam est esse quidem corrupti quia illo totam. Dicta laborum hic cupiditate distinctio quas totam sed sunt sint mollitia nostrum, provident quasi quam, suscipit atque rem ut saepe quae! In ipsum, minus non deleniti quasi temporibus qui autem voluptates! Architecto iusto unde placeat mollitia doloremque amet vel necessitatibus sapiente ipsa tenetur temporibus quidem perferendis sunt, quibusdam porro minima error impedit! Voluptatum ratione porro praesentium est veniam commodi, veritatis nemo voluptates atque iste, neque illum nesciunt aspernatur reprehenderit. Deleniti, aspernatur iusto accusamus nulla quos magni.
    </div>
  </x-scroll>
</template>
```

HTML docs: https://indielayer.com/component/scroll
