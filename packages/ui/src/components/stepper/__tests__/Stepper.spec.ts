import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import Stepper from '../Stepper.vue'
import type { StepperProps } from '../Stepper.vue'

const steps = [
  { value: 'a', title: 'Step A' },
  { value: 'b', title: 'Step B' },
  { value: 'c', title: 'Step C' },
]

function mountStepper(options: {
  props?: Partial<StepperProps>;
  slots?: Record<string, () => ReturnType<typeof h>>;
  global?: Record<string, unknown>;
} = {}) {
  return mount(Stepper, {
    props: {
      modelValue: 'a',
      steps,
      ...options.props,
    },
    slots: {
      a: () => h('div', { class: 'panel-a' }, 'Panel A'),
      b: () => h('div', { class: 'panel-b' }, 'Panel B'),
      c: () => h('div', { class: 'panel-c' }, 'Panel C'),
      ...options.slots,
    },
    global: options.global,
  })
}

describe('Stepper', () => {
  it('renders step titles in vertical nav', () => {
    const wrapper = mountStepper()

    expect(wrapper.text()).toContain('Step A')
    expect(wrapper.text()).toContain('Step B')
    expect(wrapper.text()).toContain('Step C')
  })

  it('shows only the active panel slot for initial step', () => {
    const wrapper = mountStepper({ props: { modelValue: 'a' } })

    expect(wrapper.find('.panel-a').exists()).toBe(true)
    expect(wrapper.find('.panel-b').exists()).toBe(false)
    expect(wrapper.find('.panel-c').exists()).toBe(false)
  })

  it('shows the panel matching modelValue', () => {
    const wrapper = mountStepper({ props: { modelValue: 'b' } })

    expect(wrapper.find('.panel-a').exists()).toBe(false)
    expect(wrapper.find('.panel-b').exists()).toBe(true)
  })

  it('exposes isFirst and isLast', async () => {
    const wrapper = mountStepper()
    const vm = wrapper.vm as any

    expect(vm.isFirst).toBe(true)
    expect(vm.isLast).toBe(false)

    await wrapper.setProps({ modelValue: 'c' })

    expect(vm.isFirst).toBe(false)
    expect(vm.isLast).toBe(true)
  })

  it('next() advances v-model and marks step complete', async () => {
    const wrapper = mountStepper()
    const vm = wrapper.vm as any

    await vm.next()
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
    expect(wrapper.emitted('step-complete')?.[0]).toEqual(['a', 0])
    expect(wrapper.emitted('change')?.at(-1)).toEqual(['b', 1])
  })

  it('prev() goes back when allowed', async () => {
    const wrapper = mountStepper({ props: { modelValue: 'b' } })
    const vm = wrapper.vm as any

    await vm.prev()
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  })

  it('validate blocks next()', async () => {
    const validate = vi.fn(() => false)
    const wrapper = mountStepper({ props: { validate } })
    const vm = wrapper.vm as any

    await vm.next()
    await flushPromises()

    expect(validate).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('beforeNext rejection blocks navigation', async () => {
    const wrapper = mountStepper({
      props: {
        steps: [
          { value: 'a', title: 'A', beforeNext: () => Promise.reject(new Error('fail')) },
          { value: 'b', title: 'B' },
        ],
      },
    })
    const vm = wrapper.vm as any

    await vm.next()
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('linear mode blocks goTo until previous steps complete', async () => {
    const wrapper = mountStepper({ props: { linear: true } })
    const vm = wrapper.vm as any

    await vm.goTo('c')
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('non-linear allows jumping to visited steps', async () => {
    const wrapper = mountStepper({ props: { linear: false } })
    const vm = wrapper.vm as any

    await vm.next()
    await flushPromises()
    await vm.goTo('a')
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  })

  it('loading blocks navigation', async () => {
    const wrapper = mountStepper({ props: { loading: true } })
    const vm = wrapper.vm as any

    await vm.next()
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('interactive false prevents sidebar navigation via goTo', async () => {
    const wrapper = mountStepper({ props: { interactive: false, modelValue: 'a' } })
    const vm = wrapper.vm as any

    await vm.goTo('b')
    await flushPromises()

    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('renders summary slot when step is completed', async () => {
    const wrapper = mount(Stepper, {
      props: { modelValue: 'b', steps },
      slots: {
        a: () => h('div', 'A'),
        b: () => h('div', 'B'),
        c: () => h('div', 'C'),
        'summary-a': () => h('span', { class: 'summary-a' }, 'Done A'),
      },
    })

    expect(wrapper.find('.summary-a').exists()).toBe(true)
  })

  it('single step skips nav chrome', () => {
    const wrapper = mount(Stepper, {
      props: {
        modelValue: 'only',
        steps: [{ value: 'only', title: 'Only' }],
      },
      slots: {
        only: () => h('div', { class: 'only-panel' }, 'Only panel'),
      },
    })

    expect(wrapper.find('.only-panel').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('reset() clears progress and returns to first step', async () => {
    const wrapper = mountStepper({ props: { modelValue: 'c' } })
    const vm = wrapper.vm as any

    await vm.next()
    await vm.next()
    await vm.reset()
    await flushPromises()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
    expect(vm.activeIndex).toBe(0)
  })
})
