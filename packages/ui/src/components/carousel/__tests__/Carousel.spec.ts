import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Carousel from '../Carousel.vue'

describe('Carousel', () => {
  it('renders properly', () => {
    const wrapper = mount(Carousel)

    expect(wrapper.vm).toBeTruthy()
  })
})
