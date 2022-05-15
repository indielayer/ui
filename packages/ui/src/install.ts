import type { App } from 'vue'
import * as components from './components'

export interface IndielayerUIOptions {
  prefix?: string
}

const install = (app: App, options: IndielayerUIOptions = { prefix: 'X' }) => {
  Object.keys(components).forEach((name) => {
    // @ts-ignore
    app.component(`${options.prefix}${name.slice(1)}`, components[name])
  })
}

export default install
