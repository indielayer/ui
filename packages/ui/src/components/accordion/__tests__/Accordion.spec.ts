import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Accordion from '../Accordion.vue'

describe('Accordion', () => {
  it('renders properly', () => {
    const wrapper = mount(Accordion)

    expect(wrapper.vm).toBeTruthy()
  })
})
