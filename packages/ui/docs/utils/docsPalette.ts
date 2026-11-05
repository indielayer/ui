import { colors } from '@indielayer/ui'

type ColorPalette = Record<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950', string>
type ChannelScale = Record<keyof ColorPalette, string>

export const DOCS_PALETTE_STYLE_ID = 'docs-palette-vars'

/** Muted violet neutrals for light surfaces (not Tailwind’s saturated violet). */
export const lightVioletSecondaryChannels: ChannelScale = {
  50: '248, 247, 252',
  100: '241, 239, 248',
  200: '228, 224, 240',
  300: '205, 200, 225',
  400: '160, 152, 190',
  500: '110, 100, 145',
  600: '80, 72, 115',
  700: '60, 54, 90',
  800: '42, 38, 68',
  900: '28, 24, 48',
  950: '16, 14, 30',
}

/** Built-in dark violet secondary (matches BaseTheme html.dark). */
export const darkVioletSecondaryChannels: ChannelScale = {
  50: '242, 240, 248',
  100: '224, 221, 236',
  200: '202, 197, 220',
  300: '172, 167, 198',
  400: '140, 132, 172',
  500: '94, 89, 122',
  600: '50, 46, 72',
  700: '34, 31, 52',
  800: '20, 18, 36',
  900: '12, 10, 24',
  950: '7, 5, 15',
}

/** Based on rgba(102, 84, 226, 0.8) → #6654E2, muted for surfaces. */
export const lightIrisSecondaryChannels: ChannelScale = {
  50: '247, 246, 253',
  100: '239, 237, 251',
  200: '226, 222, 246',
  300: '200, 193, 238',
  400: '155, 145, 220',
  500: '118, 104, 200',
  600: '90, 76, 175',
  700: '70, 58, 145',
  800: '50, 42, 105',
  900: '34, 28, 72',
  950: '20, 16, 42',
}

export const darkIrisSecondaryChannels: ChannelScale = {
  50: '240, 238, 252',
  100: '222, 218, 246',
  200: '198, 192, 238',
  300: '168, 158, 225',
  400: '132, 120, 205',
  500: '100, 88, 175',
  600: '58, 50, 110',
  700: '40, 34, 78',
  800: '26, 22, 52',
  900: '15, 12, 34',
  950: '9, 7, 20',
}

export const lightIndigoSecondaryChannels: ChannelScale = {
  50: '246, 247, 252',
  100: '238, 240, 250',
  200: '224, 228, 244',
  300: '198, 204, 232',
  400: '150, 158, 205',
  500: '105, 112, 165',
  600: '78, 84, 130',
  700: '58, 62, 100',
  800: '40, 44, 72',
  900: '26, 28, 48',
  950: '14, 16, 28',
}

/**
 * Indigo dark surfaces (lighter cool navy) — used by `indigo`:
 * 950 canvas ~#070810, 900 recessed, 800 cards #16182a, 700 borders.
 * Anchored on 800 (22, 24, 42).
 */
export const darkIndigoLightSecondaryChannels: ChannelScale = {
  50: '238, 240, 250',
  100: '220, 224, 242',
  200: '196, 202, 230',
  300: '165, 172, 210',
  400: '130, 138, 185',
  500: '95, 100, 145',
  600: '52, 56, 88',
  700: '36, 40, 64',
  800: '22, 24, 42',
  900: '13, 14, 26',
  950: '7, 8, 16',
}

/**
 * Indigo dark surfaces (denser) — used by `indigo-dark`:
 * 950 canvas ~#07080e, 900 recessed, 800 cards #151622, 700 borders.
 * Anchored on 800 (21, 22, 34); lower chroma than the violet-leaning BaseTheme dark.
 */
export const darkIndigoSecondaryChannels: ChannelScale = {
  50: '234, 235, 242',
  100: '215, 216, 228',
  200: '185, 187, 205',
  300: '145, 148, 172',
  400: '105, 108, 135',
  500: '72, 75, 100',
  600: '48, 50, 70',
  700: '34, 36, 52',
  800: '21, 22, 34',
  900: '12, 13, 22',
  950: '7, 8, 14',
}

