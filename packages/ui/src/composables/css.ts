const themes = ['dark']
const modifiers = ['hover', 'active', 'focus', 'visited']

const isTheme = (theme: string) => themes.includes(theme)
const isModifier = (modifier: string) => modifiers.includes(modifier)

export const useCSS = (namespace?: string) => {

  const get = (name: string, value: string, theme?: string, modifier?: string) => `${variable(name,theme,modifier)}: ${value}`

  const variable = (name: string, theme?: string, modifier?: string) =>
    `--x${theme ? `-${theme}` : ''}${namespace ? `-${namespace}` : ''}-${name}${modifier ? `-${modifier}` : ''}`

  const variables = (object: Record<string, string | object>, theme?: string, modifier?: string) => {
    let styles: Record<string, string> = {}

    for (const key in object) {
      const keyValue = object[key]

      if (!keyValue) break

      if (isTheme(key)) {
        styles = {
          ...styles,
          ...variables(<any>keyValue, key, modifier),
        }
      } else if (isModifier(key)) {
        styles = {
          ...styles,
          ...variables(<any>keyValue, theme, key),
        }
      } else {
        styles[variable(key, theme, modifier)] = <string>keyValue
      }
    }

    return styles
  }

  return {
    get,
    variable,
    variables,
  }
}
