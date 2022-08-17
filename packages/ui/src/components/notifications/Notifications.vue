<script lang="ts">
const validators = {
  align: ['left','right'],
  position: ['bottom','top'],
}

export default {
  name: 'XNotifications',
  validators,
}
</script>

<script setup lang="ts">
import { ref, provide, watch, type PropType } from 'vue'
import { injectNotificationKey } from '../../composables/keys'
import { useColors } from '../../composables/colors'
import { useCSS } from '../../composables/css'
import { useTheme } from '../../composables/theme'
import { closeIcon } from '../../common/icons'

import XIcon from '../../components/icon/Icon.vue'
import XSpacer from '../spacer/Spacer'

import theme from './Notifications.theme'

export type NotificationAlign = 'left' | 'right'
export type NotificationPosition = 'bottom' | 'top'
export type NotificationAction = {
  onClick: ()=> void,
  label: string,
  color?: string
}
export type NotificationEvent = {
  id?: number,
  icon?: string,
  action?: NotificationAction,
  iconColor?: string,
  title?: string,
  style?: string,
  message?: string,
  timeout?: number,
  removable?: boolean,
  align?: NotificationAlign,
  position?: NotificationPosition
}

const props = defineProps({
  ...useColors.props('primary'),
  align: {
    type: String as PropType<NotificationAlign>,
    default: 'right',
    validator: (value: string) => validators.align.includes(value),
  },
  position: {
    type: String as PropType<NotificationPosition>,
    default: 'bottom',
    validator: (value: string) => validators.position.includes(value),
  },
  timeout: {
    type: Number,
    default: 3500,
  },
  removable: {
    type: Boolean,
    default: true,
  },
  injectKey: {
    type: [Symbol, String],
    default: injectNotificationKey,
  },
})

const internalAlign = ref(props.align)
const internalPosition = ref(props.position)
const notifications = ref<NotificationEvent []>([])
const listRef = ref<HTMLElement | null>(null)
const css = useCSS('notification')
const colors = useColors()

provide(props.injectKey, {
  log,
  info,
  warn,
  error,
  warning: warn,
  success,
})

watch(() => props.align, (align) => { internalAlign.value = align })
watch(() => props.position, (position) => { internalPosition.value = position })

function log(notification: NotificationEvent | string) {
  const isMessage = typeof notification === 'string'
  const preset = {
    message: isMessage ? notification : undefined,
  }

  add(isMessage ? preset : {
    ...preset,
    ...notification,
  })
}

function info(notification: NotificationEvent | string) {
  const isMessage = typeof notification === 'string'
  const preset = {
    icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />',
    iconColor: 'sky',
    message: isMessage ? notification : undefined,
  }

  add(isMessage ? preset : {
    ...preset,
    ...notification,
  })
}

function success(notification: NotificationEvent | string) {
  const isMessage = typeof notification === 'string'
  const preset = {
    icon: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />',
    iconColor: 'success',
    message: isMessage ? notification : undefined,
  }

  add(isMessage ? preset : {
    ...preset,
    ...notification,
  })
}

function warn(notification: NotificationEvent | string) {
  const isMessage = typeof notification === 'string'
  const preset = {
    icon: '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />',
    iconColor: 'warning',
    message: isMessage ? notification : undefined,
  }

  add(isMessage ? preset : {
    ...preset,
    ...notification,
  })
}

function error(notification: NotificationEvent | string) {
  const isMessage = typeof notification === 'string'
  const preset = {
    icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />',
    iconColor: 'error',
    message: isMessage ? notification : undefined,
  }

  add(isMessage ? preset : {
    ...preset,
    ...notification,
  })
}

function add(notification: NotificationEvent) {
  const mergeProps = {
    id: Date.now(),
    iconColor: props.color,
    timeout: props.timeout,
    align: internalAlign.value,
    position: internalPosition.value,
    removable: props.removable,
  }

  const merged = {
    ...mergeProps,
    ...notification,
  }

  internalAlign.value = merged.align
  internalPosition.value = merged.position

  const color = colors.getPalette(merged.iconColor)
  const colorAction = colors.getPalette(merged.action?.color || 'primary')

  const cssVariables = css.variables({
    icon: color[400],
    action: colorAction[400],
    hover: {
      action: colorAction[500],
    },
    dark: {
      icon: color[500],
      action: colorAction[500],
      hover: {
        action: colorAction[600],
      },
    },
  })

  merged.style = Object.keys(cssVariables).map((key) => `${key}: ${cssVariables[key]}`).join(';')

  notifications.value.push(merged)

  listRef.value?.scrollTo({ top: 0, behavior: 'smooth' })

  if (merged.timeout) setTimer(merged, merged.timeout)
}

function remove(event: NotificationEvent) {
  notifications.value = notifications.value.filter((e) => e.id !== event.id)
}

function setTimer(notification: NotificationEvent, timeout: number) {
  setTimeout(() => {
    remove(notification)
  }, timeout)
}

const { styles, classes, className } = useTheme('notification', theme, props)

defineExpose({ log, info, success, warn, warning: warn, error })
</script>

<template>
  <slot></slot>
  <teleport to="body">
    <div
      ref="listRef"
      :style="styles"
      :class="[
        className,
        classes.wrapper,
        {
          // align
          'left-0': internalAlign === 'left',
          'right-0': internalAlign === 'right',
          // position
          'top-0': internalPosition === 'top',
          'bottom-0': internalPosition === 'bottom',
        }]"
    >
      <transition-group
        tag="ul"
        :class="[
          classes.list,
          { 'flex-col-reverse': internalPosition }
        ]"
        enter-active-class="transition ease-out duration-200"
        leave-active-class="transition ease-out duration-100"
        enter-from-class="transform translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-2 opacity-0"
        move-class="ease-in-out duration-200"
      >
        <li
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            classes.item,
            {
              'mb-2': internalPosition === 'bottom',
              'mt-2': internalPosition === 'top',
            }]"
          :style="notification.style"
        >
          <x-icon
            v-if="notification.icon"
            filled
            :icon="notification.icon"
            class="
                mr-4
                text-[color:var(--x-notification-icon)]
                dark:text-[color:var(--x-notification-dark-icon)]
              "
            viewBox="0 0 20 20"
          />
          <div class="flex items-center flex-wrap">
            <span v-if="notification.title" class="font-semibold mr-2">{{ notification.title }}</span>
            <span>{{ notification.message }}</span>
          </div>
          <x-spacer/>
          <div
            v-if="notification.action"
            class="
                ml-3
                font-semibold
                cursor-pointer
                text-[color:var(--x-notification-action)]
                hover:text-[color:var(--x-notification-action-hover)]
                dark:text-[color:var(--x-notification-dark-action)]
                dark:hover:text-[color:var(--x-notification-dark-action-hover)]
              "
            @click="notification.action.onClick"
          >
            {{ notification.action.label }}
          </div>
          <x-icon
            v-if="notification.removable"
            :icon="closeIcon"
            class="text-gray-400 hover:text-gray-500 ml-3 cursor-pointer"
            @click="() => {remove(notification)}"
          />
        </li>
      </transition-group>
    </div>
  </teleport>
</template>