/** Achromatic light surfaces — same steps as indigo light, no hue. */
export const lightInkSecondaryChannels: ChannelScale = {
  50: '250, 250, 250',
  100: '244, 244, 244',
  200: '232, 232, 232',
  300: '212, 212, 212',
  400: '168, 168, 168',
  500: '120, 120, 120',
  600: '90, 90, 90',
  700: '64, 64, 64',
  800: '44, 44, 44',
  900: '28, 28, 28',
  950: '16, 16, 16',
}

/**
 * Achromatic dark surfaces (same lift as indigo dark):
 * 950 canvas ~#080808, 900 recessed, 800 cards ~#181818, 700 borders.
 */
export const darkInkSecondaryChannels: ChannelScale = {
  50: '242, 242, 242',
  100: '224, 224, 224',
  200: '200, 200, 200',
  300: '168, 168, 168',
  400: '136, 136, 136',
  500: '100, 100, 100',
  600: '60, 60, 60',
  700: '42, 42, 42',
  800: '24, 24, 24',
  900: '14, 14, 14',
  950: '8, 8, 8',
}

/**
 * Cool navy-slate light surfaces paired with Bearded Themanopia dark.
 * Slight blue-violet bias (not pure gray).
 */
export const lightNopiaSecondaryChannels: ChannelScale = {
  50: '248, 249, 252',
  100: '240, 241, 246',
  200: '226, 228, 236',
  300: '200, 204, 216',
  400: '150, 156, 175',
  500: '100, 106, 128',
  600: '72, 78, 98',
  700: '52, 56, 72',
  800: '36, 40, 52',
  900: '24, 26, 36',
  950: '14, 16, 22',
}

/**
 * Bearded Themanopia (Experimental) dark surfaces:
 * 950 #0F1016, 900 #12141B, 800 #1B1E28 (editor), 700 #252937.
 * @see https://github.com/BeardedBear/bearded-theme
 */
export const darkNopiaSecondaryChannels: ChannelScale = {
  50: '204, 208, 220',
  100: '174, 180, 199',
  200: '140, 148, 170',
  300: '110, 118, 140',
  400: '90, 96, 118',
  500: '78, 83, 102',
  600: '48, 53, 70',
  700: '37, 41, 55',
  800: '27, 30, 40',
  900: '18, 20, 27',
  950: '15, 16, 22',
}

/**
 * Soft IDE-depth dark ladders (Cursor-like ~#181818 canvas — not near-black).
 * Shared lightness: 950 chrome, 900 content, 800 elevated, 700 border.
 * Low chroma; hue shifts only.
 */

/** Soft cool slate — closest to Cursor Dark Anysphere (#181818 / #141414). */
export const lightStudioSecondaryChannels: ChannelScale = {
  50: '248, 248, 250',
  100: '240, 240, 244',
  200: '228, 228, 234',
  300: '208, 208, 216',
  400: '168, 168, 180',
  500: '120, 120, 134',
  600: '88, 88, 100',
  700: '64, 64, 74',
  800: '48, 48, 56',
  900: '34, 34, 40',
  950: '24, 24, 28',
}

export const darkStudioSecondaryChannels: ChannelScale = {
  50: '236, 236, 240',
  100: '216, 216, 222',
  200: '190, 190, 200',
  300: '160, 160, 172',
  400: '128, 128, 140',
  500: '96, 96, 106',
  600: '68, 68, 76',
  700: '50, 50, 56',
  800: '36, 36, 40',
  900: '24, 24, 26',
  950: '20, 20, 22',
}

/** Soft blue-gray — dusk IDE. */
export const lightHazeSecondaryChannels: ChannelScale = {
  50: '246, 248, 252',
  100: '236, 240, 248',
  200: '222, 228, 240',
  300: '198, 208, 226',
  400: '150, 164, 192',
  500: '105, 120, 152',
  600: '78, 90, 118',
  700: '58, 68, 90',
  800: '42, 50, 68',
  900: '30, 36, 50',
  950: '22, 26, 36',
}

