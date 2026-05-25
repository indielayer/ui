/** Variant booleans use `optionalBooleanProp()` from `./common/props` so app `defaults` apply when omitted. */
import type { ComponentThemes } from './theme'
import type { AlertProps } from './components/alert/Alert.vue'
import type { ButtonProps } from './components/button/Button.vue'
import type { CardProps } from './components/card/Card.vue'
import type { InputProps } from './components/input/Input.vue'

type ComponentDefaultsMap = {
  Alert: AlertProps;
  Button: ButtonProps;
  Card: CardProps;
  Input: InputProps;
}

export type ComponentDefaults = {
  [K in keyof ComponentDefaultsMap]?: Partial<ComponentDefaultsMap[K]>;
} & {
  [K in Exclude<keyof ComponentThemes, keyof ComponentDefaultsMap>]?: Record<string, unknown>;
}
