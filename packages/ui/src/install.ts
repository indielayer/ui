import * as components from './components'
import { XVirtualGrid, XVirtualList, XInfiniteLoader } from './virtual'
import create from './create'

export default create({
  components: [
    ...Object.keys(components).map(
      (key) => components[key as keyof object],
    ),
    XVirtualList,
    XVirtualGrid,
    XInfiniteLoader,
  ],
})