export const darkHazeSecondaryChannels: ChannelScale = {
  50: '230, 234, 244',
  100: '208, 214, 228',
  200: '180, 188, 208',
  300: '150, 160, 182',
  400: '118, 128, 152',
  500: '90, 100, 124',
  600: '64, 72, 92',
  700: '48, 54, 70',
  800: '34, 38, 50',
  900: '26, 28, 38',
  950: '20, 22, 30',
}

/** Soft sage / green-gray. */
export const lightFogSecondaryChannels: ChannelScale = {
  50: '246, 250, 248',
  100: '236, 244, 240',
  200: '220, 234, 226',
  300: '194, 216, 204',
  400: '146, 176, 160',
  500: '100, 132, 116',
  600: '74, 100, 88',
  700: '54, 74, 66',
  800: '40, 54, 48',
  900: '28, 38, 34',
  950: '20, 28, 24',
}

export const darkFogSecondaryChannels: ChannelScale = {
  50: '230, 238, 234',
  100: '206, 218, 212',
  200: '176, 192, 184',
  300: '146, 164, 154',
  400: '116, 134, 124',
  500: '88, 104, 96',
  600: '62, 74, 68',
  700: '46, 56, 52',
  800: '32, 40, 36',
  900: '24, 30, 28',
  950: '18, 22, 20',
}

/** Soft warm taupe / stone. */
export const lightEmberSecondaryChannels: ChannelScale = {
  50: '252, 248, 246',
  100: '246, 240, 236',
  200: '236, 226, 218',
  300: '220, 204, 192',
  400: '186, 164, 148',
  500: '142, 120, 104',
  600: '110, 92, 80',
  700: '82, 68, 60',
  800: '60, 50, 44',
  900: '42, 36, 32',
  950: '30, 26, 24',
}

export const darkEmberSecondaryChannels: ChannelScale = {
  50: '240, 234, 228',
  100: '220, 212, 204',
  200: '196, 184, 174',
  300: '168, 154, 142',
  400: '138, 124, 112',
  500: '108, 96, 86',
  600: '78, 68, 60',
  700: '58, 50, 46',
  800: '40, 34, 32',
  900: '28, 24, 22',
  950: '22, 18, 16',
}

/** Soft muted violet. */
export const lightLilacSecondaryChannels: ChannelScale = {
  50: '250, 248, 252',
  100: '242, 238, 248',
  200: '230, 224, 240',
  300: '210, 200, 228',
  400: '170, 156, 200',
  500: '128, 112, 160',
  600: '98, 84, 128',
  700: '74, 62, 98',
  800: '54, 46, 72',
  900: '38, 32, 52',
  950: '26, 22, 36',
}

export const darkLilacSecondaryChannels: ChannelScale = {
  50: '236, 232, 244',
  100: '216, 210, 230',
  200: '190, 182, 212',
  300: '162, 152, 188',
  400: '132, 122, 160',
  500: '102, 92, 128',
  600: '74, 66, 94',
  700: '54, 48, 70',
  800: '38, 34, 50',
  900: '28, 24, 36',
  950: '22, 18, 28',
}

/** Soft teal / lagoon slate. */
export const lightLagoonSecondaryChannels: ChannelScale = {
  50: '244, 250, 250',
  100: '232, 244, 244',
  200: '214, 234, 234',
  300: '184, 216, 216',
  400: '132, 176, 176',
  500: '88, 134, 134',
  600: '64, 104, 104',
  700: '48, 78, 78',
  800: '36, 58, 58',
  900: '26, 42, 42',
  950: '18, 30, 30',
}

export const darkLagoonSecondaryChannels: ChannelScale = {
  50: '226, 238, 238',
  100: '200, 218, 218',
  200: '170, 194, 194',
  300: '140, 168, 168',
  400: '112, 140, 140',
  500: '84, 110, 110',
  600: '58, 78, 78',
  700: '44, 58, 58',
  800: '30, 40, 40',
  900: '22, 30, 30',
  950: '16, 22, 22',
}

