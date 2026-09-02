import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'
import Icon from '../../icon/Icon.vue'
import Label from '../../label/Label.vue'
import InputFooter from '../../inputFooter/InputFooter.vue'

describe('Input', () => {
  it('renders without errors', () => {
    const wrapper = mount(Input, {
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
      },
    })

    expect(wrapper.vm).toBeTruthy()
  })

  it('renders prefix slot alongside a left icon', () => {
    const wrapper = mount(Input, {
      props: {
        iconLeft: 'smile',
        modelValue: '1',
      },
      slots: {
        prefix: () => h('span', 'min'),
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
      },
    })

    expect(wrapper.text()).toContain('min')
    expect(wrapper.findAllComponents({ name: 'XIcon' }).length).toBeGreaterThan(0)
    expect(wrapper.find('input').classes().join(' ')).toContain('!pl-16')
  })

  it('forwards inputmode and enterkeyhint to the native input', () => {
    const wrapper = mount(Input, {
      props: {
        inputmode: 'decimal',
        enterkeyhint: 'done',
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
      },
    })

    const input = wrapper.find('input')

    expect(input.attributes('inputmode')).toBe('decimal')
    expect(input.attributes('enterkeyhint')).toBe('done')
  })
})
