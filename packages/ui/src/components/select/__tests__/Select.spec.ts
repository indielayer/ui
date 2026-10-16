import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import Select from '../Select.vue'

const PopoverStub = defineComponent({
  name: 'XPopover',
  setup(_, { expose, slots }) {
    const isOpen = ref(false)

    expose({
      show: () => { isOpen.value = true },
      hide: () => { isOpen.value = false },
      isOpen,
    })

    return () => [
      slots.default?.(),
      slots.content?.(),
    ]
  },
})

describe('Select', () => {
  it('renders without errors', () => {
    const wrapper = mount(Select)

    expect(wrapper.vm).toBeTruthy()
  })

  it('renders option descriptions in the dropdown', () => {
    Element.prototype.scrollIntoView = () => {}

    const wrapper = mount(Select, {
      props: {
        modelValue: 'percentile',
        options: [
          {
            value: 'percentile',
            label: 'By percentile',
            description: 'Promote and demote by cohort placement percentages.',
          },
          {
            value: 'rank',
            label: 'By Rank',
            description: 'Promote and demote using tier change on Rank-based Rewards.',
          },
        ],
      },
      global: {
        stubs: {
          XPopover: PopoverStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Promote and demote by cohort placement percentages.')
    expect(wrapper.text()).toContain('Promote and demote using tier change on Rank-based Rewards.')
  })
})
