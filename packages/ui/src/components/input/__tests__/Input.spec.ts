import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input', () => {
  it('renders without errors', () => {
    const wrapper = mount(Input)

    expect(wrapper.vm).toBeTruthy()
  })
})
