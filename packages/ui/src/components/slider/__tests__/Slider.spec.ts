import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from '../Slider.vue'

describe('Slider', () => {
  it('renders without errors', () => {
    const wrapper = mount(Slider)

    expect(wrapper.vm).toBeTruthy()
  })
})
