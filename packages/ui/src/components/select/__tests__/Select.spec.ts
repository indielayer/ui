import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../Select.vue'

describe('Select', () => {
  it('renders without errors', () => {
    const wrapper = mount(Select)

    expect(wrapper.vm).toBeTruthy()
  })
})
