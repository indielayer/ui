import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders without errors', () => {
    const wrapper = mount(Button)

    expect(wrapper.vm).toBeTruthy()
  })
})
