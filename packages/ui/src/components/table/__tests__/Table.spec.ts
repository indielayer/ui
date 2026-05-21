import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from '../Table.vue'
import type { TableHeader } from '../Table.vue'

const sortableHeaders: TableHeader[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Name', value: 'name', sortable: true },
]

function mountTable(props: Record<string, unknown> = {}) {
  return mount(Table, {
    props: {
      headers: sortableHeaders,
      items: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
      sort: [],
      ...props,
    },
  })
}

function clickSortableHeader(wrapper: ReturnType<typeof mountTable>, index: number) {
  const headers = wrapper.findAll('th')

  return headers[index].trigger('click')
}

describe('Table', () => {
  it('renders without errors', () => {
    const wrapper = mount(Table)

    expect(wrapper.vm).toBeTruthy()
  })

  describe('sort', () => {
    it('defaults to single-column sort', async () => {
      const wrapper = mountTable()

      await clickSortableHeader(wrapper, 0)
      expect(wrapper.emitted('update:sort')?.[0]).toEqual([['id,-1']])

      await clickSortableHeader(wrapper, 1)
      expect(wrapper.emitted('update:sort')?.[1]).toEqual([['name,-1']])
    })

    it('cycles sort order for the active column in single-column mode', async () => {
      const wrapper = mountTable({ sort: ['id,-1'] })

      await clickSortableHeader(wrapper, 0)
      expect(wrapper.emitted('update:sort')?.[0]).toEqual([['id,1']])

      await wrapper.setProps({ sort: ['id,1'] })
      await clickSortableHeader(wrapper, 0)
      expect(wrapper.emitted('update:sort')?.[1]).toEqual([[]])
    })

    it('appends columns when sortMultiple is enabled', async () => {
      const wrapper = mountTable({ sortMultiple: true, sort: ['id,-1'] })

      await clickSortableHeader(wrapper, 1)
      expect(wrapper.emitted('update:sort')?.[0]).toEqual([['id,-1', 'name,-1']])
    })
  })
})