export const lightBlueSecondaryChannels: ChannelScale = {
  50: '246, 249, 252',
  100: '236, 242, 248',
  200: '220, 230, 242',
  300: '190, 208, 228',
  400: '140, 168, 200',
  500: '95, 125, 160',
  600: '70, 95, 125',
  700: '52, 72, 95',
  800: '36, 50, 68',
  900: '24, 34, 48',
  950: '12, 18, 28',
}

export const darkBlueSecondaryChannels: ChannelScale = {
  50: '236, 242, 250',
  100: '216, 228, 242',
  200: '190, 210, 232',
  300: '155, 185, 215',
  400: '120, 155, 190',
  500: '85, 115, 150',
  600: '45, 65, 92',
  700: '32, 48, 68',
  800: '20, 30, 46',
  900: '12, 18, 30',
  950: '6, 10, 18',
}

export const lightTealSecondaryChannels: ChannelScale = {
  50: '245, 250, 250',
  100: '234, 244, 244',
  200: '216, 234, 234',
  300: '185, 215, 215',
  400: '130, 175, 175',
  500: '85, 135, 135',
  600: '60, 105, 105',
  700: '45, 80, 80',
  800: '32, 58, 58',
  900: '22, 40, 40',
  950: '12, 24, 24',
}

export const darkTealSecondaryChannels: ChannelScale = {
  50: '232, 244, 244',
  100: '210, 232, 232',
  200: '180, 218, 218',
  300: '145, 195, 195',
  400: '110, 165, 165',
  500: '75, 125, 125',
  600: '40, 72, 72',
  700: '28, 52, 52',
  800: '18, 36, 36',
  900: '10, 22, 22',
  950: '6, 14, 14',
}

export const lightRoseSecondaryChannels: ChannelScale = {
  50: '252, 246, 248',
  100: '248, 236, 240',
  200: '240, 220, 228',
  300: '228, 190, 205',
  400: '200, 140, 165',
  500: '160, 95, 120',
  600: '125, 70, 95',
  700: '95, 52, 72',
  800: '68, 36, 52',
  900: '48, 24, 36',
  950: '28, 14, 20',
}

export const darkRoseSecondaryChannels: ChannelScale = {
  50: '250, 236, 242',
  100: '242, 216, 226',
  200: '230, 190, 208',
  300: '210, 155, 180',
  400: '185, 120, 150',
  500: '145, 85, 115',
  600: '78, 42, 58',
  700: '56, 30, 42',
  800: '38, 20, 30',
  900: '24, 12, 18',
  950: '14, 7, 11',
}

export const primaryPaletteKeys = [
  'emerald',
  'violet',
  'indigo',
  'blue',
  'sky',
  'cyan',
  'teal',
  'green',
  'lime',
  'amber',
  'orange',
  'rose',
  'pink',
  'fuchsia',
  'purple',
  'red',
] as const

/** Tailwind neutrals usable as-is for light + dark secondary. */
export const neutralSecondaryKeys = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
] as const

/** Custom muted tinted secondaries (own light/dark surface scales). */
export const tintedSecondaryKeys = [
  'ink',
  'nopia',
  // Soft IDE-depth (~Cursor #181818) — lighter than indigo/ink canvases
  'studio',
  'haze',
  'fog',
  'ember',
  'lilac',
  'lagoon',
  'violet',
  'iris',
  'indigo',
  'indigo-dark',
  'blue',
  'teal',
  'rose',
] as const

export const secondaryPaletteKeys = [
  ...neutralSecondaryKeys,
  ...tintedSecondaryKeys,
] as const

export type PrimaryPaletteKey = typeof primaryPaletteKeys[number]
export type SecondaryPaletteKey = typeof secondaryPaletteKeys[number]

type TintedSecondary = {
  light: ChannelScale;
  dark: ChannelScale;
  /** Swatch color (approx mid accent). */
  swatch: string;
}

