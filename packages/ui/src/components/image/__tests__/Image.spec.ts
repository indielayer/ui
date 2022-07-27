import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Image from '../Image.vue'

describe('Image', () => {
  it('renders without errors', () => {
    const wrapper = mount(Image)

    expect(wrapper.vm).toBeTruthy()
  })
})
