import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Label from '../Label.vue'

describe('Label', () => {
  it('renders without errors', () => {
    const wrapper = mount(Label)

    expect(wrapper.vm).toBeTruthy()
  })
})
