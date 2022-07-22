import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea from '../Textarea.vue'

describe('Textarea', () => {
  it('renders without errors', () => {
    const wrapper = mount(Textarea)

    expect(wrapper.vm).toBeTruthy()
  })
})
