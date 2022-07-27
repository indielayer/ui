import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Breadcrumbs from '../Breadcrumbs.vue'

describe('Breadcrumbs', () => {
  it('renders without errors', () => {
    const wrapper = mount(Breadcrumbs)

    expect(wrapper.vm).toBeTruthy()
  })
})
