import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, defineComponent, nextTick } from 'vue'
import Popover from '../Popover.vue'
import PopoverContentBoundary from '../PopoverContentBoundary.vue'
import ButtonGroup from '../../button/ButtonGroup.vue'
import Button from '../../button/Button.vue'
import { injectThemeKey } from '../../../composables/keys'
import BaseTheme from '../../../themes/base'

const themeProvide = {
  global: {
    provide: {
      [injectThemeKey as symbol]: BaseTheme,
    },
  },
}

describe('Popover', () => {
  it('renders without errors', () => {
    const wrapper = mount(Popover)

    expect(wrapper.vm).toBeTruthy()
  })

  it('keeps trigger button group radius when popover content mounts', async () => {
    const Demo = defineComponent({
      setup() {
        return () => h(ButtonGroup, null, {
          default: () => [
            h(Button, null, () => 'Add New'),
            h(Popover, null, {
              default: () => h(Button, null, () => 'More'),
              content: () => h(Button, null, () => 'Option 1'),
            }),
            // Simulate teleported content that would otherwise join the group
            h(PopoverContentBoundary, null, {
              default: () => [
                h(Button, null, () => 'Option 1'),
                h(Button, null, () => 'Option 2'),
                h(Button, null, () => 'Option 3'),
              ],
            }),
          ],
        })
      },
    })

    const wrapper = mount(Demo, themeProvide)

    await nextTick()

    const buttons = wrapper.findAll('button')
    const addNew = buttons.find((b) => b.text() === 'Add New')
    const more = buttons.find((b) => b.text() === 'More')
    const option1 = buttons.find((b) => b.text() === 'Option 1')

    expect(addNew?.classes().some((c) => c.includes('rounded-s'))).toBe(true)
    expect(more?.classes().some((c) => c.includes('rounded-e'))).toBe(true)
    expect(option1?.classes().includes('rounded-md')).toBe(true)
  })
})
