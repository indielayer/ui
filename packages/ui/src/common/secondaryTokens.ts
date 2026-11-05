import type { ColorPalette, Tone } from '../composables/useColors'

/** Secondary tones via CSS vars so `html.dark` palette overrides apply (unlike getPalette hex). */
export const secondaryCss = (tone: Tone) => `rgb(var(--secondary-color-${tone}))`

export const secondaryCssPalette: ColorPalette = {
  50: secondaryCss('50'),
  100: secondaryCss('100'),
  200: secondaryCss('200'),
  300: secondaryCss('300'),
  400: secondaryCss('400'),
  500: secondaryCss('500'),
  600: secondaryCss('600'),
  700: secondaryCss('700'),
  800: secondaryCss('800'),
  900: secondaryCss('900'),
  950: secondaryCss('950'),
}
