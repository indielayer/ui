import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Menu from '../Menu.vue'

describe('Menu', () => {
  it('renders without errors', () => {
    const wrapper = mount(Menu)

    expect(wrapper.vm).toBeTruthy()
  })
})
