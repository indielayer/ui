import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputFooter from '../InputFooter.vue'

describe('InputFooter', () => {
  it('renders without errors', () => {
    const wrapper = mount(InputFooter)

    expect(wrapper.vm).toBeTruthy()
  })
})
