import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { resolvePropsWithDefaults } from '../resolveComponentDefaults'
import { injectOptionsKey, injectThemeKey } from '../keys'
import Alert from '../../components/alert/Alert.vue'
import Button from '../../components/button/Button.vue'
import Input from '../../components/input/Input.vue'
import type { InputProps } from '../../components/input/Input.vue'
import BaseTheme from '../../themes/base'

describe('resolvePropsWithDefaults', () => {
  it('applies configured defaults when prop is undefined', () => {
    const resolved = resolvePropsWithDefaults<{ type: string; outlined?: boolean; light?: boolean; }>(
      { type: 'success' },
      { outlined: true, light: true },
    )

    expect(resolved).toEqual({ type: 'success', outlined: true, light: true })
  })

  it('does not override explicit prop values', () => {
    const resolved = resolvePropsWithDefaults(
      { outlined: false },
      { outlined: true },
    )

    expect(resolved.outlined).toBe(false)
  })

  it('returns props unchanged when no defaults configured', () => {
    const props = { type: 'error' as const }

    expect(resolvePropsWithDefaults(props, undefined)).toEqual(props)
  })
})

describe('Alert with UI defaults', () => {
  function mountAlert(props: Record<string, unknown> = {}, defaults?: Record<string, unknown>) {
    return mount(Alert, {
      props,
      global: {
        provide: {
          [injectOptionsKey as symbol]: defaults ? { defaults: { Alert: defaults } } : {},
          [injectThemeKey as symbol]: BaseTheme,
        },
      },
    })
  }

  it('applies outlined default when prop is omitted (not coerced to false)', () => {
    const wrapper = mountAlert(
      { type: 'success', color: 'success' },
      { outlined: true },
    )

    expect(wrapper.attributes('style')).toContain('transparent')
  })

  it('uses light and outlined defaults from injectOptionsKey', () => {
    const wrapper = mountAlert(
      { type: 'success', color: 'success' },
      { outlined: true, light: true },
    )

    const style = wrapper.attributes('style') || ''

    expect(style).toContain('#f0fdf4')
    expect(style).toContain('#16a34a')
  })

  it('respects explicit outlined=false over defaults', () => {
    const withDefaults = mountAlert(
      { type: 'success', color: 'success' },
      { outlined: true, light: true },
    )
    const explicit = mountAlert(
      {
        type: 'success',
        color: 'success',
        outlined: false,
        light: true,
      },
      { outlined: true, light: true },
    )

    expect(withDefaults.attributes('style')).not.toBe(explicit.attributes('style'))
  })
})

describe('Button with UI defaults', () => {
  function mountButton(props: Record<string, unknown> = {}, defaults?: Record<string, unknown>) {
    return mount(Button, {
      props,
      slots: { default: 'Save' },
      global: {
        provide: {
          [injectOptionsKey as symbol]: defaults ? { defaults: { Button: defaults } } : {},
          [injectThemeKey as symbol]: BaseTheme,
        },
      },
    })
  }

  it('applies ghost default when prop is omitted', () => {
    const withDefault = mountButton({ color: 'primary' }, { ghost: true })
    const without = mountButton({ color: 'primary' })

    expect(withDefault.classes().join(' ')).not.toContain('shadow-xs')
    expect(without.classes().join(' ')).toContain('shadow-xs')
  })

  it('respects explicit ghost=false over defaults', () => {
    const withDefault = mountButton({ color: 'primary' }, { ghost: true })
    const explicit = mountButton({ color: 'primary', ghost: false }, { ghost: true })

    expect(withDefault.classes().join(' ')).not.toContain('shadow-xs')
    expect(explicit.classes().join(' ')).toContain('shadow-xs')
  })
})

describe('Input with UI defaults', () => {
  function mountInput(props: Partial<InputProps> = {}, defaults?: Partial<InputProps>) {
    return mount(Input, {
      props,
      global: {
        provide: {
          [injectOptionsKey as symbol]: defaults ? { defaults: { Input: defaults } } : {},
          [injectThemeKey as symbol]: BaseTheme,
        },
      },
    })
  }

  it('applies block default when prop is omitted', () => {
    const wrapper = mountInput({}, { block: true })

    expect(wrapper.classes().join(' ')).toContain('w-full')
  })
})
