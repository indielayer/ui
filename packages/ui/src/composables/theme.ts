import { computed, inject, unref, useSlots, type StyleValue, type Slots, type UnwrapNestedRefs, type UnwrapRef, type MaybeRef } from 'vue'
import { injectThemeKey } from './keys'
import { useColors, type ColorComposition } from './colors'
import { useCSS, type CSSComposition } from './css'
import { isFunction, isObject, mergeRightDeep, smartUnref } from '../common/utils'

export type ThemeVueClass = string | Record<string, boolean> | (string | Record<string, boolean>)[]
export type ThemeClasses<P, K extends string = string, D = undefined> = Record<K, string | ((params: ThemeParams<P, D>) => ThemeVueClass)>
export type ThemeStyles<P, D> = StyleValue | ((params: ThemeParams<P, D>) => StyleValue);
export interface ThemeComponent<P = object, K extends string = string, D = object> {
  classes?: ThemeClasses<P, K, D>;
  styles?: ThemeStyles<P, D>;
}
export type ThemeParams<P = Record<string, any>, D = Record<string, any>> = {
  props: UnwrapRef<P>;
  slots: Slots;
  colors: ColorComposition;
  css: CSSComposition;
  rtl?: boolean;
  data: UnwrapNestedRefs<D>;
}

export const useTheme = <P extends object = object, K extends string = string, D extends object = object>(namespace: string, defaultTheme: ThemeComponent<P, K, D> = {}, props: MaybeRef<P> = {} as P, data: D = {} as D) => {
  const userTheme = inject(injectThemeKey, false)

  const rawClasses = computed(() => {
    if (unref(userTheme)?.[namespace]) return mergeRightDeep(defaultTheme.classes, unref(userTheme)[namespace].classes || {})

    return defaultTheme.classes
  })

  const classPrefix = computed(() => unref(userTheme)?.classPrefix ?? 'x-')
  const className = computed(() => `${classPrefix.value}${namespace}`)

  const rtl = computed(() => unref(userTheme)?.rtl ?? false)

  // compute theme
  const slots = useSlots()
  const colors = useColors()
  const css = useCSS(namespace)
  const classes = computed<Record<K, ThemeVueClass>>(() => getClasses(rawClasses.value, {
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

function getClasses(classes: any, params: ThemeParams): any {
  const parsedClasses: Record<string, string> = {}

  Object.keys(classes).forEach((key) => {
    const x = classes[key]

    parsedClasses[key] = isFunction(x) ? x(params) : (isObject(x) ? getClasses(x, params) : x)
  })

  return parsedClasses
}

function getStyles(styles: any, params: ThemeParams) {
  return isFunction(styles) ? (styles(params) || {}) : (isObject(styles) ? styles : {})
}
