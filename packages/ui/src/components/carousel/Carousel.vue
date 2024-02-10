<script lang="ts">
const carouselEffects = ['slide'] as const

export type CarouselEffect = typeof carouselEffects[number]

const carouselProps = {
  autoplay: Boolean,
  delay: {
    type: Number,
    default: 5000,
  },
  showDots: {
    type: Boolean,
    default: true,
  },
  effect: {
    type: String as PropType<CarouselEffect>,
    default: 'slide',
  },
  classDots: [Array, String],
}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

type InternalClasses = 'wrapper' | 'slides' | 'dots' | 'dot' | 'dotActive'
type InternalData = {
  current: number;
  total: number;
}
export interface CarouselTheme extends ThemeComponent<CarouselProps, InternalClasses, InternalData> {}

export default {
  name: 'XCarousel',
  validators: {},
}
</script>

<script setup lang="ts">
import { ref, type ExtractPublicPropTypes, type PropType, computed, watch, onMounted } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(carouselProps)

const slidesRef = ref<HTMLElement | null>(null)

const current = ref(0)
const total = computed(() => slidesRef.value?.children.length || 0)

let autoplayInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  moveSlides()
  startAutoPlay()
})

function startAutoPlay() {
  if (!props.autoplay) return

  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
  autoplayInterval = setInterval(() => {
    next()
  }, props.delay)
}

watch(current, () => {
  moveSlides()
  emit('update', current.value)
})

function moveSlides() {
  if (slidesRef.value) {
    const slides = slidesRef.value.children

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement

      slide.style.transform = `translateX(${(i - current.value) * 100}%)`
    }
  }
}

function to(index: number): void {
  current.value = index
  if (autoplayInterval) clearInterval(autoplayInterval)
}

function next(): void {
  if (current.value < total.value - 1) {
    current.value += 1
  } else {
    current.value = 0
  }
}

function prev(): void {
  if (current.value > 0) {
    current.value -= 1
  } else {
    current.value = total.value - 1
  }
}

const { styles, classes, className } = useTheme('Carousel', {}, props, {
  current,
  total,
})

const emit = defineEmits(['update'])

defineExpose({ to, next, prev })
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <div
      ref="slidesRef"
      :class="classes.slides"
    >
      <slot v-bind="{ to, next, prev, current, total }"></slot>
    </div>
    <slot v-if="showDots" name="dots" v-bind="{ to, next, prev, current, total }">
      <div :class="[classes.dots, classDots]">
        <span
          v-for="i in total"
          :key="i"
          :class="[
            classes.dot,
            i - 1 === current ? classes.dotActive : ''
          ]"
          @click="to(i - 1)"
        ></span>
      </div>
    </slot>
  </div>
</template>
