import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'

describe('Icon', () => {
  it('renders without errors', () => {
    const wrapper = mount(Icon)

    expect(wrapper.vm).toBeTruthy()
  })
})
