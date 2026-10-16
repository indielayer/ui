import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputFooter from '../InputFooter.vue'

describe('InputFooter', () => {
  it('renders without errors', () => {
    const wrapper = mount(InputFooter)

    expect(wrapper.vm).toBeTruthy()
  })

  it('renders nothing when there is no helper, error, or counter', () => {
    const wrapper = mount(InputFooter)

    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('renders helper text when provided', () => {
    const wrapper = mount(InputFooter, {
      props: { helper: 'Optional hint' },
    })

    expect(wrapper.text()).toContain('Optional hint')
  })
})
