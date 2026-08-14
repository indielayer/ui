import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, defineComponent } from 'vue'
import ButtonGroup from '../ButtonGroup.vue'
import Button from '../Button.vue'
import { injectThemeKey } from '../../../composables/keys'
import BaseTheme from '../../../themes/base'

describe('ButtonGroup', () => {
  it('renders without errors', () => {
    const wrapper = mount(ButtonGroup)

    expect(wrapper.vm).toBeTruthy()
  })

  it('applies end radius to the last button even when wrapped', async () => {
    const Wrapper = defineComponent({
      setup() {
        return () => h(ButtonGroup, null, {
          default: () => [
            h(Button, null, () => 'Add New'),
            h('div', { class: 'wrapper' }, [h(Button, { icon: 'chevron-down' })]),
          ],
        })
      },
    })

    const wrapper = mount(Wrapper, {
      global: {
        provide: {
          [injectThemeKey as symbol]: BaseTheme,
        },
      },
    })

    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('button')

    expect(buttons[0].classes().some((c) => c.includes('rounded-s'))).toBe(true)
    expect(buttons[1].classes().some((c) => c.includes('rounded-e'))).toBe(true)
  })
})
