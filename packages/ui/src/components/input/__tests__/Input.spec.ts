import { describe, it, expect, vi } from 'vitest'
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

  it('forwards undeclared HTML attributes to the native input', () => {
    const wrapper = mount(Input, {
      attrs: {
        autocomplete: 'email',
        'aria-label': 'Work email',
        'data-testid': 'email-input',
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
      },
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    expect(input.attributes('autocomplete')).toBe('email')
    expect(input.attributes('aria-label')).toBe('Work email')
    expect(input.attributes('data-testid')).toBe('email-input')
    expect(label.attributes('data-testid')).toBeUndefined()
  })

  it('applies class and style fallthrough to the wrapper, not the native input', () => {
    const wrapper = mount(Input, {
      attrs: {
        class: 'wrapper-class',
        style: { marginTop: '8px' },
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
      },
    })

    expect(wrapper.find('label').classes()).toContain('wrapper-class')
    expect(wrapper.find('input').classes()).not.toContain('wrapper-class')
    expect((wrapper.find('label').element as HTMLElement).style.marginTop).toBe('8px')
  })

  it('keeps undeclared click listeners on the wrapper', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Input, {
      props: {
        clearable: true,
        modelValue: 'value',
      },
      attrs: {
        onClick,
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
      },
    })

    await wrapper.find('[class*="cursor-pointer"]').trigger('click')

    expect(onClick).toHaveBeenCalled()
  })
})
