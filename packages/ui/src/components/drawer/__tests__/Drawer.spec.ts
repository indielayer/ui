import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Drawer from '../Drawer.vue'

describe('Drawer', () => {
  it('renders without errors', () => {
    const wrapper = mount(Drawer)

    expect(wrapper.vm).toBeTruthy()
  })
})
