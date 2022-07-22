import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders without errors', () => {
    const wrapper = mount(Card)

    expect(wrapper.vm).toBeTruthy()
  })
})
