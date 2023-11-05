import type { InjectionKey } from 'vue'
import type { FormInjection } from '../components/form/Form.vue'
import type { TabGroupInjection } from '../components/tab/TabGroup.vue'
import type { ButtonGroupInjection } from '../components/button/ButtonGroup.vue'

export const injectTabKey = Symbol() as InjectionKey<TabGroupInjection>
export const injectFormKey = Symbol() as InjectionKey<FormInjection>
export const injectThemeKey = Symbol() as InjectionKey<any>
export const injectIconsKey = Symbol() as InjectionKey<any>
export const injectColorsKey = Symbol() as InjectionKey<any>
export const injectButtonGroupKey = Symbol() as InjectionKey<ButtonGroupInjection>
export const injectNotificationKey = Symbol() as InjectionKey<any>
