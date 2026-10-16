export type InputGroupPosition = 'only' | 'first' | 'middle' | 'last'

export function inputGroupRadiusClasses(position?: InputGroupPosition | null) {
  if (!position) return []

  if (position === 'only') return ['rounded-lg']
  if (position === 'first') return ['rounded-l-lg', 'rounded-r-none']
  if (position === 'last') return ['rounded-r-lg', 'rounded-l-none']

  return ['rounded-none']
}
