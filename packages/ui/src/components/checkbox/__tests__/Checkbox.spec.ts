import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../Checkbox.vue'

describe('Checkbox', () => {
  it('renders without errors', () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.vm).toBeTruthy()
  })
})
