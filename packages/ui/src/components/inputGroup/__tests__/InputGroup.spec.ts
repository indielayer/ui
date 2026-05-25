import { describe, it, expect } from 'vitest'
import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import InputGroup from '../InputGroup.vue'
import Input from '../../input/Input.vue'
import Form from '../../form/Form.vue'
import Label from '../../label/Label.vue'
import InputFooter from '../../inputFooter/InputFooter.vue'

describe('InputGroup', () => {
  it('renders without errors', () => {
    const wrapper = mount(InputGroup, {
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter },
      },
    })

    expect(wrapper.vm).toBeTruthy()
  })

  it('renders a single group footer', () => {
    const wrapper = mount(InputGroup, {
      props: {
        label: 'Phone',
        helper: 'Include country code',
      },
      slots: {
        default: `
          <x-input model-value="" />
          <x-input model-value="" />
        `,
      },
      global: {
        components: { XInput: Input, XLabel: Label, XInputFooter: InputFooter },
      },
    })

    expect(wrapper.findAllComponents({ name: 'XInputFooter' })).toHaveLength(1)
  })

  it('validates group rules against registered child values', async () => {
    const rule = (values: unknown) => {
      if (!Array.isArray(values)) return 'Required'

      return values.every((v) => v !== '') || 'Required'
    }

    const wrapper = mount(InputGroup, {
      props: { rules: [rule] },
      slots: {
        default: () => [
          h(Input, { name: 'code', modelValue: '' }),
          h(Input, { name: 'number', modelValue: '555' }),
        ],
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter },
      },
    })

    await nextTick()
    expect((wrapper.vm as { validate: () => boolean; }).validate()).toBe(false)

    const valid = mount(InputGroup, {
      props: { rules: [rule] },
      slots: {
        default: () => [
          h(Input, { name: 'code', modelValue: '+1' }),
          h(Input, { name: 'number', modelValue: '555' }),
        ],
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter },
      },
    })

    await nextTick()
    expect((valid.vm as { validate: () => boolean; }).validate()).toBe(true)
  })

  it('registers group validation with the form using child values', async () => {
    const rule = (values: unknown) => {
      if (!Array.isArray(values)) return 'Required'

      return values.every((v) => v !== '') || 'Required'
    }

    const wrapper = mount(Form, {
      slots: {
        default: () =>
          h(InputGroup, { rules: [rule] }, () => [
            h(Input, { name: 'code', modelValue: '+1' }),
            h(Input, { name: 'number', modelValue: '555' }),
          ]),
      },
      global: {
        components: { XLabel: Label, XInputFooter: InputFooter },
      },
    })

    await nextTick()
    expect((wrapper.vm as { validate: () => boolean; }).validate()).toBe(true)
  })
})
