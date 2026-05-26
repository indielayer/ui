import { defineComponent, ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { injectThemeKey } from '../../../composables/keys'
import BaseTheme from '../../../themes/base'
import FormGroup from '../FormGroup.vue'
import RadioButton from '../../radioButton/RadioButton.vue'

describe('FormGroup', () => {
  const themeProvide = {
    global: {
      provide: {
        [injectThemeKey as symbol]: BaseTheme,
      },
    },
  }

  it('renders without errors', () => {
    const wrapper = mount(FormGroup, themeProvide)

    expect(wrapper.vm).toBeTruthy()
  })

  it('uses joined layout when radio buttons register', async () => {
    const Demo = defineComponent({
      components: { XFormGroup: FormGroup, XRadioButton: RadioButton },
      setup() {
        const value = ref('a')

        return { value }
      },
      template: `
        <x-form-group v-model="value">
          <x-radio-button value="a" label="A" />
          <x-radio-button value="b" label="B" />
        </x-form-group>
      `,
    })

    const wrapper = mount(Demo, themeProvide)

    await flushPromises()

    expect(wrapper.find('.inline-flex').exists()).toBe(true)
  })
})