const tintedSecondaries: Record<typeof tintedSecondaryKeys[number], TintedSecondary> = {
  ink: {
    light: lightInkSecondaryChannels,
    dark: darkInkSecondaryChannels,
    swatch: '#737373',
  },
  // Bearded Themanopia cool navy-slate
  nopia: {
    light: lightNopiaSecondaryChannels,
    dark: darkNopiaSecondaryChannels,
    swatch: '#4e5366',
  },
  studio: {
    light: lightStudioSecondaryChannels,
    dark: darkStudioSecondaryChannels,
    swatch: '#60606a',
  },
  haze: {
    light: lightHazeSecondaryChannels,
    dark: darkHazeSecondaryChannels,
    swatch: '#5a647c',
  },
  fog: {
    light: lightFogSecondaryChannels,
    dark: darkFogSecondaryChannels,
    swatch: '#586868',
  },
  ember: {
    light: lightEmberSecondaryChannels,
    dark: darkEmberSecondaryChannels,
    swatch: '#6c6056',
  },
  lilac: {
    light: lightLilacSecondaryChannels,
    dark: darkLilacSecondaryChannels,
    swatch: '#665c80',
  },
  lagoon: {
    light: lightLagoonSecondaryChannels,
    dark: darkLagoonSecondaryChannels,
    swatch: '#546e6e',
  },
  violet: {
    light: lightVioletSecondaryChannels,
    dark: darkVioletSecondaryChannels,
    swatch: '#6d5a9a',
  },
  // rgba(102, 84, 226, 0.8) → #6654E2
  iris: {
    light: lightIrisSecondaryChannels,
    dark: darkIrisSecondaryChannels,
    swatch: '#6654e2',
  },
  indigo: {
    light: lightIndigoSecondaryChannels,
    dark: darkIndigoLightSecondaryChannels,
    swatch: '#6366f1',
  },
  'indigo-dark': {
    light: lightIndigoSecondaryChannels,
    dark: darkIndigoSecondaryChannels,
    swatch: '#4f46e5',
  },
  blue: {
    light: lightBlueSecondaryChannels,
    dark: darkBlueSecondaryChannels,
    swatch: '#3b82f6',
  },
  teal: {
    light: lightTealSecondaryChannels,
    dark: darkTealSecondaryChannels,
    swatch: '#14b8a6',
  },
  rose: {
    light: lightRoseSecondaryChannels,
    dark: darkRoseSecondaryChannels,
    swatch: '#f43f5e',
  },
}

