export type InputGroupPosition = 'only' | 'first' | 'middle' | 'last'

export function inputGroupRadiusClasses(position?: InputGroupPosition | null) {
  if (!position) return []

  if (position === 'only') return ['rounded-md']
  if (position === 'first') return ['rounded-l-md', 'rounded-r-none']
  if (position === 'last') return ['rounded-r-md', 'rounded-l-none']

  return ['rounded-none']
}
