import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Container from '../Container.vue'

describe('Container', () => {
  it('renders without errors', () => {
    const wrapper = mount(Container)

    expect(wrapper.vm).toBeTruthy()
  })
})