function hexToRgbChannels(hex: string): string {
  const raw = hex.replace('#', '')
  const full = raw.length === 3
    ? raw.split('').map((c) => c + c).join('')
    : raw
  const n = Number.parseInt(full, 16)

  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

function channelsToHexPalette(channels: ChannelScale): ColorPalette {
  const palette = {} as ColorPalette

  for (const [tone, value] of Object.entries(channels)) {
    const [r, g, b] = value.split(',').map((part) => Number.parseInt(part.trim(), 10))
    const hex = [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')

    palette[tone as keyof ColorPalette] = `#${hex}`
  }

  return palette
}

function paletteToDeclarations(prefix: 'primary' | 'secondary', palette: ColorPalette): string {
  return (Object.keys(palette) as Array<keyof ColorPalette>)
    .map((tone) => `--${prefix}-color-${tone}: ${hexToRgbChannels(palette[tone])};`)
    .join('\n  ')
}

function channelsToDeclarations(prefix: 'secondary', channels: ChannelScale): string {
  return Object.entries(channels)
    .map(([tone, value]) => `--${prefix}-color-${tone}: ${value};`)
    .join('\n  ')
}

function isTintedSecondary(key: string): key is typeof tintedSecondaryKeys[number] {
  return (tintedSecondaryKeys as readonly string[]).includes(key)
}

export function getSecondarySwatch(key: SecondaryPaletteKey): string {
  if (isTintedSecondary(key)) return tintedSecondaries[key].swatch

  return colors[key]?.[500] || '#64748b'
}

/** Palette used for theme.colors.secondary (light scale for tinted keys). */
export function getSecondaryThemePalette(key: SecondaryPaletteKey): ColorPalette {
  if (isTintedSecondary(key)) return channelsToHexPalette(tintedSecondaries[key].light)

  return colors[key]
}

/** CSS that mirrors the docs palette preview (`--*-color-*` RGB channels). */
export function getDocsPaletteCss(options: {
  primary?: ColorPalette | null;
  secondaryKey?: SecondaryPaletteKey | null;
}): string {
  const { primary, secondaryKey } = options

  if (!primary && !secondaryKey) return ''

  const root: string[] = []

  if (primary) root.push(paletteToDeclarations('primary', primary))

  let darkSecondary = ''
  // Tinted dark hairlines: secondary-700 at 70% (matches Card dark:border-secondary-700/70)
  let lightBorder = '226, 232, 240'
  let darkBorder = '20, 18, 36'
  let darkBorderOpacity = '1'

  if (secondaryKey && isTintedSecondary(secondaryKey)) {
    const tinted = tintedSecondaries[secondaryKey]

    root.push(channelsToDeclarations('secondary', tinted.light))
    darkSecondary = channelsToDeclarations('secondary', tinted.dark)
    lightBorder = tinted.light[200]
    darkBorder = tinted.dark[700]
    darkBorderOpacity = '0.7'
  } else if (secondaryKey) {
    const palette = colors[secondaryKey]

    root.push(paletteToDeclarations('secondary', palette))
    darkSecondary = paletteToDeclarations('secondary', palette)
    lightBorder = hexToRgbChannels(palette[200])
    darkBorder = hexToRgbChannels(palette[800])
  }

  // Only set tokens — do not restyle `*` or we override Input/Select border utilities.
  // Theme base `.dark *` uses `rgba(var(--border-color), var(--border-opacity, 1))`.
  return `
:root {
  ${root.join('\n  ')}
  --border-color: ${lightBorder};
}
html.dark {
  ${darkSecondary}
  --border-color: ${darkBorder};
  --border-opacity: ${darkBorderOpacity};
}
`.trim()
}

export function applyDocsPalette(options: {
  primary?: ColorPalette | null;
  secondaryKey?: SecondaryPaletteKey | null;
}) {
  if (typeof document === 'undefined') return

  const { primary, secondaryKey } = options
  let el = document.getElementById(DOCS_PALETTE_STYLE_ID) as HTMLStyleElement | null
  const css = getDocsPaletteCss(options)

  if (!primary && !secondaryKey) {
    el?.remove()

    return
  }

  if (!el) {
    el = document.createElement('style')
    el.id = DOCS_PALETTE_STYLE_ID
    document.head.appendChild(el)
  }

  el.textContent = css
}

export type DocsPaletteInstallGuide = {
  primaryKey: PrimaryPaletteKey;
  secondaryKey: SecondaryPaletteKey;
  tintedSecondary: boolean;
  themeJs: string;
  cssVars: string;
}

/** Copy-ready steps for applying the current docs primary/secondary in an app. */
export function getDocsPaletteInstallGuide(options: {
  primaryKey: PrimaryPaletteKey;
  secondaryKey: SecondaryPaletteKey;
}): DocsPaletteInstallGuide {
  const { primaryKey, secondaryKey } = options
  const tinted = isTintedSecondary(secondaryKey)
  const primaryPalette = colors[primaryKey]
  const secondaryPalette = getSecondaryThemePalette(secondaryKey)

  const secondaryJs = tinted
    ? `const secondary = ${JSON.stringify(secondaryPalette, null, 2)}

app.use(UI, {
  theme: {
    ...BaseTheme,
    colors: {
      ...BaseTheme.colors,
      primary: colors.${primaryKey},
      secondary,
    },
  },
})`
    : `app.use(UI, {
  theme: {
    ...BaseTheme,
    colors: {
      ...BaseTheme.colors,
      primary: colors.${primaryKey},
      secondary: colors.${secondaryKey},
    },
  },
})`

  const themeJs = `import { createApp } from 'vue'
import UI, { BaseTheme, colors } from '@indielayer/ui'
import App from './App.vue'

const app = createApp(App)

${secondaryJs}`

  return {
    primaryKey,
    secondaryKey,
    tintedSecondary: tinted,
    themeJs,
    cssVars: getDocsPaletteCss({
      primary: primaryPalette,
      secondaryKey,
    }),
  }
}
