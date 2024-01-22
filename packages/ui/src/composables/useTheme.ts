import { computed, inject, unref, useSlots, type Slots, type UnwrapNestedRefs, type UnwrapRef, type MaybeRef, type CSSProperties } from 'vue'
import { injectThemeKey } from './keys'
import { useColors, type ColorComposition } from './useColors'
import { useCSS, type CSSComposition } from './useCSS'
import { isFunction, isObject, mergeRightDeep, smartUnref } from '../common/utils'
import type { ComponentThemes } from 'src/theme'

export type Stylish = false | null | undefined | string | CSSProperties;
export type StyleValue = Stylish | Array<Stylish>;

export type ThemeVueClass = string | Record<string, boolean> | (string | Record<string, boolean>)[]
export type ThemeClasses<P, K extends string = string, D = undefined> = Record<K, string | ((params: ThemeParams<P, D>) => ThemeVueClass)>
export type ThemeStyles<P, D> = StyleValue | ((params: ThemeParams<P, D>) => StyleValue);
export interface ThemeComponent<P = object, K extends string = string, D = object> {
  classes?: Partial<ThemeClasses<P, K, D>>;
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

export const useTheme = <P extends object = object, K extends string = string, D extends object = object>(namespace: keyof ComponentThemes, defaultTheme: ThemeComponent<P, K, D> = {}, props: MaybeRef<P> = {} as P, data: D = {} as D) => {
  const userTheme = inject(injectThemeKey, {})

  const rawClasses = computed(() => {
    if (unref(userTheme)?.components?.[namespace]) return mergeRightDeep(defaultTheme.classes || {}, unref(userTheme).components?.[namespace].classes || {})

    return defaultTheme.classes || {}
  })

  const cssNamespace = namespace.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`).replace(/^-/, '')

  const classPrefix = computed(() => unref(userTheme)?.classPrefix ?? 'x-')
  const className = computed(() => `${classPrefix.value}${cssNamespace}`)

  const rtl = computed(() => unref(userTheme)?.rtl ?? false)

  // compute theme
  const slots = useSlots()
  const colors = useColors()
  const css = useCSS(cssNamespace)
  const classes = computed<Record<K, ThemeVueClass>>(() => getClasses(rawClasses.value, {
    props: unref(props),
    slots,
    data: smartUnref(data),
    colors,
    css,
    rtl: unref(rtl),
  }))

  const styles = computed(() => {
    const componentTheme = unref(userTheme)?.components?.[namespace] || {}
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
