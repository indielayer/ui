import * as R from 'ramda'
import { computed, inject, unref } from 'vue'
import { injectThemeKey } from './keys'
import { isValidColor, tailwindColors, colorShade, setOpacity } from './colors-utils'

export type Tone = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export interface ColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export type ColorLibrary = Record<string, ColorPalette>

export interface ColorsProps {
  color?: string
}

export interface ColorComposition {
  getPalette: (color: string)=> ColorPalette
  getColorOpacity: (color: string, opacity: number)=> string
}

const colorCache: ColorLibrary = {}

const defaultColors = {
  primary: tailwindColors.sky,
  secondary: tailwindColors.slate,
  success: tailwindColors.green,
  warning: tailwindColors.yellow,
  error: tailwindColors.red,
}

export const useColors = (): ColorComposition => {
  const globalTheme = inject(injectThemeKey,  {})
  const customColors = computed(() => R.mergeRight(defaultColors, unref(globalTheme).colors))

  const getTailwindColor = (color: string) => tailwindColors[color]

  const getColorOpacity = (color: string, opacity: number) => setOpacity(color, opacity)

  const getPalette = (color: string): ColorPalette => {
    if (!color) return getTailwindColor('gray')

    const twColor = getTailwindColor(color)

    if (twColor) return twColor
    if (colorCache[color]) return colorCache[color]
    if (customColors.value[color]) return customColors.value[color]

    if (!isValidColor(color)) {
      console.warn(`Invalid color: ${color}`)

      return getTailwindColor('gray')
    }

    const palette = {
      50: colorShade(color, 0.9),
      100: colorShade(color, 0.8),
      200: colorShade(color, 0.6),
      300: colorShade(color, 0.4),
      400: colorShade(color, 0.1),
      500: color,
      600: colorShade(color, -0.1),
      700: colorShade(color, -0.25),
      800: colorShade(color, -0.58),
      900: colorShade(color, -0.7),
    }

    colorCache[color] = palette

    return palette
  }

  return {
    getPalette,
    getColorOpacity,
  }
}

useColors.props = (defaultColor?: string) => ({
  color: {
    type: String,
    default: defaultColor,
  },
} as const)
