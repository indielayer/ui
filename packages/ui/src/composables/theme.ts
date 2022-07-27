import { computed, inject, unref, useSlots, type StyleValue } from 'vue'
import { injectThemeKey } from './keys'
import { useColors, type ColorComposition } from './colors'
import { useCSS, type CSSComposition } from './css'
import * as R from 'ramda'
import { smartUnref } from '../common/utils'

import type { Slots } from 'vue'

export type ThemeParams = {
  props: any
  slots: Slots
  colors: ColorComposition
  css: CSSComposition
  rtl?: boolean
  data?: any
}

export const useTheme = (namespace: string, defaultTheme: any = {}, props: any, data?: any) => {
  const userTheme = inject(injectThemeKey, false)

  const rawClasses = computed(() => {
    if (unref(userTheme)?.[namespace]) return R.mergeRight(defaultTheme.classes, unref(userTheme)[namespace].classes || {})

    return defaultTheme.classes
  })

  const classPrefix = computed(() => unref(userTheme)?.classPrefix ?? 'x-')
  const className = computed(() => `${classPrefix.value}${namespace}`)

  const rtl = computed(() => unref(userTheme)?.rtl ?? false)

  // compute theme
  const slots = useSlots()
  const colors = useColors()
  const css = useCSS(namespace)

  const classes = computed(() => getClasses(rawClasses.value, {
    props: unref(props),
    slots,
    data: smartUnref(data),
    colors,
    css,
    rtl: unref(rtl),
  }))

  const styles = computed(() => {
    const componentTheme = unref(userTheme)?.[namespace] || {}
    const params = {
      props: unref(props),
      slots,
      data: smartUnref(data),
      colors,
      css,
      rtl: unref(rtl),
    }

    return [
      getStyles(defaultTheme.styles, params),
      getStyles(componentTheme.styles, params),
    ] as StyleValue
  })

  return {
    classPrefix,
    className,
    colors,
    classes,
    styles,
    css,
  }
}

function getClasses(xs: any, params: ThemeParams): any {
  return R.map((x) => R.is(Function, x)
    ? x(params)
    : R.is(Object, x) || R.is(Array, x)
      ? getClasses(x, params)
      : x, xs)
}

function getStyles(styles: any, params: ThemeParams) {
  return R.is(Function, styles)
    ? styles(params) || {}
    : R.is(Object, styles)
      ? styles
      : {}
}
