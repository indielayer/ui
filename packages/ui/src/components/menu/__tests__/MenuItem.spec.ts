import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuItem from '../MenuItem.vue'

describe('MenuItem', () => {
  it('renders without errors', () => {
    const wrapper = mount(MenuItem)

    expect(wrapper.vm).toBeTruthy()
  })
})
