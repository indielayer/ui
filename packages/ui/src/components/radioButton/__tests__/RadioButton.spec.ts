import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RadioButton from '../RadioButton.vue'
import FormGroup from '../../formGroup/FormGroup.vue'

describe('RadioButton', () => {
  it('updates model value when clicked', async () => {
    const wrapper = mount(RadioButton, {
      props: {
        value: 'a',
        modelValue: '',
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
  })

  it('acts as grouped options inside FormGroup', async () => {
    const Demo = defineComponent({
      components: { XFormGroup: FormGroup, XRadioButton: RadioButton },
      setup() {
        const value = ref('a')

        return { value }
      },
      template: `
        <x-form-group v-model="value">
          <x-radio-button value="a" label="Option A" />
          <x-radio-button value="b" label="Option B" />
        </x-form-group>
      `,
    })

    const wrapper = mount(Demo)
    const radios = wrapper.findAllComponents(RadioButton)

    expect(radios[0]?.attributes('aria-pressed')).toBe('true')
    expect(radios[1]?.attributes('aria-pressed')).toBe('false')

    await radios[1]?.trigger('click')

    expect(radios[0]?.attributes('aria-pressed')).toBe('false')
    expect(radios[1]?.attributes('aria-pressed')).toBe('true')
  })
})
