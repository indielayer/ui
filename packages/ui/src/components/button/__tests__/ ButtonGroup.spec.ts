import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonGroup from '../ButtonGroup.vue'

describe('ButtonGroup', () => {
  it('renders without errors', () => {
    const wrapper = mount(ButtonGroup)

    expect(wrapper.vm).toBeTruthy()
  })
})
