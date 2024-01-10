import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loader from '../Loader.vue'

describe('Loader', () => {
  it('renders without errors', () => {
    const wrapper = mount(Loader)

    expect(wrapper.vm).toBeTruthy()
  })
})
