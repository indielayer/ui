import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from '../Table.vue'

describe('Table', () => {
  it('renders without errors', () => {
    const wrapper = mount(Table)

    expect(wrapper.vm).toBeTruthy()
  })
})
